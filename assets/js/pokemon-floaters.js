// 🎮 POKEMON FLOATERS SYSTEM - Animaciones de Pokemon que no interfieren con la UI
class PokemonFloaters {
  constructor() {
    this.activeFloaters = [];
    this.maxFloaters = 6;
    this.spawnInterval = 2000;
    this.pokemonSprites = [];
    this.spawnTimer = null;
    this.generationTimer = null;
    this.isPaused = false;
    
    // Configuración simple y funcional
    this.generationDuration = 30000; // 30 segundos por generación
    this.isGenerationComplete = false;
    this.generationStartTime = null;
    this.actionInProgress = false;
    
    this.loadAvailablePokemon().then(() => {
      this.init();
    });
  }

  // Método para cargar automáticamente pokémon disponibles desde la carpeta
  async loadAvailablePokemon() {
    try {
      console.log('🔍 Detectando pokémon disponibles...');
      
      // Lista COMPLETA de pokémon descargados - TODOS funcionan sin errores
    this.pokemonSprites = [
      // === KANTO GENERATION I ===
      // Starters completos
      'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard',
      'squirtle', 'wartortle', 'blastoise',
      
      // Pikachu family y famosos
      'pichu', 'pikachu', 'raichu', 'mewtwo', 'mew',
      
      // Legendarios pájaros
      'articuno', 'zapdos', 'moltres',
      
      // Kanto clásicos
      'alakazam', 'machamp', 'golem', 'gengar', 'snorlax', 'dragonite', 'gyarados',
      'lapras', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'slowbro',
      'arcanine', 'rapidash', 'hitmonlee', 'hitmonchan', 'lickitung', 'weezing', 
      'rhydon', 'chansey', 'tangela', 'kangaskhan', 'seadra', 'goldeen', 'staryu', 
      'starmie', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros',
      'ditto', 'porygon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl',
      'dratini', 'dragonair',
      
      // === JOHTO GENERATION II ===
      // Starters completos
      'chikorita', 'bayleef', 'meganium', 'cyndaquil', 'quilava', 'typhlosion',
      'totodile', 'croconaw', 'feraligatr',
      
      // Nuevas evoluciones Eevee
      'espeon', 'umbreon', 'leafeon', 'glaceon',
      
      // Legendarios Johto
      'raikou', 'entei', 'suicune', 'lugia', 'hooh', 'celebi',
      
      // Johto regulares
      'crobat', 'lanturn', 'ampharos', 'bellossom', 'marill', 'azumarill', 
      'sudowoodo', 'politoed', 'hoppip', 'skiploom', 'jumpluff', 'aipom', 
      'sunkern', 'sunflora', 'yanma', 'wooper', 'quagsire', 'murkrow',
      'slowking', 'misdreavus', 'unown', 'wobbuffet', 'girafarig', 'pineco',
      'forretress', 'dunsparce', 'gligar', 'steelix', 'snubbull', 'granbull',
      'qwilfish', 'shuckle', 'heracross', 'sneasel', 'teddiursa', 'ursaring',
      'slugma', 'magcargo', 'swinub', 'piloswine', 'corsola', 'remoraid',
      'octillery', 'delibird', 'mantine', 'skarmory', 'houndour', 'houndoom',
      'kingdra', 'phanpy', 'donphan', 'porygon2', 'smeargle', 'tyrogue',
      'hitmontop', 'smoochum', 'elekid', 'magby', 'miltank', 'larvitar', 
      'pupitar', 'tyranitar', 'scizor',
      
      // === HOENN GENERATION III ===
      // Starters
      'treecko', 'sceptile', 'torchic', 'blaziken', 'mudkip', 'swampert',
      
      // Legendarios
      'rayquaza', 'kyogre', 'groudon', 'latios', 'latias', 'jirachi', 'deoxys',
      
      // Populares Hoenn
      'metagross', 'salamence', 'milotic', 'feebas', 'absol', 'mawile',
      
      // === SINNOH GENERATION IV ===
      // Starters
      'turtwig', 'grotle', 'torterra', 'chimchar', 'monferno', 'infernape',
      'piplup', 'prinplup', 'empoleon',
      
      // Legendarios Sinnoh
      'dialga', 'palkia', 'giratina', 'darkrai', 'shaymin', 'arceus',
      
      // Populares Sinnoh
      'garchomp', 'lucario', 'rotom', 'magnezone', 'togekiss', 'mamoswine', 'gallade',
      
      // === UNOVA GENERATION V ===
      // Starters
      'snivy', 'serperior', 'tepig', 'emboar', 'oshawott', 'samurott',
      
      // Legendarios
      'reshiram', 'zekrom', 'kyurem', 'victini', 'keldeo', 'meloetta', 'genesect',
      
      // Populares Unova
      'zoroark', 'chandelure', 'volcarona', 'hydreigon',
      
      // === KALOS GENERATION VI ===
      // Starters
      'chespin', 'chesnaught', 'fennekin', 'delphox', 'froakie', 'greninja',
      
      // Sylveon y otros
      'talonflame', 'sylveon', 'goomy', 'goodra',
      
      // Legendarios
      'xerneas', 'yveltal', 'zygarde', 'diancie', 'hoopa', 'volcanion',
      
      // === ALOLA GENERATION VII ===
      // Starters
      'rowlet', 'decidueye', 'litten', 'incineroar', 'popplio', 'primarina',
      
      // Populares Alola
      'lycanroc', 'mimikyu', 'toxapex',
      
      // Legendarios
      'solgaleo', 'lunala', 'necrozma', 'magearna', 'marshadow', 'zeraora',
      
      // === GALAR GENERATION VIII ===
      // Starters
      'grookey', 'rillaboom', 'scorbunny', 'cinderace', 'sobble', 'inteleon',
      
      // Populares Galar
      'corviknight', 'dragapult', 'grimmsnarl', 'hatterene',
      
      // Legendarios
      'zacian', 'zamazenta', 'eternatus'
      ];
      
      // Método async para detectar más pokémon en el futuro
      if (typeof require !== 'undefined') {
        try {
          const fs = require('fs').promises;
          const path = require('path');
          
          const spritesPath = path.join(__dirname, '../../resources/sprites/ani');
          const files = await fs.readdir(spritesPath);
          
          const availablePokemon = files
            .filter(file => file.endsWith('.gif'))
            .map(file => file.replace('.gif', ''))
            .slice(0, 50); // Limitar a 50 para performance
          
          if (availablePokemon.length > 0) {
            this.pokemonSprites = availablePokemon;
            console.log(`✅ ${availablePokemon.length} pokémon detectados automáticamente!`);
          }
        } catch (err) {
          console.log('ℹ️ Usando lista por defecto de pokémon');
        }
      }
      
      console.log(`🎮 Sistema listo con ${this.pokemonSprites.length} pokémon`);
      
    } catch (error) {
      console.log('⚠️ Error detectando pokémon, usando lista por defecto');
    }
  }

  // Método para pausar/reanudar el sistema durante acciones
  pause() {
    this.isPaused = true;
    
    // Pausar timers de generación
    if (this.spawnTimer) {
      clearTimeout(this.spawnTimer);
      this.spawnTimer = null;
    }
    
    if (this.generationTimer) {
      clearTimeout(this.generationTimer);
      this.generationTimer = null;
    }
    
    // Pausar visualmente todos los pokémon activos
    this.activeFloaters.forEach(floater => {
      if (floater.element && floater.element.style) {
        floater.element.style.animationPlayState = 'paused';
        floater.element.style.opacity = '0.3';
      }
    });
    
    console.log('⏸️ Sistema de generaciones pausado durante acción');
  }

