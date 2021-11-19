const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//CARREGANDO OS MODELSD
const Administrador = require('../models/Administrador');
const Doador = require('../models/Doador');

//ROTA LOGIN 
router.get('/login',(req, res) =>{
    res.render('admin/login/login');
});

//ROTA DE VALIDAÇÃO DO LOGIN
router.post('/loginauth',(req, res)=>{
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var identificador = req.body.identificador;
    console.log(identificador);

    if(identificador == 1){
        Administrador.findOne({
            where: {
                tb_administrador_usuario: usuario,
                tb_administrador_senha: senha   
            }
        }).then((administrador)=>{
            var nadministrador  = JSON.parse(JSON.stringify(administrador));
            let idadm = nadministrador.tb_administrador_id;
            if(administrador){
                const token = jwt.sign({ user_id: idadm},
                    ""+process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
    
                Administrador.token = token;    
                res.cookie("token", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
                console.log("JWT token está nos cookies");
                res.redirect("/home_adm");
                console.log(token);
            }
            else{
                res.send("<script>alert('Login não efetuado')</script>");
            }
        }).catch((erro=>{
            console.log(erro);
            res.render("admin/login/login", {errorMessage: "Usuário ou senha inválidos"});
        }))
    }
    else if (identificador == 2){
        Doador.findOne({
            where: {
                tb_doador_usuario: usuario,
                tb_doador_senha: senha
            }
        }).then((doador)=>{
            var ndoador = JSON.parse(JSON.stringify(doador));
            let iddoador = ndoador.tb_doador_id;

            if(doador){
                const token = jwt.sign({user_id: iddoador},
                    ""+process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );

                Doador.token = token;
                res.cookie("token", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
                console.log("JWT token está nos cookies");
                res.redirect("/doador");
                console.log(token);
            }
        })
    }
    else {
        res.render("admin/login/login", {errorMessage: "Por favor selecione o tipo de usuário!"});
    }

    
});

module.exports = router;