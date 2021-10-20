const db = require('./db');

//REPRODUZINDO A TABELA ENCAMINHAMENTO DE DOAÇÕES
const Encaminhamento = db.sequelize.define('TB_ENCAMINHAMENTO_DOACAO', {
    tb_encaminhamento_doacao_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_pet_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_PET', key: 'TB_PET_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_doacao_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_DOACAO', key: 'TB_DOACAO_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_encaminhamento_doacao_data: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    tb_encaminhamento_doacao_hora: {
        type: db.Sequelize.TIME,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = Encaminhamento;