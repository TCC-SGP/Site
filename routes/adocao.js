const express = require('express');
const router = express.Router();
const multer = require('multer');
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

//Rota para mostrar todos os pets para apadrinhamento
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

module.exports = router;
