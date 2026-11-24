

import produtoService from "../services/produto.service.js";

async function createProdutoController(request, response) {
        const novoProduto = request.body;

    try {
        
        const produtoSalvo = await produtoService.createProdutoService(novoProduto);

               response.status(200). send(produtoSalvo);
    } catch(error) {

               response.status(400). send(error.message);
    }
}

async function readALLProdutoController(request, response) {
    try {
        const produtos = await produtoService.readALLProdutoService();
        
        response.status(200).send({produtos});
    } catch(error) {
        response.status(400).send(error.message);
    }
}

export default {
    createProdutoController,
    readALLProdutoController
}