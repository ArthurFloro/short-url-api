const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

//carregar as variaveis do .env
dotenv.config()

const app = express()

//conexao com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((e) => console.error('Erro ao conectar ao MongoDB:', e));


//middleware para parsear JSON
app.use(express.json())
app.use(cors())

//definir as rotas
app.use('/', require('./src/routes/index'));
app.use('/api/url', require('./src/routes/url'));


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

