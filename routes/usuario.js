const expres = require('express');
const router = expres.Router();

//ROTA DE USUARIO
router.get('/usuario', (req,res)=>{
    res.render("admin/usuario/usuario");
});

module.exports = router;