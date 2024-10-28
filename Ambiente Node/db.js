const { Client } = require('pg')

//host@user.password.port.database - informações para se conectar num bd
const client = new Client({
    host: process.env.host,
    port:process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}) //Dados retirados do pgAdmin na tabela postgres do computador utilizado na hora

const connectDB = async () => {
    client
    .connect()
    .then(() => { //Then é executado caso a conexão ocorra sem erros
        console.log("Conexão sucedida")
    })
    .catch((err) => { //Catch é executado caso a conexão ocorra com erros
        console.error("Erro ao conectar")
    })
}

const setup = async (req, res) => {
    try{
        const data = await client.query('CREATE TABLE usuarios (nome VARCHAR(100), email VARCHAR(50), id SERIAL PRIMARY KEY, senha VARCHAR(100))')
        res.status(200).json({msg: "A tabela foi criada"})
    } catch(err) {
        console.log("Erro ao criar tabela")
        res.status(500)
    }
}

module.exports = {connectDB, setup, client}