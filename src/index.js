const express = require('express');
const rotas = require('./roteadores/ordem');

const app = express();

app.use(express.json());
app.use(rotas);

app.listen(3000, console.log('Servidor inicializado'))