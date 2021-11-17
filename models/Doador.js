const { findById } = require('./Administrador');
const db = require('./db');

//REPRODUZINDO A TABELA DOADOR
const Doador = db.sequelize.define('TB_DOADOR', {
    tb_doador_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_tipodoador_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_TIPODOADOR', key: 'TB_TIPODOADOR_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_doador_nome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_doador_sobrenome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_doador_email: {
        type: db.Sequelize.TEXT,
        allowNull:false
    },
    tb_doador_usuario: {
        type: db.Sequelize.TEXT,
        allowNull:false
    },
    tb_doador_senha: {
        type: db.Sequelize.TEXT,
        allowNull:false
    },
    tb_doador_contato: {
        type: db.Sequelize.TEXT,
        allowNull:false
    }
}, { freezeTableName: true });

module.exports = Doador;