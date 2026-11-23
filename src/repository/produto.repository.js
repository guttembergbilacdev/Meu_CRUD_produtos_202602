
// Cria a tabela "produto" no banco, caso ela ainda não exista.
// "nome" é UNIQUE, ou seja, não pode haver dois produtos com o mesmo nome.
db.run(`
    CREATE TABLE IF NOT EXISTS produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        valor TEXT NOT NULL,
        tipo TEXT NOT NULL
    )
`);

// Função que insere um novo produto no banco de dados.
// Retorna uma Promise, porque o db.run é assíncrono (usa callback).
function createProdutoRepository(novoproduto) {
    return new Promise((resolve, reject) => {
        // Desestrutura o objeto, pegando só os campos que vamos salvar
        const { nome, valor, tipo } = novoproduto;

        db.run(
            // Os "?" são parâmetros: o SQLite troca pelos valores do array abaixo.
            // Isso evita SQL Injection.
            `INSERT INTO produto [nome, valor, tipo] VALUES(?,?,?)`,
            [nome, valor, tipo],
            // Callback executado quando o banco terminar a operação
            (err) => {
                if (err) {
                    // Deu erro (ex.: nome repetido): rejeita a Promise.
                    // O catch do controller vai capturar esse erro.
                    reject(err);
                } else {
                    // Deu certo: resolve a Promise devolvendo o produto
                    resolve(novoproduto);
                }
            }
        ); // fecha o db.run
    }); // fecha o Promise
}

// Exporta para o service poder usar


function readALLProdutoRepository() {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FRON produto', [],
            (error, rows) => {
                if (error) {
                    reject(error);
                } else{
                    resolve(rows);
                }
            }
        )
    })
}

export default {
    createProdutoRepository,
    readALLProdutoRepository

};
