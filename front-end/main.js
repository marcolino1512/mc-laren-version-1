// ============================================================
// 🚀 McLaren Projeto-Beta — main.js
// ============================================================

// ────────────────────────────────────────────────────────────
// 🔤 TYPED.JS — Animação de texto rotativo no título "Mc___"
// ────────────────────────────────────────────────────────────
const typed = new Typed('.multiple-text', {
    strings: ['Laren', 'SuperCars', 'HiperCars'],
    typeSpeed:  150,
    backSpeed:  150,
    backDelay:  1000,
    loop:       true
});

// ────────────────────────────────────────────────────────────
// 📝 DESCRIÇÕES POR CARRO — atualizadas ao trocar o vídeo
// ────────────────────────────────────────────────────────────
const carDescriptions = {
    'trailer-1': 'O poder, a precisão e a paixão que definem cada McLaren. Uma experiência audiovisual que captura a essência do automobilismo mais exclusivo do mundo.',
    'mclaren-1': 'Motor V8 biturbo de 4.0L com 765cv. Capota conversível, aerodinâmica Longtail e exclusividade máxima. Um dos McLarens mais raros já produzidos.',
    'mclaren-2': 'O futuro híbrido da McLaren: motor V6 biturbo + elétrico com 680cv combinados. Tecnologia de F1 em um supercar de nova geração com emissões reduzidas.',
    'mclaren-3': 'V8 biturbo com 750cv e 800Nm de torque. Mais leve e potente que qualquer predecessor, com suspensão hidráulica de nova geração para máximo prazer ao volante.',
    'mclaren-4': 'Apenas 1.229kg e 765cv — a definição de Longtail extremo. Escapamento central em titânio, pinças de freio derivadas da F1 e aerodinâmica desenvolvida nas pistas.',
    'mclaren-5': 'A essência do 750S sem o teto. Capota retrátil em 11 segundos, chassi MonoCell II-T em fibra de carbono e 750cv de pura liberdade ao ar livre.',
    'mclaren-6': '800cv, 1.198kg e até 800kg de downforce. Apenas 500 unidades no mundo. Homenagem ao maior piloto de todos os tempos — o McLaren mais extremo já homologado para as ruas.'
};

// ────────────────────────────────────────────────────────────
// 🎵 PLAYER DE MÚSICA — usa o áudio do trailer-1.mp4
// ────────────────────────────────────────────────────────────
const botaoMusica  = document.getElementById('play_btn');
const musicaIcon   = document.getElementById('music-icon');
const trailerAudio = document.getElementById('trailer-audio');

botaoMusica.addEventListener('click', async (e) => {
    e.preventDefault();
    if (trailerAudio.paused) {
        try {
            await trailerAudio.play();
            // 🔊 Ícone preenchido = música tocando
            musicaIcon.className = 'bi bi-music-player-fill';
            botaoMusica.style.color = 'var(--primary)';
        } catch {
            // Autoplay bloqueado pelo navegador — tenta novamente no próximo clique
        }
    } else {
        trailerAudio.pause();
        // 🔇 Ícone vazio = música pausada
        musicaIcon.className = 'bi bi-music-player';
        botaoMusica.style.color = '';
    }
});

// ────────────────────────────────────────────────────────────
// 📱 MENU MOBILE — abre e fecha o menu hambúrguer
// ────────────────────────────────────────────────────────────
function AlterarMenu() {
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('.nav').classList.toggle('active');
}

// ────────────────────────────────────────────────────────────
// 🎬 TROCA DE VÍDEO — muda vídeo de fundo, nome e descrição
// ────────────────────────────────────────────────────────────
const carrossel = ['trailer-1', 'mclaren-1', 'mclaren-2', 'mclaren-3', 'mclaren-4', 'mclaren-5', 'mclaren-6'];
let carAtual = 0;

function TrocaVideo(name) {
    // 📽️ Troca o vídeo ativo
    document.querySelectorAll('.bg-video').forEach(video => {
        video.classList.toggle('active', video.classList.contains(name));
    });

    // 🏷️ Troca o nome do modelo ativo
    document.querySelectorAll('.model').forEach(model => {
        model.classList.toggle('active', model.classList.contains(name));
    });

    // 📝 Atualiza a descrição do carro
    const descEl = document.getElementById('car-description');
    if (descEl && carDescriptions[name]) {
        descEl.textContent = carDescriptions[name];
    }

    // 🔢 Mantém o índice sincronizado para o auto-carousel
    const idx = carrossel.indexOf(name);
    if (idx !== -1) carAtual = idx;
}

