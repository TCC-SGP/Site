const db = require('./db');

//REPRODUZINDO A TABELA DOACAO
const Doacao = db.sequelize.define('TB_DOACAO', {
    tb_doacao_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_doador_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_DOADOR', key: 'TB_DOADOR_ID' },
        allowNull: true,
        onDelete: 'CASCADE'
    },
    tb_tipodoacao_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_TIPODOACAO', key: 'TB_TIPODOACAO_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_doacao_descricao: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    tb_doacao_nomedoador: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    tb_doacao_quantia: {
        type: db.Sequelize.DECIMAL,
        allowNull: true
    },
    tb_doacao_estado: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = Doacao;