# 🏎️ Projeto Beta — McLaren

Site showcase de supercars McLaren com galeria de vídeos, carousel automático, sistema de login/registro com JWT, API REST + MySQL, voz de boas-vindas e painel de acesso administrador.

---

## 📁 Estrutura do Projeto

```
Projeto-Beta/
│
├── front-end/                  ← Interface do usuário (abrir index.html)
│   ├── index.html              ← Página principal (3 seções + modal)
│   ├── style.css               ← Estilos globais (glassmorphism, responsivo)
│   ├── main.js                 ← Toda a lógica JavaScript (documentado com emojis)
│   ├── cars/cars/              ← Imagens dos 6 modelos McLaren
│   ├── icon/                   ← Logo SVG e ícones do menu hambúrguer
│   └── videos/videos/          ← 6 vídeos (mclaren-1 a 4, trailer-1, trailer-3)
│
├── back-end/                   ← API REST Node.js + Express
│   ├── server.js               ← Ponto de entrada do servidor (porta 3000)
│   ├── package.json            ← Dependências do projeto
│   ├── .env.example            ← Template de variáveis de ambiente
│   ├── routes/
│   │   └── auth.js             ← POST /register e POST /login com JWT
│   └── database/
│       ├── connection.js       ← Pool de conexões MySQL (mysql2/promise)
│       ├── schema.sql          ← Criação do banco e tabela users
│       └── seed.js             ← Cria o usuário administrador mestre
│
├── .gitignore                  ← Exclui node_modules e .env do git
└── README.md                   ← Esta documentação
```

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---|---|
| 🎬 **Trailer de abertura** | `trailer-1.mp4` é o primeiro vídeo exibido ao abrir o site |
| 🎠 **Carousel automático** | Avança sozinho a cada 10s; clique manual sincroniza o ciclo |
| 📝 **Descrições dinâmicas** | Cada carro tem nome, cor e descrição únicos que trocam com o vídeo |
| 🧭 **Nav com modelos reais** | Os 6 itens do menu são os nomes dos McLarens |
| 🔦 **Modo spotlight** | Clicar no nav mostra só o carro escolhido em destaque na seção Modelos |
| 🔐 **Login / Registro** | Modal glassmorphism, abas separadas, validação client + server |
| 👑 **Admin mestre** | Login especial com `role: admin` retornado no JWT |
| 🚪 **Logout** | Botão `→` ao lado do badge limpa a sessão e libera troca de conta |
| 👋 **Boas-vindas animadas** | Toast central com o nome do usuário ao fazer login |
| 🔊 **Voz de boas-vindas** | Web Speech API fala "Bem-vindo de volta, [nome]" em pt-BR |
| 🎵 **Player de música** | Áudio do `trailer-1.mp4` via botão toggle (ícone muda ao tocar) |
| ⏯️ **Controle de vídeo** | Botão play/pause para os vídeos de fundo |
| 🏁 **Seção Performance** | 3 cards com specs técnicas (765cv, 330km/h, 1.229kg) |
| 🚗 **Seção Modelos** | Grid com todos os 6 modelos, foto, descrição e botão Aderir |
| 📱 **Responsivo** | Layout adaptado para mobile, tablet e desktop |

---

