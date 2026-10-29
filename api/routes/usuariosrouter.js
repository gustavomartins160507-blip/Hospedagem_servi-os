const express = require('express')
const router = express.Router()
const usuarioscontroller = require('../controller/usuarioscontroller')
const autenticar = require('../middleware/authmiddleware')

router.get('/Usuarios', usuarioscontroller.listarusuarios)

router.post('/cadastrar', usuarioscontroller.novousuario)

router.delete('/deletar/:id',usuarioscontroller.apagarusuario)

router.post('/login',usuarioscontroller.login)

router.get('/perfil', autenticar, usuarioscontroller.perfil)

router.post('/esqueci-senha',usuarioscontroller.esqueceu_senha)

router.post('/resetar-senha',usuarioscontroller.resetar_senha)

module.exports = router