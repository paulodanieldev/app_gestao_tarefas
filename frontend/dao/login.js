//Variável que setamos a página do conteúdo central a ser incluído na tela
//Importando o fetch para realizar as requisições a api
// const fetch_api = require("node-fetch");
// const host_api = "http://localhost:3001";
var page = './includes/default/3-content';
var status_Login = '';

//======================================= Funções recebidas da rota
module.exports = {

    //Pagina inicial de login ao acessar localhost:3000 ou fazer logoff
    pageLogin: (req, res) => {

        //Deleta a sessão do usuário do redis
        delete req.session.nome_login;

        //Abre a página de login
        res.render('./pageLogin', {
            status_Login,
        });
    },

    pageAdmin: (req, res) => {
        // page = './includes/default/3-content';
        res.render('./pageAdmin', {
            // cod_login: req.session.cod_login,
            // nome_login: req.session.nome_login,
            // foto_login: req.session.foto_login,
            // usuario_login: req.session.usuario_login,
            // perfil_login: req.session.perfil_login,
            page,
            //Cadastros
            CadastroOpen: '',
            Cadastro: '',
            CadUsuario: '',
            // CadAluno: '',
            CadTarefa: '',
            //Cadastros
            // Config: '',
            // ConfigOpen: '',
            // CadDadosEscola: '',
            // CadOutrasConfig: '',
            //Chat
            // ChatOpen: '',
            // Chat: '',
            // CadChat: ''
        });
        res.end();
    },
};