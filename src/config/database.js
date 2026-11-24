import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco: ", err.message);
  }

  else {
  console.log("Conectado ao banco de dados com sucesso. ")
    }
  }
);

db.serialize();

export default db;