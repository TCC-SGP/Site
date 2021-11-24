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

//Rota para o formulário de adoção
router.get('/form_adocao/:id_pet&:id_postagem', (req, res) => {
    Pet.findAll({
        attributes: ['tb_pet_nome', 'tb_protetor_id']    ,
        where: {'tb_pet_id': req.params.id_pet}
    }).then((pet) => {
        Postagem.findAll({ 
            attributes: ['tb_postagem_img'],
            where: {'tb_postagem_id': req.params.id_postagem}
        }).then((postagens) => {
           var petsin = JSON.parse(JSON.stringify(pet));
           var postagenzin = JSON.parse(JSON.stringify(postagens));
           res.render("admin/postagens/formu_adocao", {
               pets: petsin,
               postagem: postagenzin
               
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
    
   
    var protetor = req.body.protetor;
    var pet = req.body.pet;

    var conteudo = "Nome:" + nome + "\n CPF: " + cpf + "\n Quantidade de pessoas na residência: " + qtd_pessoas + "\n Quantidade de pets na residência: " + qtd_pets + "\n Email: " + email + "\n  Número: " +numero;

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
        subject: 'Solicitação de Adoção',
        text: conteudo
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);

        }
      });
    
})

module.exports = router;
