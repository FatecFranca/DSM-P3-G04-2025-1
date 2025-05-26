const usuarioModel = require('../models/usuarios')

const loginController = {
  async login(req, res) {
    const { email, senha } = req.body

    try {
      const usuario = await usuarioModel.buscarPorEmail(email)
      if (!usuario) {
        return res.status(401).json({ erro: 'Email ou senha inválidos.' })
      }

      const senhaValida = await usuarioModel.validarSenha(senha, usuario.senha)
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Email ou senha inválidos.' })
      }

      // Cria a sessão do usuário
      req.session.usuario = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }

      res.json({ 
        mensagem: 'Login realizado com sucesso.',
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      })
    } catch (erro) {
      console.error('Erro ao fazer login:', erro)
      res.status(500).json({ erro: 'Erro ao fazer login.' })
    }
  },

  logout(req, res) {
    req.session.destroy()
    res.json({ mensagem: 'Logout realizado com sucesso.' })
  }
}

module.exports = loginController 