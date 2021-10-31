const express = require('express');
const router = express.Router();
const Postagem = require('../models/Postagem');
const Tipopostagem = require('../models/TipoPostagem');
const Adiministrador = require('../models/Adiministrador');
const Pet = require('../models/Pet');

//ROTA DE POSTAGENS
router.get('/postagem', (req, res)=>{
    Postagem.findAll().then((postagens) => {
        postagens = postagens.map((postagen)=>{
            return postagen.toJSON();
        });
        res.render("admin/postagens/postagem", { postagens: postagens} );
    });
});

//ROTA DE CARREGAR A PÁGINA PARA ADC POSTAGENS
router.get('/addpostagem', (req, res)=>{
    Tipopostagem.findAll().then((tipopstagem)=>{
        Adiministrador.findAll().then((adiministrador)=>{
            Pet.findAll().then((pet)=>{
                var ntipopostagem = JSON.parse(JSON.stringify(tipopstagem));
                var nadiministrador = JSON.parse(JSON.stringify(adiministrador));
                var npet = JSON.parse(JSON.stringify(pet));
                res.render("admin/postagens/addpostagem", { 
                    tPostagem: ntipopostagem,
                    adiministrador: nadiministrador,
                    pet: npet
                 });
            });
        });
    });
})

module.exports = router;