const Cargo = require('./Cargo');
const db = require('./db');

//REPRODUZINDO A TABELA TELEFONE
const Telefone = db.sequelize.define('TB_TELEFONE', {
    tb_telefone_id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_telefone_numero:{
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_telefone_tipo:{
        type: db.Sequelize.TEXT,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = Telefone;