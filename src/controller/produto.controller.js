
// Importa o service de produtos, que contém a regra de negócio e o acesso ao banco.
// O controller NÃO fala direto com o banco: ele delega essa tarefa ao service.
import produtoService from "../services/produto.service.js";

// Função do controller responsável por criar um produto.
// "request" traz os dados enviados pelo cliente; "response" é usado para responder a ele.
// É async porque vamos usar "await" para esperar o service terminar.
async function createProdutoController(request, response) {
      // Pega os dados do novo produto que vieram no corpo (body) da requisição
    const novoProduto = request.body;

    try {
         // Chama o service para salvar o produto e espera (await) o resultado.
        // O produto salvo é guardado em "produtoSalvo".
        const produtoSalvo = await produtoService.createProdutoService(novoProduto);

          // Se deu tudo certo, responde com status 201 (Created = criado com sucesso)
        // e devolve o produto salvo para o cliente.
        response.status(201). send(produtoSalvo);
    } catch(error) {

        // Se algo falhou no try (ex.: dados inválidos), cai aqui.
        // Responde com status 400 (Bad Request = requisição inválida)
        // e envia a mensagem do erro.
        response.status(400). send(error.message);
    }
}
// Exporta o controller como padrão, para ser usado nas rotas (ex.: routes/produto.routes.js)
export default {
    createProdutoController
}