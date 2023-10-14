const  pool = require('../bancoDeDados/conexao');

const ordemDeFabricacao = async(req, res) => {
    const { cliente, produto, quantidade, material, data_de_entrega } = req.body
    try {
        const { rows } = await pool.query(
            `
            insert into ordens(cliente, produto, quantidade, material, data_de_entrega, concluida)
            values
            ($1, $2, $3, $4, $5, $6) returning *;
            `, [cliente, produto, quantidade, material, data_de_entrega, false]
        );
    
        return res.status(201).json(rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
}

const listarOdem = async(req, res) => {
    try {
        const { rows, rowCount } = await pool.query('select * from ordens limit 10');

        if(rowCount === 0){
            return res.status(200).json({mensagem: "Não existem ordens de fabricação"});
        }

        return res.status(200).json(rows)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
}

module.exports = {
    ordemDeFabricacao,
    listarOdem
}