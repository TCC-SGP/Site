const express = require('express');
const router = express.Router();

//CARREGANDO OS MODELS
const Doacao = require('../models/Doacao');
const Encaminhamento = require('../models/Encaminhamento');

//ROTA DA PÁGINA DOE
router.get('/doe', (req, res) =>{
    res.render("admin/doacoes/doe");
});

//ROTA DA PÁGINA DOAÇÕES
router.get('/doacoes', (req, res)=>{
    Doacao.findAll().then((doacoes)=>{
        doacoes = doacoes.map((doacao)=>{
            return doacao.toJSON();
        });
        res.render("admin/doacoes/doacoes", {
        doacao: doacoes
        });
    });
});

//ROTA DA PÁGINA DE ENCAMINHAMENTO DE DOAÇÕES
router.get('/encaminhamento', (req, res)=>{
    Encaminhamento.findAll().then((encaminhamentos)=>{
        encaminhamentos = encaminhamentos.map((encaminhamento)=>{
            return encaminhamento.toJSON();
        });
        res.render("admin/doacoes/encaminhamento", {
            encaminhamento: encaminhamentos
        });
    });
});

module.exports = router;