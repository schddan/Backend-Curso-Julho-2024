//https://github.com/RBrignoli/cursobe.git

const { client } = require("./db")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


const listUsers = async (req, res) => {
    res.send('deu tudo certo')
}

const createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const senhaSegura = await bcryptjs.hashSync(senha, 10)
        const sql = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`
        const dados = await client.query(sql, [nome, email, senhaSegura])
        res.status(201).json({ msg: "User criado com sucesso" })
    } catch (err) {
        res.status(500).json({ msg: "Erro ao criar o usuário" })

    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM usuarios WHERE id = $1`
        const dados = await client.query(sql, [id]) //essa variável recebe o retorno do RETURNING
        res.status(200).json({ msg: "Usuário Deletado" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Erro ao deletar" })
    }

}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, email } = req.body;
        const sql = `UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *`
        const dados = await client.query(sql, [nome, email, id]) //essa variável recebe o retorno do RETURNING
        console.log(dados)
        res.status(201).json({ msg: "User atualizado com sucesso" })
    } catch (err) {
        res.status(500).json({ msg: "Erro ao atualizar o usuário" })

    }
}
const getUser = async (req, res) => {
    res.send('pegou um usuário')
}

const login = async (req, res) => {
    try{
        const { email, senha } = req.body;
        const sql = `SELECT * FROM usuarios WHERE email = $1`
        const usuario = await client.query(sql, [email])
        console.log(usuario.rows[0])
        const validPassword = bcryptjs.compareSync(senha, usuario.rows[0].senha)
        console.log(validPassword)
        
        const token = jwt.sign(
            {
                _id:usuario.rows[0].id,
                email: usuario.rows[0].email,
                nome: usuario.rows[0].nome,

            },
            process.env.jwt_secret_key,
            {expiresIn:1000*60*60*24*3} //É em milissegundos, por isso ms, s, m, horas, dias
        )

        res.status(200).cookie("ROGERIO", token, {}).json({msg: "você efetuou o login"})
    }catch(err){
        console.log(err)
        res.send(500)
    }
}
module.exports = {
    listUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser, 
    login
}