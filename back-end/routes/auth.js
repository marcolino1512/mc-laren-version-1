const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db        = require('../database/connection');

// ────────────────────────────────────────────────────────────
// POST /api/auth/register — cria novo usuário
// ────────────────────────────────────────────────────────────
router.post('/register', [
    body('name')
        .trim()
        .notEmpty().withMessage('Nome é obrigatório.')
        .isLength({ max: 120 }).withMessage('Nome muito longo.'),
    body('email')
        .isEmail().withMessage('Email inválido.')
        .normalizeEmail({ gmail_remove_dots: false }),
    body('password')
        .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, password } = req.body;

    try {
        // 🔍 Verifica se o e-mail já está cadastrado
        const [existing] = await db.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        if (existing.length > 0) {
            return res.status(409).json({ message: 'E-mail já cadastrado.' });
        }

        // 🔒 Hash da senha (12 rounds)
        const hashed = await bcrypt.hash(password, 12);

        // 💾 Insere o novo usuário
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashed]
        );

        return res.status(201).json({
            message: 'Usuário criado com sucesso.',
            userId: result.insertId
        });
    } catch (err) {
        console.error('[register]', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// ────────────────────────────────────────────────────────────
// POST /api/auth/login — autentica usuário e retorna JWT
// ────────────────────────────────────────────────────────────
router.post('/login', [
    body('email')
        .isEmail().withMessage('Email inválido.')
        .normalizeEmail({ gmail_remove_dots: false }),
    body('password')
        .notEmpty().withMessage('Senha é obrigatória.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
        // 🔍 Busca o usuário pelo e-mail
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // ⛔ Mensagem genérica para não revelar se o e-mail existe
        if (rows.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        const user = rows[0];

        // 🔑 Compara a senha com o hash armazenado
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        // 🎟️ Gera o JWT com role incluído (expira em 7 dias)
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            message: 'Login realizado com sucesso.',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error('[login]', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;
