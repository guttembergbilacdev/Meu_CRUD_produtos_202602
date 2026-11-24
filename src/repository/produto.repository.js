import db from "../config/database.js"

db.run(`
    CREATE TABLE IF NOT EXISTS produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        valor TEXT NOT NULL,
        tipo TEXT NOT NULL
    )
`);

function createProdutoRepository(novoproduto) {
    return new Promise((resolve, reject) => {
       
        const { nome, valor, tipo } = novoproduto;

        db.run(
            
            `INSERT INTO produto (nome, valor, tipo) VALUES(?,?,?)`,
            [nome, valor, tipo],
           
            (err) => {
                if (err) {
                    
                    reject(err);
                } else {
                    
                    resolve(novoproduto);
                }
            }
        ); 
    }); }

function readALLProdutoRepository() {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM produto', [],
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
