const  express = require('express');

const  rotas = express();

const { 
    ordemDeFabricacao,
    listarOdem,
    listarOdemPorCliente,
    atualizarOrdem
} = require('../controladores/ordem');

const {
    verificarBodyOrdem,
    verificarMaterial
} = require('../intermediarios/ordem')

rotas.get('/ordem', listarOdemPorCliente);
rotas.get('/ordem', listarOdem);
rotas.put('/ordem', atualizarOrdem);

rotas.use(verificarBodyOrdem, verificarMaterial);

rotas.post('/ordem', ordemDeFabricacao);

module.exports = rotas;