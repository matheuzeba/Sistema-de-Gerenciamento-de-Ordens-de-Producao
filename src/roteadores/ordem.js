const  express = require('express');

const  rotas = express();

const { 
    ordemDeFabricacao,
    listarOdem,
    listarOrdemPorCliente,
    atualizarStatusOrdem,
    listarPorConclusao
} = require('../controladores/ordem');

const {
    criarMaterial,
    atualizarMaterial,
    deletarMaterial,
    listarMaterial
} = require('../controladores/material')

const {
    verificarBodyOrdem,
    verificarMaterial
} = require('../intermediarios/ordem')

const {
    verificarBodyMaterial,
    verificarSeMaterialExiste
} = require('../intermediarios/material');

rotas.get('/ordem/finalizado', listarPorConclusao)
rotas.get('/ordem/:id', listarOrdemPorCliente);

rotas.get('/ordem', listarOdem);
rotas.patch('/ordem', atualizarStatusOrdem);


rotas.get('/material', listarMaterial)
rotas.post('/material', verificarBodyMaterial, verificarSeMaterialExiste, criarMaterial)
rotas.patch('/material', verificarBodyMaterial, atualizarMaterial)
rotas.delete('/material', deletarMaterial)

rotas.use(verificarBodyOrdem, verificarMaterial);

rotas.post('/ordem', ordemDeFabricacao);

module.exports = rotas;