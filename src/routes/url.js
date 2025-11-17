const express = require('express');
const router = express.Router();
const {nanoid} = require('nanoid')
const Url = require('../models/Url')

// rota POST
// Cria uma URL curta
router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body

    // criando um baseUrl considerando que seria o nosso proprio servidor
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`

    //validando a URL
    if (!longUrl) {
        return res.status(400).json('Por Favor, forneça uma URL')
    }

    try {
        // verificando se a URL ja existe no banco de dados
        let url = await Url.findOne({longUrl})

        if (url) {
            //se ja existir, retorna apenas os dados dela
            return res.json(url)
        }

        // se nao existir, cria uma nova URL curta
        
        // gerando um codigo unico para a URL curta
        const shortCode = nanoid(5) // gerando um ID de 5 caracteres

        // monta a URL completa
        const shortUrl = `${baseUrl}/${shortCode}`

        // cria o novo objeto URL
        url = new Url({
            longUrl, 
            shortCode, 
            shortUrl, 
            date: new Date()
        })

        // salvando no banco de dados
        await url.save()

        // retorna os dados para o cliente
        res.json(url)

    } catch (e) {
        console.error(e)
        res.status(500).json('Erro no servidor')
    }
})

module.exports = router