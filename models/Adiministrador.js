const db = require('./db');

//REPRODUZINDO A TABELA ADIMINISTRADOR
const Adiministrador = db.sequelize.define('TB_ADIMINISTRADOR', {
    tb_adiministrador_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_adiministrador_nome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_adiministrador_sobrenome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_adiministrador_email: {
        type: db.Sequelize.TEXT,
        allowNull: false 
    },
    tb_adiministrador_usuario: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_adiministrador_senha: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = Adiministrador;