const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/authAdmin');
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
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = process.env;

//CARREGANDO OS MODELS
const Postagem = require('../models/Postagem');
const Tipopostagem = require('../models/TipoPostagem');
const Administrador = require('../models/Administrador');
const Pet = require('../models/Pet');
const Protetor = require('../models/Protetor');
const { route } = require('./admin');

var login = true;

//ROTA DE POSTAGENS
router.get('/postagem', (req, res)=>{
    Postagem.findAll().then((postagens) => {
        postagens = postagens.map((postagen)=>{
            return postagen.toJSON();
        });
        res.render("admin/postagens/postagem", { postagens: postagens} );
    });
});

//ROTA PARA ADICIONAR O PROTETOR CUJO QUAL É DONO DO PET RELACIONADO A POSTAGEM
router.get('/getProtetor', auth, (req, res)=>{
    Protetor.findAll().then((protetor)=>{
        var nprotetor = JSON.parse(JSON.stringify(protetor));

        res.render("admin/postagens/getProtetor", {login:login, protetor: nprotetor});
    })
});

//ROTA DE CARREGAR A PÁGINA PARA ADC POSTAGENS
router.get('/addpostagem/:id', auth, (req, res)=>{
    const token = req.cookies.token;
    var decode = jwt.verify(token, config.TOKEN_KEY);
    var id_protetor = req.params.id;

    Tipopostagem.findAll().then((tipopstagem)=>{
        Administrador.findAll({where:{'tb_administrador_id': decode.user_id}}).then((administrador)=>{
            Pet.findAll({where:{'tb_protetor_id': id_protetor}}).then((pet)=>{
                var ntipopostagem = JSON.parse(JSON.stringify(tipopstagem));
                var nadministrador = JSON.parse(JSON.stringify(administrador));
                var npet = JSON.parse(JSON.stringify(pet));
                res.render("admin/postagens/addpostagem", { 
                    tPostagem: ntipopostagem,
                    administrador: nadministrador,
                    pet: npet,
                    protetor: id_protetor,
                    login:login
                });
            });
        });
    });
})


//ROTA DO BOTÃO ADICIONAR POSTAGENS
router.post('/cadpostagem', auth, upload.single('img'), (req, res, next)=>{
    var path = req.file;
    console.log(req.body.protetor);
    if(path == null || path == undefined || path == "" || !req.body.titulo || !req.body.conteudo){
        res.send("TODOS OS CAMPOS SÃO OBRIGATÓRIOS <a href='/addpostagem'>Voltar</a>");
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
            res.redirect("/admpostagem");
        }).catch((erro)=>{
            res.send("Houve um erro " + erro);
        });
    }
});

