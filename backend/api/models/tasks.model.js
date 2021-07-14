var db_mysql = require("../config/mysql");

var model = {
  insert: (dados) => {
    return db_mysql.query(`
            INSERT INTO tb_tarefa
            (
              descricao,
              status,
              id_usuario,
              data_cadastro
            ) 
            VALUES
            (
              ${db_mysql.escape(dados.descricao)},
              ${db_mysql.escape(dados.status)},
              ${db_mysql.escape(dados.id_usuario)},
              ${db_mysql.escape(dados.data_cadastro)}
            )
        `);
  },

  update: (dados) => {
    return db_mysql.query(`
            UPDATE tb_tarefa 
            SET
              descricao = ${db_mysql.escape(dados.descricao)},
              status = ${db_mysql.escape(dados.status)},
              id_usuario = ${db_mysql.escape(dados.id_usuario)},
              data_atualizacao = ${db_mysql.escape(dados.data_atualizacao)}
            WHERE id = ${db_mysql.escape(dados.id)}
        `);
  },

  updateStatus: (dados) => {
    return db_mysql.query(`
            UPDATE tb_tarefa 
            SET
              status = ${db_mysql.escape(dados.status)},
              data_atualizacao = ${db_mysql.escape(dados.data_atualizacao)}
            WHERE id = ${db_mysql.escape(dados.id)}
        `);
  },

  getOne: (id) => {
    return db_mysql.query(`
        SELECT * FROM tb_tarefa WHERE id = ${db_mysql.escape(id)}
    `);
  },

  getByUser: (id_usuario) => {
    return db_mysql.query(`
        SELECT * FROM tb_tarefa WHERE id_usuario = ${db_mysql.escape(id_usuario)}
    `);
  },

  get: () => {
    return db_mysql.query(`
        SELECT * FROM tb_tarefa
    `);
  },

  delete: (id) => {
    return db_mysql.query(`
        DELETE FROM tb_tarefa WHERE id = ${db_mysql.escape(id)}
    `);
  },
};

module.exports = model;