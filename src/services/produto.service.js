
// Importa o repository, que conversa direto com o banco de dados.
// Atenção: precisa terminar com ".js", como nos outros arquivos do projeto.
import produtoRepository from "../repository/produto.repository.js";

// Função do service: aqui fica a regra de negócio.
// Ela recebe o produto vindo do controller e pede ao repository para salvar.
async function createProdutoService(novoProduto) {
    // Chama a função do repository que insere no banco e espera (await) o resultado
    const produtoSalve = await produtoRepository.createProdutoRepository(novoProduto);

    // Se não voltou nada, algo deu errado: lança um erro.
    // O catch do controller captura esse erro e responde com status 400.
    if (!produtoSalve) {
        throw new Error("Erro ao criar novo produto");
    }

    // Devolve o produto salvo para o controller
    return produtoSalve;
}

// Exporta o service para o controller poder usar
export default {
    createProdutoService
};