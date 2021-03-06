const express = require('express');
const router = express.Router();
const auth = require('../middleware/authAdmin');
const jwt = require('jsonwebtoken');
var login = true;
//ROTA DE HOME-ADMIN
router.get('/home_adm', auth, (req, res) => {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    res.render("admin/home_adm/home_adm", {login:login, Usuario: decode.usuario});
});

//ROTA PARA FAZER LOG-OUT
router.get('/logout', (req, res)=>{
    res.clearCookie('token');
    res.redirect("/login");
});

module.exports = router;
