/**
 * Criar models com consulta sql
 * Ferramenta de CRUD
 * @author Paulo Daniel Dias da Silva
 * @data 24/12/2020
 */

//mode de usar 
// NODE_DEV='dev' node util/geramodel.js nomadatabela

let tabelas = [];
let db = require('../config/db');

process.argv.forEach(function (val, index, array) {
    tabelas[index] = val;
  });

let tabela = tabelas[2];
if(!tabela){
    console.error(`tabela não pode ser em branco!`);
    return false;
}

db.query(
    `DESCRIBE ${tabela}`
)
.then(
    rows => {
        let sql_insert = `insert: (dados) => {
            return db.query(\`
                INSERT INTO ${tabela}
                (
                    ${rows
                        .filter(v => v.Default != 'CURRENT_TIMESTAMP' && v.Extra != 'auto_increment' )
                        .map(v => v.Field).join(',\n\t\t')}
                )
                VALUES
                (
                    ${rows
                        .filter(v => v.Default != 'CURRENT_TIMESTAMP' && v.Extra != 'auto_increment' )
                        .map(v => `\${db.escape(dados.${v.Field})}`).join(',\n\t\t\t')}
                )
            \`)
        },`;
        let sql_insert_update = `insertOrUpdate: (dados) => {
            return db.query(\`
                INSERT INTO ${tabela}
                (
                    ${rows
                        .filter(v => v.Default != 'CURRENT_TIMESTAMP' && v.Extra != 'auto_increment' )
                        .map(v => v.Field).join(',\n\t\t')}
                )
                VALUES
                (
                    ${rows
                        .filter(v => v.Default != 'CURRENT_TIMESTAMP' && v.Extra != 'auto_increment' )
                        .map(v => `\${db.escape(dados.${v.Field})}`).join(',\n\t\t\t')}
                )
                ON DUPLICATE KEY UPDATE
                ${rows
                    .filter(v => v.Default != 'CURRENT_TIMESTAMP' && v.Extra != 'auto_increment' )
                    .map(v => `${v.Field} = \${db.escape(dados.${v.Field})}`).join(',\n\t\t')}
            \`)
        },`;

        let sql_get = `
        get: () => {
            return db.query(\`
                SELECT 
                    ${rows.map(v => v.Field).join(',\n\t\t')}
                FROM
                    ${tabela}
            \`) 
        },
        `;
        let sql_get_one = `
        getOne: (id) => {
            return db.query(\`
                SELECT 
                    ${rows.map(v => v.Field).join(',\n\t\t')}
                FROM
                    ${tabela}
                WHERE
                    id =  \${db.escape(id)}
            \`) 
        },
        `;

        let sql_delete = `
        delete: (id) => {
            return db.query(\`
                DELETE
                FROM
                    ${tabela}
                WHERE
                    id =  \${db.escape(id)}
            \`) 
        },
        `;
        console.log(sql_insert,  sql_insert_update, sql_get_one, sql_get, sql_delete);
        

    }
)


