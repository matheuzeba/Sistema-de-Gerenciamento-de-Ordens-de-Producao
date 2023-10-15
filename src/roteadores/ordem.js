const  express = require('express');

const  rotas = express();

const { 
    ordemDeFabricacao,
    listarOdem,
    listarOrdemPorCliente,
    atualizarStatusOrdem
} = require('../controladores/ordem');

const {
    criarMaterial
} = require('../controladores/material')

const {
    verificarBodyOrdem,
    verificarMaterial
} = require('../intermediarios/ordem')

const {
    verificarBodyMaterial,
    verificarSeMaterialExiste
} = require('../intermediarios/material');

rotas.get('/ordem', listarOdem);
rotas.get('/ordem/:id', listarOrdemPorCliente);
rotas.put('/ordem', atualizarStatusOrdem);

rotas.post('/material', verificarBodyMaterial, verificarSeMaterialExiste, criarMaterial)

rotas.use(verificarBodyOrdem, verificarMaterial);

rotas.post('/ordem', ordemDeFabricacao);

module.exports = rotas;