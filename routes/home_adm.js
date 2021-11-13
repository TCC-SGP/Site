const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


//ROTA DE HOME-ADMIN
router.get('/home_adm', auth, (req, res) => {
    res.render("admin/home_adm/home_adm");
});

module.exports = router;
