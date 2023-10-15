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

module.exports = {
    criarMaterial
} 