  resume() {
    this.isPaused = false;
    
    // Reanudar visualmente todos los pokémon activos
    this.activeFloaters.forEach(floater => {
      if (floater.element && floater.element.style) {
        floater.element.style.animationPlayState = 'running';
        floater.element.style.opacity = '0.9';
      }
    });
    
    // Reanudar lógica de generaciones
    if (!this.isGenerationComplete && this.activeFloaters.length < this.maxFloaters) {
      // Si estamos llenando una generación, continuar
      console.log('▶️ Reanudando llenado de generación...');
      this.fillGeneration();
    } else if (this.isGenerationComplete && this.generationStartTime) {
      // Si la generación está completa, reanudar timer
      const timeElapsed = Date.now() - this.generationStartTime;
      const timeRemaining = this.generationDuration - timeElapsed;
      
      if (timeRemaining > 0) {
        console.log(`▶️ Reanudando timer de generación (${Math.floor(timeRemaining/1000)}s restantes)...`);
        this.generationTimer = setTimeout(() => {
          console.log('⏰ ¡Tiempo terminado! Cambiando generación...');
          this.startNewGeneration();
        }, timeRemaining);
      } else {
        // El tiempo ya expiró durante la pausa
        console.log('▶️ Tiempo expirado durante pausa, iniciando nueva generación...');
        this.startNewGeneration();
      }
    }
    
    console.log('▶️ Sistema de generaciones reanudado');
    
    // Reanudar timer si no está activo y no hay acción en progreso
    if (!this.spawnTimer && !this.generationTimer && !this.actionInProgress) {
      console.log('🔄 Restaurando timers de generación...');
      
      // Si la generación está incompleta, continuar llenando
      if (this.activeFloaters.length < this.maxFloaters && !this.isGenerationComplete) {
        console.log('🚀 Continuando llenado de generación...');
        setTimeout(() => this.fillGeneration(), 1000);
      }
      // Si la generación está completa, restaurar timer de duración
      else if (this.isGenerationComplete && this.generationStartTime) {
        const elapsed = Date.now() - this.generationStartTime;
        const remaining = this.generationDuration - elapsed;
        
        if (remaining > 0) {
          console.log(`⏱️ Restaurando timer de generación completa (${Math.floor(remaining/1000)}s restantes)`);
          this.generationTimer = setTimeout(() => {
            console.log('⏰ ¡Tiempo terminado! Cambiando generación...');
            this.startNewGeneration();
          }, remaining);
        } else {
          console.log('⏰ Tiempo expirado durante pausa, iniciando nueva generación...');
          setTimeout(() => this.startNewGeneration(), 500);
        }
      }
      
      console.log('✅ Timers restaurados correctamente');
    }
  }

  init() {
    console.log('🎮 Inicializando Sistema de Generaciones de Pokémon...');
    
    // Comenzar primera generación después de cargar
    setTimeout(() => {
      this.startNewGeneration();
    }, 2000);
    
    // OPTIMIZACIÓN: Cleanup balanceado - cada 20 segundos
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, 20000);
    
