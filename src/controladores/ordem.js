const  pool = require('../bancoDeDados/conexao');

const ordemDeFabricacao = async(req, res) => {
    const { cliente, produto, quantidade, material, data_de_entrega } = req.body
    const { rows } = await pool.query('select * from materiais');

    res.json(rows);
}

module.exports = {
    ordemDeFabricacao
}