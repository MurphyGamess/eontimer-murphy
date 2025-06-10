/**
 * 🎾 SISTEMA DE DESCARGA AUTOMÁTICA DE POKEMON GIFS
 * Descarga todos los sprites de Pokemon Showdown automáticamente
 * URLs: https://play.pokemonshowdown.com/sprites/ani/ (normales)
 *       https://play.pokemonshowdown.com/sprites/ani-shiny/ (shiny)
 */

class PokemonDownloader {
    constructor() {
        this.baseUrls = {
            normal: 'https://play.pokemonshowdown.com/sprites/ani/',
            shiny: 'https://play.pokemonshowdown.com/sprites/ani-shiny/'
        };
        
        this.paths = {
            normal: 'resources/sprites/ani/',
            shiny: 'resources/sprites/ani-shiny/'
        };
        
        this.downloadStatus = {
            normal: { total: 0, downloaded: 0, failed: [] },
            shiny: { total: 0, downloaded: 0, failed: [] }
        };
        
        this.isDownloading = false;
        this.config = this.loadConfig();
    }
    
    // 📁 CARGAR CONFIGURACIÓN
    loadConfig() {
        try {
            if (typeof require !== 'undefined') {
                const fs = require('fs');
                const configPath = 'config/settings.json';
                if (fs.existsSync(configPath)) {
                    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                    return config;
                }
            }
        } catch (error) {
            console.log('⚠️ Config not found, using defaults');
        }
        
        return {
            firstTimeSetup: false,
            pokemonDownloaded: false,
            lastDownloadAttempt: null
        };
    }
    
    // 💾 GUARDAR CONFIGURACIÓN
    saveConfig() {
        try {
            if (typeof require !== 'undefined') {
                const fs = require('fs');
                const path = require('path');
                
                // Crear directorio config si no existe
                const configDir = 'config';
                if (!fs.existsSync(configDir)) {
                    fs.mkdirSync(configDir, { recursive: true });
                }
                
                // Guardar configuración
                const configPath = path.join(configDir, 'settings.json');
                fs.writeFileSync(configPath, JSON.stringify(this.config, null, 2));
                console.log('✅ Config saved successfully');
            }
        } catch (error) {
            console.error('❌ Error saving config:', error);
        }
    }
    
    // 🔍 VERIFICAR SI ES PRIMERA VEZ
    async checkFirstTime() {
        if (this.config.pokemonDownloaded) {
            console.log('✅ Pokemon already downloaded, skipping...');
            return false;
        }
        
        // Verificar si las carpetas existen y tienen archivos
        try {
            if (typeof require !== 'undefined') {
                const fs = require('fs');
                const normalExists = fs.existsSync(this.paths.normal) && 
                                    fs.readdirSync(this.paths.normal).length > 10;
                const shinyExists = fs.existsSync(this.paths.shiny) && 
                                   fs.readdirSync(this.paths.shiny).length > 10;
                
                if (normalExists && shinyExists) {
                    console.log('✅ Pokemon sprites found locally');
                    this.config.pokemonDownloaded = true;
                    this.saveConfig();
                    return false;
                }
            }
        } catch (error) {
            console.log('🔍 Unable to check local files, proceeding with download check');
        }
        
        return true;
    }
    
