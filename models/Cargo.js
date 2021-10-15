const db = require('./db');

//REPRODUZINDO A TABELA CARGO
const Cargo = db.sequelize.define('TB_CARGO', {
    tb_cargo_id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_cargo_nome:{
        type: db.Sequelize.TEXT
    }
}, { freezeTableName: true });

module.exports = Cargo;