    this.setupActionDetection();
    console.log('🎮 Sistema de Generaciones inicializado!');
  }
  
  // 🌟 NUEVA FUNCIÓN: Iniciar una nueva generación
  startNewGeneration() {
    console.log('🎆 ¡INICIANDO NUEVA GENERACIÓN DE POKÉMON!');
    
    // Limpiar generación anterior si existe
    this.clearCurrentGeneration();
    
    // Reset estado
    this.isGenerationComplete = false;
    this.generationStartTime = null;
    
    // Comenzar spawn rápido para llenar a 6
    this.fillGeneration();
  }
  
  // Llenar la generación con 6 pokémon rápidamente
  fillGeneration() {
    this.log(`🚀 Llenando generación... (${this.activeFloaters.length}/${this.maxFloaters})`);
    
    if (this.activeFloaters.length < this.maxFloaters && !this.isPaused) {
      // OPTIMIZACIÓN: Spawn con delays más largos para reducir carga
      const spawnSuccess = this.spawnRandomPokemon();
      
      // OPTIMIZACIÓN: Más tiempo entre verificaciones
      setTimeout(() => {
        if (this.activeFloaters.length >= this.maxFloaters) {
          this.log(`🎉 Generación completa alcanzada con ${this.activeFloaters.length} pokemon!`);
          this.onGenerationComplete();
        } else {
          // OPTIMIZACIÓN: Delays balanceados para mejor experiencia
          const nextSpawnDelay = this.activeFloaters.length >= 3 ? 3500 : 2500;
          this.log(`⏱️ Próximo spawn en ${nextSpawnDelay/1000}s...`);
          
          this.spawnTimer = setTimeout(() => {
            this.fillGeneration();
          }, nextSpawnDelay);
        }
      }, 1500); // Aumentado tiempo de verificación
    }
  }
  
  // Cuando la generación está completa (6 pokémon)
  onGenerationComplete() {
    console.log('✅ ¡GENERACIÓN COMPLETA! Los 6 Pokémon están en pantalla');
    console.log('⏱️ Iniciando contador de duración grupal...');
    
    this.isGenerationComplete = true;
    this.generationStartTime = Date.now();
    
    // Timer para eliminar toda la generación y empezar nueva
    this.generationTimer = setTimeout(() => {
      console.log('⏰ ¡Tiempo terminado! Cambiando generación completa...');
      this.startNewGeneration();
    }, this.generationDuration);
  }
  
  // Limpiar toda la generación actual
  clearCurrentGeneration() {
    this.log('🧹 Limpiando generación actual...');
    
    // OPTIMIZACIÓN: Limpiar todos los timers de forma más eficiente
    if (this.spawnTimer) {
      clearTimeout(this.spawnTimer);
      this.spawnTimer = null;
    }
    
    if (this.generationTimer) {
      clearTimeout(this.generationTimer);
      this.generationTimer = null;
    }
    
    // OPTIMIZACIÓN: Limpiar timers individuales sin efectos costosos
    this.activeFloaters.forEach(floater => {
      if (floater.rotationTimer) {
        clearTimeout(floater.rotationTimer);
      }
    });
    
    // OPTIMIZACIÓN: Remover directamente sin efectos si modo performance
    if (this.performanceMode) {
      this.activeFloaters.forEach(floater => {
        this.removeFloaterFromActive(floater);
      });
      this.activeFloaters = [];
      this.log(`✅ Generación limpiada (modo performance). Pokémon en memoria: 0`);
    } else {
      // Efectos normales solo si no está en modo performance
      const toRemove = [...this.activeFloaters];
      toRemove.forEach((floater, index) => {
        setTimeout(() => {
          if (floater.element && floater.element.parentNode) {
            this.createCaptureEffect(floater, () => {
              this.removeFloaterFromActive(floater);
            });
          }
        }, index * 200);
      });
      
      setTimeout(() => {
        this.activeFloaters = [];
        this.log(`✅ Generación limpiada completamente. Pokémon en memoria: ${this.activeFloaters.length}`);
      }, toRemove.length * 200 + 1000);
    }
  }

  // Configurar detección automática de acciones (SIMPLIFICADO)
  setupActionDetection() {
    // Solo pausar cuando se presiona START del timer
    const startBtn = document.querySelector('#start-btn, .btn-success');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.pause();
        // Reanudar después de 2 segundos
        setTimeout(() => this.resume(), 2000);
      });
    }

    // Pausar solo cuando se abren modals importantes
    document.addEventListener('show.bs.modal', (e) => {
      if (e.target.id === 'settingsModal') {
        this.pause();
      }
    });

    // Reanudar cuando se cierran modals
    document.addEventListener('hide.bs.modal', () => {
      setTimeout(() => this.resume(), 500);
    });

    console.log('🎯 Detección automática de acciones configurada (simplificada)');
  }

  spawnRandomPokemon() {
    const pokemonName = this.getRandomPokemon();
    
    // 15% chance de hacer la secuencia normal -> shiny (como Feebas -> Shiny Feebas)
    if (Math.random() < 0.15) {
      this.spawnNormalToShinySequence(pokemonName);
    } else {
      // 5% chance de spawn directo como shiny
      const isShiny = Math.random() < 0.05;
      this.spawnSinglePokemon(pokemonName, isShiny);
    }
  }

  spawnNormalToShinySequence(pokemonName) {
    // Primero aparece el Pokemon normal
    const normalFloater = this.spawnSinglePokemon(pokemonName, false);
    
    // Después de 3 segundos, aparece la pokebola avanzada y luego el shiny en la misma posición
    setTimeout(() => {
      if (normalFloater && normalFloater.parentNode) {
        const rect = normalFloater.getBoundingClientRect();
        
        // Usar el nuevo sistema de pokeballs avanzado
        this.createAdvancedPokeball(pokemonName, true, rect.left + 32, rect.top + 32, () => {
          // Remover el normal
          this.removeFloater(normalFloater);
          
          // Spawn el shiny en la misma posición
          const shinyFloater = this.spawnSinglePokemon(pokemonName, true);
          if (shinyFloater) {
            shinyFloater.style.left = rect.left + 'px';
            shinyFloater.style.top = rect.top + 'px';
            shinyFloater.classList.add('pokemon-emerge');
            
            // Mensaje especial
            console.log(`✨🎆 ¡${pokemonName} se transformó en SHINY! ¡Increíble suerte para RNG! 🎆✨`);
          }
        });
      }
    }, 3000);
  }

  spawnSinglePokemon(pokemonName, isShiny) {
    this.log(`\n🎮 === INICIANDO SPAWN DE ${pokemonName.toUpperCase()} ${isShiny ? '(SHINY)' : '(NORMAL)'} ===`);
    this.log(`📊 Estado actual: ${this.activeFloaters.length}/6 pokémon en pantalla`);
    
    // OPTIMIZACIÓN: Mostrar detalles solo en debug mode
    if (this.debugMode && this.activeFloaters.length > 0) {
      this.log(`🗂️ Pokémon activos:`);
      this.activeFloaters.forEach((floater, index) => {
        const timeAlive = Math.floor((Date.now() - floater.spawnTime) / 1000);
        this.log(`   ${index + 1}. ${floater.name || 'Desconocido'} ${floater.isShiny ? '✨' : ''} - ${timeAlive}s`);
      });
    }
    
    // Verificar límite máximo
    if (this.activeFloaters.length >= 6) {
      this.log(`⚠️ Límite alcanzado: 6 pokémon en pantalla - cancelando spawn`);
      return false;
    }
    
    // OPTIMIZACIÓN: Sistema de posiciones simplificado
    const pokemonSize = {width: 75, height: 75};
    const maxAttempts = 15; // Reducido de 25 a 15
    let attempts = 0;
    let randomPosition = null;
    
    // OPTIMIZACIÓN: Área de spawn optimizada
    const safeArea = {
      minX: 100,
      maxX: window.innerWidth - 150,
      minY: 80,
      maxY: window.innerHeight - 120
    };
    
    if (this.debugMode) {
      this.log(`🎯 Área de spawn: ${safeArea.maxX - safeArea.minX} x ${safeArea.maxY - safeArea.minY}px`);
    }
    
    // OPTIMIZACIÓN: Algoritmo de posicionamiento más eficiente
    do {
      randomPosition = {
        x: safeArea.minX + Math.random() * (safeArea.maxX - safeArea.minX),
        y: safeArea.minY + Math.random() * (safeArea.maxY - safeArea.minY),
        id: Date.now() + Math.random()
      };
      
      // OPTIMIZACIÓN: Verificación de colisión simplificada
      const tooClose = this.activeFloaters.some(floater => {
        if (!floater.position) return false;
        
        const distance = Math.sqrt(
          Math.pow(randomPosition.x - floater.position.x, 2) + 
          Math.pow(randomPosition.y - floater.position.y, 2)
        );
        
        return distance < 120; // Distancia fija simple
      });
      
      if (!tooClose) {
        this.log(`✅ Posición válida encontrada: (${Math.floor(randomPosition.x)}, ${Math.floor(randomPosition.y)}) en intento ${attempts + 1}`);
        break;
      }
      attempts++;
      
    } while (attempts < maxAttempts);
    
    if (attempts >= maxAttempts) {
      this.log(`⚠️ Forzando posición para ${pokemonName}`);
      
      // OPTIMIZACIÓN: Área expandida más simple
      randomPosition = {
        x: 50 + Math.random() * (window.innerWidth - 100),
        y: 50 + Math.random() * (window.innerHeight - 100),
        id: Date.now() + Math.random()
      };
    }
    
    // Redondear posición
    randomPosition.x = Math.floor(randomPosition.x);
    randomPosition.y = Math.floor(randomPosition.y);
    
    this.log(`🎲 Posición final: ${randomPosition.x}, ${randomPosition.y}`);

    // OPTIMIZACIÓN: Siempre mostrar pokeballs pero de forma eficiente
    this.createRealisticPokeballEffect(pokemonName, isShiny, randomPosition, () => {
      this.finalizePokemonSpawn(pokemonName, isShiny, randomPosition);
    });
    
    return true;
  }

  // NUEVA FUNCIÓN: Finalizar spawn de pokemon (separado para optimización)
  finalizePokemonSpawn(pokemonName, isShiny, randomPosition) {
    this.log(`🎾 Spawning ${pokemonName}`);
    
    const floater = this.createFloater(pokemonName, isShiny);
    
    if (!floater) {
      this.log(`❌ Failed to create floater for ${pokemonName}`);
      return;
    }

    floater.style.left = randomPosition.x + 'px';
    floater.style.top = randomPosition.y + 'px';
    
    this.log(`🎯 ${pokemonName} positioned at ${randomPosition.x}, ${randomPosition.y}`);

    document.body.appendChild(floater);
    
    const floaterData = {
      element: floater,
      spawnTime: Date.now(),
      duration: this.pokemonMaxLifetime,
      position: {x: randomPosition.x, y: randomPosition.y},
      size: {width: 75, height: 75},
      name: pokemonName,
      isShiny: isShiny
    };
    
    this.activeFloaters.push(floaterData);
    
    console.log(`✅ ${pokemonName} spawned successfully`);
  }

  getRandomPokemon() {
    return this.pokemonSprites[Math.floor(Math.random() * this.pokemonSprites.length)];
  }

  // Determinar tamaño natural de cada pokémon (basado en su tamaño en los juegos)
  getPokemonNaturalSize(pokemonName) {
    const sizeMappings = {
      // Pokémon muy grandes (legendarios, pseudolegendarios)
      'rayquaza': {width: 120, height: 120},
      'kyogre': {width: 110, height: 100},
      'groudon': {width: 110, height: 100},
      'dialga': {width: 105, height: 105},
      'arceus': {width: 105, height: 105},
      'lugia': {width: 110, height: 110},
      'hooh': {width: 110, height: 110},
      
      // Pokémon grandes 
      'charizard': {width: 95, height: 95},
      'dragonite': {width: 90, height: 90},
      'gyarados': {width: 100, height: 85},
      'snorlax': {width: 100, height: 95},
      'tyranitar': {width: 95, height: 95},
      'garchomp': {width: 90, height: 90},
      'mewtwo': {width: 90, height: 90},
      'alakazam': {width: 85, height: 85},
      'machamp': {width: 85, height: 85},
      'golem': {width: 85, height: 80},
      'arcanine': {width: 95, height: 85},
      'lapras': {width: 95, height: 85},
      
      // Pokémon medianos (tamaño estándar)
      'pikachu': {width: 70, height: 70},
      'blastoise': {width: 85, height: 85},
      'venusaur': {width: 85, height: 85},
      'gengar': {width: 80, height: 80},
      'lucario': {width: 80, height: 80},
      'scizor': {width: 80, height: 80},
      'ampharos': {width: 80, height: 80},
      'umbreon': {width: 75, height: 75},
      'espeon': {width: 75, height: 75},
      'vaporeon': {width: 75, height: 75},
      'jolteon': {width: 75, height: 75},
      'flareon': {width: 75, height: 75},
      
      // Pokémon pequeños
      'eevee': {width: 60, height: 60},
      'mew': {width: 65, height: 65},
      'celebi': {width: 65, height: 65},
      'jynx': {width: 75, height: 80},
      'electabuzz': {width: 75, height: 80},
      'magmar': {width: 75, height: 80},
      'pinsir': {width: 75, height: 75},
      'scyther': {width: 80, height: 75},
      'rapidash': {width: 85, height: 85},
      'slowbro': {width: 80, height: 80},
      'magnezone': {width: 75, height: 75},
      
      // Pokémon muy pequeños
      'pichu': {width: 50, height: 50},
      'ditto': {width: 55, height: 55},
      'unown': {width: 50, height: 50}
    };
    
    // Retornar tamaño específico o tamaño por defecto
    return sizeMappings[pokemonName.toLowerCase()] || {width: 75, height: 75};
  }

  createFloater(pokemonName, isShiny = false) {
    console.log(`🎮 CREATING FLOATER: ${pokemonName} (${isShiny ? 'shiny' : 'normal'})`);
    
    const floater = document.createElement('div');
    floater.className = 'pokemon-floater';
    
    // USAR TAMAÑO NATURAL DEL GIF - SIN LIMITACIONES ARTIFICIALES
    floater.style.cssText = `
      position: fixed !important;
      z-index: 9999 !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
      background-color: transparent !important;
      opacity: 1 !important;
      display: block !important;
      visibility: visible !important;
      cursor: pointer;
      transition: all 0.3s ease;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    `;

    // URLs usando sprites locales
    const spriteUrl = isShiny 
      ? `resources/sprites/ani-shiny/${pokemonName}.gif`
      : `resources/sprites/ani/${pokemonName}.gif`;
    
    console.log(`🖼️ Loading sprite: ${spriteUrl}`);
    
    // Aplicar imagen
    floater.style.backgroundImage = `url('${spriteUrl}')`;
    
    // Verificar carga de imagen y detectar tamaño real
    const img = new Image();
    img.onload = () => {
      // USAR EL TAMAÑO REAL DEL GIF - SIN LÍMITES ARTIFICIALES
      const realWidth = img.naturalWidth || img.width;
      const realHeight = img.naturalHeight || img.height;
      
      // Aplicar el tamaño real EXACTO del GIF
      floater.style.width = realWidth + 'px';
      floater.style.height = realHeight + 'px';
      
      // Usar background-size auto para mantener proporciones originales
      floater.style.backgroundSize = 'auto';
      
      console.log(`✅ Image loaded: ${pokemonName} - Tamaño REAL aplicado: ${realWidth}x${realHeight}px`);
      
      // Actualizar datos del floater con el tamaño real
      const floaterData = this.activeFloaters.find(f => f.element === floater);
      if (floaterData) {
        floaterData.size = {width: realWidth, height: realHeight};
      }
    };
    img.onerror = () => {
      console.log(`❌ Failed to load: ${spriteUrl}`);
      // Tamaño por defecto más razonable si falla
      floater.style.width = '64px';
      floater.style.height = '64px';
      floater.style.backgroundSize = 'auto';
      // Solo mostrar texto si falla la imagen
      floater.innerHTML = `<div style="color: white; font-size: 10px; text-align: center; line-height: 64px; background: rgba(0,0,0,0.7); border-radius: 5px;">${pokemonName}</div>`;
    };
    img.src = spriteUrl;
    
    // Efectos para shinies - SIN resplandor
    if (isShiny) {
      floater.style.filter = 'hue-rotate(45deg) saturate(1.3) brightness(1.1)';
    }
    
    // Tooltip
    floater.title = `${pokemonName} ${isShiny ? '(SHINY)' : ''}`;
    
    console.log(`✅ FLOATER CREATED: ${pokemonName} - USANDO TAMAÑO NATURAL`);
    return floater;
  }

  onPokemonClick(floater, pokemon) {
    // Easter egg: efectos al hacer click
    if (pokemon.shiny) {
      // Efecto especial para shinies
      this.createSparkleEffect(floater);
      console.log(`🌟 ¡Encontraste un ${pokemon.name} shiny! ¡Que suerte para tus RNGs! 🌟`);
    } else {
      // Efecto normal
      floater.style.animation = 'pokeball-emerge 1s ease-out';
      console.log(`✨ ¡${pokemon.name} te desea suerte en tus RNGs! ✨`);
    }
    
    // Remover después del efecto
    setTimeout(() => {
      this.removeFloater(floater);
    }, 1000);
  }

  // === SISTEMA COMPLETO DE POKEBALLS ===
  
  // Función principal para determinar el tipo de pokeball basado en el pokémon
  getPokeballType(pokemonName, isShiny) {
    console.log(`🔍 Evaluating pokeball for ${pokemonName} (shiny: ${isShiny})`);
    
    // 🌟 MASTER BALL - Para pokémon especiales (prioridad máxima)
    if (isShiny) {
      console.log(`✨ ${pokemonName} is SHINY! → Master Ball`);
      return 'masterball';
    }
    
    if (this.isLegendary(pokemonName)) {
      console.log(`🏆 ${pokemonName} is LEGENDARY! → Master Ball`);
      return 'masterball';
    }
    
    if (this.isSemiLegendary(pokemonName)) {
      console.log(`💎 ${pokemonName} is SEMI-LEGENDARY! → Master Ball`);
      return 'masterball';
    }
    
    // 🔥 ULTRA BALL - Para pokémon raros y poderosos
    if (this.isRare(pokemonName)) {
      console.log(`⭐ ${pokemonName} is RARE → Ultra Ball`);
      return 'ultraball';
    }
    
    // 🔵 GREAT BALL - Para pokémon poco comunes  
    if (this.isUncommon(pokemonName)) {
      console.log(`🔹 ${pokemonName} is UNCOMMON → Great Ball`);
      return 'greatball';
    }
    
    // ⏱️ TIMER BALL - Después de 30 segundos del timer
    if (this.startTime && Date.now() - this.startTime > 30000) {
      console.log(`⏰ Timer elapsed → Timer Ball for ${pokemonName}`);
      return 'timerball';
    }
    
    // ⚡ QUICK BALL - Primeros 10 segundos
    if (this.startTime && Date.now() - this.startTime < 10000) {
      console.log(`🚀 Early spawn → Quick Ball for ${pokemonName}`);
      return 'quickball';
    }
    
    // 🌙 DUSK BALL - Tipos Dark/Ghost
    if (this.isDarkOrGhost(pokemonName)) {
      console.log(`🌚 ${pokemonName} is Dark/Ghost type → Dusk Ball`);
      return 'duskball';
    }
    
    // 🌊 NET BALL - Tipos Water/Bug
    if (this.isWaterOrBug(pokemonName)) {
      console.log(`🌊 ${pokemonName} is Water/Bug type → Net Ball`);
      return 'netball';
    }
    
    // 🏆 PREMIER BALL - 5% chance especial
    if (Math.random() < 0.05) {
      console.log(`🎊 Lucky roll → Premier Ball for ${pokemonName}`);
      return 'premierball';
    }
    
    // ⚪ POKEBALL - Por defecto
    console.log(`⚪ ${pokemonName} → Standard Pokeball`);
    return 'pokeball';
  }
  
  // Helper functions para determinar tipos de pokémon
  isLegendary(name) {
    // POKÉMON LEGENDARIOS COMPLETOS - Master Ball garantizada
    const legendaries = [
      // Generation I
      'mewtwo', 'mew', 'articuno', 'zapdos', 'moltres',
      
      // Generation II
      'lugia', 'hooh', 'celebi', 'raikou', 'entei', 'suicune',
      
      // Generation III
      'rayquaza', 'kyogre', 'groudon', 'latios', 'latias', 'jirachi', 'deoxys',
      'regirock', 'regice', 'registeel',
      
      // Generation IV
      'dialga', 'palkia', 'giratina', 'arceus', 'darkrai', 'shaymin',
      'uxie', 'mesprit', 'azelf', 'heatran', 'regigigas', 'cresselia',
      
      // Generation V
      'reshiram', 'zekrom', 'kyurem', 'victini', 'keldeo', 'meloetta', 'genesect',
      'cobalion', 'terrakion', 'virizion', 'tornadus', 'thundurus', 'landorus',
      
      // Generation VI
      'xerneas', 'yveltal', 'zygarde', 'diancie', 'hoopa', 'volcanion',
      
      // Generation VII
      'solgaleo', 'lunala', 'necrozma', 'magearna', 'marshadow', 'zeraora',
      'cosmog', 'cosmoem', 'tapukoko', 'tapulele', 'tapubulu', 'tapufini',
      'typenull', 'silvally',
      
      // Generation VIII
      'zacian', 'zamazenta', 'eternatus', 'kubfu', 'urshifu', 'zarude',
      'regieleki', 'regidrago', 'glastrier', 'spectrier', 'calyrex', 'enamorus',
      
      // Generation IX
      'koraidon', 'miraidon', 'wochien', 'chienpao', 'tinglu', 'chiyu',
      'okidogi', 'munkidori', 'fezandipiti', 'ogerpon', 'terapagos'
    ];
    return legendaries.includes(name.toLowerCase());
  }
  
  isSemiLegendary(name) {
    // POKÉMON SEMI-LEGENDARIOS - También obtienen Master Ball
    const semiLegendaries = [
      // Pseudo-Legendaries potentes
      'dragonite', 'tyranitar', 'salamence', 'metagross', 'garchomp', 'hydreigon',
      'goodra', 'kommoo', 'dragapult', 'baxcalibur',
      
      // Starters finales icónicos
      'charizard', 'blastoise', 'venusaur', 'typhlosion', 'feraligatr', 'meganium',
      'blaziken', 'swampert', 'sceptile', 'infernape', 'empoleon', 'torterra',
      'serperior', 'emboar', 'samurott', 'greninja', 'delphox', 'chesnaught',
      'decidueye', 'incineroar', 'primarina', 'rillaboom', 'cinderace', 'inteleon',
      
      // Pokémon extremadamente raros o únicos
      'lucario', 'rotom', 'zoroark', 'volcarona', 'arcanine', 'lapras',
      'snorlax', 'gyarados', 'milotic', 'spiritomb', 'absol', 'beldum'
    ];
    return semiLegendaries.includes(name.toLowerCase());
  }
  
  isRare(name) {
    const rares = [
      // Evoluciones destacadas
      'alakazam', 'machamp', 'golem', 'gengar', 'scizor', 'kingdra',
      'crobat', 'forretress', 'steelix', 'heracross', 'ampharos',
      'slowking', 'magnezone', 'togekiss', 'mamoswine', 'gallade',
      'chandelure', 'talonflame', 'corviknight', 'grimmsnarl', 'hatterene',
      
      // Pokémon especiales o únicos
      'porygon', 'porygon2', 'porygonz', 'ditto', 'unown', 'dunsparce',
      'shuckle', 'miltank', 'skarmory', 'relicanth', 'feebas', 'castform',
      'kecleon', 'tropius', 'chimecho', 'wynaut', 'glalie', 'froslass'
    ];
    return rares.includes(name.toLowerCase());
  }
  
  isUncommon(name) {
    const uncommons = ['charizard', 'blastoise', 'venusaur', 'gyarados', 'lapras', 'milotic', 'talonflame', 'goodra', 'hatterene', 'grimmsnarl'];
    return uncommons.includes(name.toLowerCase());
  }
  
  isDarkOrGhost(name) {
    const darkGhost = ['umbreon', 'sneasel', 'houndoom', 'darkrai', 'rotom', 'gengar', 'duskull', 'banette', 'grimmsnarl'];
    return darkGhost.includes(name.toLowerCase());
  }
  
  isWaterOrBug(name) {
    const waterBug = ['gyarados', 'lapras', 'vaporeon', 'milotic', 'kingdra', 'corsola', 'mantine', 'scizor', 'heracross', 'forretress'];
    return waterBug.includes(name.toLowerCase());
  }

  // 🎾 EFECTO POKEBALL ULTRA-REALISTA con SPRITES REALES - Inspirado en simeydotme
  createRealisticPokeballEffect(pokemonName, isShiny, position, onComplete) {
    const ballType = this.getPokeballType(pokemonName, isShiny);
    console.log(`🎾 Creating SIMEYDOTME ${ballType} effect for ${pokemonName}`);
    
    // SISTEMA EXACTO DE SIMEYDOTME - con datos del pokemon
    this.createSimeydotmePokeballSequence(ballType, position, onComplete, pokemonName, isShiny);
  }
  
  // Implementación EXACTA del sistema simeydotme
  createSimeydotmePokeballSequence(ballType, position, onComplete, pokemonName = null, isShiny = false) {
    // PASO 1: Crear pokeball con estructura EXACTA de simeydotme
    const pokeball = document.createElement('div');
    pokeball.className = `${ballType} ball`;
    pokeball.style.cssText = `
      position: fixed !important;
      left: ${position.x - 20}px;
      top: ${position.y - 20}px;
      width: 41px;
      height: 40px;
      z-index: 999999 !important;
      pointer-events: none;
              background-image: url('resources/sprites/pokeball-sprites-oficial.png') !important;
      background-repeat: no-repeat !important;
      background-position: 0 0 !important;
      transform-origin: center bottom !important;
      margin: 1px;
      bottom: -9px;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    `;
    
    // Aplicar shadow (pseudo-element effect)
    const shadow = document.createElement('div');
    shadow.style.cssText = `
      position: absolute;
      left: 30%;
      bottom: 8px;
      width: 40%;
      height: 3px;
      border-radius: 100%;
      background: black;
      box-shadow: 0 1px 2px black;
      opacity: 0.3;
      z-index: -1;
    `;
    pokeball.appendChild(shadow);
    
    // Convertir nombres de mi sistema a nombres de simeydotme
    const ballTypeMapping = {
      'pokeball': 'poke',
      'greatball': 'great', 
      'ultraball': 'ultra',
      'masterball': 'master',
      'quickball': 'quick',
      'timerball': 'timer',
      'duskball': 'dusk',
      'premierball': 'premier',
      'netball': 'net',
      'nestball': 'nest',
      'safariball': 'safari',
      'diveball': 'dive',
      'repeatball': 'repeat',
      'luxuryball': 'luxury',
      'healball': 'heal',
      'cherishball': 'cherish',
      'fastball': 'fast',
      'levelball': 'level',
      'lureball': 'lure',
      'heavyball': 'heavy',
      'loveball': 'love',
      'friendball': 'friend',
      'moonball': 'moon',
      'sportball': 'sport',
      'parkball': 'park',
      'dreamball': 'dream',
      'beastball': 'beast'
    };
    
    // Convertir el tipo o usar como está si ya es formato simeydotme
    const simeydotmeType = ballTypeMapping[ballType] || ballType;
    
    // Actualizar clase para usar formato correcto
    pokeball.className = `${simeydotmeType} ball`;
    
    document.body.appendChild(pokeball);
    console.log(`✅ ${simeydotmeType.toUpperCase()} Ball created for ${pokemonName || 'unknown pokemon'}`);
    
    // PASO 2: Animación de bounce (caída)
    pokeball.classList.add('bounce');
    
    setTimeout(() => {
      // PASO 3: Rock animation (agitación)
      pokeball.classList.remove('bounce');
      pokeball.classList.add('rock');
      
      setTimeout(() => {
        // PASO 4: Open state (abierta)
        pokeball.classList.remove('rock');
        pokeball.classList.add('open');
        
        // 🌟 EFECTOS ESPECIALES PARA MASTER BALL
        if (simeydotmeType === 'master') {
          console.log(`🌟 MASTER BALL DETECTED! Creating star effects...`);
          
          if (window.AdvancedPokeballEffects) {
            const advancedEffects = new window.AdvancedPokeballEffects();
            
            // Determinar si es shiny basado en el nombre del pokemon
            const isShiny = pokemonName && pokemonName.includes('shiny');
            
            if (isShiny) {
              console.log(`✨ SHINY + Master Ball = ULTIMATE EFFECT!`);
              advancedEffects.createShinyMasterBallEffect(position, pokemonName);
            } else {
              console.log(`⭐ Master Ball stars effect activated!`);
              advancedEffects.createMasterBallStarsEffect(position);
            }
          }
        }
        
        // Flash de apertura
        const flash = document.createElement('div');
        flash.style.cssText = `
          position: fixed;
          left: ${position.x - 40}px;
          top: ${position.y - 40}px;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 9998;
          pointer-events: none;
          animation: pokeball-flash 0.8s ease-out forwards;
        `;
        document.body.appendChild(flash);
        
        setTimeout(() => {
          // Limpiar elementos
          pokeball.remove();
          flash.remove();
          console.log(`✅ ${simeydotmeType.toUpperCase()} Ball sequence completed`);
          
          if (onComplete) onComplete();
        }, 800);
      }, 1200); // Tiempo de rock
    }, 2000); // Tiempo de bounce
  }
  
  createPokeballElement(ballType, x, y) {
    const pokeball = document.createElement('div');
    pokeball.className = `pokeball-realistic pokeball-${ballType}`;
    pokeball.style.cssText = `
      position: fixed;
      left: ${x - 20}px;
      top: ${y - 20}px;
      width: 40px;
      height: 40px;
      z-index: 999;
      pointer-events: none;
      transform-origin: center;
      border-radius: 50%;
    `;
    
    this.applyPokeballStyle(pokeball, ballType);
    return pokeball;
  }
  
  // 🎨 POKEBALL AVANZADA con estructura realista para división
  createAdvancedPokeballElement(ballType, x, y) {
    const container = document.createElement('div');
    container.className = `pokeball-container pokeball-${ballType}`;
    container.style.cssText = `
      position: fixed;
      left: ${x - 30}px;
      top: ${y - 30}px;
      width: 60px;
      height: 60px;
      z-index: 999;
      pointer-events: none;
      transform-origin: center;
    `;
    
    // MITAD SUPERIOR
    const topHalf = document.createElement('div');
    topHalf.className = `pokeball-top pokeball-top-${ballType}`;
    topHalf.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 30px;
      border-radius: 60px 60px 0 0;
      border: 3px solid #000;
      border-bottom: 1.5px solid #000;
      box-shadow: inset -8px 8px 0 6px rgba(0,0,0,0.2);
      z-index: 2;
    `;
    
    // MITAD INFERIOR
    const bottomHalf = document.createElement('div');
    bottomHalf.className = `pokeball-bottom`;
    bottomHalf.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 30px;
      background: #fff;
      border-radius: 0 0 60px 60px;
      border: 3px solid #000;
      border-top: 1.5px solid #000;
      box-shadow: inset -8px -8px 0 6px rgba(0,0,0,0.2);
      z-index: 2;
    `;
    
    // LÍNEA CENTRAL
    const centerLine = document.createElement('div');
    centerLine.className = `pokeball-line`;
    centerLine.style.cssText = `
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 6px;
      background: #000;
      transform: translateY(-50%);
      z-index: 3;
    `;
    
    // BOTÓN CENTRAL
    const centerButton = document.createElement('div');
    centerButton.className = `pokeball-button pokeball-button-${ballType}`;
    centerButton.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 18px;
      background: #fff;
      border: 3px solid #000;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 4;
      box-shadow: 
        inset 0 0 0 2px #ddd,
        0 0 0 1px #000,
        0 2px 4px rgba(0,0,0,0.3);
    `;
    
    this.applyAdvancedPokeballColors(topHalf, centerButton, ballType);
    
    container.appendChild(topHalf);
    container.appendChild(bottomHalf);
    container.appendChild(centerLine);
    container.appendChild(centerButton);
    
    return container;
  }
  
  // 🎨 Aplicar colores específicos a cada tipo de pokeball
  applyAdvancedPokeballColors(topHalf, centerButton, ballType) {
    const colorSchemes = {
      pokeball: {
        top: '#FF0000',
        button: '#fff'
      },
      greatball: {
        top: '#0066CC',
        button: '#fff'
      },
      ultraball: {
        top: '#333',
        button: '#FFD700'
      },
      masterball: {
        top: '#6633CC',
        button: '#FF69B4'
      },
      premierball: {
        top: '#FFF',
        button: '#FF0000'
      },
      timerball: {
        top: '#666',
        button: '#FF6600'
      },
      quickball: {
        top: '#00CCFF',
        button: '#FFFF00'
      },
      duskball: {
        top: '#004400',
        button: '#FF0000'
      },
      netball: {
        top: '#00AACC',
        button: '#0088AA'
      }
    };
    
    const scheme = colorSchemes[ballType] || colorSchemes.pokeball;
    topHalf.style.background = scheme.top;
    centerButton.style.background = scheme.button;
  }
  
  // 🔥 EFECTO DE DIVISIÓN DE POKEBALL (mitades separándose)
  createPokeballSplitEffect(pokeball, ballType, position) {
    console.log(`💥 Creating pokeball split effect for ${ballType}!`);
    
    const topHalf = pokeball.querySelector('.pokeball-top');
    const bottomHalf = pokeball.querySelector('.pokeball-bottom');
    const centerLine = pokeball.querySelector('.pokeball-line');
    const centerButton = pokeball.querySelector('.pokeball-button');
    
    if (topHalf && bottomHalf) {
      // Animaciones de separación
      topHalf.style.animation = 'pokeball-split-top 0.8s ease-out forwards';
      bottomHalf.style.animation = 'pokeball-split-bottom 0.8s ease-out forwards';
      
      // Hacer desaparecer línea y botón
      if (centerLine) centerLine.style.animation = 'fade-out 0.3s ease-out forwards';
      if (centerButton) centerButton.style.animation = 'fade-out 0.3s ease-out forwards';
      
      // Efecto de luz emanando del centro
      setTimeout(() => {
        this.createPokeballLightBeam(position.x, position.y);
      }, 400);
    }
  }
  
  // ✨ Rayo de luz emergente del centro de la pokeball
  createPokeballLightBeam(x, y) {
    const lightBeam = document.createElement('div');
    lightBeam.style.cssText = `
      position: fixed;
      left: ${x - 25}px;
      top: ${y - 25}px;
      width: 50px;
      height: 50px;
      background: radial-gradient(circle, 
        rgba(255, 255, 255, 1) 0%, 
        rgba(255, 255, 255, 0.8) 30%,
        rgba(173, 216, 230, 0.6) 60%, 
        transparent 80%);
      border-radius: 50%;
      z-index: 998;
      pointer-events: none;
      animation: light-beam-expand 1.2s ease-out forwards;
    `;
    
    document.body.appendChild(lightBeam);
    setTimeout(() => lightBeam.remove(), 1200);
  }
  
  // 🎨 POKEBALL AVANZADA con estructura realista para división
  createAdvancedPokeballElement(ballType, x, y) {
    const container = document.createElement('div');
    container.className = `pokeball-container pokeball-${ballType}`;
    container.style.cssText = `
      position: fixed;
      left: ${x - 30}px;
      top: ${y - 30}px;
      width: 60px;
      height: 60px;
      z-index: 999;
      pointer-events: none;
      transform-origin: center;
    `;
    
    // MITAD SUPERIOR (roja/colorida según tipo)
    const topHalf = document.createElement('div');
    topHalf.className = `pokeball-top pokeball-top-${ballType}`;
    topHalf.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 30px;
      border-radius: 60px 60px 0 0;
      border: 3px solid #000;
      border-bottom: 1.5px solid #000;
      box-shadow: inset -8px 8px 0 6px rgba(0,0,0,0.2);
      z-index: 2;
    `;
    
    // MITAD INFERIOR (blanca)
    const bottomHalf = document.createElement('div');
    bottomHalf.className = `pokeball-bottom`;
    bottomHalf.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 30px;
      background: #fff;
      border-radius: 0 0 60px 60px;
      border: 3px solid #000;
      border-top: 1.5px solid #000;
      box-shadow: inset -8px -8px 0 6px rgba(0,0,0,0.2);
      z-index: 2;
    `;
    
    // LÍNEA CENTRAL
    const centerLine = document.createElement('div');
    centerLine.className = `pokeball-line`;
    centerLine.style.cssText = `
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 6px;
      background: #000;
      transform: translateY(-50%);
      z-index: 3;
    `;
    
    // BOTÓN CENTRAL
    const centerButton = document.createElement('div');
    centerButton.className = `pokeball-button pokeball-button-${ballType}`;
    centerButton.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 18px;
      background: #fff;
      border: 3px solid #000;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 4;
      box-shadow: 
        inset 0 0 0 2px #ddd,
        0 0 0 1px #000,
        0 2px 4px rgba(0,0,0,0.3);
    `;
    
    // Aplicar colores específicos según el tipo
    this.applyAdvancedPokeballColors(topHalf, centerButton, ballType);
    
    // Ensamblar pokeball
    container.appendChild(topHalf);
    container.appendChild(bottomHalf);
    container.appendChild(centerLine);
    container.appendChild(centerButton);
    
    return container;
  }
  
  createOpeningFlash(x, y) {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      left: ${x - 30}px;
      top: ${y - 30}px;
      width: 60px;
      height: 60px;
      background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 30%, transparent 70%);
      border-radius: 50%;
      z-index: 998;
      pointer-events: none;
      animation: flash-burst 0.4s ease-out forwards;
    `;
    
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
  }
  
  createEmergenceBeam(x, y) {
    const beam = document.createElement('div');
    beam.style.cssText = `
      position: fixed;
      left: ${x - 15}px;
      top: ${y - 15}px;
      width: 30px;
      height: 30px;
      background: radial-gradient(circle, rgba(173,216,230,0.9) 0%, rgba(255,255,255,0.6) 50%, transparent 70%);
      border-radius: 50%;
      z-index: 997;
      pointer-events: none;
      animation: emergence-beam 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(beam);
    setTimeout(() => beam.remove(), 800);
  }

  // Crear y mostrar pokeball antes del spawn del pokémon (método original mantenido para compatibilidad)
  createAdvancedPokeball(pokemonName, isShiny, spawnX, spawnY, onComplete) {
    const ballType = this.getPokeballType(pokemonName, isShiny);
    console.log(`🎾 Creating ${ballType} for ${pokemonName} (${isShiny ? 'shiny' : 'normal'})`);
    
    const pokeball = document.createElement('div');
    pokeball.className = `pokeball-animation pokeball-${ballType}`;
    pokeball.style.cssText = `
      position: fixed;
      left: ${spawnX - 20}px;
      top: ${spawnY - 20}px;
      width: 40px;
      height: 40px;
      z-index: 999;
      pointer-events: none;
      transform-origin: center;
      border-radius: 50%;
    `;
    
    // Aplicar estilo visual según el tipo de pokeball
    this.applyPokeballStyle(pokeball, ballType);
    
    document.body.appendChild(pokeball);
    
    // Animación de pokeball con bouncing
    setTimeout(() => {
      pokeball.style.animation = `pokeball-${ballType}-bounce 1.5s ease-in-out forwards`;
    }, 100);
    
    // Después de la animación, crear efectos especiales y completar
    setTimeout(() => {
      this.createPokeballOpenEffect(pokeball, ballType, () => {
        if (pokeball.parentNode) {
          pokeball.remove();
        }
        if (onComplete) onComplete();
      });
    }, 1600);
  }
  
  // Aplicar estilos visuales específicos para cada tipo de pokeball
  applyPokeballStyle(element, ballType) {
    const ballStyles = {
      pokeball: `
        background: linear-gradient(180deg, #FF0000 0%, #FF0000 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #333;
      `,
      greatball: `
        background: linear-gradient(180deg, #0066CC 0%, #0066CC 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #333;
      `,
      ultraball: `
        background: linear-gradient(180deg, #333 0%, #333 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #FFD700;
      `,
      masterball: `
        background: linear-gradient(180deg, #6633CC 0%, #6633CC 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #FF69B4;
      `,
      premierball: `
        background: linear-gradient(180deg, #FFF 0%, #FFF 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #FF0000;
      `,
      timerball: `
        background: linear-gradient(180deg, #666 0%, #666 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #FF6600;
      `,
      quickball: `
        background: linear-gradient(180deg, #00CCFF 0%, #00CCFF 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #FFFF00;
      `,
      duskball: `
        background: linear-gradient(180deg, #004400 0%, #004400 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #FF0000;
      `,
      netball: `
        background: linear-gradient(180deg, #00AACC 0%, #00AACC 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #0088AA;
      `,
      nestball: `
        background: linear-gradient(180deg, #88AA00 0%, #88AA00 45%, #000 45%, #000 55%, #FFF 55%, #FFF 100%);
        border: 2px solid #66AA00;
      `
    };
    
    element.style.cssText += ballStyles[ballType] || ballStyles.pokeball;
    
    // Agregar círculo central
    const centerCircle = document.createElement('div');
    centerCircle.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: #E0E0E0;
      border: 1px solid #999;
      border-radius: 50%;
    `;
    element.appendChild(centerCircle);
  }

  // Crear efecto de apertura de pokeball con efectos especiales
  createPokeballOpenEffect(pokeball, ballType, onComplete) {
    // Primero el flash de apertura
    pokeball.style.animation = 'pokeball-flash 0.3s ease-out forwards';
    
    setTimeout(() => {
      // Efectos especiales según el tipo de ball
      const ballEffects = {
        masterball: () => this.createMasterBallEffect(pokeball),
        ultraball: () => this.createUltraBallEffect(pokeball), 
        quickball: () => this.createQuickBallEffect(pokeball),
        premierball: () => this.createPremierBallEffect(pokeball),
        timerball: () => this.createTimerBallEffect(pokeball),
        duskball: () => this.createDuskBallEffect(pokeball)
      };
      
      // Aplicar efecto si existe
      if (ballEffects[ballType]) {
        ballEffects[ballType]();
      }
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
    }, 300);
  }
  
  // ✨ EFECTOS ESPECIALES ÚNICOS PARA CADA POKEBALL ✨
  createMasterBallEffect(pokeball) {
    console.log('🌟 Creating EPIC Master Ball effect!');
    
    // 1. EXPLOSIÓN PÚRPURA INICIAL
    const purpleExplosion = document.createElement('div');
    purpleExplosion.style.cssText = `
      position: fixed;
      left: ${pokeball.offsetLeft - 60}px;
      top: ${pokeball.offsetTop - 60}px;
      width: 160px;
      height: 160px;
      background: radial-gradient(circle, 
        rgba(102, 51, 204, 0.9) 0%, 
        rgba(255, 105, 180, 0.7) 30%,
        rgba(138, 43, 226, 0.5) 60%, 
        transparent 80%);
      border-radius: 50%;
      z-index: 999;
      pointer-events: none;
      animation: master-explosion 1.2s ease-out forwards;
    `;
    document.body.appendChild(purpleExplosion);
    setTimeout(() => purpleExplosion.remove(), 1200);
    
    // 2. ONDAS DE ENERGÍA CONCÉNTRICAS
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const energyWave = document.createElement('div');
        energyWave.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft - 30}px;
          top: ${pokeball.offsetTop - 30}px;
          width: 100px;
          height: 100px;
          border: 3px solid rgba(138, 43, 226, 0.8);
          border-radius: 50%;
          z-index: 998;
          pointer-events: none;
          animation: master-wave 1.5s ease-out forwards;
        `;
        document.body.appendChild(energyWave);
        setTimeout(() => energyWave.remove(), 1500);
      }, i * 200);
    }
    
    // 3. LLUVIA DE ESTRELLAS ÉPICA
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const star = document.createElement('div');
        const starTypes = ['✨', '⭐', '🌟', '💫'];
        star.innerHTML = starTypes[Math.floor(Math.random() * starTypes.length)];
        star.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft + Math.random() * 200 - 100}px;
          top: ${pokeball.offsetTop - 50}px;
          font-size: ${18 + Math.random() * 10}px;
          z-index: 997;
          pointer-events: none;
          animation: master-star-fall ${2 + Math.random()}s ease-in forwards;
          filter: drop-shadow(0 0 10px rgba(138, 43, 226, 0.8));
        `;
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 3000);
      }, i * 80);
    }
    
    // 4. PARTÍCULAS DE LUZ FLOTANTES
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft + Math.random() * 120 - 60}px;
          top: ${pokeball.offsetTop + Math.random() * 120 - 60}px;
          width: ${4 + Math.random() * 6}px;
          height: ${4 + Math.random() * 6}px;
          background: rgba(255, 105, 180, 0.9);
          border-radius: 50%;
          z-index: 996;
          pointer-events: none;
          animation: master-particle-float ${3 + Math.random() * 2}s ease-out forwards;
          box-shadow: 0 0 15px rgba(255, 105, 180, 0.6);
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
      }, i * 50);
    }
  }
  
  createUltraBallEffect(pokeball) {
    console.log('🔥 Creating Ultra Ball effect!');
    
    // 1. DESTELLO DORADO MASIVO
    const goldenFlash = document.createElement('div');
    goldenFlash.style.cssText = `
      position: fixed;
      left: ${pokeball.offsetLeft - 70}px;
      top: ${pokeball.offsetTop - 70}px;
      width: 180px;
      height: 180px;
      background: radial-gradient(circle, 
        rgba(255, 215, 0, 0.95) 0%, 
        rgba(255, 165, 0, 0.8) 40%,
        rgba(255, 140, 0, 0.4) 70%, 
        transparent 85%);
      border-radius: 50%;
      z-index: 999;
      pointer-events: none;
      animation: ultra-flash 1s ease-out forwards;
      box-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
    `;
    document.body.appendChild(goldenFlash);
    setTimeout(() => goldenFlash.remove(), 1000);
    
    // 2. RAYOS DE ENERGÍA DORADA
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const ray = document.createElement('div');
        const angle = (i * 45) * Math.PI / 180;
        const length = 80;
        ray.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft + 20 + Math.cos(angle) * length}px;
          top: ${pokeball.offsetTop + 20 + Math.sin(angle) * length}px;
          width: 4px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(255, 215, 0, 0.9), transparent);
          z-index: 998;
          pointer-events: none;
          transform: rotate(${i * 45 + 90}deg);
          animation: ultra-ray 0.8s ease-out forwards;
        `;
        document.body.appendChild(ray);
        setTimeout(() => ray.remove(), 800);
      }, i * 50);
    }
    
    // 3. PARTÍCULAS DORADAS FLOTANTES
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.innerHTML = '✨';
        particle.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft + Math.random() * 100 - 50}px;
          top: ${pokeball.offsetTop + Math.random() * 100 - 50}px;
          font-size: ${12 + Math.random() * 8}px;
          color: #FFD700;
          z-index: 997;
          pointer-events: none;
          animation: ultra-sparkle ${1 + Math.random()}s ease-out forwards;
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
      }, i * 60);
    }
  }
  
  createQuickBallEffect(pokeball) {
    // Ondas de velocidad
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const wave = document.createElement('div');
        wave.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft - 20}px;
          top: ${pokeball.offsetTop - 20}px;
          width: 80px;
          height: 80px;
          border: 2px solid #00CCFF;
          border-radius: 50%;
          z-index: 997;
          pointer-events: none;
          animation: speed-wave 1s ease-out forwards;
        `;
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 1000);
      }, i * 150);
    }
  }
  
  createPremierBallEffect(pokeball) {
    // Confeti blanco
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft + Math.random() * 80 - 40}px;
          top: ${pokeball.offsetTop - 10}px;
          width: 8px;
          height: 8px;
          background: ${['#FFF', '#FFE', '#EEE'][Math.floor(Math.random() * 3)]};
          z-index: 998;
          pointer-events: none;
          animation: confetti-fall ${1 + Math.random()}s ease-in forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 2000);
      }, i * 50);
    }
  }

  createTimerBallEffect(pokeball) {
    // Números de tiempo cayendo
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const number = document.createElement('div');
        number.innerHTML = Math.floor(Math.random() * 10);
        number.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft + Math.random() * 60 - 30}px;
          top: ${pokeball.offsetTop - 20}px;
          font-size: 24px;
          font-weight: bold;
          color: #FF6600;
          z-index: 998;
          pointer-events: none;
          animation: number-fall 1.5s ease-in forwards;
        `;
        document.body.appendChild(number);
        
        setTimeout(() => number.remove(), 1500);
      }, i * 200);
    }
  }

  createDuskBallEffect(pokeball) {
    console.log('🌙 Creating Dusk Ball shadow effect!');
    
    // 1. EXPLOSIÓN DE SOMBRA
    const shadowExplosion = document.createElement('div');
    shadowExplosion.style.cssText = `
      position: fixed;
      left: ${pokeball.offsetLeft - 80}px;
      top: ${pokeball.offsetTop - 80}px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, 
        rgba(0, 0, 0, 0.9) 0%, 
        rgba(64, 0, 128, 0.7) 30%,
        rgba(0, 0, 0, 0.4) 60%, 
        transparent 80%);
      border-radius: 50%;
      z-index: 999;
      pointer-events: none;
      animation: dusk-shadow 1.5s ease-out forwards;
    `;
    document.body.appendChild(shadowExplosion);
    setTimeout(() => shadowExplosion.remove(), 1500);
    
    // 2. ONDAS DE OSCURIDAD CONCÉNTRICAS
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const darkWave = document.createElement('div');
        darkWave.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft - 40}px;
          top: ${pokeball.offsetTop - 40}px;
          width: 120px;
          height: 120px;
          border: 2px solid rgba(64, 0, 128, 0.8);
          border-radius: 50%;
          z-index: 998;
          pointer-events: none;
          animation: master-wave 1.8s ease-out forwards;
        `;
        document.body.appendChild(darkWave);
        setTimeout(() => darkWave.remove(), 1800);
      }, i * 150);
    }
    
    // 3. MURCIÉLAGOS SOMBRÍOS
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const bat = document.createElement('div');
        bat.innerHTML = '🦇';
        bat.style.cssText = `
          position: fixed;
          left: ${pokeball.offsetLeft + Math.random() * 150 - 75}px;
          top: ${pokeball.offsetTop - 30}px;
          font-size: ${14 + Math.random() * 6}px;
          z-index: 997;
          pointer-events: none;
          animation: dusk-bat-fly ${2 + Math.random()}s ease-out forwards;
          filter: drop-shadow(0 0 8px rgba(64, 0, 128, 0.8));
        `;
        document.body.appendChild(bat);
        setTimeout(() => bat.remove(), 3000);
      }, i * 100);
    }
  }

  createPokeballEffect(x, y, onComplete) {
    // Crear pokebola que se abre
    const pokeball = document.createElement('div');
    pokeball.className = 'pokeball-effect';
    pokeball.innerHTML = '⚪'; // Pokeball emoji como base
    pokeball.style.cssText = `
      position: fixed;
      left: ${x - 25}px;
      top: ${y - 25}px;
      width: 50px;
      height: 50px;
      font-size: 40px;
      z-index: 9999;
      pointer-events: none;
      animation: pokeball-open 1.5s ease-out forwards;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    document.body.appendChild(pokeball);
    
    // Efecto de apertura con delay
    setTimeout(() => {
      pokeball.innerHTML = '💥'; // Explosion effect
      pokeball.style.animation = 'pokeball-explosion 0.5s ease-out forwards';
      
      setTimeout(() => {
        pokeball.remove();
        if (onComplete) onComplete();
      }, 500);
    }, 1000);
  }

  createSparkleEffect(element) {
    // Crear partículas de sparkle alrededor del shiny
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✨';
      sparkle.style.cssText = `
        position: absolute;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: sparkle 1s ease-out forwards;
        left: ${element.offsetLeft + Math.random() * 60}px;
        top: ${element.offsetTop + Math.random() * 60}px;
      `;
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  }

  cleanup() {
    // Limpiar floaters que ya no tienen elemento en el DOM
    this.activeFloaters = this.activeFloaters.filter(floaterData => {
      if (floaterData.element && floaterData.element.parentNode) {
        return true;
      } else {
        if (floaterData.element) {
          floaterData.element.remove();
        }
        return false;
      }
    });
    
    // Verificar cambio de generación
    if (this.generationStartTime && 
        Date.now() - this.generationStartTime >= this.generationDuration && 
        !this.actionInProgress) {
      this.onGenerationComplete();
    }
  }

  removeFloater(element) {
    if (element && element.parentNode) {
      element.remove();
    }
    
    // Remover del array de activos
    this.activeFloaters = this.activeFloaters.filter(floater => floater.element !== element);
  }

  // Método para toggle del sistema
  toggle() {
    const isActive = document.body.classList.contains('pokemon-floaters-disabled');
    document.body.classList.toggle('pokemon-floaters-disabled');
    
    if (isActive) {
      console.log('🎮 Pokemon floaters activated!');
    } else {
      console.log('😴 Pokemon floaters disabled');
      this.activeFloaters.forEach(floater => {
        this.removeFloater(floater.element);
      });
      this.activeFloaters = [];
    }
  }
  
  isEnabled() {
    return !document.body.classList.contains('pokemon-floaters-disabled');
  }

  // Función de log simple
  log(message) {
    console.log(message);
  }

  destroy() {
    console.log('🧹 Destroying Pokemon Floaters System...');
    
    if (this.spawnTimer) {
      clearTimeout(this.spawnTimer);
      this.spawnTimer = null;
    }
    
    if (this.generationTimer) {
      clearTimeout(this.generationTimer);
      this.generationTimer = null;
    }
    
    this.activeFloaters.forEach(floater => {
      this.removeFloater(floater.element);
    });
    this.activeFloaters = [];
    
    console.log('✅ Pokemon Floaters System destroyed');
  }
}

