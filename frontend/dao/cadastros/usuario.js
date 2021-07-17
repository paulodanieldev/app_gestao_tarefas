//NPM Install
const fse = require('fs-extra');

//Importando o fetch para realizar as requisições a api
const fetch_api = require("node-fetch");
const host_api = "http://localhost:3001/";

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pageUsuario: (req, res) => {

        (async function() {

            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_usuario';

            const user_url = host_api + "api/public/users";
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            let user_response = await fetch_api(user_url, options);
            let usuarios_json = await user_response.json();

            if (user_response.ok) { //response.status >= 200 && response.status < 

                res.render('./pageAdmin', {
                    DTUsuario: usuarios_json.usuario,
                    status_Crud,
                    // id_login: req.session.id_login,
                    // nome_login: req.session.nome_login,
                    page,
                    Cadastro: 'active',
                    CadastroOpen: 'menu-open',
                    CadUsuario: 'active',
                    CadTarefa: '',
                });

                //Reinicia a variável
                status_Crud = '';
            }

        })(); //async
    },

    addUsuario: (req, res) => {
        (async function() {

            let nome = req.body.nome_ADD.trim();
            //Verifica se o registro adicionado já existe
            const user_url = host_api + "api/public/users/name/" + nome;
            console.log("consulta usuário - faz a requisição a API");
            let user_response = await fetch_api(user_url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

            if (user_response.ok) {
                //Já existe!
                console.log('Erro 002: ', 'registro existente');
                status_Crud = 'registroExiste';
                res.redirect('/usuario');
            } else {
                //Não localizou, insere o novo usuário
                const user_url = host_api + "api/public/users/";
                const data_atual = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const user_body = {
                    "nome": nome,
                    "data_cadastro": data_atual
                };
                console.log("insert - faz a requisição a API");
                let ins_user_response = await fetch_api(user_url, {
                    method: 'post',
                    body: JSON.stringify(user_body),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (ins_user_response.ok) {
                    console.log("insert - converte resultado para json");
                    status_Crud = 'sim';
                    res.redirect('/usuario');
                } else {
                    console.log("falha na requisição");
                    status_Crud = 'nao';
                    res.redirect('/usuario');
                }
            }

        })(); //async

    },

    pageEditUsuario: (req, res) => {
        (async function() {

            page = './includes/cadastros/edt_usuario';

            let user_id = req.params.id;
            let single_user_url = host_api + "api/public/users/" + user_id;
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            let user_response = await fetch_api(single_user_url, options);
            let usuarios_json = await user_response.json();
            if (user_response.ok) { //response.status >= 200 && response.status < 300
                /* recupera as tarefas do usuário */

                let user_tasks_response = await fetch_api(host_api + 'api/public/tasks/user/' + usuarios_json.usuario.id, options);
                let tarefas_usuarios_json = await user_tasks_response.json();

                res.render('./pageAdmin', {
                    DTUsuario: usuarios_json.usuario,
                    DTTarefasUsuario: tarefas_usuarios_json.tarefa,
                    status_Crud,
                    // id_login: req.session.id_login,
                    // nome_login: req.session.nome_login,
                    page,
                    Cadastro: 'active',
                    CadastroOpen: 'menu-open',
                    CadUsuario: 'active',
                    CadTarefa: '',
                });

                //Reinicia a variável
                status_Crud = '';
            }

        })(); //async
    },

    editUsuario: (req, res) => {
        (async function() {

            let id = req.body.id_EDIT;
            let nome = req.body.nome_EDIT.trim();

            const user_url = host_api + "api/public/users/";
            const data_atual = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const user_body = {
                "id": id,
                "nome": nome,
                "data_atualizacao": data_atual
            };

            let ins_user_response = await fetch_api(user_url, {
                method: 'patch',
                body: JSON.stringify(user_body),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!ins_user_response.ok) {
                console.log('Erro 009: ', 'Erro ao atualizar');
                status_Crud = 'nao';
                res.redirect('/usuario/' + id);
            } else {
                console.log("update - finaliza");
                status_Crud = 'sim';
                res.redirect('/usuario/' + id);
            }
        })(); //async
    },

    delUsuario: (req, res) => {
        (async function() {
            console.log('inicia a exclusão', req.params);
            let user_id = req.params.id;
            let single_user_url = host_api + "api/public/users/" + user_id;
            let single_user_response = await fetch_api(single_user_url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            console.log(single_user_response);
            if (single_user_response.ok) {
                let single_usuarios_json = await single_user_response.json();
                console.log('localizou o usuario');
                const user_url = host_api + "api/public/users/";
                const user_body = {
                    "id": single_usuarios_json.usuario.id
                };

                let del_user_response = await fetch_api(user_url, {
                    method: 'DELETE',
                    body: JSON.stringify(user_body),
                    headers: { 'Content-Type': 'application/json' /*, 'Authorization': token */ }
                });
                console.log(del_user_response.ok);

                if (!del_user_response.ok) {
                    console.log('Erro 013: ', 'Erro ao excluir');
                    status_Crud = 'nao';
                    res.redirect('/usuario');
                } else {
                    status_Crud = 'sim';
                    res.redirect('/usuario');
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