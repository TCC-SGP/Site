const express = require('express');
const router = express.Router();

//ROTA DE HOME-ADMIN
router.get('/Home_Administracao', (req, res) => {
    res.render("admin/home_adm/home_adm");
});

module.exports = router;
