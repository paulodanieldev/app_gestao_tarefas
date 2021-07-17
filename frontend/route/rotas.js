module.exports = (io) => { //Aqui recebo o socket.io lá do app.js

    //Instanciando o Router do express
    var express = require('express');
    var rotas = express.Router();

    //================================================================== Setando as rotas da aplicação
    const { pageLogin, pageAdmin } = require('../dao/login.js');
    rotas.get('/', pageLogin); //localhost:3000 - Tela inicial de login
    rotas.get('/admin', pageAdmin); //localhost:3000/admin - Tela inicial da página administrativa

    //================================================================== CADASTROS
    //Rotas para a página de "Cadastro de Usuário"
    const { pageUsuario, pageEditUsuario, addUsuario, editUsuario, delUsuario, } = require('../dao/cadastros/usuario.js');
    rotas.get('/usuario', pageUsuario); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/addUsuario', addUsuario); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editUsuario/', editUsuario); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/usuario/:id', pageEditUsuario); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delUsuario/:id', delUsuario); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")

    //Rotas para a página de "Cadastro de tarefas"
    const { /*pageTarefa,*/ addTarefa, editTarefa, delTarefa, } = require('../dao/cadastros/tarefa.js');
    // rotas.get('/tarefa', pageTarefa);
    rotas.post('/addTarefa', addTarefa);
    rotas.post('/editTarefa/', editTarefa);
    rotas.get('/delTarefa/:id', delTarefa);

    //Exportando este módulo
    return rotas;
};