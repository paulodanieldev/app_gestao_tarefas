/**
 * arquivo de conexao com a base de dados
 * @author Paulo Daniel Dias da Silva
 */

//cria instacia mysql
var mysql      = require('mysql');
//pega os dados mysql em configs api
var config     = require('./configs_api');
//cria a conexao com mysql
var connection = mysql.createConnection(config.db);

//exportando as funções query, e escape
module.exports = {
    //consulta rapida para testa conexao com a base de dados
    checksConnectDB:() => {
        
        //conectado ao banco
        connection.connect((err) => {
            return (err) ? console.log(`Error ao conectar com Mysql:${err.stack}`) : console.log(`Conexao estabelecida com MySQL Nª:${connection.threadId}`)
        });

        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            console.log('Banco de dados: Conectado.');
        });
    },
    //função de execução script sql
    query: (sql) => {
        //retorna uma promessa, verificado se ouve falha
        // ou sucesso
       return new Promise((sucesso, falha) =>{
            connection.query(sql, (error, results, fields) => {
                //se houver falha retorna o rerro e falso
                if (error) {
                    //retorna o erro que houve na execucao
                    falha(error);
                    //retorna falso, parando a execução
                    return false;
                }
                //retona sucesso, com dados da consulta em results
                sucesso(results, fields);
            });
        })
    },
    //função anti sql injection, para segurança da aplicação
    escape: (param) => {
        return connection.escape(param);
    }
}