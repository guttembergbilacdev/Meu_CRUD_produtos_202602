import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    valor TEXT NOT NULL,
    tipo TEXT NOT NULL)`);

// Funções auxiliares: transformam os callbacks do sqlite3 em Promises
function executar(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, alteradas: this.changes });
    });
  });
}

function buscarUm(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row || null)));
  });
}

function buscarTodos(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

// CREATE
export async function criar({ nome, valor, tipo }) {
  const { id } = await executar(
    "INSERT INTO produto (nome, valor, tipo) VALUES (?, ?, ?)",
    [nome, valor, tipo]
  );
  return buscarPorId(id);
}

// READ
export function listar() {
  return buscarTodos("SELECT * FROM produto ORDER BY id");
}

export function buscarPorId(id) {
  return buscarUm("SELECT * FROM produto WHERE id = ?", [id]);
}

// UPDATE (retorna null se o id não existir)
export async function atualizar(id, { nome, valor, tipo }) {
  const { alteradas } = await executar(
    "UPDATE produto SET nome = ?, valor = ?, tipo = ? WHERE id = ?",
    [nome, valor, tipo, id]
  );
  return alteradas ? buscarPorId(id) : null;
}

// DELETE (retorna true se apagou, false se o id não existe)
export async function remover(id) {
  const { alteradas } = await executar("DELETE FROM produto WHERE id = ?", [id]);
  return alteradas > 0;
}
