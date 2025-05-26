const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuarios')
const autenticar = require('../middleware/auth')

router.post('/registrar', usuariosController.registrar)

module.exports = router 