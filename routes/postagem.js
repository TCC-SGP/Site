const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
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
const Administrador = require('../models/Administrador');
const Pet = require('../models/Pet');
const Protetor = require('../models/Protetor');

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
        Administrador.findAll().then((administrador)=>{
            Pet.findAll().then((pet)=>{
              Protetor.findAll().then((protetores)=>{
                var nprotetor = JSON.parse(JSON.stringify(protetores));
                var ntipopostagem = JSON.parse(JSON.stringify(tipopstagem));
                var nadministrador = JSON.parse(JSON.stringify(administrador));
                var npet = JSON.parse(JSON.stringify(pet));
                res.render("admin/postagens/addpostagem", { 
                    tPostagem: ntipopostagem,
                    administrador: nadministrador,
                    pet: npet,
                    protetor: nprotetor
                 });
              });  
            });
        });
    });
})

//ROTA DO BOTÃO ADICIONAR POSTAGENS
router.post('/cadpostagem', upload.single('img'), (req, res, next)=>{
    var path = req.file;
    if(path == null || path == undefined || path == ""){
        Postagem.create({
            tb_tipopostagem_id: req.body.tipoPostagem,
            tb_administrador_id: req.body.administrador,
            tb_pet_id: req.body.pet,
            tb_protetor_id: req.body.protetor,
            tb_postagem_titulo: req.body.titulo,
            tb_postagem_conteudo: req.body.conteudo,
            tb_postagem_img: "..\\public\\img\\Logo.png"
        }).then(()=>{
            res.redirect("/postagem");
        }).catch((erro)=>{
            res.send("Houve um erro " + erro);
        });
    }
    else
    {
        Postagem.create({
            tb_tipopostagem_id: req.body.tipoPostagem,
            tb_administrador_id: req.body.administrador,
            tb_pet_id: req.body.pet,
            tb_protetor_id: req.body.protetor,
            tb_postagem_titulo: req.body.titulo,
            tb_postagem_conteudo: req.body.conteudo,
            tb_postagem_img: "..\\" + req.file.path
        }).then(()=>{
            res.redirect("/postagem");
        }).catch((erro)=>{
            res.send("Houve um erro " + erro);
        });
    }
});

//ROTA PARA ABRIR E PREENCHER PÁGINA DE EDIÇÃO DE POSTAGEM
router.get('/editarpostagem/:id', (req, res)=>{
    Postagem.findAll({ where: {'tb_postagem_id': req.params.id }}).then((postagens)=>{
        Tipopostagem.findAll().then((tipoPostagens)=>{
            Administrador.findAll().then((administradores)=>{
                Pet.findAll().then((pets)=>{
                    Protetor.findAll().then((protetor)=>{
                        var nprotetor = JSON.parse(JSON.stringify(protetor));
                        var npostagens = JSON.parse(JSON.stringify(postagens));
                        var ntipopostagens = JSON.parse(JSON.stringify(tipoPostagens));
                        var nadministradores = JSON.parse(JSON.stringify(administradores));
                        var npets = JSON.parse(JSON.stringify(pets));
                        
                        res.render("admin/postagens/editpostagem", {
                            postagem: npostagens,
                            tipoPostagem: ntipopostagens,
                            administrador: nadministradores,
                            pet: npets,
                            protetor: nprotetor
                        });
                    })
                })
            })
        })
    })
});

//ROTA DO BOTÃO DE EDITAR POSTAGEM
router.post('/editpostagem', (req, res)=>{
    Postagem.update({
        tb_tipopostagem_id: req.body.tipoPostagem,
        tb_administrador_id: req.body.administrador,
        tb_pet_id: req.body.pet,
        tb_protetor_id: req.body.protetor,
        tb_postagem_titulo: req.body.titulo,
        tb_postagem_conteudo: req.body.conteudo,
        tb_postagem_img: req.body.imagem
    },
    {
        where: {tb_postagem_id: req.body.id}
    }).then(()=>{
        res.redirect("/admpostagem");
    }).catch((erro)=>{
        res.send( "Ocorreu um erro" + erro);
    });
});


// ROTA DE ADMINISTRAÇÃO DE POSTAGEM
router.get('/admpostagem', (req, res)=>{
    Postagem.findAll().then((postagens) => {
        Tipopostagem.findAll().then((tipopostagem)=>{
            var ntipopostagem = JSON.parse(JSON.stringify(tipopostagem));
            var npostagem = JSON.parse(JSON.stringify(postagens));
            res.render("admin/postagens/admpostagem",{
                postagem: npostagem,
                tipoPostagem: ntipopostagem
            });

        })
    });
});

//ROTA DE PESQUISA DE ADIMINISTRAÇÃO DE POSTAGEM 
router.get('/admpostagem/:id', (req, res)=>{
    Postagem.findAll({where: {'tb_postagem_id': req.params.id}}).then((postagens)=>{
        Tipopostagem.findAll().then((tipopostagem)=>{
            var ntipopostagem = JSON.parse(JSON.stringify(tipopostagem));
            var npostagem = JSON.parse(JSON.stringify(postagens));
            res.render("admin/postagens/admpostagem", {
                postagem:npostagem,
                tipoPostagem:ntipopostagem
            })
        })
    })
});

//ROTA PARA EXCLUSÃO DE Postagem
router.get('/excluirpostagem/:id', (req, res)=>{
    Postagem.destroy({where: {'tb_postagem_id': req.params.id}}).then(()=>{
        res.redirect("/admpostagem");
    }).catch((err)=>{
        res.send(err);
    })
});

module.exports = router;