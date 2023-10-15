const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Conexão com o banco de dados de Dados:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', () => {
  console.log('Banco de dados conectado com sucesso!');
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};