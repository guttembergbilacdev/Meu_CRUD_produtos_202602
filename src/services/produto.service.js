import produtoRepository from "../repository/produto.repository";

async function createProdutoService(novoProduto) {
    const produtoSalve = await produtoRepository.createProdutoService(novoProduto);

    if (!produtoSalve) {
        throw new Erro ("Erro ao criar novo produto");
    }
    return produtoRepository;
}
export default{
    createProdutoService
}