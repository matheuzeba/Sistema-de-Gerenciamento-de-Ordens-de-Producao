const  pool = require('../bancoDeDados/conexao');

const ordemDeFabricacao = async(req, res) => {
    try {
        const { cliente, produto, quantidade, material, data_de_entrega } = req.body
        const { rows } = await pool.query(
            `
            insert into ordens(cliente, produto, quantidade, material, data_de_entrega, concluida)
            values
            ($1, $2, $3, $4, $5, $6) returning *;
            `, [cliente, produto, quantidade, material, data_de_entrega, false]
        );
    
        res.status(201).json(rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
}

module.exports = {
    ordemDeFabricacao
}