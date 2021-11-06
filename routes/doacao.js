const express = require('express');
const router = express.Router();

//CARREGANDO OS MODELS
const Doacao = require('../models/Doacao');
const Encaminhamento = require('../models/Encaminhamento');
const Pet = require('../models/Pet');
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

//ROTA DA PÁGINA DE ADICIONAR ENCAMINHAMENTO DE DOAÇÕES
router.get('/encaminhamento/:id', (req, res)=>{
    Doacao.findAll({where: {'tb_doacao_id': req.params.id}}).then((doacoes)=>{
        Pet.findAll().then((pets)=>{
            var ndoacao = JSON.parse(JSON.stringify(doacoes));
            var npets = JSON.parse(JSON.stringify(pets));
            res.render("admin/doacoes/encaminhamento", {
                doacao: ndoacao,
                pet: npets
            })
        })
    })
});

//ROTA DO BOTÃO PARA ADICONAR UM ENCAMINHAMENTO
router.post('/addencaminhamento', (req, res)=>{
    Encaminhamento.create({
        tb_doacao_id: req.body.doacaoId,
        tb_pet_id: req.body.petId,
        tb_encaminhamento_doacao_data: req.body.data,
        tb_encaminhamento_doacao_hora: req.body.hora
    }).then(()=>{
        res.redirect("/postagem");
    }).catch((erro)=>{
        console.log(erro);
        res.send("Houve um erro " + erro);
    })
});

module.exports = router;