//ROTA PARA ABRIR E PREENCHER PÁGINA DE EDIÇÃO DE POSTAGEM
router.get('/editarpostagem/:id', auth, (req, res)=>{
    const token = req.cookies.token;
    var decode = jwt.verify(token, config.TOKEN_KEY);

    if(decode.user_id == 1){
        Postagem.findAll({ where: {'tb_postagem_id': req.params.id }}).then((postagens)=>{
            var npostagens = JSON.parse(JSON.stringify(postagens));
            Tipopostagem.findAll({where: {'tb_tipopostagem_id': npostagens[0].tb_tipopostagem_id}}).then((tipoPostagens)=>{
                Administrador.findAll().then((administradores)=>{
                    Pet.findAll({where: {'tb_pet_id': npostagens[0].tb_pet_id}}).then((pets)=>{
                        Protetor.findAll({where: {'tb_protetor_id': npostagens[0].tb_protetor_id}}).then((protetor)=>{
                            var nprotetor = JSON.parse(JSON.stringify(protetor));
                            var ntipopostagens = JSON.parse(JSON.stringify(tipoPostagens));
                            var nadministradores = JSON.parse(JSON.stringify(administradores));
                            var npets = JSON.parse(JSON.stringify(pets));
                            
                            res.render("admin/postagens/editpostagem", {
                                postagem: npostagens,
                                tipoPostagem: ntipopostagens,
                                administrador: nadministradores,
                                pet: npets,
                                protetor: nprotetor,
                                login:login
                            });
                        })
                    })
                })
            })
        })
    }
    else{
        Postagem.findAll({ where: {'tb_postagem_id': req.params.id }}).then((postagens)=>{
            var npostagem = JSON.parse(JSON.stringify(postagens));
            Tipopostagem.findAll({where: {'tb_tipopostagem_id': npostagem[0].tb_tipopostagem_id}}).then((tipoPostagens)=>{
                Administrador.findAll({where:{'tb_administrador_id': decode.user_id}}).then((administradores)=>{
                    Pet.findAll({where: {'tb_pet_id': npostagem[0].tb_pet_id}}).then((pets)=>{
                        Protetor.findAll({where:{'tb_protetor_id':npostagem[0].tb_protetor_id}}).then((protetor)=>{
                            var nprotetor = JSON.parse(JSON.stringify(protetor));
                            var ntipopostagens = JSON.parse(JSON.stringify(tipoPostagens));
                            var nadministradores = JSON.parse(JSON.stringify(administradores));
                            var npets = JSON.parse(JSON.stringify(pets));
                            
                            res.render("admin/postagens/editpostagem", {
                                postagem: npostagem,
                                tipoPostagem: ntipopostagens,
                                administrador: nadministradores,
                                pet: npets,
                                protetor: nprotetor,
                                login:login
                            });
                        })
                    })
                })
            })
        })
    }
});

//ROTA DO BOTÃO DE EDITAR POSTAGEM
router.post('/editpostagem', auth, upload.single('img'), (req, res)=>{
    Postagem.findAll({where: {'tb_postagem_id': req.body.id}}).then((posts)=>{
        var npostagem = JSON.parse(JSON.stringify(posts));
        var file = req.file;

        if(!file){
            Postagem.update({
                tb_tipopostagem_id: req.body.tipoPostagem,
                tb_administrador_id: req.body.administrador,
                tb_pet_id: req.body.pet,
                tb_protetor_id: req.body.protetor,
                tb_postagem_titulo: req.body.titulo,
                tb_postagem_conteudo: req.body.conteudo
            },
            {
                where: {tb_postagem_id: req.body.id}
            }).then(()=>{
                res.redirect("/admpostagem");
            }).catch((erro)=>{
                res.send( "Ocorreu um erro" + erro);
            });
        }
        else{
            const path  = "Site\\"+npostagem[0].tb_postagem_img;
            fs.unlink(path, err=>{
                if(err){
                    console.log(err);
                }
            });
            Postagem.update({
                tb_tipopostagem_id: req.body.tipoPostagem,
                tb_administrador_id: req.body.administrador,
                tb_pet_id: req.body.pet,
                tb_protetor_id: req.body.protetor,
                tb_postagem_titulo: req.body.titulo,
                tb_postagem_conteudo: req.body.conteudo,
                tb_postagem_img: "..\\"+req.file.path
            },
            {
                where: {tb_postagem_id: req.body.id}
            }).then(()=>{
                res.redirect("/admpostagem");
            }).catch((erro)=>{
                res.send( "Ocorreu um erro" + erro);
            });
        }
    }).catch(err=>{
        res.render("Ocorreu um erro " + err, {login:login});
    })
});


