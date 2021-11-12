const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//CARREGANDO OS MODELSD
const Administrador = require('../models/Administrador')

//ROTA LOGIN 
router.get('/login',(req, res) =>{
    res.render('admin/login/login');
});

//ROTA DE VALIDAÇÃO DO LOGIN
router.post('/loginauth', (req, res)=>{
    var usuario = req.body.usuario;
    var senha = req.body.senha;


    Administrador.findOne({
        where: {
            tb_administrador_usuario: usuario,
            tb_administrador_senha: senha
        }
    }).then((administrador)=>{
        if(administrador){
            const token = jwt.sign(
                { user_id: usuario, senha},
                ""+process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
                );

            Administrador.token = token;    
            
            res.render("admin/home_adm/home_adm");
            console.log(token)
        }
        else{
            res.send("Login não efetuado");
        }
    }).catch((erro=>{
        res.send("Ocorreu um erro: "+ erro);
    }))
});

module.exports = router;