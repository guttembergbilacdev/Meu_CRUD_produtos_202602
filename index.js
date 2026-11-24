
// Importa o Express, o framework que cria o servidor web.
import express from "express";

// Importa as rotas de produto (arquivo produto.routes.js).
// O "./src/routes/..." funciona porque este index.js está na raiz do projeto,
// ao lado da pasta "src".
import produtoRouter from "./src/routes/produto.routes.js";

// Cria a aplicação Express. É o "app" que recebe todas as requisições.
const app = express();

// Middleware que converte o corpo (body) das requisições de JSON para objeto JavaScript.
// Sem ele, o request.body do controller chegaria como undefined.
app.use(express.json());

// Registra as rotas de produto na aplicação.
// Agora o POST /produtos passa a funcionar.
app.use(produtoRouter);

// Inicia o servidor na porta 3000 e fica esperando requisições.
// A função de dentro roda quando o servidor estiver pronto.
app.listen(3000, () => {
    console.log("servidor rodando na porta 3000...");
});