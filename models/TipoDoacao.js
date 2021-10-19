const db = require('./db');

//REPRODUZINDO A TABELA TIPO DE DOAÇÃO
const TipoDoacao = db.sequelize.define('TB_TIPODOACAO', {
    tb_tipodocao_id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_tipodoacao_tipo:{
        type: db.Sequelize.TEXT,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = TipoDoacao;