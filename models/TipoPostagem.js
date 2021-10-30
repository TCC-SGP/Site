const db = require('./db');

//REPRODUZINDO A TABELA DE TIPO DE POSTAGEM
const TipoPostagem = db.sequelize.define('TB_TIPOPOSTAGEM', {
    tb_tipopostagem_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tb_tipopostagem_tipo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
}, { freezeTableName:true });

//TipoPostagem.sync({force: true});

module.exports = TipoPostagem;