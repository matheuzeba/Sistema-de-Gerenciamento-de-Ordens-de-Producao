const  express = require('express');

const  rotas = express();

const { 
    ordemDeFabricacao
} = require('../controladores/ordem');

const {
    verificarBodyOrdem,
    verificarMaterial
} = require('../intermediarios/ordem')

rotas.use(verificarBodyOrdem, verificarMaterial)

rotas.post('/ordem', ordemDeFabricacao)

module.exports = rotas;