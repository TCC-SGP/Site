const express = require('express');
const router = express.Router();

//ROTAS CENTRAIS
router.get('/', (req, res) => {
    res.render("home");
});

module.exports = router;