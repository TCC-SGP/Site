const expres = require('express');
const router = expres.Router();

//ROTA DE DOACAO
router.get('/doacao', (req, res) =>{
    res.render("admin/doacoes/doacao");
});

module.exports = router;