// ROTA DE ADMINISTRAÇÃO DE POSTAGEM
router.get('/admpostagem', auth, (req, res)=>{
    const token = req.cookies.token;
    const decode = jwt.verify(token, config.TOKEN_KEY);
    if(decode.user_id == 1)
    {
        Postagem.sequelize.query("SELECT P.TB_POSTAGEM_ID AS ID,\
        A.TB_ADMINISTRADOR_NOME AS ADMINISTRADOR,\
        POST.TB_TIPOPOSTAGEM_TIPO AS TIPOPOSTAGEM,\
        PET.TB_PET_NOME AS PET,\
        PR.TB_PROTETOR_NOME AS PROTETOR,\
        P.TB_POSTAGEM_TITULO AS TITULO,\
        P.TB_POSTAGEM_CONTEUDO AS CONTEUDO,\
        P.TB_POSTAGEM_IMG AS IMG\
        FROM TB_POSTAGEM AS P\
        INNER JOIN TB_ADMINISTRADOR AS A\
        ON P.TB_ADMINISTRADOR_ID = A.TB_ADMINISTRADOR_ID\
        INNER JOIN TB_TIPOPOSTAGEM AS POST\
        ON P.TB_TIPOPOSTAGEM_ID = POST.TB_TIPOPOSTAGEM_ID\
        INNER JOIN TB_PET AS PET\
        ON P.TB_PET_ID = PET.TB_PET_ID\
        INNER JOIN TB_PROTETOR AS PR\
        ON P.TB_PROTETOR_ID = PR.TB_PROTETOR_ID\
        ORDER BY ID;",{
            model:Postagem
        }).then((postagens) => {
            Tipopostagem.findAll().then((tipopostagem)=>{
                var ntipopostagem = JSON.parse(JSON.stringify(tipopostagem));
                var npostagem = JSON.parse(JSON.stringify(postagens));
                res.render("admin/postagens/admpostagem",{
                    postagem: npostagem,
                    tipoPostagem: ntipopostagem,
                    login:login
                });
    
            })
        });
    }
    else{
        Postagem.sequelize.query("SELECT P.TB_POSTAGEM_ID AS ID,\
        A.TB_ADMINISTRADOR_NOME AS ADMINISTRADOR,\
        POST.TB_TIPOPOSTAGEM_TIPO AS TIPOPOSTAGEM,\
        PET.TB_PET_NOME AS PET,\
        PR.TB_PROTETOR_NOME AS PROTETOR,\
        P.TB_POSTAGEM_TITULO AS TITULO,\
        P.TB_POSTAGEM_CONTEUDO AS CONTEUDO,\
        P.TB_POSTAGEM_IMG AS IMG\
        FROM TB_POSTAGEM AS P\
        INNER JOIN TB_ADMINISTRADOR AS A\
        ON P.TB_ADMINISTRADOR_ID = A.TB_ADMINISTRADOR_ID\
        INNER JOIN TB_TIPOPOSTAGEM AS POST\
        ON P.TB_TIPOPOSTAGEM_ID = POST.TB_TIPOPOSTAGEM_ID\
        INNER JOIN TB_PET AS PET\
        ON P.TB_PET_ID = PET.TB_PET_ID\
        INNER JOIN TB_PROTETOR AS PR\
        ON P.TB_PROTETOR_ID = PR.TB_PROTETOR_ID\
        WHERE P.TB_ADMINISTRADOR_ID = "+ decode.user_id + " ORDER BY ID",{
            model: Postagem
        }).then((postagens) => {
            Tipopostagem.findAll().then((tipopostagem)=>{
                var ntipopostagem = JSON.parse(JSON.stringify(tipopostagem));
                var npostagem = JSON.parse(JSON.stringify(postagens));
                res.render("admin/postagens/admpostagem",{
                    postagem: npostagem,
                    tipoPostagem: ntipopostagem,
                    login:login
                });
    
            })
        });
    }
});

