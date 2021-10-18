const express = require('express');
const router = express.Router();

//ROTA DE POSTAGENS
router.get('/postagem', (req, res)=>{
    res.render("admin/postagens/postagem");
});

module.exports = router;