const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
    },
    limits:{
        fileSize: 300 * 300
    }
});
const upload = multer({storage: storage});

//CARREGANDO OS MODELS
const Postagem = require('../models/Postagem');
const Tipopostagem = require('../models/TipoPostagem');
const Adiministrador = require('../models/Adiministrador');
const Pet = require('../models/Pet');

//ROTA DE POSTAGENS
router.get('/postagem', (req, res)=>{
    Postagem.findAll().then((postagens) => {
        postagens = postagens.map((postagen)=>{
            return postagen.toJSON();
        });
        res.render("admin/postagens/postagem", { postagens: postagens} );
    });
});

//ROTA DE CARREGAR A PÁGINA PARA ADC POSTAGENS
router.get('/addpostagem', (req, res)=>{
    Tipopostagem.findAll().then((tipopstagem)=>{
        Adiministrador.findAll().then((adiministrador)=>{
            Pet.findAll().then((pet)=>{
                var ntipopostagem = JSON.parse(JSON.stringify(tipopstagem));
                var nadiministrador = JSON.parse(JSON.stringify(adiministrador));
                var npet = JSON.parse(JSON.stringify(pet));
                res.render("admin/postagens/addpostagem", { 
                    tPostagem: ntipopostagem,
                    adiministrador: nadiministrador,
                    pet: npet
                 });
            });
        });
    });
})

//ROTA DO BOTÃO ADICIONAR POSTAGENS
router.post('/cadpostagem', upload.single('img'), (req, res, next)=>{
    Postagem.create({
        tb_tipopostagem_id: req.body.tipoPostagem,
        tb_adiministrador_id: req.body.adiministrador,
        tb_pet_id: req.body.pet,
        tb_postagem_titulo: req.body.titulo,
        tb_postagem_conteudo: req.body.conteudo,
        tb_postagem_img: "..\\" + req.file.path
    }).then(()=>{
        res.redirect("/postagem");
    }).catch((erro)=>{
        res.send("Houve um erro " + erro);
    });
});

module.exports = router;