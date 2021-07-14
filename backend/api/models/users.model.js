var db_mysql = require("../config/mysql");
var sha1 = require("sha1");

var model = {

  insert: (dados) => {
    return db_mysql.query(`
            INSERT INTO tb_usuario
            (
              nome,
              data_cadastro 
            )
            VALUES
            (
              ${db_mysql.escape(dados.nome)},
              ${db_mysql.escape(dados.data_cadastro)}
            )
        `);
  },

  update: (dados) => {
    return db_mysql.query(`
            UPDATE tb_usuario 
              SET nome = ${db_mysql.escape(dados.nome)}, 
                  data_atualização = ${db_mysql.escape(dados.data_atualizacao)}
              WHERE id = ${db_mysql.escape(dados.id)}
        `);
  },

  getOne: (id) => {
    return db_mysql.query(`
        SELECT * FROM tb_usuario WHERE id =  ${db_mysql.escape(id)}
    `);
  },

  get: () => {
    return db_mysql.query(`
        SELECT * FROM tb_usuario
    `);
  },

  delete: (id) => {
    return db_mysql.query(`
            DELETE
            FROM
              tb_usuario
            WHERE
              id =  ${db_mysql.escape(id)}
        `);
  },

};

module.exports = model;
