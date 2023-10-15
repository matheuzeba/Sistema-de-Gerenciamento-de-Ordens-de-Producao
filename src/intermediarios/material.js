const  pool = require('../bancoDeDados/conexao');

const verificarBodyMaterial = async(req, res, next) => {
    const { nome, quantidade } = req.body
    
    if(!nome ||  !quantidade) {
        return res.status(400).json({
            mensagem: "esta faltando algo, os seguintes sao necessarios: ",
            obrigatorios: {
                nome: "nome",
                quantidade: "quantidade"
            }
        });
    }

    next();
}

const verificarSeMaterialExiste = async(req, res, next) => {
    const { nome } = req.body
    
   try {
    const { rowCount } = await pool.query('select * from materiais where nome = $1', [nome]);
    
    if(rowCount >= 1) {
        return res.status(400).json({mensagem: "Esse material já está presente no banco de dados."});
    }

    next();
   } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
   }
}

module.exports = {
    verificarBodyMaterial,
    verificarSeMaterialExiste
}