import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./produtos.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco:", err.message);
  }
});

// Executa os comandos em ordem (a tabela é criada antes de qualquer INSERT/SELECT)
db.serialize();

export default db;