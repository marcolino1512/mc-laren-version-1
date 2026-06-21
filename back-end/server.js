require('dotenv').config({ override: true });

const express = require('express');
const cors    = require('cors');

const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 3000;

// 🌐 Permite requisições do front-end (qualquer origem em dev)
app.use(cors({ origin: '*' }));
app.use(express.json());

// 📡 Rotas da API
app.use('/api/auth', authRoutes);

// ✅ Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 🚫 Rota não encontrada
app.use((_req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});
