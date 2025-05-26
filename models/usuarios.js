const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const usuarioModel = {
  async criar(dados) {
    const hashSenha = await bcrypt.hash(dados.senha, 10)
    
    return prisma.usuario.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        senha: hashSenha,
        nascimento: new Date(dados.nascimento)
      }
    })
  },

  async buscarPorEmail(email) {
    return prisma.usuario.findUnique({
      where: { email }
    })
  },

  async validarSenha(senha, hashSenha) {
    return bcrypt.compare(senha, hashSenha)
  }
}

module.exports = usuarioModel 