// ────────────────────────────────────────────────────────────
// 🎠 AUTO-CAROUSEL — avança sozinho a cada 4 segundos
// Se o usuário clicar num item, o próximo ciclo parte dali
// ────────────────────────────────────────────────────────────
function proximoCarro() {
    carAtual = (carAtual + 1) % carrossel.length;
    TrocaVideo(carrossel[carAtual]);
    $('.carousel').carousel('next');
}

setInterval(proximoCarro, 10000);

// ────────────────────────────────────────────────────────────
// 🎯 SELECIONAR CARRO — nav → troca vídeo + spotlight + scroll
// ────────────────────────────────────────────────────────────
function selecionarCarro(name) {
    // 🎬 Troca o vídeo de fundo e o título no hero
    TrocaVideo(name);

    // 🔦 Ativa o modo spotlight na seção de modelos
    const grid = document.querySelector('.models-grid');
    grid.classList.add('spotlight');

    // Limpa seleção anterior e marca o card correto
    document.querySelectorAll('.model-card').forEach(card => {
        card.classList.remove('selected');
    });
    const cardSelecionado = document.querySelector(`.model-card[data-car="${name}"]`);
    if (cardSelecionado) cardSelecionado.classList.add('selected');

    // 🔙 Exibe o botão "Ver todos"
    document.getElementById('btn-ver-todos').classList.add('visible');

    // 📍 Rola suavemente para a seção de modelos
    document.getElementById('modelos').scrollIntoView({ behavior: 'smooth' });

    // 📱 Fecha o menu mobile se estiver aberto
    document.querySelector('.menu').classList.remove('active');
    document.querySelector('.nav').classList.remove('active');
}

// ────────────────────────────────────────────────────────────
// 🔄 VER TODOS — sai do modo spotlight, volta ao grid completo
// ────────────────────────────────────────────────────────────
function verTodos() {
    document.querySelector('.models-grid').classList.remove('spotlight');
    document.querySelectorAll('.model-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('btn-ver-todos').classList.remove('visible');
}

// ────────────────────────────────────────────────────────────
// ⏯️ CONTROLES DO VÍDEO DE FUNDO — play e pause
// ────────────────────────────────────────────────────────────
function toggleplay() {
    document.querySelector('.play').classList.toggle('active');
    document.querySelector('.pause').classList.toggle('active');
}

function pauseVideo() {
    // ⏸️ Pausa todos os vídeos de fundo
    document.querySelectorAll('.bg-video').forEach(v => v.pause());
    toggleplay();
}

function playVideo() {
    // ▶️ Retoma todos os vídeos de fundo
    document.querySelectorAll('.bg-video').forEach(v => v.play());
    toggleplay();
}

// ────────────────────────────────────────────────────────────
// 👋 BOAS-VINDAS — toast central + voz (Web Speech API)
// ────────────────────────────────────────────────────────────
function exibirBoasVindas(nome) {
    // 🖥️ Mostra o toast com o nome no centro da tela
    const toast = document.getElementById('welcome-toast');
    document.getElementById('welcome-name').textContent = nome;
    toast.classList.add('active');

    // ⏳ Esconde o toast após 4 segundos
    setTimeout(() => toast.classList.remove('active'), 4000);

    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // 🎤 Monta e dispara a fala, esperando as vozes carregarem se necessário
    function falar() {
        const fala = new SpeechSynthesisUtterance(`Bem-vindo de volta, ${nome}`);
        fala.lang  = 'pt-BR';
        fala.rate  = 0.88;
        fala.pitch = 1.05;

        const vozes = window.speechSynthesis.getVoices();
        const vozPT = vozes.find(v => v.name === 'Microsoft Maria - Portuguese (Brazil)')
                   || vozes.find(v => v.lang === 'pt-BR')
                   || vozes.find(v => v.lang.startsWith('pt'));
        if (vozPT) fala.voice = vozPT;

        window.speechSynthesis.speak(fala);
    }

    // 🔊 Vozes já disponíveis → fala agora; senão aguarda o evento
    if (window.speechSynthesis.getVoices().length > 0) {
        falar();
    } else {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.onvoiceschanged = null;
            falar();
        };
    }
}

