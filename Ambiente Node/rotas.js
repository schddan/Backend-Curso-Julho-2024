const express = require('express')
const router = express.Router() //Objeto do express que serve para gerenciamento de rotas
const controlador = require('./controlador')

//SESSÃO DE CRUD
router.get("/", controlador.listUsers) //Cria a rota

router.post("/", controlador.createUser)//Cria a rota
router.post("/:id", controlador.updateUser) //Cria a rota
router.delete("/:id", controlador.deleteUser)//Cria a rota
router.get("/:id", controlador.getUser)//Cria a rota
router.put("/", controlador.login)//Cria a rota (put aqui não é ideal, o ideal é post, pesquise melhor)

module.exports = router //Exporta a rota