//ROTA DE PESQUISA DE ADIMINISTRAÇÃO DE POSTAGEM 
router.get('/admpostagem/:id', auth, (req, res)=>{
    const token = req.cookies.token;
    const decode = jwt.verify(token, config.TOKEN_KEY);

    if(decode.user_id == 1){
        Postagem.sequelize.query("SELECT P.TB_POSTAGEM_ID AS ID,\
        A.TB_ADMINISTRADOR_NOME AS ADMINISTRADOR,\
        POST.TB_TIPOPOSTAGEM_TIPO AS TIPOPOSTAGEM,\
        PET.TB_PET_NOME AS PET,\
        PR.TB_PROTETOR_NOME AS PROTETOR,\
        P.TB_POSTAGEM_TITULO AS TITULO,\
        P.TB_POSTAGEM_CONTEUDO AS CONTEUDO,\
        P.TB_POSTAGEM_IMG AS IMG\
        FROM TB_POSTAGEM AS P\
        INNER JOIN TB_ADMINISTRADOR AS A\
        ON P.TB_ADMINISTRADOR_ID = A.TB_ADMINISTRADOR_ID\
        INNER JOIN TB_TIPOPOSTAGEM AS POST\
        ON P.TB_TIPOPOSTAGEM_ID = POST.TB_TIPOPOSTAGEM_ID\
        INNER JOIN TB_PET AS PET\
        ON P.TB_PET_ID = PET.TB_PET_ID\
        INNER JOIN TB_PROTETOR AS PR\
        ON P.TB_PROTETOR_ID = PR.TB_PROTETOR_ID\
        WHERE POST.TB_TIPOPOSTAGEM_ID = " + req.params.id + " ORDER BY ID",{
            model: Postagem
        }).then((postagens)=>{
            Tipopostagem.findAll().then((tipopostagem)=>{
                var ntipopostagem = JSON.parse(JSON.stringify(tipopostagem));
                var npostagem = JSON.parse(JSON.stringify(postagens));
                res.render("admin/postagens/admpostagem", {
                    postagem:npostagem,
                    tipoPostagem:ntipopostagem,
                    login:login
                })
            })
        })
    }
    else{
        Postagem.sequelize.query("SELECT P.TB_POSTAGEM_ID AS ID,\
        A.TB_ADMINISTRADOR_NOME AS ADMINISTRADOR,\
        POST.TB_TIPOPOSTAGEM_TIPO AS TIPOPOSTAGEM,\
        PET.TB_PET_NOME AS PET,\
        PR.TB_PROTETOR_NOME AS PROTETOR,\
        P.TB_POSTAGEM_TITULO AS TITULO,\
        P.TB_POSTAGEM_CONTEUDO AS CONTEUDO,\
        P.TB_POSTAGEM_IMG AS IMG\
        FROM TB_POSTAGEM AS P\
        INNER JOIN TB_ADMINISTRADOR AS A\
        ON P.TB_ADMINISTRADOR_ID = A.TB_ADMINISTRADOR_ID\
        INNER JOIN TB_TIPOPOSTAGEM AS POST\
        ON P.TB_TIPOPOSTAGEM_ID = POST.TB_TIPOPOSTAGEM_ID\
        INNER JOIN TB_PET AS PET\
        ON P.TB_PET_ID = PET.TB_PET_ID\
        INNER JOIN TB_PROTETOR AS PR\
        ON P.TB_PROTETOR_ID = PR.TB_PROTETOR_ID\
        WHERE P.TB_ADMINISTRADOR_ID = "+ decode.user_id + 
        " AND POST.TB_TIPOPOSTAGEM_ID = "+ req.params.id
        +" ORDER BY ID",{
            model: Postagem
        }).then((postagens)=>{
            Tipopostagem.findAll().then((tipopostagem)=>{
                var ntipopostagem = JSON.parse(JSON.stringify(tipopostagem));
                var npostagem = JSON.parse(JSON.stringify(postagens));
                res.render("admin/postagens/admpostagem", {
                    postagem:npostagem,
                    tipoPostagem:ntipopostagem,
                    login:login
                })
            })
        })
    }
});

//ROTA PARA EXCLUSÃO DE Postagem
router.get('/excluirpostagem/:id', auth, (req, res)=>{
    Postagem.findAll({ where: {'tb_postagem_id': req.params.id}}).then((postagens)=>{
        var npostagem = JSON.parse(JSON.stringify(postagens));
        const path  = "Site\\"+npostagem[0].tb_postagem_img;
        fs.unlink(path, err=>{
            if(err){
                console.log(err);
            }
        });
        Postagem.destroy({where: {'tb_postagem_id': req.params.id}}).then(()=>{
            res.redirect('/admpostagem');
        }).catch(err=>{
            res.send("Ocorreu um erro "+err);
        })
    })
});

module.exports = router;