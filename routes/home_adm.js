const express = require('express');
const router = express.Router();
const auth = require('../middleware/authAdmin');
var login = true;
//ROTA DE HOME-ADMIN
router.get('/home_adm', auth, (req, res) => {
    res.render("admin/home_adm/home_adm", {login:login});
});

//ROTA PARA FAZER LOG-OUT
router.get('/logout', (req, res)=>{
    res.clearCookie('token');
    res.redirect("/login");
});

module.exports = router;
