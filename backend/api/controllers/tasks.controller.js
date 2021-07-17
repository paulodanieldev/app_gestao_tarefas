var tasksModel = require('../models/tasks.model');

module.exports = {
    insertTask: (req, res, next) => {
        console.log(req.body);
        tasksModel
            .insert(req.body)
            .then((data) => {
                if (data.affectedRows > 0) {
                    const response = {
                        insertId: data.insertId,
                        message: 'tarefa cadastrada com sucesso',
                        tarefa: req.body
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'tarefa não localizada'
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
    updateTask: (req, res, next) => {
        tasksModel
            .update(req.body)
            .then((data) => {
                if (data.affectedRows > 0) {
                    const response = {
                        alteracoes: data.changedRows === 1 ? 'S' : 'N',
                        message: 'tarefa atualizada com Sucesso',
                        tarefa: req.body
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'tarefa não localizada'
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
    updateTaskStatus: (req, res, next) => {
        tasksModel
            .updateStatus(req.body)
            .then((data) => {
                if (data.affectedRows > 0) {
                    const response = {
                        alteracoes: data.changedRows === 1 ? 'S' : 'N',
                        message: 'status da tarefa atualizada com Sucesso',
                        tarefa: req.body
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'tarefa não localizada'
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
    deleteTask: (req, res, next) => {
        tasksModel
            .delete(req.body.id)
            .then((data) => {
                if (data.affectedRows > 0) {
                    const response = {
                        message: 'tarefa excluida com Sucesso'
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'tarefa não localizada'
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
    selectAllTask: (req, res, next) => {
        tasksModel
            .get()
            .then((data) => {
                if (data.length > 0) {
                    const response = {
                        quantidade: data.length,
                        tarefa: data
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: "não existem tarefas cadastradas"
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
    selectAllTaskByUser: (req, res, next) => {
        tasksModel
            .getByUser(req.params.id_usuario)
            .then((data) => {
                if (data.length > 0) {
                    const response = {
                        quantidade: data.length,
                        tarefa: data
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: "não existem tarefas cadastradas para este usuario",
                        tarefa: []
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
    selectTask: (req, res, next) => {
        tasksModel
            .getOne(req.params.id)
            .then((data) => {
                if (data.length > 0) {
                    const response = {
                        tarefa: data[0]
                    }
                    res.status(200).send(response);
                } else {
                    res.status(404).send({
                        message: 'tarefa não localizada',
                        tarefa: []
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
};