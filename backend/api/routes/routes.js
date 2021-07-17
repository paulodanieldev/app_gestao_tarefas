//cria instancia express
const express = require('express');
//cria instancia de rota do express
const route = express.Router();

const usersController = require('../controllers/users.controller');
const tasksController = require('../controllers/tasks.controller');

//chama as configuracoes da api
const auth = require('../config/auth');

//dis que todas rotas apartir de /api/private nescessitam de token
//obs.: rotas /api/public não necessitam de token
//e quem faz a verificacao de token valido e o arquivo auth

/* NÃO PRECISA DE AUTENTICAÇÃO */
// route.use('/api/private', auth);
// route.post('/api/public/login', usersController.login);

/* ROTAS CRUD USUÁRIO */
route.get('/api/public/users', usersController.selectAllUser);
route.post('/api/public/users', usersController.insertUser);
route.patch('/api/public/users', usersController.updateUser);
route.get('/api/public/users/:id', usersController.selectUser);
route.get('/api/public/users/name/:name', usersController.selectUserByName);
route.delete('/api/public/users', usersController.deleteUser);

/* ROTAS CRUD TAREFAS */
route.get('/api/public/tasks', tasksController.selectAllTask);
route.post('/api/public/tasks', tasksController.insertTask);
route.patch('/api/public/tasks', tasksController.updateTask);
route.patch('/api/public/tasks/status', tasksController.updateTaskStatus);
route.get('/api/public/tasks/:id', tasksController.selectTask);
route.get('/api/public/tasks/user/:id_usuario', tasksController.selectAllTaskByUser);
route.delete('/api/public/tasks', tasksController.deleteTask);

route.get('/', function(req, res) {
    res.send('Api - App Gestão de Tarefas - Status do servidor - OK ');
});

module.exports = route;