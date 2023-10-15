const  pool = require('../bancoDeDados/conexao');

const criarMaterial = async(req,res) => {
    const { nome, quantidade } = req.body;
    try {
        const { rows } = await pool.query(
            `
                insert into materiais(nome, quantidade)
                values
                ($1, $2) returning *
            `,[nome, quantidade]
        );
        return res.json(rows)  
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const atualizarMaterial = async(req, res) => {
    const { nome, quantidade } = req.body;
    try {
        const { rows, rowCount } = await pool.query(
            `
                UPDATE materiais
                SET quantidade = $1
                WHERE nome = $2 returning *;
            `, [quantidade, nome]
        );

        if(rowCount === 0) {
            return res.status(404).json({mensagem: "Não existe material com este nome"});
        }

        return res.json(rows)  
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const deletarMaterial = async(req, res) => {
    const { nome } = req.body;
    if(!nome) {
        return res.status(400).json({mensagem: "Não é possível deletar o material sem o nome dele."});
    }
    
    try {
        const { rows, rowCount } = await pool.query(
            `
                DELETE FROM materiais
                WHERE nome = $1 RETURNING *;
            `, [nome]
        );

        if(rowCount === 0) {
            return res.status(404).json({mensagem: "Não existe material com este nome"});
        }

        return res.json(rows)  
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const listarMaterial = async(req, res) => {
    try {
        const { rows, rowCount } = await pool.query('select * from materiais');

        if(rowCount === 0) {
            return res.status(404).json({mensagem: "Não existem materiais no banco de dados"});
        }

        return res.json(rows)  
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    criarMaterial,
    atualizarMaterial,
    deletarMaterial,
    listarMaterial
} 