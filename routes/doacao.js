const express = require('express');
const router = express.Router();
const auth = require('../middleware/authAdmin')
const authDoador = require('../middleware/authDoador')
const jwt = require('jsonwebtoken')
const config = process.env;
const PagSeguro = require('pagseguro-api')
const nodemailer = require('nodemailer');
const pag = new PagSeguro(true);
const Sequelize = require('sequelize');

//CARREGANDO OS MODELS
const Doacao = require('../models/Doacao');
const Encaminhamento = require('../models/Encaminhamento');
const Pet = require('../models/Pet');
const Tipodoacao = require('../models/TipoDoacao');
var login = true;

//ROTA DA PÁGINA DOE
router.get('/doe', (req, res) => {
    res.render("admin/doacoes/doe");
});

//ROTA DA PÁGINA DOAÇÕES
<<<<<<< HEAD
router.get('/doacoes', auth, (req, res) => {
    Doacao.findAll().then((doacoes) => {
        Tipodoacao.findAll().then((tipodoacao) => {
=======
router.get('/doacoes', auth, (req, res)=>{
    const token = req.cookies.token;
    const decode = jwt.verify(token, config.TOKEN_KEY);

    Doacao.findAll().then((doacoes)=>{
        Tipodoacao.findAll().then((tipodoacao)=>{
>>>>>>> 4e1d49dd1e8bd3252f09c6dbf54ef93ec67434bc
            var ntitpodoacao = JSON.parse(JSON.stringify(tipodoacao));
            var ndoacoes = JSON.parse(JSON.stringify(doacoes));
            console.log(ndoacoes)
            res.render("admin/doacoes/doacoes", {
<<<<<<< HEAD
                doacao: ndoacoes,
                tipoDoacao: ntitpodoacao,
                login: login
=======
            doacao: ndoacoes,
            tipoDoacao: ntitpodoacao,
            login:login,
            id: decode.user_id
>>>>>>> 4e1d49dd1e8bd3252f09c6dbf54ef93ec67434bc
            });
        })
    });
});

//ROTA DO BOTÃO PESQUISAR DOAÇÕES
<<<<<<< HEAD
router.get('/doacoes/:id', auth, (req, res) => {
    Doacao.findAll({ where: { 'tb_tipodoacao_id': req.params.id } }).then((doacoes) => {
        Tipodoacao.findAll().then((tipodoacao) => {
            var ntitpodoacao = JSON.parse(JSON.stringify(tipodoacao));
            var ndoacoes = JSON.parse(JSON.stringify(doacoes))
            res.render("admin/doacoes/doacoes", {
                doacao: ndoacoes,
                tipoDoacao: ntitpodoacao,
                login: login
=======
router.get('/doacoes/:id', auth, (req, res)=>{
    const token = req.cookies.token;
    const decode = jwt.verify(token, config.TOKEN_KEY);

    Doacao.findAll({ where: {'tb_tipodoacao_id': req.params.id} }).then((doacoes)=>{
        Tipodoacao.findAll().then((tipodoacao)=>{
            var ntitpodoacao = JSON.parse(JSON.stringify(tipodoacao));
            var ndoacoes = JSON.parse(JSON.stringify(doacoes))
            res.render("admin/doacoes/doacoes", {
            doacao: ndoacoes,
            tipoDoacao: ntitpodoacao,
            login:login,
            id: decode.user_id
>>>>>>> 4e1d49dd1e8bd3252f09c6dbf54ef93ec67434bc
            });
        })
    })
})

//ROTA DA PÁGINA DE ADICIONAR ENCAMINHAMENTO DE DOAÇÕES
router.get('/adcencaminhamento/:id', (req, res) => {
    Doacao.findAll({ where: { 'tb_doacao_id': req.params.id } }).then((doacoes) => {
        Pet.findAll().then((pets) => {
            var ndoacao = JSON.parse(JSON.stringify(doacoes));
            var npets = JSON.parse(JSON.stringify(pets));
            res.render("admin/doacoes/addencaminhamento", {
                doacao: ndoacao,
                pet: npets,
                login: login
            })
        })
    })
});

//ROTA PARA A PÁGINA DE ENCAMINHAMENTO
router.get('/encaminhamento', (req, res) => {
    Encaminhamento.sequelize.query("SELECT E.TB_ENCAMINHAMENTO_DOACAO_ID AS ID,\
    PR.TB_PROTETOR_NOME AS NOME_PROTETOR,\
    P.TB_PET_NOME AS NOME_PET,\
    E.TB_ENCAMINHAMENTO_DOACAO_DATA AS DATA,\
    E.TB_ENCAMINHAMENTO_DOACAO_HORA AS HORA\
    FROM TB_ENCAMINHAMENTO_DOACAO AS E\
    INNER JOIN TB_PET AS P\
    ON E.TB_PET_ID = P.TB_PET_ID\
    INNER JOIN TB_PROTETOR AS PR\
    ON P.TB_PROTETOR_ID = PR.TB_PROTETOR_ID", { model: Encaminhamento }).then((encaminhamentos) => {
        var nencaminhamento = JSON.parse(JSON.stringify(encaminhamentos));
        res.render("admin/doacoes/encaminhamento", {
            encaminhamento: nencaminhamento,
            login: login
        });
    })
});

//ROTA DO BOTÃO PARA ADICONAR UM ENCAMINHAMENTO
router.post('/addencaminhamento', (req, res) => {
    Encaminhamento.create({
        tb_doacao_id: req.body.doacaoId,
        tb_pet_id: req.body.petId,
        tb_encaminhamento_doacao_data: req.body.data,
        tb_encaminhamento_doacao_hora: req.body.hora
    }).then(() => {
        res.redirect("/encaminhamento");
    }).catch((erro) => {
        console.log(erro);
        res.send("Houve um erro " + erro);
    })
});

router.get('/doador', authDoador, (req, res) => {
    const token = req.cookies.token
    const decode = jwt.verify(token, config.TOKEN_KEY2);
    Doacao.findAll({
        where:
        {
            'tb_doador_id': decode.user_id,
            'tb_doacao_estado': "PAGO"
        }
    }).then((doacoes) => {
        var ndoacao = JSON.parse(JSON.stringify(doacoes));
        res.render("admin/doacoes/doador", {
            doacoes: ndoacao,
            login: login,
        });
    })
})


router.post('/continuar_apadrinhando', authDoador, (req, res) => {
    const token = req.cookies.token;
    const decode = jwt.verify(token, config.TOKEN_KEY2);
    var doacaos = req.body.doacao;
    Doacao.create({
        tb_doador_id: decode.user_id,
        tb_tipodoacao_id: 3,
        tb_doacao_descricao: 'Apadrinhamento Continuação',
        tb_doacao_nomedoador: "Você",
        tb_doacao_quantia: 50.00,
        tb_doacao_estado: 'ANALISE'
    }).then((doacao) => {
        var doacaozin = JSON.parse(JSON.stringify(doacao));
        Encaminhamento.findAll({
            where: { 'tb_doacao_id': doacaos }
        }).then((pet) => {
            
            var petsin = JSON.parse(JSON.stringify(pet));
            var id = petsin[0].tb_pet_id;
            Encaminhamento.create({
                tb_pet_id: id,
                tb_doacao_id: doacaozin.tb_doacao_id,
                tb_encaminhamento_doacao_data: Sequelize.literal('CURRENT_TIMESTAMP'),
                tb_encaminhamento_doacao_hora: Sequelize.literal('CURRENT_TIMESTAMP'),
                createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
                updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
            }).then(() => {
                res.redirect("https://pag.ae/7XMQ5LUHS");
            })



        })
    })
})

    //rota formulário doação pessoalmente
    router.get('/pessoalmente', (req, res) => {
        res.render("admin/doacoes/formu_pessoalmente");
    });





    //rota requerimento doação pessoalmente

    router.post("/req_doacao", (req, res) => {
        var nome = req.body.nome;
        var cpf = req.body.cpf;
        var email = req.body.email;
        var numero = req.body.numero;
        var cep = req.body.cep;
        var numero_casa = req.body.numero_casa;
        var mensagem = req.body.mensagem;


        var conteudo = "Requerimento para doação pessoalmente " +
            "\n----------------------------------" +
            "\nDados do requerente" +
            "\n----------------------------------" +
            "\nNome:" + nome +
            "\nCPF: " + cpf +
            "\nEmail: " + email +
            "\nNúmero: " + numero +
            "\nCEP: " + cep +
            "\nNúmero da Casa: " + numero_casa +
            "\n\nDoação: " + mensagem;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testetestedasilva65a@gmail.com',
                pass: 'testetesteteste'
            }
        });

        var mailOptions = {
            from: 'testetestedasilva65a@gmail.com',
            to: "paulobhj321@gmail.com",
            subject: 'Requerimento de Adoção',
            text: conteudo
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.send("<script>alert('Requerimento Realizado');window.location = '/doe'</script>")
            }
        });
    })

    router.get('/doe/:origem', (req, res) => {
        var origem = req.params.origem;
        if (origem === "racao") {
            var descricao = "Kit Ração";
            var valor = 30.00;
            var link = "https://pag.ae/7XMSMVHHR";
        }
        else if (origem === "vacinacao") {
            var descricao = "Kit Vacinação";
            var valor = 60.00
            var link = "https://pag.ae/7XMSNE-NJ";
        }
        else if (origem === "limpeza") {
            var descricao = "Kit Limpeza"
            var valor = 25.00
            var link = "https://pag.ae/7XMSP6t1a";
        }
        else if (origem === "qualquer") {
            var descricao = "Qualquer Quantia"
            var valor = 0.00
            var link = "https://pag.ae/7XJvDtPr3";
        }
        Doacao.create({
            tb_tipodoacao_id: 4,
            tb_doacao_descricao: descricao,
            tb_doacao_nomedoador: "Anônimo",
            tb_doacao_quantia: valor,
            tb_doacao_estado: 'Encaminhar Confirmar'
        }).then(() => {
            res.redirect(link);
        }).catch((erro) => {
            res.send("algum erro " + erro)
        })
    })

//ROTA PARA VALDIAR PAGAMENTO
router.get('/validarpagamento/:id&:estado', auth, (req, res)=>{
    Doacao.update({
        tb_doacao_estado: req.params.estado
    },{
        where: {tb_doacao_id: req.params.id}
    }).then(()=>{
        res.redirect("/doacoes");
    }).catch((err)=>{
        res.render(err);
    })
});

//ROTA PARA INVALIDAR PAGAMENTO
router.get('/invalidarpagamento/:id&:estado', auth, (req, res)=>{
    Doacao.update({
        tb_doacao_estado: req.params.estado
    },{
        where: {tb_doacao_id: req.params.id}
    }).then(()=>{
        res.redirect("/doacoes");
    }).catch((err)=>{
        res.render(err);
    })
});

//ROTA PARA EXCLUIR DOAÇÃO
router.get('/excluirdoacao/:id', auth, (req, res)=>{
    Doacao.destroy({where: {tb_doacao_id: req.params.id}}).then(()=>{
        res.redirect("/doacoes");
    }).catch((err)=>{
        res.send(err)
    })
});

    module.exports = router;