const express = require('express');
const router = express.Router();
const Url = require('../models/Url')

// rota GET
// Rdireciona para a URL original
router.get('/:shortCode', async (req, res) => {
    try {
        const url = await Url.findOne({shortCode: req.params.shortCode})

        if (url) {
            // Opcional rastrear clicks
            url.clicks++
            await url.save()

            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json('Nenhuma URL encontrada')
        }
    } catch (e) {
        console.error(e)
        res.status(500).json('Erro do servidor')
    }
})

module.exports = router