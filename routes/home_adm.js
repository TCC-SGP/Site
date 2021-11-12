const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//ROTA DE HOME-ADMIN
router.get('/Home_Administracao', auth, (req, res) => {
    res.render("admin/home_adm/home_adm");
});

module.exports = router;
