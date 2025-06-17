const express = require('express');
const router = express.Router();
const lembretesController = require('../controllers/lembretes');

// As rotas já estão protegidas pelo middleware de autenticação no app.js
router.get('/', lembretesController.listar);
router.post('/', lembretesController.criar);
router.put('/:id', lembretesController.atualizar);
router.delete('/:id', lembretesController.deletar);

module.exports = router; 