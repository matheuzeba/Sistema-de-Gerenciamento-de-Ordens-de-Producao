const  express = require('express');

const  rotas = express();

const { 
    teste
} = require('../controladores/ordem');

rotas.get('/teste', teste)

module.exports = rotas;