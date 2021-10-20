const db = require('./db');

//REPRODUZINDO A TABELA PET
const Pet = db.sequelize.define('TB_PET', {
    tb_pet_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_protetor_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_PROTETOR', key: 'TB_PROTETOR_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_tipopet_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_TIPOPET', key: 'TB_TIPOPET_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_pet_nome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_pet_porte: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_pet_raca: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_pet_idade: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = Pet;