// CSS para disable
const disableStyle = document.createElement('style');
disableStyle.textContent = `
  .pokemon-floaters-disabled .pokemon-floater {
    display: none !important;
  }
`;
document.head.appendChild(disableStyle);

// Inicializar sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // window.pokemonFloaters = new PokemonFloaters(); // TEMPORALMENTE DESACTIVADO PARA USAR NUEVO SISTEMA
  
  // Easter egg: Konami code para spawnar Mewtwo shiny
  let konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      console.log('🎮 KONAMI CODE ACTIVATED! 🎮');
      
      // Efecto pokeball en el centro de la pantalla
      window.pokemonFloaters.createPokeballEffect(
        window.innerWidth / 2, 
        window.innerHeight / 2, 
        () => {
          // Spawn Mewtwo shiny en el centro
          const floater = window.pokemonFloaters.createFloater('mewtwo', true);
          floater.classList.add('pokemon-large', 'pokemon-emerge');
          floater.style.position = 'fixed';
          floater.style.left = '50%';
          floater.style.top = '50%';
          floater.style.transform = 'translate(-50%, -50%)';
          floater.style.zIndex = '9999';
          document.body.appendChild(floater);
          
          console.log('✨🎆 ¡MEWTWO SHINY APARECIÓ! ¡Konami Code Master! 🎆✨');
          
          setTimeout(() => {
            window.pokemonFloaters.removeFloater(floater);
          }, 5000);
        }
      );
      
      konamiCode = [];
    }
  });
  
  // Botón pokemon toggle eliminado - usar solo el switch en ajustes
  
  console.log('🎮 Pokemon Floaters System loaded! Try clicking on them! 🎮');
  console.log('💡 Click the 🎮 button in bottom-right to toggle Pokemon');
  console.log('🎯 Try the Konami Code: ↑↑↓↓←→←→BA for a special surprise!');
  
  // Test inmediato: crear pokémon que se MUEVA correctamente
  setTimeout(() => {
    console.log('🧪 Creating moving Pokemon test...');
    if (window.pokemonFloaters) {
      // Forzar que NO esté pausado
      window.pokemonFloaters.isPaused = false;
      
      // Crear varios pokémon que se muevan
      window.pokemonFloaters.spawnSinglePokemon('pikachu', false);
      
      setTimeout(() => {
        window.pokemonFloaters.spawnSinglePokemon('charizard', true); // Shiny
      }, 2000);
      
      setTimeout(() => {
        window.pokemonFloaters.spawnSinglePokemon('garchomp', false);
      }, 4000);
    }
  }, 3000);
}); 