const express = require('express') //É como o import do jsx
require("dotenv").config()//Para usar os recursos do dotenv
const { connectDB } = require('./db')
const rotas = require('./rotas')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB() //A chamada precisa ficar aqui

app.use("/usuarios", rotas)

app.listen(8001)