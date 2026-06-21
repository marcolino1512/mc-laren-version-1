// ============================================================
// 🌱 seed.js — cria o usuário administrador mestre
//
// Uso: node database/seed.js "SuaSenha"
//
// O e-mail vem de ADMIN_EMAIL no arquivo .env
// A senha vem do argumento de linha de comando (nunca fica
// salva em arquivo — só o hash vai para o banco)
// ============================================================

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), override: true });

const bcrypt = require('bcryptjs');
const db     = require('./connection');

async function seed() {
    const email    = process.env.ADMIN_EMAIL;
    const password = process.argv[2];

    if (!email) {
        console.error('❌ Defina ADMIN_EMAIL no arquivo .env antes de continuar.');
        process.exit(1);
    }
    if (!password) {
        console.error('❌ Passe a senha como argumento: node database/seed.js "SuaSenha"');
        process.exit(1);
    }
    if (password.length < 8) {
        console.error('❌ A senha deve ter no mínimo 8 caracteres.');
        process.exit(1);
    }

    const hash = await bcrypt.hash(password, 12);

    // Insere ou atualiza — garante que sempre é admin
    await db.execute(
        `INSERT INTO users (name, email, password, role)
         VALUES ('Marco', ?, ?, 'admin')
         ON DUPLICATE KEY UPDATE
            name     = VALUES(name),
            password = VALUES(password),
            role     = 'admin'`,
        [email, hash]
    );

    console.log(`✅ Usuário admin configurado: ${email}`);
    console.log('🔐 Hash gerado e salvo no banco. A senha original não foi armazenada.');
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Erro:', err.message);
    process.exit(1);
});
