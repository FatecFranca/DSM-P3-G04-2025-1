const usuarioModel = require('../models/usuarios')

const usuariosController = {
  async registrar(req, res) {
    const { nome, email, senha, senha2, nascimento } = req.body

    try {
      // Validações
      if (senha !== senha2) {
        return res.status(400).json({ erro: 'As senhas não coincidem.' })
      }

      const usuarioExistente = await usuarioModel.buscarPorEmail(email)
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Email já cadastrado.' })
      }

      // Cria o usuário
      const usuario = await usuarioModel.criar({
        nome,
        email,
        senha,
        nascimento
      })

      // Remove a senha do retorno
      const { senha: _, ...usuarioSemSenha } = usuario
      res.status(201).json(usuarioSemSenha)
    } catch (erro) {
      console.error('Erro ao registrar usuário:', erro)
      res.status(500).json({ erro: 'Erro ao registrar usuário.' })
    }
  }
}

module.exports = usuariosController 