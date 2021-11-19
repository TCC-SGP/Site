const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const config = process.env;

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
router.get('/doacoes', auth, (req, res)=>{
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
router.get('/doacoes/:id', auth, (req, res)=>{
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
router.get('/adcencaminhamento/:id', (req, res)=>{
    Doacao.findAll({where: {'tb_doacao_id': req.params.id}}).then((doacoes)=>{
        Pet.findAll().then((pets)=>{
            var ndoacao = JSON.parse(JSON.stringify(doacoes));
            var npets = JSON.parse(JSON.stringify(pets));
            res.render("admin/doacoes/addencaminhamento", {
                doacao: ndoacao,
                pet: npets
            })
        })
    })
});

//ROTA PARA A PÁGINA DE ENCAMINHAMENTO
router.get('/encaminhamento', (req, res)=>{
    Encaminhamento.sequelize.query("SELECT E.TB_ENCAMINHAMENTO_DOACAO_ID AS ID,\
    PR.TB_PROTETOR_NOME AS NOME_PROTETOR,\
    P.TB_PET_NOME AS NOME_PET,\
    E.TB_ENCAMINHAMENTO_DOACAO_DATA AS DATA,\
    E.TB_ENCAMINHAMENTO_DOACAO_HORA AS HORA\
    FROM TB_ENCAMINHAMENTO_DOACAO AS E\
    INNER JOIN TB_PET AS P\
    ON E.TB_PET_ID = P.TB_PET_ID\
    INNER JOIN TB_PROTETOR AS PR\
    ON P.TB_PROTETOR_ID = PR.TB_PROTETOR_ID",{model: Encaminhamento}).then((encaminhamentos)=>{
        var nencaminhamento = JSON.parse(JSON.stringify(encaminhamentos));
        res.render("admin/doacoes/encaminhamento", {
            encaminhamento: nencaminhamento
        });
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
        res.redirect("/encaminhamento");
    }).catch((erro)=>{
        console.log(erro);
        res.send("Houve um erro " + erro);
    })
});

router.get('/doador', (req, res)=>{
    const token = req.cookies.token
    const decode = jwt.verify(token, config.TOKEN_KEY);
    Doacao.findAll({ 
        where: {'tb_doador_id': decode.user_id}
    }).then((doacoes)=>{
        var ndoacao = JSON.parse(JSON.stringify(doacoes));
        res.render("admin/doacoes/doador", {
            doacoes: ndoacao
        });
    })
})

module.exports = router;