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
var poolConnection = mysql.createPool(config.db);

//exportando as funções query, e escape
module.exports = {
    //consulta rapida para testa conexao com a base de dados
    checksConnectDB:() => {
        poolConnection.getConnection((error, conn) => {
            if (error) {  console.log(`pool: Error ao conectar com Mysql:${error}`) }
            else {
                console.log(`pool: Conexao estabelecida com MySQL`)
                conn.query(
                    'SELECT 1 + 1 AS solution',
                    (error, result, fields) =>{
                    conn.release();
                    if (error) { throw error; }
                    console.log('pool: Banco de dados CONECTADO.');
                    }
                )
            }
        });
    },
    //função de execução script sql
    query: (sql) => {
        //retorna uma promessa, verificado se ouve falha ou sucesso
       return new Promise((sucesso, falha) =>{
            poolConnection.getConnection((error, conn) => {
                if (error) { 
                    //retorna o erro que houve na conexão 
                    falha(error);
                    //retorna falso, parando a execução
                    return false;
                }
                else {
                    conn.query(
                        sql,
                        (error, result, fields) =>{
                            //fecha a conexão mysql
                            conn.release();
                            if (error) {
                                //retorna o erro que houve na execucao
                                falha(error);
                                //retorna falso, parando a execução
                                return false;
                            }
                            //retona sucesso, com dados da consulta em result
                            sucesso(result, fields);
                        }
                    )
                }
            });
        })
    },
    //função anti sql injection, para segurança da aplicação
    escape: (param) => {
        return connection.escape(param);
    }
}