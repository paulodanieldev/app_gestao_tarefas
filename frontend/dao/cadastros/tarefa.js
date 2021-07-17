//NPM Install
const fse = require('fs-extra');

//Importando o fetch para realizar as requisições a api
const fetch_api = require("node-fetch");
const host_api = "http://localhost:3001/";

const FUNCOES = require('../util/funcoes');

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {

    addTarefa: (req, res) => {
        //inicia a função assincrona para trabalhar com as requisições a api
        (async function() {
            //grava em variáveis os campos vindos do formulário
            let descricao = req.body.descricao_ADD;
            let status = "0"; //0 = aberta; 1 = concluido
            let id_usuario = req.body.id_usuario_ADD;

            const task_url = host_api + "api/public/tasks";
            const data_atual = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const task_body = {
                "descricao": descricao,
                "status": status,
                "id_usuario": id_usuario,
                "data_cadastro": data_atual
            };
            console.log("insert - faz a requisição a API");
            let ins_task_response = await fetch_api(task_url, {
                method: 'post',
                body: JSON.stringify(task_body),
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(ins_task_response);
            if (ins_task_response.ok) {
                console.log("insert - converte resultado para json");
                status_Crud = 'sim';
                res.redirect('/usuario/' + id_usuario);
            } else {
                console.log("falha na requisição");
                status_Crud = 'nao';
                res.redirect('/usuario/' + id_usuario);
            }
            // }
        })(); //async

    },

    editTarefa: (req, res) => {
        (async function() {

            let id = req.body.id_tarefa_EDIT;
            let descricao = req.body.descricao_tarefa_EDIT;
            let status = req.body.status_tarefa_EDIT;
            let id_usuario = req.body.id_usuario_tarefa_EDIT;

            const user_url = host_api + "api/public/tasks";
            const data_atual = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const user_body = {
                "id": id,
                "descricao": descricao,
                "status": status,
                "id_usuario": id_usuario,
                "data_atualizacao": data_atual
            };

            let ins_task_response = await fetch_api(user_url, {
                method: 'patch',
                body: JSON.stringify(user_body),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!ins_task_response.ok) {
                console.log('Erro 009: ', 'Erro ao atualizar');
                status_Crud = 'nao';
                res.redirect('/usuario/' + id_usuario);
            } else {
                console.log("update - finaliza");
                status_Crud = 'sim';
                console.log('/usuario/' + id_usuario);
                res.redirect('/usuario/' + id_usuario);
            }
        })(); //async
    },

    delTarefa: (req, res) => {
        (async function() {
            console.log('inicia a exclusão', req.params);
            let task_id = req.params.id;
            let single_task_url = host_api + "api/public/tasks/" + task_id;
            let single_task_response = await fetch_api(single_task_url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            console.log(single_task_response);
            if (single_task_response.ok) {
                let single_tarefa_json = await single_task_response.json();
                console.log('localizou o usuario');
                const user_url = host_api + "api/public/tasks";
                const user_body = {
                    "id": single_tarefa_json.tarefa.id
                };

                let del_task_response = await fetch_api(user_url, {
                    method: 'DELETE',
                    body: JSON.stringify(user_body),
                    headers: { 'Content-Type': 'application/json' /*, 'Authorization': token */ }
                });
                console.log(del_task_response);

                if (!del_task_response.ok) {
                    console.log('Erro 013: ', 'Erro ao excluir');
                    status_Crud = 'nao';
                    res.redirect('/usuario/' + single_tarefa_json.tarefa.id_usuario);
                } else {
                    status_Crud = 'sim';
                    res.redirect('/usuario/' + single_tarefa_json.tarefa.id_usuario);
                }
            }
        })(); //async
    },

    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};