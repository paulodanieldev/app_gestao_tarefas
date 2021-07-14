/**
 * serve.js
 * arquivo principal da API, onde iniciar o 
 * servidor http
 * @author Paulo Daniel Dias da Silva
 */

//http responsavel por criar o servidor
const http   = require('http');
//importando app, contendo as configuracoes da api
const app    = require('./app');
//chama as config da api
const config  = require('./config/configs_api');
//criando o servidor
const server  =  http.createServer(app);

//verifica se a base de dados ta respondedo correto
//const connectdb = require('./config/db');
//inicia a conexao com a base de dados
//connectdb.checksConnectDB();

//verifica se a base de dados esta respondedo correto
const connectPoolDb = require('./config/mysql');
//inicia a conexao com a base de dados
connectPoolDb.checksConnectDB();
//servidor esta ouvindo na porta 3000 ou PORT
server.listen(config.port,()=>{
    console.log(`Servidor está rodando na porta ${config.port}`);
})