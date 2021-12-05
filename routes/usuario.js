const expres = require('express');
const auth = require('../middleware/authAdmin');
const router = expres.Router();
const jwt = require('jsonwebtoken')
const config = process.env;

//CARREGANDO MODELS
const Administrador = require('../models/Administrador');

var login = true;

//ROTA DE USUARIO
router.get('/admuser', auth, (req,res)=>{
    const token = req.cookies.token;
    const decode = jwt.verify(token, config.TOKEN_KEY);
    console.log(decode)
    if(decode.user_id == 1){
        Administrador.findAll().then((administrador)=>{
            var nadministrador = JSON.parse(JSON.stringify(administrador));
            res.render("admin/adm/adm", {
                administrador: nadministrador,
                login:login
            });
        })
    }
    else{
        Administrador.findAll({ where: {'tb_administrador_id': decode.user_id}}).then((administrador)=>{
            var nadministrador = JSON.parse(JSON.stringify(administrador));
            res.render("admin/adm/adm", {
                administrador: nadministrador,
                login:login
            });
        })
    }
});

//ROTA PARA CARREGAR A PÁGINA PARA ADICIONAR ADMINISTRADOR
router.get('/addadm', auth, (req, res)=>{
    res.render('admin/adm/addadm', {login:login});
});

//ROTA PARA CADASTRAR ADMINISTRADOR
router.post('/cadadm', auth, (req, res)=>{
    console.log(req.body.nome);
    Administrador.findAll({where: {'tb_administrador_usuario': req.body.usuario}}).then((adm)=>{
        nadm = JSON.parse(JSON.stringify(adm));

        if(!req.body.nome || !req.body.sobrenome || !req.body.email || !req.body.usuario || !req.body.senha){
            res.render('admin/adm/addadm', {login:login, errorMessage: "Todos os campos são obrigatórios"})
        }
        else if(req.body.usuario == nadm[0].tb_administrador_usuario){
            res.render('admin/adm/addadm', {login: login, errorMessage: "Esse usuário já existe"});
        }
        else{
            Administrador.create({
                tb_administrador_nome: req.body.nome,
                tb_administrador_sobrenome: req.body.sobrenome,
                tb_administrador_email: req.body.email,
                tb_administrador_usuario: req.body.usuario,
                tb_administrador_senha: req.body.senha
            }).then(()=>{
                res.redirect("/admuser");
            }).catch((erro)=>{
                res.send("Houve um erro "+ erro);
            })
        }
        
    })
});

//ROTA PARA CARREGAR A PÁGINA DE EDIÇÃO DE ADIMINISTRADOR
router.get('/editaradm/:id', auth, (req, res)=>{
    Administrador.findAll({
        where: {
            tb_administrador_id: req.params.id
        }
    }).then((adm)=>{
        var nadm = JSON.parse(JSON.stringify(adm));
        res.render("admin/adm/editadm",{
            administrador: nadm,
            login:login
        });
    })
});

//ROTA PARA ATUALIZAR ADMINISTRADOR
router.post('/editadm', auth, (req, res)=>{
    Administrador.update({
        tb_administrador_nome: req.body.nome,
        tb_administrador_sobrenome: req.body.sobrenome,
        tb_administrador_email: req.body.email,
        tb_administrador_usuario: req.body.usuario,
        tb_administrador_senha: req.body.senha
    },
    {
        where: {
            tb_administrador_id: req.body.id
        }
    }).then(()=>{
        res.redirect("/admuser");
    }).catch((erro)=>{
        res.render("Ocorreu um erro "+erro);
    })
});

//ROTA PARA DELETAR ADMINISTRADOR
router.get('/excluiradm/:id', auth, (req,res)=>{
    const token = req.cookies.token;
    const decode = jwt.verify(token, config.TOKEN_KEY);
    
    if(decode.user_id == 1){
        Administrador.destroy({where: {tb_administrador_id: req.params.id}}).then(()=>{
            res.redirect("/admuser");
        }).catch((err)=>{
            res.render("Ocorreu um erro "+ err, {login:login});
        })
    }
    else{
        res.render("admin/home_adm/home_adm", {errorMessage: "Você não tem permissão para essa ação", login:login});
    }
})

module.exports = router;