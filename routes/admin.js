const express = require('express');
const router = express.Router();

//CARREGANDO MODELS
const Postagem = require('../models/Postagem');

//ROTAS CENTRAIS
router.get('/', (req, res) => {
    Postagem.findAll({
        where: { tb_tipopostagem_id: 2 },
        order: [["createdAt", "DESC"]],
        limit: 3
    }).then((postagens_apad) => {
        Postagem.findAll({
            where: { tb_tipopostagem_id: 1 },
            order: [["createdAt", "DESC"]],
            limit: 3
        }).then((postagens_publi) => {
            Postagem.findAll({
                where: { tb_tipopostagem_id: 3 },
                order: [["createdAt", "DESC"]],
                limit: 3
            }).then((postagens_ado) => {
                var nadpadrinhamento = JSON.parse(JSON.stringify(postagens_apad));
                var npublicidade = JSON.parse(JSON.stringify(postagens_publi));
                var nadocao = JSON.parse(JSON.stringify(postagens_ado));
                res.render("home", {
                    apadrinhamento: nadpadrinhamento,
                    adocao: nadocao,
                    publicidade: npublicidade

                });
            })
        })
    });
});



module.exports = router