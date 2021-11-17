const expres = require('express');
const auth = require('../middleware/auth');
const router = expres.Router();

//CARREGANDO MODELS
const Administrador = require('../models/Administrador');

//ROTA DE USUARIO
router.get('/admuser', auth, (req,res)=>{
    Administrador.findAll().then((administrador)=>{
        var nadministrador = JSON.parse(JSON.stringify(administrador));
        res.render("admin/adm/adm", {
            administrador: nadministrador
        });
    })
});

//ROTA PARA CARREGAR A PÁGINA PARA ADICIONAR ADMINISTRADOR
router.get('/addadm', auth, (req, res)=>{
    res.render('admin/adm/addadm');
});

//ROTA PARA CADASTRAR ADMINISTRADOR
router.post('/cadadm', auth, (req, res)=>{
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
});

module.exports = router;