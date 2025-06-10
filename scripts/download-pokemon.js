#!/usr/bin/env node

/**
 * 🎾 SCRIPT DE DESCARGA MANUAL DE POKEMON SPRITES
 * Para ejecutar desde línea de comandos cuando el sistema automático falle
 * 
 * Uso:
 *   node scripts/download-pokemon.js
 *   node scripts/download-pokemon.js --normal-only
 *   node scripts/download-pokemon.js --shiny-only
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

class ManualPokemonDownloader {
    constructor() {
        this.baseUrls = {
            normal: 'https://play.pokemonshowdown.com/sprites/ani/',
            shiny: 'https://play.pokemonshowdown.com/sprites/ani-shiny/'
        };
        
        this.paths = {
            normal: path.join(__dirname, '..', 'resources', 'sprites', 'ani'),
            shiny: path.join(__dirname, '..', 'resources', 'sprites', 'ani-shiny')
        };
        
        this.stats = {
            normal: { total: 0, downloaded: 0, failed: 0, existing: 0 },
            shiny: { total: 0, downloaded: 0, failed: 0, existing: 0 }
        };
        
        // Parse command line arguments
        this.args = process.argv.slice(2);
        this.normalOnly = this.args.includes('--normal-only');
        this.shinyOnly = this.args.includes('--shiny-only');
        this.force = this.args.includes('--force');
        this.verbose = this.args.includes('--verbose');
    }
    
    log(message, level = 'info') {
        const prefix = {
            info: '💡',
            success: '✅',
            error: '❌',
            warning: '⚠️',
            progress: '📥'
        };
        
        console.log(`${prefix[level]} ${message}`);
    }
    
    async downloadFile(url, localPath) {
        return new Promise((resolve, reject) => {
            // Check if file already exists and not forcing
            if (fs.existsSync(localPath) && !this.force) {
                resolve(false); // File exists, skip
                return;
            }
            
            const file = fs.createWriteStream(localPath);
            
            https.get(url, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                    return;
                }
                
                response.pipe(file);
                
                file.on('finish', () => {
                    file.close();
                    resolve(true); // Successfully downloaded
                });
                
                file.on('error', (err) => {
                    fs.unlink(localPath, () => {}); // Delete partial file
                    reject(err);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
    
    async fetchPokemonList(type) {
        return new Promise((resolve, reject) => {
            const url = this.baseUrls[type];
            
            https.get(url, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                    return;
                }
                
                let data = '';
                response.on('data', chunk => data += chunk);
                response.on('end', () => {
                    try {
                        // Extract .gif filenames from HTML
                        const gifMatches = data.match(/href="([^"]+\.gif)"/g);
                        if (!gifMatches) {
                            reject(new Error(`No GIF files found in ${type} directory`));
                            return;
                        }
                        
                        const pokemonList = gifMatches
                            .map(match => match.match(/href="([^"]+\.gif)"/)[1])
                            .filter(filename => filename.endsWith('.gif'))
                            .map(filename => filename.replace('.gif', ''));
                        
                        resolve(pokemonList);
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', reject);
        });
    }
    
    async downloadPokemonBatch(pokemonList, type, batchSize = 5) {
        const totalPokemon = pokemonList.length;
        this.stats[type].total = totalPokemon;
        
        this.log(`Starting ${type} Pokemon download (${totalPokemon} files)`, 'info');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(this.paths[type])) {
            fs.mkdirSync(this.paths[type], { recursive: true });
        }
        
        // Process in batches
        for (let i = 0; i < pokemonList.length; i += batchSize) {
            const batch = pokemonList.slice(i, i + batchSize);
            const promises = batch.map(async (pokemon) => {
                const url = `${this.baseUrls[type]}${pokemon}.gif`;
                const localPath = path.join(this.paths[type], `${pokemon}.gif`);
                
                try {
                    const downloaded = await this.downloadFile(url, localPath);
                    if (downloaded) {
                        this.stats[type].downloaded++;
                        if (this.verbose) {
                            this.log(`Downloaded: ${pokemon}.gif`, 'progress');
                        }
                    } else {
                        this.stats[type].existing++;
                        if (this.verbose) {
                            this.log(`Skipped (exists): ${pokemon}.gif`, 'warning');
                        }
                    }
                } catch (error) {
                    this.stats[type].failed++;
                    this.log(`Failed to download ${pokemon}.gif: ${error.message}`, 'error');
                }
            });
            
            await Promise.all(promises);
            
            // Progress update
            const processed = Math.min(i + batchSize, totalPokemon);
            const percentage = Math.round((processed / totalPokemon) * 100);
            this.log(`${type} progress: ${processed}/${totalPokemon} (${percentage}%)`, 'progress');
            
            // Small delay to avoid overwhelming the server
            if (i + batchSize < pokemonList.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    
    async run() {
        this.log('🎾 Pokemon Sprite Manual Downloader', 'info');
        this.log('====================================', 'info');
        
        if (this.normalOnly) {
            this.log('Mode: Normal Pokemon only', 'info');
        } else if (this.shinyOnly) {
            this.log('Mode: Shiny Pokemon only', 'info');
        } else {
            this.log('Mode: Both Normal and Shiny Pokemon', 'info');
        }
        
        if (this.force) {
            this.log('Force mode: Will overwrite existing files', 'warning');
        }
        
        console.log('');
        
        try {
            // Download normal Pokemon
            if (!this.shinyOnly) {
                this.log('Fetching normal Pokemon list...', 'info');
                const normalList = await this.fetchPokemonList('normal');
                await this.downloadPokemonBatch(normalList, 'normal');
            }
            
            // Download shiny Pokemon
            if (!this.normalOnly) {
                this.log('Fetching shiny Pokemon list...', 'info');
                const shinyList = await this.fetchPokemonList('shiny');
                await this.downloadPokemonBatch(shinyList, 'shiny');
            }
            
            // Final summary
            console.log('');
            this.log('Download Summary:', 'success');
            this.log('================', 'success');
            
            if (!this.shinyOnly) {
                const { total, downloaded, failed, existing } = this.stats.normal;
                this.log(`Normal Pokemon: ${downloaded} downloaded, ${existing} existing, ${failed} failed (${total} total)`, 'info');
            }
            
            if (!this.normalOnly) {
                const { total, downloaded, failed, existing } = this.stats.shiny;
                this.log(`Shiny Pokemon: ${downloaded} downloaded, ${existing} existing, ${failed} failed (${total} total)`, 'info');
            }
            
            const totalDownloaded = this.stats.normal.downloaded + this.stats.shiny.downloaded;
            const totalFailed = this.stats.normal.failed + this.stats.shiny.failed;
            
            if (totalFailed === 0) {
                this.log(`🎉 All downloads completed successfully! (${totalDownloaded} files)`, 'success');
            } else {
                this.log(`⚠️ Download completed with ${totalFailed} failures (${totalDownloaded} successful)`, 'warning');
                this.log('Tip: Run with --force flag to retry failed downloads', 'info');
            }
            
            // Update config to mark as completed
            this.updateConfig();
            
        } catch (error) {
            this.log(`Fatal error: ${error.message}`, 'error');
            process.exit(1);
        }
    }
    
    updateConfig() {
        try {
            const configDir = path.join(__dirname, '..', 'config');
            const configPath = path.join(configDir, 'settings.json');
            
            // Create config directory if it doesn't exist
            if (!fs.existsSync(configDir)) {
                fs.mkdirSync(configDir, { recursive: true });
            }
            
            // Create or update config
            const config = {
                firstTimeSetup: true,
                pokemonDownloaded: true,
                lastDownloadAttempt: new Date().toISOString(),
                manualDownload: true
            };
            
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            this.log('Config updated - app will skip automatic download', 'success');
            
        } catch (error) {
            this.log(`Warning: Could not update config: ${error.message}`, 'warning');
        }
    }
    
    static showHelp() {
        console.log(`
🎾 Pokemon Sprite Manual Downloader
==================================

Usage:
  node scripts/download-pokemon.js [options]

Options:
  --normal-only    Download only normal Pokemon sprites
  --shiny-only     Download only shiny Pokemon sprites  
  --force          Overwrite existing files
  --verbose        Show detailed progress for each file
  --help           Show this help message

Examples:
  node scripts/download-pokemon.js                    # Download both normal and shiny
  node scripts/download-pokemon.js --normal-only      # Only normal Pokemon
  node scripts/download-pokemon.js --shiny-only       # Only shiny Pokemon
  node scripts/download-pokemon.js --force --verbose  # Force redownload with details

Note: Without --force, existing files will be skipped.
        `);
    }
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        ManualPokemonDownloader.showHelp();
        process.exit(0);
    }
    
    const downloader = new ManualPokemonDownloader();
    downloader.run().catch(error => {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    });
}

module.exports = ManualPokemonDownloader;