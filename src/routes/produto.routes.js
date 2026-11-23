
// Importa o controller de produtos, que tem a função que trata a criação de um produto.
// Repare no caminho: "../controller/..." (a pasta se chama "controller", no singular).
import produtoController from "../controller/produto.controller.js";

// Importa o Router do Express, usado para agrupar rotas em um arquivo separado.
// Assim o app.js não fica cheio de rotas.
import { Router } from "express";

// Cria uma instância do Router para as rotas de produto
const produtoRouter = Router();

// Define a rota POST /produtos.
// Quando o cliente enviar um POST para /produtos, o Express chama
// o createProdutoController, que lê o body, salva o produto e responde.
// Atenção: aqui passamos a função SEM parênteses, porque o Express é quem vai chamá-la.
produtoRouter.post("/produtos", produtoController.createProdutoController);

produtoRouter.get('/produtos', produtoController.readALLProdutoController);

// Exporta o router para ser registrado no app.js (ex.: app.use(produtoRouter))
export default produtoRouter;