// 🏅 Mostra o badge de usuário no header
function mostrarBadge(nome) {
    document.getElementById('badge-name').textContent = nome;
    document.getElementById('user-badge').classList.add('visible');
}

// 🚪 Logout — limpa sessão e volta ao estado de visitante
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    document.getElementById('user-badge').classList.remove('visible');
    document.getElementById('badge-name').textContent = '';
}

// 🔍 Verifica ao carregar se o usuário já estava logado
window.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('userName');
    if (nome) mostrarBadge(nome);
});

// ────────────────────────────────────────────────────────────
// 🔐 MODAL — abre, fecha e alterna abas de Login/Registro
// ────────────────────────────────────────────────────────────
const modalOverlay = document.getElementById('modal-overlay');

function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    clearAlert();
}

// 🖱️ Clique fora do conteúdo fecha o modal
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// ⌨️ ESC fecha o modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

function switchTab(tab) {
    const isLogin = (tab === 'login');

    // 🔄 Alterna formulários
    document.getElementById('form-login').classList.toggle('hidden', !isLogin);
    document.getElementById('form-register').classList.toggle('hidden', isLogin);

    // 🔄 Alterna estado dos botões
    document.getElementById('tab-login').classList.toggle('active', isLogin);
    document.getElementById('tab-register').classList.toggle('active', !isLogin);

    clearAlert();
}

// ────────────────────────────────────────────────────────────
// 💬 ALERTAS NO MODAL — exibe mensagem de erro ou sucesso
// ────────────────────────────────────────────────────────────
function showAlert(msg, type = 'error') {
    const el = document.getElementById('alert-msg');
    el.textContent = msg;
    el.className   = 'alert-msg ' + type;
}

function clearAlert() {
    const el = document.getElementById('alert-msg');
    el.textContent = '';
    el.className   = 'alert-msg';
}

// ────────────────────────────────────────────────────────────
// 📡 API — URL base do back-end (ajuste a porta se necessário)
// ────────────────────────────────────────────────────────────
const API_URL = 'https://ergonomic-trailside-securely.ngrok-free.dev/api';

// ────────────────────────────────────────────────────────────
// 📨 FORMULÁRIO DE LOGIN — envia credenciais para a API
// ────────────────────────────────────────────────────────────
document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 🔓 Desbloqueia a síntese de voz enquanto ainda estamos no gesto do usuário
    // (Chrome bloqueia speechSynthesis chamado depois de await fetch)
    if (window.speechSynthesis) {
        const unlock = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(unlock);
        window.speechSynthesis.cancel();
    }

    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
        const res  = await fetch(`${API_URL}/auth/login`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            // 🎉 Login bem-sucedido — salva token e exibe boas-vindas
            localStorage.setItem('token',    data.token);
            localStorage.setItem('userName', data.user.name);
            closeModal();
            mostrarBadge(data.user.name);
            exibirBoasVindas(data.user.name);
        } else {
            showAlert(data.message || 'Erro ao fazer login.');
        }
    } catch {
        // 🔌 API offline ou sem conexão
        showAlert('Não foi possível conectar ao servidor. Verifique se o back-end está rodando.');
    }
});

// ────────────────────────────────────────────────────────────
// 📝 FORMULÁRIO DE REGISTRO — cria nova conta via API
// ────────────────────────────────────────────────────────────
document.getElementById('form-register').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name     = document.getElementById('reg-name').value.trim();
    const email    = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm  = document.getElementById('reg-confirm').value;

    // ✔️ Validações no cliente
    if (password !== confirm) {
        showAlert('As senhas não coincidem.');
        return;
    }
    if (password.length < 6) {
        showAlert('A senha deve ter no mínimo 6 caracteres.');
        return;
    }

    try {
        const res  = await fetch(`${API_URL}/auth/register`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (res.ok) {
            // ✅ Registro bem-sucedido — redireciona para login
            showAlert('Conta criada com sucesso! Faça login para continuar.', 'success');
            document.getElementById('form-register').reset();
            setTimeout(() => switchTab('login'), 1800);
        } else {
            showAlert(data.message || 'Erro ao criar conta.');
        }
    } catch {
        // 🔌 API offline ou sem conexão
        showAlert('Não foi possível conectar ao servidor. Verifique se o back-end está rodando.');
    }
});
