const db = require('./db');

//REPRODUZINDO TABELA TIPO DE DOADOR
const TipoDoador = db.sequelize.define('TB_TIPODOADOR', {
    tb_tipodoador_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_tipodoador_tipo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = TipoDoador;