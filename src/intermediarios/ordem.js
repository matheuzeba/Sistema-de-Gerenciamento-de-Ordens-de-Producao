const  pool = require('../bancoDeDados/conexao');

const verificarBodyOrdem = async(req, res, next) => {
    const { cliente, produto, quantidade, material, data_de_entrega } = req.body
    
    if(!cliente || !produto || !quantidade || !material || !data_de_entrega) {
        return res.status(400).json({
            mensagem: "esta faltando algo, os seguintes sao necessarios: ",
            obrigatorios: {
                cliente: "cliente",
                produto: "produto",
                quantidade: "quantidade",
                material: "material",
                data_de_entrega: "data_de_entrega"
            }
        });
    }

    next();
}

module.exports = {
    verificarBodyOrdem
}