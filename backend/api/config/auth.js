//cria a instancia do jwt, criacao de token
const jwt = require('jsonwebtoken')
//pega as configuracao da api, authSecret para geracao do token de acesso
const config = require('../config/configs_api')

//exporta as configuracoes de cabecalho do token
module.exports = (req,res,next)=>{
    if(req.method === 'OPTIONS'){
        next()
    }
    else{
        //obtem o token de accesso atravees da variavel Authorization
        const token = req.body.authorization || req.query.authorization || req.headers['authorization'] || req.params.authorization
        //verifica se a variavel token esta vazia
        if(!token){
            //retorna erro de acesso negado, 403
            return res.status(403).send({errors:'Token não providenciado'})
        }
        //obtem o token, verifica se e valido pela chave atuhSecret
        //jwt.verify(token.replace('Bearer ', ''), config.authSecret ,(err,decoded)=>{
        jwt.verify(token, config.authSecret ,(err,decoded)=>{
            if(err){
                //se houver erro, permissao negada error 403
                return res.status(403).send({
                    errors:'Falha autenticar token.'
                })
            }else{
                //req.decoded = decoded
                //salva os dados do usuario logado na sessão
                //salva no cabecalho da requisicao, na variavel user
                //req['user'] = data[0];
                //avanca para proxima requisicao
                next();
            }
        })
    }
}