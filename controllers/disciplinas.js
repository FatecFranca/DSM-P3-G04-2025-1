const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const disciplinasController = {
  async listar(req, res) {
    try {
      const disciplinas = await prisma.disciplina.findMany({
        include: {
          anotacoes: true,
          dicas: true
        }
      });
      res.json(disciplinas);
    } catch (erro) {
      console.error('Erro ao listar disciplinas:', erro);
      res.status(500).json({ erro: 'Erro ao listar disciplinas.' });
    }
  },

  async criar(req, res) {
    const { nome, professor, periodo, descricao } = req.body;

    try {
      const disciplina = await prisma.disciplina.create({
        data: {
          nome,
          professor,
          periodo,
          descricao
        }
      });
      res.status(201).json(disciplina);
    } catch (erro) {
      console.error('Erro ao criar disciplina:', erro);
      res.status(500).json({ erro: 'Erro ao criar disciplina.' });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, professor, periodo, descricao } = req.body;

    try {
      const disciplina = await prisma.disciplina.update({
        where: { id },
        data: {
          nome,
          professor,
          periodo,
          descricao
        }
      });
      res.json(disciplina);
    } catch (erro) {
      console.error('Erro ao atualizar disciplina:', erro);
      res.status(500).json({ erro: 'Erro ao atualizar disciplina.' });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      await prisma.disciplina.delete({
        where: { id }
      });
      res.status(204).send();
    } catch (erro) {
      console.error('Erro ao deletar disciplina:', erro);
      res.status(500).json({ erro: 'Erro ao deletar disciplina.' });
    }
  }
};

module.exports = disciplinasController;