const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) =>{
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
    },
    limits:{
        fileSize: 300 * 300
    }

});

const upload = multer({storage: storage});

const Postagem = require('../models/Postagem');
const Pet = require('../models/Pet');
const Protetor = require('../models/Protetor');

//Rota para mostrar todos os pets para adoção
router.get('/adocao', (req, res)=>{
    Postagem.findAll({
        where: {tb_tipopostagem_id: 3}
    }).then((postagens) => {
        postagens = postagens.map((postagen)=>{
            return postagen.toJSON();
        });
        res.render("admin/postagens/adocao",{postagens: postagens});
    });
});

var mensagem = '*Todos os dados são obrigatórios';

//Rota para o formulário de adoção
router.get('/form_adocao/:id_pet&:id_postagem&:id_protetor', (req, res) => {
    Pet.findAll({
        where: {'tb_pet_id': req.params.id_pet}
    }).then((pet) => {
        Postagem.findAll({ 
            where: {'tb_postagem_id': req.params.id_postagem}
        }).then((postagens) => {
           Protetor.findAll({
            where: {'tb_protetor_id': req.params.id_protetor}
           }).then((protetors) =>{
            var petsin = JSON.parse(JSON.stringify(pet));
            var postagenzin = JSON.parse(JSON.stringify(postagens));
            var protetorzin = JSON.parse(JSON.stringify(protetors));
            res.render("admin/postagens/formu_adocao", {
                pet: petsin,
                postagem: postagenzin,
                protetor:protetorzin,
                m: mensagem

            })
           })

        })
        
    })
})


//Rota para o envio do requerimento para adoção
router.post('/req_adocao', (req, res) => {

    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var email = req.body.email; 
    var numero = req.body.numero;
    var cep = req.body.cep;
    var numero_casa = req.body.numero_casa;
    var qtd_pets = req.body.qtd_pets;
    var qtd_pessoas = req.body.pessoas;
    var mensagem = req.body.mensagem;
    
   
    var protetor = req.body.protetor;
    var pet = req.body.pet;
    var postagem = req.body.postagem;
    var nome_pet = req.body.nome_pet;
    var nome_protetor = req.body.nome_protetor;
    var sobrenome_protetor = req.body.sobrenome_protetor;

    if(nome === "" || nome === undefined || email === "" || email === undefined || cpf === "" || cpf === undefined || numero === "" || numero === undefined || cep === "" || cep === undefined || numero_casa === "" || numero_casa === undefined ||qtd_pets === "" || qtd_pets === undefined || qtd_pessoas === "" || qtd_pessoas === undefined || mensagem === "" || mensagem === "undefined")
    {
        mensagem = "Preencha TODOS os dados, por favor";
        res.redirect('/form_adocao/' + pet + '&' + postagem +'&' + protetor )
    }
    else
    {
    var conteudo = "Requerimento para adoção do Pet " + nome_pet + " cujo protetor responsável é (o)a " + nome_protetor + ' ' + sobrenome_protetor +
                   "\n----------------------------------" +
                   "\nDados do requerente" +
                   "\n----------------------------------" + 
                   "\nNome:" + nome + 
                   "\nCPF: " + cpf + 
                   "\nQuantidade de pessoas na residência: " + qtd_pessoas + 
                   "\nQuantidade de pets na residência: " + qtd_pets + 
                   "\nEmail: " + email + 
                   "\nNúmero: " +numero +
                   "\nCEP: " +cep +
                   "\nNúmero da Casa: " + numero_casa +
                   "\n\nMotivo para adotar: " + mensagem;

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
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("<script>alert('Requerimento Realizado');window.location = '/adocao'</script>")
        }
      });
      

    }
    
    
})

module.exports = router;
