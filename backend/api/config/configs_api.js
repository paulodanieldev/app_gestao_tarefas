/**
 * arquivo de configurações da Api,
 * configs DATABASE, HTTPS, PORT etc
 * @author Paulo Daniel Dias da Silva
 */

//variavel que verifica se api esta em modo de desenvolvimento ou produção
//ela pode conter 2 estados dev ou prod
const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : '';

//exporta a variaveis de configurações
module.exports = {
    db: {
        host:     env === 'dev'  ?  'localhost' : 'localhost',
        user:     env === 'dev'  ?  'root'      : 'root',
        password: env === 'dev'  ?  ''          : '',
        database: env === 'dev'  ?  'db_gestao_tarefas'    : 'db_gestao_tarefas',
        port: 3306
    },
    port:         env === 'dev'  ?  3001        : 3000,
    authSecret: '@beyblade_for_ever',
}
