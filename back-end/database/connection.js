const mysql = require('mysql2/promise');

// 🔗 Pool de conexões com o MySQL
// Usa variáveis do arquivo .env (ver .env.example)
const pool = mysql.createPool({
    host:             process.env.DB_HOST     || 'localhost',
    user:             process.env.DB_USER     || 'root',
    password:         process.env.DB_PASSWORD || '',
    database:         process.env.DB_NAME     || 'projeto_beta',
    waitForConnections: true,
    connectionLimit:  10,
    queueLimit:       0
});

module.exports = pool;