    // 🌐 OBTENER LISTA DE POKEMON DESDE SERVIDOR
    async fetchPokemonList(type = 'normal') {
        try {
            console.log(`🔍 Fetching ${type} Pokemon list...`);
            const url = this.baseUrls[type];
            
            const response = await fetch(url);
            const html = await response.text();
            
            // Extraer nombres de archivos .gif del HTML
            const gifMatches = html.match(/href="([^"]+\.gif)"/g);
            if (!gifMatches) {
                throw new Error(`No GIF files found in ${type} directory`);
            }
            
            const pokemonList = gifMatches
                .map(match => match.match(/href="([^"]+\.gif)"/)[1])
                .filter(filename => filename.endsWith('.gif'))
                .map(filename => filename.replace('.gif', ''));
            
            console.log(`✅ Found ${pokemonList.length} ${type} Pokemon`);
            this.downloadStatus[type].total = pokemonList.length;
            
            return pokemonList;
        } catch (error) {
            console.error(`❌ Error fetching ${type} Pokemon list:`, error);
            this.showErrorAlert(`Error fetching ${type} Pokemon list: ${error.message}`);
            return [];
        }
    }
    
    // 📥 DESCARGAR UN POKEMON INDIVIDUAL
    async downloadPokemon(pokemonName, type = 'normal', retries = 3) {
        const url = `${this.baseUrls[type]}${pokemonName}.gif`;
        const localPath = `${this.paths[type]}${pokemonName}.gif`;
        
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`📥 Downloading ${type} ${pokemonName} (attempt ${attempt}/${retries})`);
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const arrayBuffer = await response.arrayBuffer();
                
                // En el navegador, no podemos escribir archivos directamente
                // Esto funciona en Electron con Node.js
                if (typeof require !== 'undefined') {
                    const fs = require('fs');
                    const path = require('path');
                    const buffer = Buffer.from(arrayBuffer);
                    
                    // Crear directorio si no existe
                    const dir = path.dirname(localPath);
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    
                    // Guardar archivo
                    fs.writeFileSync(localPath, buffer);
                }
                
                this.downloadStatus[type].downloaded++;
                this.updateProgressUI();
                
                console.log(`✅ Downloaded: ${pokemonName}.gif`);
                return true;
                
            } catch (error) {
                console.error(`❌ Attempt ${attempt} failed for ${pokemonName}:`, error.message);
                
                if (attempt === retries) {
                    this.downloadStatus[type].failed.push({
                        name: pokemonName,
                        error: error.message,
                        url: url
                    });
                    return false;
                }
                
                // Esperar antes del siguiente intento
                await this.sleep(1000 * attempt);
            }
        }
        
        return false;
    }
    
    // 🎯 DESCARGA MASIVA DE POKEMON
    async downloadAllPokemon(type = 'normal') {
        const pokemonList = await this.fetchPokemonList(type);
        if (pokemonList.length === 0) {
            return false;
        }
        
        console.log(`🚀 Starting ${type} Pokemon download (${pokemonList.length} files)`);
        
        // Descarga concurrente con límite
        const concurrentLimit = 3;
        const chunks = this.chunkArray(pokemonList, concurrentLimit);
        
        for (const chunk of chunks) {
            const promises = chunk.map(pokemon => 
                this.downloadPokemon(pokemon, type)
            );
            
            await Promise.all(promises);
            
            // Pequeña pausa entre chunks para no sobrecargar el servidor
            await this.sleep(800);
        }
        
        const { downloaded, failed, total } = this.downloadStatus[type];
        console.log(`📊 ${type} download complete: ${downloaded}/${total} successful, ${failed.length} failed`);
        
        return failed.length === 0;
    }
    
    // 🎨 CREAR UI DE PROGRESO
    createProgressUI() {
        // Eliminar UI existente si existe
        const existingUI = document.getElementById('pokemon-download-ui');
        if (existingUI) {
            existingUI.remove();
        }
        
        const progressUI = document.createElement('div');
        progressUI.id = 'pokemon-download-ui';
        progressUI.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            color: white;
            padding: 30px;
            border-radius: 15px;
            border: 2px solid #ffd700;
            box-shadow: 0 0 30px rgba(255,215,0,0.3);
            z-index: 999999;
            min-width: 400px;
            text-align: center;
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        
        progressUI.innerHTML = `
            <h3 style="margin: 0 0 20px 0; color: #ffd700;">
                🎾 Descargando Pokemon Sprites
            </h3>
            <div style="margin-bottom: 15px;">
                <div style="font-size: 14px; margin-bottom: 5px;">Pokemon Normales</div>
                <div class="progress-bar" style="background: #333; height: 20px; border-radius: 10px; overflow: hidden;">
                    <div id="normal-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #4CAF50, #45a049); transition: width 0.3s ease;"></div>
                </div>
                <div id="normal-status" style="font-size: 12px; margin-top: 5px; opacity: 0.8;">0/0</div>
            </div>
            <div style="margin-bottom: 20px;">
                <div style="font-size: 14px; margin-bottom: 5px;">Pokemon Shiny</div>
                <div class="progress-bar" style="background: #333; height: 20px; border-radius: 10px; overflow: hidden;">
                    <div id="shiny-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #FFD700, #FFA500); transition: width 0.3s ease;"></div>
                </div>
                <div id="shiny-status" style="font-size: 12px; margin-top: 5px; opacity: 0.8;">0/0</div>
            </div>
            <div id="current-download" style="font-size: 13px; opacity: 0.7; margin-bottom: 15px;">
                Inicializando descarga...
            </div>
            <div style="font-size: 12px; opacity: 0.6;">
                Esto puede tomar varios minutos. No cierres la aplicación.
            </div>
        `;
        
        document.body.appendChild(progressUI);
        return progressUI;
    }
    
    // 📊 ACTUALIZAR UI DE PROGRESO
    updateProgressUI() {
        const normalProgress = document.getElementById('normal-progress');
        const shinyProgress = document.getElementById('shiny-progress');
        const normalStatus = document.getElementById('normal-status');
        const shinyStatus = document.getElementById('shiny-status');
        const currentDownload = document.getElementById('current-download');
        
        if (normalProgress && this.downloadStatus.normal.total > 0) {
            const normalPercent = (this.downloadStatus.normal.downloaded / this.downloadStatus.normal.total) * 100;
            normalProgress.style.width = `${normalPercent}%`;
            normalStatus.textContent = `${this.downloadStatus.normal.downloaded}/${this.downloadStatus.normal.total}`;
        }
        
        if (shinyProgress && this.downloadStatus.shiny.total > 0) {
            const shinyPercent = (this.downloadStatus.shiny.downloaded / this.downloadStatus.shiny.total) * 100;
            shinyProgress.style.width = `${shinyPercent}%`;
            shinyStatus.textContent = `${this.downloadStatus.shiny.downloaded}/${this.downloadStatus.shiny.total}`;
        }
        
        if (currentDownload) {
            const totalDownloaded = this.downloadStatus.normal.downloaded + this.downloadStatus.shiny.downloaded;
            const totalFiles = this.downloadStatus.normal.total + this.downloadStatus.shiny.total;
            currentDownload.textContent = `Descargando... ${totalDownloaded}/${totalFiles} archivos completados`;
        }
    }
    
    // 🚨 MOSTRAR ALERTA DE ERROR/FALTANTES
    showMissingPokemonAlert() {
        const normalFailed = this.downloadStatus.normal.failed;
        const shinyFailed = this.downloadStatus.shiny.failed;
        
        if (normalFailed.length === 0 && shinyFailed.length === 0) {
            return;
        }
        
        // Crear burbuja de alerta
        const alertBubble = document.createElement('div');
        alertBubble.id = 'pokemon-missing-alert';
        alertBubble.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff4444, #cc0000);
            color: white;
            padding: 15px 20px;
            border-radius: 25px;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 15px rgba(255,68,68,0.4);
            z-index: 999999;
            cursor: pointer;
            transition: all 0.3s ease;
            max-width: 300px;
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        
        const totalFailed = normalFailed.length + shinyFailed.length;
        alertBubble.innerHTML = `
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 5px;">
                ⚠️ Pokemon Faltantes (${totalFailed})
            </div>
            <div style="font-size: 12px; opacity: 0.9;">
                Click para ver detalles y soluciones
            </div>
        `;
        
        // Hover effect
        alertBubble.addEventListener('mouseenter', () => {
            alertBubble.style.transform = 'scale(1.05)';
            alertBubble.style.boxShadow = '0 6px 20px rgba(255,68,68,0.6)';
        });
        
        alertBubble.addEventListener('mouseleave', () => {
            alertBubble.style.transform = 'scale(1)';
            alertBubble.style.boxShadow = '0 4px 15px rgba(255,68,68,0.4)';
        });
        
        // Click para mostrar detalles
        alertBubble.addEventListener('click', () => {
            this.showDetailedMissingDialog(normalFailed, shinyFailed);
        });
        
        document.body.appendChild(alertBubble);
    }
    
    // 📋 DIÁLOGO DETALLADO DE POKEMON FALTANTES
    showDetailedMissingDialog(normalFailed, shinyFailed) {
        const dialog = document.createElement('div');
        dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999999;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            color: white;
            padding: 30px;
            border-radius: 15px;
            border: 2px solid #ffd700;
            max-width: 600px;
            max-height: 70vh;
            overflow-y: auto;
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        
        let failedList = '';
        
        if (normalFailed.length > 0) {
            failedList += `<h4 style="color: #ff6b6b; margin: 15px 0 10px 0;">Pokemon Normales Faltantes (${normalFailed.length}):</h4>`;
            failedList += '<ul style="margin: 0; padding-left: 20px; font-size: 13px;">';
            normalFailed.forEach(pokemon => {
                failedList += `<li style="margin: 5px 0;">${pokemon.name} - ${pokemon.error}</li>`;
            });
            failedList += '</ul>';
        }
        
        if (shinyFailed.length > 0) {
            failedList += `<h4 style="color: #ffd700; margin: 15px 0 10px 0;">Pokemon Shiny Faltantes (${shinyFailed.length}):</h4>`;
            failedList += '<ul style="margin: 0; padding-left: 20px; font-size: 13px;">';
            shinyFailed.forEach(pokemon => {
                failedList += `<li style="margin: 5px 0;">${pokemon.name} - ${pokemon.error}</li>`;
            });
            failedList += '</ul>';
        }
        
        content.innerHTML = `
            <h3 style="margin: 0 0 20px 0; color: #ffd700; text-align: center;">
                ⚠️ Pokemon Faltantes por Descargar
            </h3>
            ${failedList}
            <div style="margin: 20px 0; padding: 15px; background: rgba(255,215,0,0.1); border-radius: 8px; border-left: 4px solid #ffd700;">
                <h4 style="margin: 0 0 10px 0; color: #ffd700;">📝 Soluciones:</h4>
                <ol style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.5;">
                    <li><strong>Descarga Manual:</strong> Ve al README.md para instrucciones detalladas</li>
                    <li><strong>Reintentar:</strong> Reinicia la aplicación para intentar descargar nuevamente</li>
                    <li><strong>Verificar Conexión:</strong> Asegúrate de tener conexión a internet estable</li>
                    <li><strong>Descarga Directa:</strong> Visita los enlaces en el README para descarga manual</li>
                </ol>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button id="retry-download" style="
                    background: linear-gradient(135deg, #4CAF50, #45a049);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-right: 10px;
                    font-size: 14px;
                ">🔄 Reintentar Descarga</button>
                <button id="close-dialog" style="
                    background: linear-gradient(135deg, #666, #555);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                ">✖️ Cerrar</button>
            </div>
        `;
        
        dialog.appendChild(content);
        
        // Event listeners
        content.querySelector('#close-dialog').addEventListener('click', () => {
            dialog.remove();
        });
        
        content.querySelector('#retry-download').addEventListener('click', () => {
            dialog.remove();
            this.startDownload();
        });
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
        
        document.body.appendChild(dialog);
    }
    
    // 🚨 MOSTRAR ALERTA DE ERROR GENERAL
    showErrorAlert(message) {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff4444, #cc0000);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            border: 2px solid #ffffff;
            z-index: 999999;
            text-align: center;
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        
        alert.innerHTML = `
            <h4 style="margin: 0 0 10px 0;">❌ Error de Descarga</h4>
            <p style="margin: 0; font-size: 14px;">${message}</p>
            <button onclick="this.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                color: white;
                border: 1px solid white;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 15px;
            ">Cerrar</button>
        `;
        
        document.body.appendChild(alert);
        
        // Auto-remove después de 10 segundos
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 10000);
    }
    
    // ✅ COMPLETAR DESCARGA
    completeDownload() {
        console.log('🎉 Download process completed!');
        
        // Actualizar config
        this.config.pokemonDownloaded = true;
        this.config.lastDownloadAttempt = new Date().toISOString();
        this.saveConfig();
        
        // Remover UI de progreso
        const progressUI = document.getElementById('pokemon-download-ui');
        if (progressUI) {
            setTimeout(() => progressUI.remove(), 2000);
        }
        
        // Mostrar alerta de pokemon faltantes si los hay
        this.showMissingPokemonAlert();
        
        // Mostrar mensaje de éxito
        const totalDownloaded = this.downloadStatus.normal.downloaded + this.downloadStatus.shiny.downloaded;
        const totalFailed = this.downloadStatus.normal.failed.length + this.downloadStatus.shiny.failed.length;
        
        if (totalFailed === 0) {
            this.showSuccessMessage(totalDownloaded);
        }
    }
    
    // 🎉 MOSTRAR MENSAJE DE ÉXITO
    showSuccessMessage(totalDownloaded) {
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 25px 35px;
            border-radius: 15px;
            border: 2px solid #ffffff;
            z-index: 999999;
            text-align: center;
            font-family: 'Segoe UI', Arial, sans-serif;
            box-shadow: 0 0 30px rgba(76,175,80,0.4);
        `;
        
        successMsg.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #ffffff;">
                🎉 ¡Descarga Completada!
            </h3>
            <p style="margin: 0; font-size: 16px;">
                ${totalDownloaded} Pokemon sprites descargados exitosamente
            </p>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
                ¡Ya puedes disfrutar de todos los efectos Pokemon!
            </p>
        `;
        
        document.body.appendChild(successMsg);
        
        // Auto-remove después de 5 segundos
        setTimeout(() => {
            if (successMsg.parentElement) {
                successMsg.remove();
            }
        }, 5000);
    }
    
    // 🔄 INICIAR PROCESO DE DESCARGA
    async startDownload() {
        if (this.isDownloading) {
            console.log('⚠️ Download already in progress');
            return;
        }
        
        this.isDownloading = true;
        console.log('🚀 Starting Pokemon download process...');
        
        // Crear UI de progreso
        this.createProgressUI();
        
        try {
            // Resetear status
            this.downloadStatus = {
                normal: { total: 0, downloaded: 0, failed: [] },
                shiny: { total: 0, downloaded: 0, failed: [] }
            };
            
            // Descargar normales y shiny en paralelo
            const [normalSuccess, shinySuccess] = await Promise.all([
                this.downloadAllPokemon('normal'),
                this.downloadAllPokemon('shiny')
            ]);
            
            console.log(`📊 Download Results: Normal=${normalSuccess}, Shiny=${shinySuccess}`);
            
        } catch (error) {
            console.error('❌ Download process failed:', error);
            this.showErrorAlert(`Error en el proceso de descarga: ${error.message}`);
        } finally {
            this.isDownloading = false;
            this.completeDownload();
        }
    }
    
    // 🎯 FUNCIÓN PRINCIPAL - VERIFICAR Y DESCARGAR SI ES NECESARIO
    async init() {
        console.log('🔍 Checking if Pokemon download is needed...');
        
        const needsDownload = await this.checkFirstTime();
        if (needsDownload) {
            console.log('📥 First time setup - starting Pokemon download...');
            await this.startDownload();
        } else {
            console.log('✅ Pokemon sprites already available');
        }
    }
    
    // 🛠️ UTILIDADES
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    chunkArray(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
}

// 🚀 INICIALIZACIÓN AUTOMÁTICA
window.pokemonDownloader = new PokemonDownloader();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pokemonDownloader.init();
    });
} else {
    window.pokemonDownloader.init();
}
