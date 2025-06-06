const express = require('express');
const router = express.Router();
const disciplinasController = require('../controllers/disciplinas');
const autenticar = require('../middleware/auth');

// Todas as rotas de disciplinas requerem autenticação
router.use(autenticar);

router.get('/', disciplinasController.listar);
router.post('/', disciplinasController.criar);
router.put('/:id', disciplinasController.atualizar);
router.delete('/:id', disciplinasController.deletar);

module.exports = router; 