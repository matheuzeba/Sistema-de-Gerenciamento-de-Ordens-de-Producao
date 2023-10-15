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
        return res.status(500).json(error.message);
    }
}

const listarOdem = async(req, res) => {
    try {
        const { rows, rowCount } = await pool.query('select * from ordens');

        if(rowCount === 0){
            return res.status(200).json({mensagem: "Não existem ordens de fabricação"});
        }

        return res.status(200).json(rows)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
}

const listarOrdemPorCliente = async(req, res) => {
    const { cliente } = req.body;
    const { id } = req.params;

    if(!cliente || !id ) {
        return res.status(400).json({mensagem: "o nome do cliente, id e concluido são obrigatorios"});
    }

    try {
        const { rows, rowCount } = await pool.query('select * from ordens where cliente = $1 and id = $2', [cliente, id]);

        if(rowCount === 0){
            return res.status(200).json({mensagem: "Não existem ordens de fabricação desse cliente"});
        }

        return res.status(200).json(rows)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const atualizarStatusOrdem = async(req, res) => {
    const { cliente, id, concluido } = req.body;
    if(!cliente || !id || !concluido) {
        return res.status(400).json({mensagem: "o nome do cliente, id e concluido são obrigatorios"});
    }
    try {
        const { rows, rowCount } = await pool.query(
            `
                UPDATE ordens
                SET concluida = $1
                WHERE cliente = $2 and id = $3 returning *;
            `, [concluido, cliente, id]
        );

        console.log(rows)

        if(rowCount === 0){
            return res.status(200).json({mensagem: "Não existem ordens de fabricação desse cliente"});
        }

        return res.status(200).json(rows)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const listarPorConclusao = async(req, res) => {
    const { verificar } = req.query;
    
    if(!verificar) {
        return res.status(400).json({mensagem: "o verificar é obrigatorio"});
    }
    
    try {
        const { rows, rowCount } = await pool.query('select * from ordens where concluida = $1', [verificar]);

        if(rowCount === 0){
            return res.status(200).json({mensagem: `Não existem ordens de fabricação ${verificar}`});
        }

        return res.json(rows);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    ordemDeFabricacao,
    listarOdem,
    listarOrdemPorCliente,
    atualizarStatusOrdem,
    listarPorConclusao
}