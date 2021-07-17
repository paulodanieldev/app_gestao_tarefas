var usersModel = require("../models/users.model");
//var jwt = require("jsonwebtoken");
var config = require("../config/configs_api");

module.exports = {
    insertUser: (req, res, next) => {
        usersModel
            .insert(req.body)
            .then((data) => {
                if (data.affectedRows > 0) {
                    const response = {
                        insertId: data.insertId,
                        message: 'Usuário cadastrado com sucesso',
                        usuario: req.body
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'Usuário não localizado'
                    });
                }
            })
            .catch((errors) => {
                console.log(errors);
                res.status(500).send({
                    message: "Problemas ao efetuar a requisição.",
                    error: errors
                });
            });
    },
    updateUser: (req, res, next) => {
        usersModel
            .update(req.body)
            .then((data) => {
                if (data.affectedRows > 0) {
                    const response = {
                        alteracoes: data.changedRows === 1 ? 'S' : 'N',
                        message: 'Usuário atualizado com Sucesso',
                        usuario: req.body
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'Usuário não localizado'
                    });
                }
            })
            .catch((errors) => {
                console.log(errors);
                res.status(500).send({
                    message: "Problemas ao efetuar a requisição.",
                    error: errors
                });
            });
    },
    deleteUser: (req, res, next) => {
        usersModel
            .delete(req.body.id)
            .then((data) => {
                if (data.affectedRows > 0) {
                    const response = {
                        message: 'Usuário excluido com Sucesso'
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'Usuário não localizado'
                    });
                }
            })
            .catch((errors) => {
                console.log(errors);
                res.status(500).send({
                    message: "Problemas ao efetuar a requisição.",
                    error: errors
                });
            });
    },
    selectAllUser: (req, res, next) => {
        usersModel
            .get()
            .then((data) => {
                if (data.length > 0) {
                    const response = {
                        quantidade: data.length,
                        usuario: data
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: "não existem usuários cadastrados",
                        usuario: []
                    });
                }
            })
            .catch((errors) => {
                console.log(errors);
                res.status(500).send({
                    message: "Problemas ao efetuar a requisição.",
                    error: errors
                });
            });
    },
    selectUser: (req, res, next) => {
        usersModel
            .getOne(req.params.id)
            .then((data) => {
                if (data.length > 0) {
                    const response = {
                        usuario: data[0]
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'Usuário não localizado'
                    });
                }
            })
            .catch((errors) => {
                console.log(errors);
                res.status(500).send({
                    message: "Problemas ao efetuar a requisição.",
                    error: errors
                });
            });
    },

    selectUserByName: (req, res, next) => {
        usersModel
            .getOneByName(req.params.name)
            .then((data) => {
                if (data.length > 0) {
                    const response = {
                        usuario: data[0]
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'Usuário não localizado'
                    });
                }
            })
            .catch((errors) => {
                console.log(errors);
                res.status(500).send({
                    message: "Problemas ao efetuar a requisição.",
                    error: errors
                });
            });
    },
    /* COMENTADO POIS NÃO VAI PRECISAR DE AUTENTICAÇÃO */
    /*login: async (req, res, next) => { 
      try {
        let data = await usersModel.findByEmail(req.body.username);
        if (data.length > 0) {
          data = data[0];
          if (req.body.password == data.senha) {
            console.log("senhas iguais!");
            //criar token valido por 1 dia
            const token = jwt.sign({ password: data.password }, config.authSecret, {
              expiresIn: "1 day",
            });
            //adiciona o token no objeto
            data.token = token;
            //removo o password do objeto
            delete data.senha;
            //retorno com sucesso o objeto com token
            const response = {
              message: 'Login efetuado com sucesso',
              login: data,
              request: {
                tipo: 'POST',
                descricao: 'Retorna o resultado da verificação do login'
              }
            }
            res.status(200).send(response);
          }else{
            console.log("senhas diferentes!");
            res.status(201).send({
              message: 'Senha inválida'
            });
          }
        }else{
          console.log("usuário não localizado");
          res.status(201).send({
            message: 'Usuário não localizado'
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ 
          message: "Problemas ao efetuar a requisição.",
          error: errors
        });
      }
    },*/
};