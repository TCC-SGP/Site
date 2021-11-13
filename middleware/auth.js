const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.body.token || req.query.token || req.headers["access-token"];

    if(token == undefined){
        console.log("Token não está definido");
    }

    if(!token) {
        return res.status(403).send("Um token é requirido para autenticar!").redirect("/login");
    }
    try{
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    }
    catch(err) {
        return console.log(err);
        
        
    }
    return next();
};

module.exports = verifyToken;