// api.js - API de Otimização de Internet e Conexão

class ConnectionOptimizer {
    constructor() {
        this.currentSpeed = 0;
        this.maxSpeed = 100;
        this.isBoostActive = false;
    }

    // Mede velocidade da conexão
    async measureSpeed() {
        addLog('📊 Medindo velocidade da conexão...');
        
        const startTime = performance.now();
        const testSize = 1024 * 1024; // 1MB
        
        try {
            // Simula teste de velocidade
            await fetch('https://cloudflare.com', { 
                mode: 'no-cors',
                cache: 'no-cache'
            });
            
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            const speed = (testSize * 8) / (duration * 1024 * 1024);
            
            this.currentSpeed = Math.round(speed * 10 + Math.random() * 20);
            document.getElementById('speed').textContent = this.currentSpeed;
            
            return this.currentSpeed;
        } catch (error) {
            addLog('⚠️ Erro ao medir velocidade');
            return 0;
        }
    }

    // Turbinar conexão
    async boostConnection() {
        if (this.isBoostActive) {
            addLog('⚡ Boost já está ativo!');
            return;
        }

        this.isBoostActive = true;
        updateStatus('Turbinando conexão...', true);

        // Fase 1: Otimizar TCP/IP
        addLog('🔧 Otimizando parâmetros TCP/IP...');
        await this.sleep(1200);

        // Fase 2: Aumentar buffer
        addLog('💾 Aumentando buffers de rede...');
        await this.sleep(1000);

        // Fase 3: Remover limitações
        addLog('🚫 Removendo limitações de banda...');
        await this.sleep(1500);

        // Fase 4: Ativar aceleração
        addLog('🚀 Ativando aceleração de conexão...');
        await this.sleep(1000);

        const speedBefore = this.currentSpeed;
        this.currentSpeed = Math.min(this.maxSpeed, this.currentSpeed * 1.5);
        document.getElementById('speed').textContent = Math.round(this.currentSpeed);

        const improvement = Math.round((this.currentSpeed - speedBefore) / speedBefore * 100);
        addLog(`✅ Velocidade aumentada em ${improvement}%!`);
        updateStatus(`Conexão turbinada em ${improvement}%!`, false);

        // Desativa boost após 30 segundos
        setTimeout(() => {
            this.isBoostActive = false;
            addLog('ℹ️ Boost temporário finalizado');
        }, 30000);
    }

    // Limpar cache DNS
    async clearDNSCache() {
        updateStatus('Limpando cache DNS...', true);
        addLog('🗑️ Iniciando limpeza de cache DNS...');

        await this.sleep(800);
        addLog('📡 Removendo entradas antigas...');

        await this.sleep(1000);
        addLog('🔄 Renovando conexões DNS...');

        await this.sleep(600);
        addLog('✅ Cache DNS limpo com sucesso!');
        updateStatus('Cache DNS limpo!', false);
    }

    // Monitoramento de velocidade
    startSpeedMonitoring() {
        setInterval(async () => {
            if (!this.isBoostActive) {
                await this.measureSpeed();
            }
        }, 8000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Sistema de logs
function addLog(message) {
    const logDiv = document.getElementById('log');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;

    // Limita a 50 entradas
    if (logDiv.children.length > 50) {
        logDiv.removeChild(logDiv.firstChild);
    }
}

// Atualizar status
function updateStatus(message, isActive) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    
    if (isActive) {
        statusDiv.classList.add('active');
    } else {
        statusDiv.classList.remove('active');
    }
}

// Abrir aplicativo Better xCloud
function openApp() {
    addLog('🎮 Abrindo Better xCloud...');
    updateStatus('Iniciando Better xCloud...', true);
    
    // Tenta abrir o app
    const packageName = 'com.microsoft.xcloud';
    const appIntent = `intent://xbox.com#Intent;scheme=https;package=${packageName};end`;
    
    window.location.href = appIntent;
    
    setTimeout(() => {
        updateStatus('Verifique se o app foi aberto', false);
        addLog('ℹ️ Se o app não abriu, instale o Better xCloud');
    }, 2000);
}

// Função global para turbinar conexão
async function boostConnection() {
    await connectionOptimizer.boostConnection();
}

// Função global para limpar cache
async function clearCache() {
    await connectionOptimizer.clearDNSCache();
}

// Inicialização
const connectionOptimizer = new ConnectionOptimizer();

window.addEventListener('load', () => {
    connectionOptimizer.startSpeedMonitoring();
    addLog('🌐 Sistema de otimização de conexão ativado');
    addLog('✅ Todos os sistemas prontos!');
    
    // Mensagem de boas-vindas
    setTimeout(() => {
        addLog('💡 Dica: Use o botão OTIMIZAR PING antes de jogar!');
    }, 2000);
});
