

import db from "../config/database.js";
import produtoRepository from "../repository/produto.repository.js";


async function createProdutoService(novoProduto) {
    
    const produtoSalve = await produtoRepository.createProdutoRepository(novoProduto);

    if (!produtoSalve) {
        throw new Error("Erro ao criar novo produto");
    }
    
    return produtoSalve;
}

async function readALLProdutoService() {
    const produtos = await produtoRepository.readALLProdutoRepository();

    return produtos;
}


export default {
    createProdutoService,
    readALLProdutoService
};