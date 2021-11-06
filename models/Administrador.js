const db = require('./db');

//REPRODUZINDO A TABELA ADIMINISTRADOR
const Administrador = db.sequelize.define('TB_ADMINISTRADOR', {
    tb_administrador_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_administrador_nome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_administrador_sobrenome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_administrador_email: {
        type: db.Sequelize.TEXT,
        allowNull: false 
    },
    tb_administrador_usuario: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_administrador_senha: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
}, { freezeTableName: true });

//Administrador.sync({force: true});

module.exports = Administrador;