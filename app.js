const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
const home = require('./routes/admin');
const postagem = require('./routes/postagem');
const usuario = require('./routes/usuario');
const doacao = require('./routes/doacao');
const login = require('./routes/login');
const home_adm = require('./routes/home_adm');
const apadrinhamento = require('./routes/apadrin');
const adocao = require('./routes/adocao');

const { urlencoded, json } = require('body-parser');

//CONFIGURANDO O BODY PARSER E O HANDLEBARS
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
app.use('/uploads', express.static('uploads'));

//CHAMANDO A ROTA DE ADMIN
app.use('/', home);

//CHAMANDO A ROTA DE POSTAGEM
app.use('/', postagem);

//CHAMANDO A ROTA DE USUARIO
app.use('/', usuario);

//CHAMANDO A ROTA DE DOACAO
app.use('/', doacao);

//ROTA LOGIN
app.use('/', login);

//ROTA HOME-ADM
app.use('/', home_adm);

//ROTA APADRINHAMENTO
app.use('/', apadrinhamento);

//ROTA ADOÇÃO
app.use('/', adocao);

//ADICIONANDO A PORTA PARA O SERVER
const PORT = process.env.PORT||7070;
app.listen(PORT, ()=>{
    console.log("Servidor aberto, porta: 7070");
})