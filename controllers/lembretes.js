const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lembretesController = {
  async listar(req, res) {
    try {
      const lembretes = await prisma.lembrete.findMany({
        where: {
          usuarioId: req.usuario.id
        },
        orderBy: {
          data: 'asc'
        }
      });
      res.json(lembretes);
    } catch (erro) {
      console.error('Erro ao listar lembretes:', erro);
      res.status(500).json({ erro: 'Erro ao listar lembretes.' });
    }
  },

  async criar(req, res) {
    const { titulo, conteudo, data } = req.body;

    try {
      const lembrete = await prisma.lembrete.create({
        data: {
          titulo,
          conteudo,
          data: new Date(data),
          usuario: {
            connect: { id: req.usuario.id }
          }
        }
      });
      res.status(201).json(lembrete);
    } catch (erro) {
      console.error('Erro ao criar lembrete:', erro);
      res.status(500).json({ erro: 'Erro ao criar lembrete.' });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { titulo, conteudo, data } = req.body;

    try {
      const lembrete = await prisma.lembrete.findUnique({
        where: { id }
      });

      if (!lembrete) {
        return res.status(404).json({ erro: 'Lembrete não encontrado.' });
      }

      if (lembrete.usuarioId !== req.usuario.id) {
        return res.status(403).json({ erro: 'Sem permissão para editar este lembrete.' });
      }

      const lembreteAtualizado = await prisma.lembrete.update({
        where: { id },
        data: {
          titulo,
          conteudo,
          data: new Date(data)
        }
      });

      res.json(lembreteAtualizado);
    } catch (erro) {
      console.error('Erro ao atualizar lembrete:', erro);
      res.status(500).json({ erro: 'Erro ao atualizar lembrete.' });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      const lembrete = await prisma.lembrete.findUnique({
        where: { id }
      });

      if (!lembrete) {
        return res.status(404).json({ erro: 'Lembrete não encontrado.' });
      }

      if (lembrete.usuarioId !== req.usuario.id) {
        return res.status(403).json({ erro: 'Sem permissão para deletar este lembrete.' });
      }

      await prisma.lembrete.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (erro) {
      console.error('Erro ao deletar lembrete:', erro);
      res.status(500).json({ erro: 'Erro ao deletar lembrete.' });
    }
  }
};

module.exports = lembretesController; 