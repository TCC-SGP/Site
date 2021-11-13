const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

//CARREGANDO OS MODELSD
const Administrador = require('../models/Administrador')

//ROTA LOGIN 
router.get('/login',(req, res) =>{
    res.render('admin/login/login');
});

//ROTA DE VALIDAÇÃO DO LOGIN
router.post('/loginauth',(req, res)=>{
    var usuario = req.body.usuario;
    var senha = req.body.senha;


    Administrador.findOne({
        where: {
            tb_administrador_usuario: usuario,
            tb_administrador_senha: senha   
        }
    }).then((administrador)=>{
        var nadministrador  = JSON.parse(JSON.stringify(administrador));
        let idadm = nadministrador.tb_administrador_id;
        console.log(idadm);
        if(administrador){
            const token = jwt.sign({ user_id: idadm},
                ""+process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            Administrador.token = token;    
            res.cookie("token", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
            console.log("JWT token está nos cookies")
            res.redirect("/home_adm");
            //return res.json({auth:true, token: token});
            console.log(token);
        }
        else{
            res.send("<script>alert('Login não efetuado')</script>");
        }
    }).catch((erro=>{
        console.log(erro);
        res.render("admin/login/login", {errorMessage: "Usuário ou senha inválidos"});
    }))
});

module.exports = router;