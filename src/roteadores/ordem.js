const  express = require('express');

const  rotas = express();

const { 
    ordemDeFabricacao
} = require('../controladores/ordem');

const {
    verificarBodyOrdem
} = require('../intermediarios/ordem')

rotas.use(verificarBodyOrdem)

rotas.post('/ordem', ordemDeFabricacao)

module.exports = rotas;