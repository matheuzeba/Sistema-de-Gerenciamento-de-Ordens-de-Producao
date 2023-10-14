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

const verificarMaterial = async(req, res, next) => {
    const { material, quantidade } = req.body;
    
    try {
        const materiaisValidos = [];

        for(let i = 0; i < material.length; i ++) {
            const { rows } = await pool.query('select nome from materiais where nome = $1', [material[i]]);
            if(rows.length === 0) {
                continue;
            }
            materiaisValidos.push(rows[0].nome);
        }

        if(materiaisValidos.length !== material.length) {
            const produtosIndisponiveis = material.filter(material => !materiaisValidos.includes(material));
            
            return res.status(404).json({
                mensagem: "esses materiais não estão disponíveis no estoque",
                produtosIndisponiveis
            });
        }

        else {
            for(let i = 0; i < materiaisValidos.length; i++) {

                const { rows } = await pool.query(
                    `
                    select quantidade from materiais where nome = $1
                    `, [materiaisValidos[i]]
                );
                
                // checar se existem materiais suficientes
                if((rows[0].quantidade - quantidade) < 0) {
                    return res.status(400).json({mensagem: "Quantidade de materiais insuficientes"});
                }

                // diminuir quantidade de itens baseado na ordem
                else {
                    await pool.query(
                        `
                        UPDATE materiais
                        SET quantidade = quantidade - $1 
                        WHERE nome = $2;
                        `, [quantidade, materiaisValidos[i]]
                    );
                }
            };
        };

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
    
}

module.exports = {
    verificarBodyOrdem,
    verificarMaterial
}