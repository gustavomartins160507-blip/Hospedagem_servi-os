
const express = require('express')
const cors = require('cors')

const rota = require('./routes/usuariosrouter')
const { connection } = require('./connection/connection')

const app = express()

app.use(express.json())
app.use(cors())
app.use(rota)

const port = 3000
const host = 'localhost'

connection.authenticate()
    .then(() => console.log('Banco conectado'))
    .catch(err => console.log(err))


app.get('/', (request, response) => {
    return response.status(200).json([
        {
            id: 1,
            titulo: 'Api funcionando',
            nome: 'projeto hospedagem',
            autor: 'Gugashow'
        }
    ])
})

app.post('/cadastrar', (request, response) => {
    console.log(request.body)

    return response.status(200).json({
        mensagem: 'cadastro recebido',
        dados: request.body
    })
})

app.get('/status', async (request, response) => {
    try {
        await connection.authenticate()

        return response.status(200).json({
            message: 'Banco conectado'
        })
    } catch (error) {
        return response.status(400).json({
            message: 'Erro ao conectar ao banco'
        })
    }
})

app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`)
})
