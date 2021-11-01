if(process.env.NODE_ENV == "production"){
    const Sequelize = require('sequelize');

    //CONEXÃO COM BANCO EM NUVEM
    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'hostname',
        port: '3306',
        dialect: 'mysql'
    });

    //EXPORTANDO VARIÁVEIS DE CONEXÃO
    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }
}
else{
    const Sequelize = require('sequelize');

    //CONEXÃO COM BANCO LOCAL
    const sequelize = new Sequelize('bd_sgp', 'root', 'senha', {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql'
    });

    //EXPORTANDO VARIÁVEIS DE CONEXÃO
    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }
}