## 🚀 Como Rodar — Passo a Passo Completo

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [MySQL](https://dev.mysql.com/downloads/) 8.0 ou superior
- Navegador moderno (Chrome, Edge, Firefox)
- VS Code com extensão **Live Server** (recomendado para o front-end)

---

### 1️⃣ Banco de dados

Abra o terminal MySQL (ou MySQL Workbench) e execute:

```bash
mysql -u root -p < back-end/database/schema.sql
```

Isso cria o banco `projeto_beta` e a tabela `users` automaticamente.

> Se a tabela já existia sem a coluna `role`, execute no MySQL:
> ```sql
> ALTER TABLE users ADD COLUMN role ENUM('user','admin') NOT NULL DEFAULT 'user';
> ```

---

### 2️⃣ Instalar dependências do back-end

```bash
cd back-end
npm install
```

---

### 3️⃣ Configurar variáveis de ambiente

Crie o arquivo `back-end/.env` copiando o exemplo:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac / Linux
cp .env.example .env
```

Edite o `.env` com seus dados reais:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SuaSenhaMysql
DB_NAME=projeto_beta

# Gere um segredo forte:
# node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
JWT_SECRET=coloque_aqui_string_aleatoria_longa

ADMIN_EMAIL=seu@email.com
```

---

### 4️⃣ Criar o usuário administrador mestre

```bash
# Dentro da pasta back-end/
node database/seed.js "SuaSenhaAqui"
```

A senha é passada como argumento — **nunca fica salva em arquivo**, só o hash vai para o banco.

Saída esperada:
```
✅ Usuário admin configurado: seu@email.com
🔐 Hash gerado e salvo no banco. A senha original não foi armazenada.
```

---

### 5️⃣ Iniciar o servidor back-end

```bash

cd back-end

# Desenvolvimento (reinicia ao salvar arquivos)
npm run dev

# Produção
npm start
```

Servidor rodando em: `http://localhost:3000`

Teste rápido: `http://localhost:3000/api/health` deve retornar `{"status":"ok"}`

---

### 6️⃣ Abrir o front-end (desenvolvimento local)

**Opção A — Live Server (recomendado):**
Clique com o botão direito em `front-end/index.html` no VS Code → **Open with Live Server**

**Opção B — Direto no navegador:**
Dê dois cliques em `front-end/index.html`

> ⚠️ Com a Opção B alguns navegadores podem bloquear os vídeos por política de CORS local. Use Live Server para evitar isso.

---

## 🌐 Deploy — Front-end no Vercel + Servidor Local

A proposta do projeto é hospedar o front-end no **Vercel** (link público permanente) e rodar o servidor localmente, usando o seu PC como back-end.

### Como funciona

```
Usuário → Vercel (front-end) → ngrok (túnel) → seu PC (servidor + MySQL)
```

O **ngrok** cria um túnel entre a internet e o seu `localhost:3000`, permitindo que qualquer pessoa acesse sua API local pelo link do Vercel.

---

### 7️⃣ Deploy do front-end no Vercel

1. Acesse [vercel.com](https://vercel.com) e conecte ao repositório GitHub
2. Configure:
   - **Root Directory:** `front-end`
   - **Framework Preset:** Other
3. Clique em **Deploy** → você recebe o link público permanente

---

### 8️⃣ Instalar e configurar o ngrok

1. Baixe o ngrok em [ngrok.com/download](https://ngrok.com/download)
2. Crie uma conta gratuita em [ngrok.com](https://ngrok.com)
3. Autentique uma vez:
```powershell
ngrok config add-authtoken SEU_TOKEN_AQUI
```

---

### 9️⃣ Rodar o projeto completo (fluxo diário)

Abra **dois terminais** sempre que quiser que o site funcione:

**Terminal 1 — servidor:**
```powershell
cd back-end
npm run dev
```

**Terminal 2 — túnel ngrok:**
```powershell
ngrok http 3000
```

O ngrok vai exibir uma URL pública assim:
```
Forwarding  https://abc123def456.ngrok-free.dev -> http://localhost:3000
```

Copie essa URL e atualize `front-end/main.js`:
```js
const API_URL = 'https://abc123def456.ngrok-free.dev/api';
```

Depois suba a atualização:
```powershell
git add front-end/main.js
git commit -m "Atualiza API_URL para ngrok"
git push
```

O Vercel redeployar automaticamente em ~1 minuto.

> ⚠️ A URL do ngrok muda a cada reinicialização no plano gratuito. Repita o passo acima sempre que reiniciar o ngrok.

---

### Comportamento esperado por estado do servidor

| Situação | O que acontece no site |
|---|---|
| PC ligado + ngrok + servidor rodando | Login e registro funcionam normalmente |
| ngrok parado ou PC desligado | Site abre, mas login retorna erro de conexão |
| Usuário tenta registrar sem servidor | Mensagem: "Não foi possível conectar ao servidor" |

---

## 📡 API — Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/health` | Verifica se o servidor está online |
| `POST` | `/api/auth/register` | Cria novo usuário (`role: user`) |
| `POST` | `/api/auth/login` | Autentica e retorna JWT + role |

### POST `/api/auth/register`

```json
// Body
{ "name": "Seu Nome", "email": "seu@email.com", "password": "minimo6" }

// Resposta 201
{ "message": "Usuário criado com sucesso.", "userId": 1 }
```

### POST `/api/auth/login`

```json
// Body
{ "email": "seu@email.com", "password": "suasenha" }

// Resposta 200
{
  "message": "Login realizado com sucesso.",
  "token": "eyJhbGci...",
  "user": { "id": 1, "name": "Marco", "email": "seu@email.com", "role": "admin" }
}
```

O campo `role` pode ser `"user"` ou `"admin"`. O admin recebe `role: "admin"` no JWT e na resposta.

---

## 🗄️ Banco de Dados

**Tabela `users`**

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | INT UNSIGNED AUTO_INCREMENT | Chave primária |
| `name` | VARCHAR(120) | Nome do usuário |
| `email` | VARCHAR(255) UNIQUE | E-mail único |
| `password` | VARCHAR(255) | Hash bcrypt (12 rounds) |
| `role` | ENUM('user','admin') | Permissão — padrão: `user` |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Última atualização |

---

## 🔊 Sistema de Voz — Web Speech API

A voz de boas-vindas usa a **Web Speech API**, nativa dos navegadores modernos. Nenhuma biblioteca externa é necessária.

### Como funciona

```javascript
// Cria a mensagem de fala
const fala = new SpeechSynthesisUtterance('Bem-vindo de volta, Marco');
fala.lang  = 'pt-BR';   // idioma
fala.rate  = 0.88;      // velocidade (0.1 = lento, 2.0 = rápido)
fala.pitch = 1.05;      // tom (0 = grave, 2 = agudo)
fala.voice = vozEscolhida; // voz específica (opcional)

window.speechSynthesis.speak(fala);
```

### Como ver todas as vozes disponíveis no seu computador

Abra o console do navegador (F12) e execute:

```javascript
// Lista todas as vozes instaladas
window.speechSynthesis.getVoices().forEach((v, i) => {
    console.log(i, v.name, v.lang);
});
```

### Como trocar a voz no projeto

Abra `front-end/main.js` e localize o trecho `exibirBoasVindas`. Altere o filtro de escolha de voz:

```javascript
// Exemplo: usar uma voz específica pelo nome exato
const vozes = window.speechSynthesis.getVoices();

// Opção 1 — primeira voz pt-BR disponível (padrão atual)
const vozEscolhida = vozes.find(v => v.lang === 'pt-BR');

// Opção 2 — voz pelo nome exato (use o console para ver os nomes)
const vozEscolhida = vozes.find(v => v.name === 'Microsoft Daniel - Portuguese (Brazil)');

// Opção 3 — qualquer voz em português
const vozEscolhida = vozes.find(v => v.lang.startsWith('pt'));

// Opção 4 — voz em inglês (para testar)
const vozEscolhida = vozes.find(v => v.lang === 'en-US');
```

### Ajustar velocidade e tom

Ainda dentro de `exibirBoasVindas` em `main.js`:

```javascript
fala.rate  = 0.88;  // 0.5 = bem lento | 1.0 = normal | 1.5 = rápido
fala.pitch = 1.05;  // 0.5 = grave/rouco | 1.0 = normal | 1.8 = agudo
```

### Compatibilidade

| Navegador | Suporte |
|---|---|
| Chrome / Edge | ✅ Completo (mais vozes disponíveis) |
| Firefox | ✅ Funcional |
| Safari | ✅ Funcional no macOS/iOS |
| Opera | ✅ Funcional |

> Chrome e Edge têm acesso a vozes do sistema operacional e vozes online do Google — mais opções de qualidade.

---

## 🔒 Segurança

| Prática | Status |
|---|---|
| Senhas com bcrypt 12 rounds | ✅ |
| JWT com expiração de 7 dias | ✅ |
| Validação server-side (express-validator) | ✅ |
| Mensagem genérica no login (não revela e-mail) | ✅ |
| `.env` no `.gitignore` | ✅ |
| `.env.example` sem credenciais reais | ✅ |
| Senha do admin nunca armazenada em texto puro | ✅ |
| JWT_SECRET deve ser longo e aleatório | ⚠️ Gere um forte antes de subir para produção |
| CORS restrito em produção | ⚠️ Substituir `origin: '*'` pela URL real do front-end |
| HTTPS em produção | ⚠️ Obrigatório para proteger tokens e senhas |

---

## 🛠️ Tecnologias

### Front-end
- **HTML5 / CSS3 / JavaScript ES2022** — sem frameworks
- [Materialize CSS 1.0](https://materializecss.com/) — carousel de imagens
- [Typed.js 2.0](https://mattboldt.com/demos/typed-js/) — animação de texto no título
- [Bootstrap Icons 1.11](https://icons.getbootstrap.com/) — ícones da interface
- [Google Fonts](https://fonts.google.com/) — Racing Sans One + Roboto
- **Web Speech API** — voz de boas-vindas (nativa do navegador)

### Back-end
- [Node.js](https://nodejs.org/) + [Express 4](https://expressjs.com/) — servidor HTTP
- [MySQL2](https://github.com/sidorares/node-mysql2) — driver MySQL com Promises e pool de conexões
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — hash de senhas (12 rounds)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — tokens JWT (RS256, expira em 7 dias)
- [express-validator](https://express-validator.github.io/) — validação e sanitização de inputs
- [dotenv](https://github.com/motdotla/dotenv) — variáveis de ambiente
- [cors](https://github.com/expressjs/cors) — controle de origens permitidas
- [nodemon](https://nodemon.io/) — recarga automática em desenvolvimento

---

## 📌 Observações

- `mclaren-5.mp4` não estava disponível; `trailer-3.mp4` é usado como substituto para o 750S Spider.
- O McLaren Senna (6º modelo) usa `mclaren-4.mp4` como vídeo de fundo — não há vídeo específico disponível.
- O áudio do player de música vem de um elemento `<video>` oculto apontando para `trailer-1.mp4`.
- O `trailer-1.mp4` também é exibido como vídeo de fundo na abertura do site (mudo); o áudio só toca quando o usuário clica no botão de música.
- O token JWT e o nome do usuário são salvos no `localStorage` do navegador após o login.
- Para trocar a mensagem da voz, edite a string dentro de `exibirBoasVindas()` em `main.js`.
- A URL do ngrok muda a cada reinicialização (plano gratuito). Atualize `API_URL` em `main.js` e faça `git push` para manter o Vercel sincronizado.
