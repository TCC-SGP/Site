const express = require('express');
const router = express.Router();

//ROTA LOGIN 
router.get('/login',(req, res) =>{
    res.render('admin/login/login');
});

module.exports = router;