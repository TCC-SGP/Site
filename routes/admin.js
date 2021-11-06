const express = require('express');
const router = express.Router();

//CARREGANDO MODELS
const Postagem = require('../models/Postagem');

//ROTAS CENTRAIS
router.get('/', (req, res) => {
    Postagem.findAll().then((postagens)=>{
        postagens = postagens.map((postagem)=>{
            return postagem.toJSON();
        });
        res.render("home", {
            postagem: postagens
        });
    });
});
//Carlos
module.exports = router;