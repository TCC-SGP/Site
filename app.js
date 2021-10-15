const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const { urlencoded, json } = require('body-parser');

//CONFIGURANDO O BODY PARSER E O HANDLEBARS
app.use(urlencoded({extended: false}));
app.use(json());
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');

//CARREGANDO ARQUIVOS ESTÁTICOS
app.use('/public/css', express.static('public/css'));
app.use('/public/js', express.static('public/js'));
app.use('/public/img', express.static('public/img'));

//CHAMANDO A ROTAS DE ADMIN
app.use('/', admin);

//ADICIONANDO A PORTA PARA O SERVER
const PORT = process.env.PORT||8081;
app.listen(PORT, ()=>{
    console.log("Servidor aberto, porta: 8081");
})