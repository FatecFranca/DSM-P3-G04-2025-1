require('dotenv').config()
const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()

const dicasRoutes = require('./routes/dicas')
const usuariosRoutes = require('./routes/usuarios')
const loginRoutes = require('./routes/login')
const sobreRoutes = require('./routes/sobre')
const anotacoesRoutes = require('./routes/anotacoes')
const disciplinasRoutes = require('./routes/disciplinas')
const lembretesRoutes = require('./routes/lembretes')
const autenticacao = require('./middleware/autenticacao')

// Configuração do middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname)))
app.use('/views', express.static(path.join(__dirname, 'views')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'chave-secreta-padrao',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}))

// Rotas públicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.get('/criar-conta', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'criarConta.html'))
})

// Rotas da API públicas
app.use('/api/login', loginRoutes)
app.use('/api/usuarios', usuariosRoutes)

// Middleware de autenticação para rotas protegidas
app.use('/api/*', autenticacao)

// Rotas da API protegidas
app.use('/api/dicas', dicasRoutes)
app.use('/api/sobre', sobreRoutes)
app.use('/api/anotacoes', anotacoesRoutes)
app.use('/api/disciplinas', disciplinasRoutes)
app.use('/api/lembretes', lembretesRoutes)

// Middleware de autenticação para rotas de páginas
app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/criar-conta') {
    return next()
  }
  if (!req.session.userId) {
    return res.redirect('/')
  }
  next()
})

// Rotas protegidas de páginas
app.get('/dicas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dicas.html'))
})

app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'sobre.html'))
})

app.get('/anotacoes', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'anotacoes.html'))
})

app.get('/disciplinas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'disciplinas.html'))
})

app.get('/lembretes', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'lembretes.html'))
})

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Algo deu errado!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
