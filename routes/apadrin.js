const express = require('express');
const router = express.Router();
const multer = require('multer');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
    },
    limits: {
        fileSize: 300 * 300
    }

});

const upload = multer({ storage: storage });

const Postagem = require('../models/Postagem');
const Pet = require('../models/Pet');
const Protetor = require('../models/Protetor');
const Doacao = require('../models/Doacao');
const Doador = require('../models/Doador')
const Encaminhamento = require('../models/Encaminhamento')
const { route } = require('./doacao');

//Rota para mostrar todos os pets para apadrinhamento
router.get('/apadrinhamento', (req, res) => {
    Postagem.findAll({
        where: { tb_tipopostagem_id: 2 }
    }).then((postagens) => {
        postagens = postagens.map((postagen) => {
            return postagen.toJSON();
        });
        res.render("admin/postagens/apadrinhamento", { postagens: postagens });
    });
});


//Rota para o formulário de apadrinhamento
router.get('/form_apadrinhamento/:id_pet&:id_postagem&:id_protetor', (req, res) => {
    Pet.findAll({
        where: { 'tb_pet_id': req.params.id_pet }
    }).then((pet) => {
        Postagem.findAll({
            where: { 'tb_postagem_id': req.params.id_postagem }
        }).then((postagens) => {
            Protetor.findAll({
                where: { 'tb_protetor_id': req.params.id_protetor }
            }).then((protetors) => {
                var petsin = JSON.parse(JSON.stringify(pet));
                var postagenzin = JSON.parse(JSON.stringify(postagens));
                var protetorzin = JSON.parse(JSON.stringify(protetors));
                res.render("admin/postagens/formu_apadrinhamento", {
                    pet: petsin,
                    postagem: postagenzin,
                    protetor: protetorzin,

                })
            })

        })

    })
})

//Rota para apadrinhar 
router.post('/apadrinhar', (req, res) => {
    var caminho = req.body.cadastro;
    var pet = req.body.pet;
    if (caminho === "sim") {
        res.render("admin/doacoes/apadrinhamento1", {
            pet: pet,
            sim: true
        })

    }
    else if (caminho === "nao") {
        res.render("admin/doacoes/apadrinhamento1", {
            pet: pet,
            nao: true
        })

    }
    else {
        res.render("admin/doacoes/apadrinhamento1", {
            pet: pet,
            ja: true
        })
    }

})

//Caso queira se cadastrar 
router.post('/sim', (req, res) => {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var senha = req.body.senha;
    var numero = req.body.numero;
    var usuario = req.body.usuario;
    var cadastro = req.body.cadastro;
    var pet = req.body.pet;


    if (cadastro === "juridica") {
        var pessoa = 1;
    }
    else {
        var pessoa = 2;
    }


    Doador.create({
        tb_doador_nome: nome,
        tb_doador_sobrenome: sobrenome,
        tb_doador_email: email,
        tb_doador_senha: senha,
        tb_doador_contato: numero,
        tb_doador_usuario: usuario,
        tb_tipodoador_id: pessoa


    }).then((doador) => {
        var daodorzin = JSON.parse(JSON.stringify(doador))
        Doacao.create({
            tb_doador_id: daodorzin.tb_doador_id,
            tb_tipodoacao_id: 3,
            tb_doacao_descricao: 'Apadrinhamento',
            tb_doacao_nomedoador: nome,
            tb_doacao_quantia: 50.00,
            tb_doacao_estado: 'ANALISE'
        }).then((doacao) => {
            var doacaozin = JSON.parse(JSON.stringify(doacao));
            Encaminhamento.create({
                tb_pet_id: pet,
                tb_doacao_id: doacaozin.tb_doacao_id,
                tb_encaminhamento_doacao_data: Sequelize.literal('CURRENT_TIMESTAMP'),
                tb_encaminhamento_doacao_hora: Sequelize.literal('CURRENT_TIMESTAMP'),
                createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
                updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
            }).then(() => {
                res.redirect("https://pag.ae/7XMQ5LUHS");
            }).catch((erro) => {
                res.send("algum erro " + erro)
            })

        }).catch((erro) => {
            res.send("algum erro " + erro)
        })

    }).catch((erro) => {
        res.send("algum erro " + erro)
    })


})

router.post('/nao', (req, res) => {
    var nome = req.body.nome;
    var pet = req.body.pet;

    Doacao.create({
        tb_tipodoacao_id: 3,
        tb_doacao_descricao: "Apadrinhamento",
        tb_doacao_nomedoador: nome,
        tb_doacao_quantia: 50.00,
        tb_doacao_estado: 'ANALISE'
    }).then((doacao) => {
        var doacaozin = JSON.parse(JSON.stringify(doacao));
        Encaminhamento.create({
            tb_pet_id: pet,
            tb_doacao_id: doacaozin.tb_doacao_id,
            tb_encaminhamento_doacao_data: Sequelize.literal('CURRENT_TIMESTAMP'),
            tb_encaminhamento_doacao_hora: Sequelize.literal('CURRENT_TIMESTAMP'),
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
        }).then(() => {
            res.redirect("https://pag.ae/7XMQ5LUHS");
        }).catch((erro) => {
            res.send("algum erro " + erro)
        })

    }).catch((erro) => {
        res.send("algum erro " + erro)
    })

})

router.post('/ja', (req, res) => {
    var pet = req.body.pet;
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    Doador.findOne({
        where: {
            tb_doador_usuario: usuario,
            tb_doador_senha: senha
        }
    }).then((doador) => {
        try {
            var ndoador = JSON.parse(JSON.stringify(doador));
            let iddoador = ndoador.tb_doador_id;
            var nome = ndoador.tb_doador_nome;

            if (doador) {
                const token = jwt.sign({ user_id: iddoador },
                    "" + process.env.TOKEN_KEY2,
                    {
                        expiresIn: "2h",
                    }
                );

                Doador.token = token;
                res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                console.log("JWT token está nos cookies");
                console.log(token);

                Doacao.create({
                    tb_doador_id: iddoador,
                    tb_tipodoacao_id: 3,
                    tb_doacao_descricao: 'Apadrinhamento',
                    tb_doacao_nomedoador: nome,
                    tb_doacao_quantia: 50.00,
                    tb_doacao_estado: 'ANALISE'
                }).then((doacao) => {
                    var doacaozin = JSON.parse(JSON.stringify(doacao));
                    Encaminhamento.create({
                        tb_pet_id: pet,
                        tb_doacao_id: doacaozin.tb_doacao_id,
                        tb_encaminhamento_doacao_data: Sequelize.literal('CURRENT_TIMESTAMP'),
                        tb_encaminhamento_doacao_hora: Sequelize.literal('CURRENT_TIMESTAMP'),
                        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
                        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
                    }).then(() => {
                        res.redirect("https://pag.ae/7XMQ5LUHS");
                    }).catch((erro) => {
                        res.send("algum erro " + erro)
                    })
    
                }).catch((erro) => {
                    res.send("algum erro " + erro)
                })
            }
        }
        catch (err) {
            console.log(err)
            res.render("admin/doacoes/apadrinhamento1", {
                pet: pet,
                ja: true,
                errorMessage: "Doador não encontrado" });
        }
    })
})

module.exports = router;

