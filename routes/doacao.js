const express = require('express');
const router = express.Router();

//CARREGANDO OS MODELS
const Doacao = require('../models/Doacao');
const Encaminhamento = require('../models/Encaminhamento');
const Tipodoacao = require('../models/TipoDoacao');

//ROTA DA PÁGINA DOE
router.get('/doe', (req, res) =>{
    res.render("admin/doacoes/doe");
});

//ROTA DA PÁGINA DOAÇÕES
router.get('/doacoes', (req, res)=>{
    Doacao.findAll().then((doacoes)=>{
        Tipodoacao.findAll().then((tipodoacao)=>{
            var ntitpodoacao = JSON.parse(JSON.stringify(tipodoacao));
            var ndoacoes = JSON.parse(JSON.stringify(doacoes))
            res.render("admin/doacoes/doacoes", {
            doacao: ndoacoes,
            tipoDoacao: ntitpodoacao
            });
        })
    });
});

//ROTA DO BOTÃO PESQUISAR DOAÇÕES
router.get('/doacoes/:id', (req, res)=>{
    Doacao.findAll({ where: {'tb_tipodoacao_id': req.params.id} }).then((doacoes)=>{
        Tipodoacao.findAll().then((tipodoacao)=>{
            var ntitpodoacao = JSON.parse(JSON.stringify(tipodoacao));
            var ndoacoes = JSON.parse(JSON.stringify(doacoes))
            res.render("admin/doacoes/doacoes", {
            doacao: ndoacoes,
            tipoDoacao: ntitpodoacao
            });
        })
    })
})

//ROTA DA PÁGINA DE ENCAMINHAMENTO DE DOAÇÕES
router.get('/encaminhamento/:id', (req, res)=>{
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