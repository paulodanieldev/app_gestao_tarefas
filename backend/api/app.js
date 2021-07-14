/**
 * app.js
 * arquivo que contem configuracoes da api
 * @author Paulo Daniel Dias da Silva
 */

//requerindo express
const express    = require('express');
//criando instancia do express
const app        = express();
//chama as configuracoes da api
const config     = require('./config/configs_api');
//cria instancia bodyparser
const bodyParser = require('body-parser')
//chama o metodo cors
const cors       = require('./config/cors');
//cria instancia morgan
const morgan     = require('morgan');
//chama as rotas da api
const route = require('./routes/routes');


//seta a configuracao da porta
app.set('port',config.port);
//chama o morgan nao lembro pra que serve kkkk
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
//Retorna middleware que apenas analisa json
app.use(bodyParser.json())
//usa o metodo cors
app.use(cors);

//chama as rotas
app.use(route);

//se a url da api nao for encontrada error 404
app.use( (req, res, next ) =>{
    res.status(400).json({
        title: 'Error 404',
        description: 'URL Não Encontrado',
    })
});

//exportando app, para importacao em outros arquivos
module.exports = app;