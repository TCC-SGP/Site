const express = require('express');
const router = express.Router();

//ROTA DE DOACAO
router.get('/doacao', (req, res) =>{
    res.render("admin/doacoes/doacao");
});

module.exports = router;