const db = require('./db');

//REPRODUZINDO A TABELA TIPO DE PET
const TipoPet = db.sequelize.define('TB_TIPOPET', {
    tb_tipopet_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    tb_tipopet_tipo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = TipoPet;