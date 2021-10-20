const db = require('./db');

//REPRODUZINDO A TABELA PROTETOR
const Protetor = db.sequelize.define('TB_PROTETOR', {
    tb_protetor_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_telefone_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_TELEFONE', key: 'TB_TELEFONE_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_cargo_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_CARGO', key: 'TB_CARGO_ID'  },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_protetor_nome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_protetor_sobrenome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_protetor_rua: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_protetor_numero: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_protetor_bairro: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_protetor_cidade: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_protetor_uf: {
        type: db.Sequelize.CHAR,
        allowNull: false
    },
    tb_protetor_datanasc: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    tb_protetor_usuario: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    tb_protetor_senha: {
        type: db.Sequelize.TEXT,
        allowNull: true
    }
}, { freezeTableName: true });

module.exports = Protetor;