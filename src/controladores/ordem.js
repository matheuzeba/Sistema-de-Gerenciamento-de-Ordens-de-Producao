const  pool = require('../bancoDeDados/conexao');

const teste = async(req, res) => {
   const { rows } = await pool.query('select * from my_table');

   res.json(rows[0]);
}

module.exports = {
    teste
}