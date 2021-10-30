const db = require('./db');

//REPRODUZINDO A TABELA POSTAGEM
const Postagem = db.sequelize.define('TB_POSTAGEM', {
    tb_postagem_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_tipopostagem_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'tb_tipopostagem', key: 'tb_tipopostagem_id' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_adiministrador_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_ADIMINISTRADOR', key: 'TB_ADIMINISTRADOR_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_pet_id: {
        type: db.Sequelize.INTEGER,
        references: { model: 'TB_PET', key: 'TB_PET_ID' },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tb_postagem_titulo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_postagem_conteudo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tb_postagem_img: {
        type: db.Sequelize.TEXT,
        allowNull: true
    }
}, { freezeTableName: true });

//Postagem.sync({force:true});

module.exports  = Postagem;