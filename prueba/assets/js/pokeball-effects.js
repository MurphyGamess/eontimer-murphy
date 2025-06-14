// 🎮 POKEBALL EFFECTS AVANZADOS - Inspirado en técnicas de simeydotme
// Sistema profesional de efectos de pokeballs con división realista y efectos holográficos

class AdvancedPokeballEffects {
  constructor() {
    this.activeEffects = new Set();
    this.effectQueue = [];
    this.isProcessing = false;
    
    // Auto-cleanup cada 30 segundos para mantener DOM limpio
    setInterval(() => {
      this.cleanup();
    }, 30000);
    
    console.log('🎾 AdvancedPokeballEffects initialized with auto-cleanup');
  }

  // 🎾 EFECTO PRINCIPAL: Pokeball con división y emergencia
  async createUltraRealisticPokeballEffect(pokemonName, isShiny, position, ballType, onComplete) {
    console.log(`🎾 Creating ULTRA-REALISTIC ${ballType} effect for ${pokemonName}`);
    
    const effectId = `pokeball-${Date.now()}-${Math.random()}`;
    this.activeEffects.add(effectId);

    // PASO 1: Crear pokeball estructurada
    const pokeballContainer = this.createStructuredPokeball(ballType, position);
    document.body.appendChild(pokeballContainer);

    // PASO 2: Animación de entrada (caída con rotación)
    await this.animatePokeballEntrance(pokeballContainer, ballType);

    // PASO 3: Agitación de captura (como en los juegos)
    await this.animatePokeballShake(pokeballContainer, ballType);

    // PASO 4: División espectacular con efectos
    await this.animatePokeballSplit(pokeballContainer, ballType, position);

    // PASO 5: Emergencia de luz y energía
    await this.createEmergenceEffects(position, ballType, isShiny);

    // PASO 6: Limpieza
    pokeballContainer.remove();
    this.activeEffects.delete(effectId);

    if (onComplete) onComplete();
  }

  // 🏗️ CONSTRUCCIÓN DE POKEBALL ESTRUCTURADA
  createStructuredPokeball(ballType, position) {
    const container = document.createElement('div');
    container.className = `pokeball-pro-container pokeball-${ballType}`;
    container.style.cssText = `
      position: fixed;
      left: ${position.x - 40}px;
      top: ${position.y - 40}px;
      width: 80px;
      height: 80px;
      z-index: 1000;
      pointer-events: none;
      transform-origin: center;
      perspective: 1000px;
    `;

    // MITAD SUPERIOR con gradientes realistas
    const topHalf = this.createPokeballHalf('top', ballType);
    
    // MITAD INFERIOR
    const bottomHalf = this.createPokeballHalf('bottom', ballType);
    
    // LÍNEA DIVISORIA
    const dividerLine = this.createDividerLine();
    
    // BOTÓN CENTRAL con efectos holográficos
    const centerButton = this.createCenterButton(ballType);
    
    // EFECTOS DE LUZ AMBIENTE
    const ambientGlow = this.createAmbientGlow(ballType);

    container.appendChild(ambientGlow);
    container.appendChild(topHalf);
    container.appendChild(bottomHalf);
    container.appendChild(dividerLine);
    container.appendChild(centerButton);

    return container;
  }

  createPokeballHalf(half, ballType) {
    const element = document.createElement('div');
    element.className = `pokeball-half pokeball-${half} pokeball-${half}-${ballType}`;
    
    const isTop = half === 'top';
    const colors = this.getBallColorScheme(ballType);
    
    element.style.cssText = `
      position: absolute;
      width: 80px;
      height: 40px;
      ${isTop ? 'top: 0;' : 'bottom: 0;'}
      left: 0;
      border-radius: ${isTop ? '80px 80px 0 0' : '0 0 80px 80px'};
      background: ${isTop ? colors.primary : '#ffffff'};
      border: 4px solid #2c2c2c;
      ${isTop ? 'border-bottom: 2px solid #2c2c2c;' : 'border-top: 2px solid #2c2c2c;'}
      box-shadow: 
        inset ${isTop ? '-12px 12px 0 8px' : '-12px -12px 0 8px'} rgba(0,0,0,0.15),
        inset ${isTop ? '12px -12px 0 8px' : '12px 12px 0 8px'} rgba(255,255,255,0.1),
        0 0 20px rgba(${colors.shadowColor}, 0.3);
      transition: all 0.3s ease;
      overflow: hidden;
    `;

    // Añadir reflexión metálica
    const reflection = document.createElement('div');
    reflection.style.cssText = `
      position: absolute;
      top: ${isTop ? '8px' : 'auto'};
      bottom: ${isTop ? 'auto' : '8px'};
      left: 12px;
      width: 24px;
      height: 16px;
      background: linear-gradient(45deg, 
        rgba(255,255,255,0.6) 0%, 
        rgba(255,255,255,0.2) 50%, 
        transparent 51%);
      border-radius: 50%;
      transform: rotate(-15deg);
    `;
    element.appendChild(reflection);

    return element;
  }

  createDividerLine() {
    const line = document.createElement('div');
    line.className = 'pokeball-divider';
    line.style.cssText = `
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 8px;
      background: linear-gradient(90deg, 
        #1a1a1a 0%, 
        #2c2c2c 20%, 
        #3a3a3a 50%, 
        #2c2c2c 80%, 
        #1a1a1a 100%);
      transform: translateY(-50%);
      z-index: 5;
      box-shadow: 
        0 2px 4px rgba(0,0,0,0.4),
        inset 0 1px 0 rgba(255,255,255,0.1);
    `;
    return line;
  }

  createCenterButton(ballType) {
    const button = document.createElement('div');
    button.className = `pokeball-button pokeball-button-${ballType}`;
    
    const colors = this.getBallColorScheme(ballType);
    
    button.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      background: radial-gradient(circle at 30% 30%, 
        #ffffff 0%, 
        ${colors.buttonColor} 30%, 
        ${colors.buttonDark} 70%, 
        #1a1a1a 100%);
      border: 4px solid #2c2c2c;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 6;
      box-shadow: 
        0 0 0 2px #1a1a1a,
        0 0 0 4px ${colors.buttonColor},
        0 4px 8px rgba(0,0,0,0.4),
        inset 0 2px 4px rgba(255,255,255,0.3),
        0 0 20px rgba(${colors.shadowColor}, 0.4);
      transition: all 0.2s ease;
    `;

    // Efecto holográfico sutil
    const holographic = document.createElement('div');
    holographic.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(255,255,255,0.1) 90deg,
        transparent 180deg,
        rgba(255,255,255,0.05) 270deg,
        transparent 360deg
      );
      animation: holographic-rotation 3s linear infinite;
    `;
    button.appendChild(holographic);

    return button;
  }

  createAmbientGlow(ballType) {
    const glow = document.createElement('div');
    const colors = this.getBallColorScheme(ballType);
    
    glow.className = 'pokeball-ambient-glow';
    glow.style.cssText = `
      position: absolute;
      top: -20px;
      left: -20px;
      width: 120px;
      height: 120px;
      background: radial-gradient(circle, 
        rgba(${colors.shadowColor}, 0.2) 0%, 
        rgba(${colors.shadowColor}, 0.1) 40%, 
        transparent 70%);
      border-radius: 50%;
      z-index: -1;
      animation: ambient-pulse 2s ease-in-out infinite alternate;
    `;
    
    return glow;
  }

  // 🎨 ESQUEMA DE COLORES PARA CADA POKEBALL
  getBallColorScheme(ballType) {
    const schemes = {
      pokeball: {
        primary: 'linear-gradient(135deg, #ff4444 0%, #cc0000 50%, #990000 100%)',
        buttonColor: '#ffffff',
        buttonDark: '#cccccc',
        shadowColor: '255, 68, 68'
      },
      greatball: {
        primary: 'linear-gradient(135deg, #4488ff 0%, #0066cc 50%, #004499 100%)',
        buttonColor: '#ffffff',
        buttonDark: '#cccccc',
        shadowColor: '68, 136, 255'
      },
      ultraball: {
        primary: 'linear-gradient(135deg, #666666 0%, #333333 50%, #1a1a1a 100%)',
        buttonColor: '#ffd700',
        buttonDark: '#ffb000',
        shadowColor: '255, 215, 0'
      },
      masterball: {
        primary: 'linear-gradient(135deg, #8844ff 0%, #6633cc 50%, #442299 100%)',
        buttonColor: '#ff69b4',
        buttonDark: '#cc1477',
        shadowColor: '255, 105, 180'
      },
      quickball: {
        primary: 'linear-gradient(135deg, #44ffff 0%, #00ccff 50%, #0099cc 100%)',
        buttonColor: '#ffff00',
        buttonDark: '#cccc00',
        shadowColor: '68, 255, 255'
      },
      timerball: {
        primary: 'linear-gradient(135deg, #888888 0%, #666666 50%, #444444 100%)',
        buttonColor: '#ff6600',
        buttonDark: '#cc4400',
        shadowColor: '255, 102, 0'
      },
      duskball: {
        primary: 'linear-gradient(135deg, #446644 0%, #224422 50%, #112211 100%)',
        buttonColor: '#ff0000',
        buttonDark: '#cc0000',
        shadowColor: '68, 102, 68'
      },
      premierball: {
        primary: 'linear-gradient(135deg, #ffffff 0%, #eeeeee 50%, #cccccc 100%)',
        buttonColor: '#ff0000',
        buttonDark: '#cc0000',
        shadowColor: '255, 255, 255'
      }
    };
    
    return schemes[ballType] || schemes.pokeball;
  }

  // 🎬 ANIMACIONES SECUENCIALES
  async animatePokeballEntrance(container, ballType) {
    return new Promise(resolve => {
      container.style.animation = 'pokeball-pro-entrance 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
      setTimeout(resolve, 1800);
    });
  }

  async animatePokeballShake(container, ballType) {
    return new Promise(resolve => {
      const button = container.querySelector('.pokeball-button');
      
      // Agitación realista como en los juegos
      container.style.animation = 'pokeball-pro-shake 2s ease-in-out forwards';
      
      // Botón parpadeando
      if (button) {
        button.style.animation = 'button-capture-blink 0.4s ease-in-out infinite';
      }
      
      setTimeout(() => {
        if (button) {
          button.style.animation = '';
        }
        resolve();
      }, 2000);
    });
  }

  async animatePokeballSplit(container, ballType, position) {
    return new Promise(resolve => {
      const topHalf = container.querySelector('.pokeball-top');
      const bottomHalf = container.querySelector('.pokeball-bottom');
      const divider = container.querySelector('.pokeball-divider');
      const button = container.querySelector('.pokeball-button');

      // Efectos de separación
      if (topHalf) topHalf.style.animation = 'pokeball-split-top-pro 1.2s ease-out forwards';
      if (bottomHalf) bottomHalf.style.animation = 'pokeball-split-bottom-pro 1.2s ease-out forwards';
      if (divider) divider.style.animation = 'fade-out-fast 0.4s ease-out forwards';
      if (button) button.style.animation = 'fade-out-fast 0.4s ease-out forwards';

      // Explosión de luz central
      setTimeout(() => {
        this.createCentralLightExplosion(position, ballType);
      }, 600);

      setTimeout(resolve, 1200);
    });
  }

  async createEmergenceEffects(position, ballType, isShiny) {
    const colors = this.getBallColorScheme(ballType);
    
    // Ondas de energía concéntricas
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.createEnergyWave(position, colors.shadowColor, i);
      }, i * 200);
    }

    // Partículas de emergencia
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        this.createEmergenceParticle(position, colors.shadowColor, isShiny);
      }, i * 80);
    }

    // Rayo de luz principal
    setTimeout(() => {
      this.createMainLightBeam(position, isShiny);
    }, 300);
  }

  createCentralLightExplosion(position, ballType) {
    const explosion = document.createElement('div');
    explosion.dataset.createdAt = Date.now();
    explosion.style.cssText = `
      position: fixed;
      left: ${position.x - 60}px;
      top: ${position.y - 60}px;
      width: 120px;
      height: 120px;
      background: radial-gradient(circle,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.9) 20%,
        rgba(173, 216, 230, 0.7) 40%,
        rgba(173, 216, 230, 0.3) 60%,
        transparent 80%);
      border-radius: 50%;
      z-index: 999;
      pointer-events: none;
      animation: central-explosion 1s ease-out forwards;
    `;
    
    document.body.appendChild(explosion);
    setTimeout(() => {
      if (explosion.parentNode) explosion.remove();
    }, 1200);
  }

  createEnergyWave(position, shadowColor, index) {
    const wave = document.createElement('div');
    wave.dataset.createdAt = Date.now();
    wave.style.cssText = `
      position: fixed;
      left: ${position.x - 20}px;
      top: ${position.y - 20}px;
      width: 40px;
      height: 40px;
      border: 3px solid rgba(${shadowColor}, ${0.8 - index * 0.15});
      border-radius: 50%;
      z-index: 998;
      pointer-events: none;
      animation: energy-wave-expand 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(wave);
    setTimeout(() => {
      if (wave.parentNode) wave.remove();
    }, 1800);
  }

  createEmergenceParticle(position, shadowColor, isShiny) {
    const particle = document.createElement('div');
    particle.dataset.createdAt = Date.now();
    const size = 4 + Math.random() * 8;
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 40;
    
    particle.innerHTML = isShiny ? '✨' : '💫';
    particle.style.cssText = `
      position: fixed;
      left: ${position.x}px;
      top: ${position.y}px;
      font-size: ${size}px;
      z-index: 997;
      pointer-events: none;
      animation: emergence-particle ${2 + Math.random()}s ease-out forwards;
      --end-x: ${Math.cos(angle) * distance}px;
      --end-y: ${Math.sin(angle) * distance}px;
      filter: drop-shadow(0 0 8px rgba(${shadowColor}, 0.8));
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => {
      if (particle.parentNode) particle.remove();
    }, 3500);
  }

  createMainLightBeam(position, isShiny) {
    const beam = document.createElement('div');
    beam.dataset.createdAt = Date.now();
    beam.style.cssText = `
      position: fixed;
      left: ${position.x - 30}px;
      top: ${position.y - 30}px;
      width: 60px;
      height: 60px;
      background: radial-gradient(circle,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.8) 30%,
        ${isShiny ? 'rgba(255, 215, 0, 0.6)' : 'rgba(173, 216, 230, 0.6)'} 60%,
        transparent 80%);
      border-radius: 50%;
      z-index: 996;
      pointer-events: none;
      animation: main-light-beam 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(beam);
    setTimeout(() => {
      if (beam.parentNode) beam.remove();
    }, 1800);
  }

  // 🏗️ CONSTRUCCIÓN DE POKEBALL CON SPRITE REAL
  createSpriteBasedPokeball(ballType, position) {
    const container = document.createElement('div');
    container.className = `pokeball-sprite-container pokeball-${ballType}`;
    container.style.cssText = `
      position: fixed;
      left: ${position.x - 40}px;
      top: ${position.y - 40}px;
      width: 80px;
      height: 80px;
      z-index: 1000;
      pointer-events: none;
      transform-origin: center;
      perspective: 1000px;
    `;

    // SPRITE DE POKEBALL REAL
    const spriteImg = document.createElement('img');
    spriteImg.src = this.getPokeballSpritePath(ballType);
    spriteImg.className = 'pokeball-sprite';
    spriteImg.style.cssText = `
      width: 64px;
      height: 64px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    `;

    // EFECTOS DE LUZ AMBIENTE ALREDEDOR DEL SPRITE
    const ambientGlow = this.createAmbientGlow(ballType);
    
    container.appendChild(ambientGlow);
    container.appendChild(spriteImg);

    return container;
  }

  // 🎨 OBTENER RUTA DEL SPRITE SEGÚN TIPO DE POKEBALL
  getPokeballSpritePath(ballType) {
    const spriteMap = {
      'pokeball': 'resources/sprites/pokeballs/pokeball.png',
      'greatball': 'resources/sprites/pokeballs/great-ball.png', 
      'ultraball': 'resources/sprites/pokeballs/ultra-ball.png',
      'masterball': 'resources/sprites/pokeballs/master-ball.png',
      'premierball': 'resources/sprites/pokeballs/premier-ball.png',
      'quickball': 'resources/sprites/pokeballs/quick-ball.png',
      'timerball': 'resources/sprites/pokeballs/timer-ball.png',
      'duskball': 'resources/sprites/pokeballs/dusk-ball.png'
    };
    
    return spriteMap[ballType] || spriteMap['pokeball'];
  }

  // 🌟 CREAR RESPLANDOR AMBIENTE ESPECÍFICO POR TIPO
  createAmbientGlow(ballType) {
    const ambientGlow = document.createElement('div');
    ambientGlow.className = 'pokeball-ambient-glow';
    
    // El CSS específico se aplica automáticamente por tipo
    return ambientGlow;
  }

  // 🎾 SISTEMA DE SPRITES REALES - Pokeball cerradas y abiertas
  createRealisticSpritePokeballEffect(pokemonName, isShiny, position, ballType, onComplete) {
    console.log(`🎾 Creating sprite-based ${ballType} effect for ${pokemonName}`);
    
    // 1. CREAR POKEBALL CERRADA CON SPRITE REAL
    const closedBall = this.createClosedPokeballSprite(ballType, position);
    
    // 2. SECUENCIA DE ANIMACIÓN: Caída → Agitación → Apertura → Pokémon sale
    this.animatePokeballSequence(closedBall, ballType, position, onComplete);
    
    return closedBall;
  }
  
  // 🏗️ CREAR POKEBALL CERRADA CON SPRITE REAL
  createClosedPokeballSprite(ballType, position) {
    const container = document.createElement('div');
    container.className = `pokeball-sprite-container pokeball-${ballType}`;
    container.style.cssText = `
      position: fixed;
      left: ${position.x - 32}px;
      top: ${position.y - 32}px;
      width: 64px;
      height: 64px;
      z-index: 1000;
      pointer-events: none;
      transform-origin: center;
    `;

    // SPRITE REAL DE POKEBALL CERRADA
    const spriteImg = document.createElement('img');
    spriteImg.src = this.getPokeballSpritePath(ballType, 'closed');
    spriteImg.className = 'pokeball-sprite-image';
    spriteImg.style.cssText = `
      width: 32px;
      height: 32px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    `;

    container.appendChild(spriteImg);
    document.body.appendChild(container);
    
    return container;
  }
  
  // 🎬 SECUENCIA COMPLETA DE ANIMACIÓN
  animatePokeballSequence(ballElement, ballType, position, onComplete) {
    // FASE 1: CAÍDA CON ROTACIÓN (1s)
    ballElement.style.animation = 'pokeball-fall 1s ease-in-out forwards';
    
    setTimeout(() => {
      // FASE 2: AGITACIÓN DE CAPTURA (2s)
      ballElement.style.animation = 'pokeball-shake 2s ease-in-out forwards';
      
      setTimeout(() => {
        // FASE 3: APERTURA DE POKEBALL (0.5s)
        this.openPokeballSprite(ballElement, ballType, position);
        
        setTimeout(() => {
          // FASE 4: EFECTOS DE SALIDA Y POKÉMON APARECE
          this.createPokeballOpeningEffects(position, ballType);
          
          // Llamar callback para que aparezca el Pokémon
          if (onComplete) onComplete();
          
          // FASE 5: LIMPIAR POKEBALL DESPUÉS DE 2s
          setTimeout(() => {
            ballElement.remove();
          }, 2000);
          
        }, 500);
      }, 2000);
    }, 1000);
  }
  
  // 🌟 ABRIR POKEBALL SIMULANDO DIVISIÓN
  openPokeballSprite(ballElement, ballType, position) {
    const spriteImg = ballElement.querySelector('.pokeball-sprite-image');
    
    // Crear mitad superior de la pokeball
    const topHalf = document.createElement('div');
    topHalf.className = 'pokeball-top-half';
    topHalf.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      width: 64px;
      height: 32px;
      background-image: url('${this.getPokeballSpritePath(ballType, 'closed')}');
      background-size: 32px 32px;
      background-position: center top;
      background-repeat: no-repeat;
      transform-origin: center bottom;
      animation: pokeball-top-open 0.5s ease-out forwards;
      image-rendering: pixelated;
    `;
    
    // Crear mitad inferior de la pokeball
    const bottomHalf = document.createElement('div');
    bottomHalf.className = 'pokeball-bottom-half';
    bottomHalf.style.cssText = `
      position: absolute;
      left: 0;
      top: 32px;
      width: 64px;
      height: 32px;
      background-image: url('${this.getPokeballSpritePath(ballType, 'closed')}');
      background-size: 32px 32px;
      background-position: center bottom;
      background-repeat: no-repeat;
      transform-origin: center top;
      animation: pokeball-bottom-open 0.5s ease-out forwards;
      image-rendering: pixelated;
    `;
    
    // Reemplazar sprite original con mitades
    spriteImg.style.display = 'none';
    ballElement.appendChild(topHalf);
    ballElement.appendChild(bottomHalf);
  }
  
  // 🌈 EFECTOS DE APERTURA DE POKEBALL
  createPokeballOpeningEffects(position, ballType) {
    // Luz central brillante
    this.createCentralOpeningLight(position, ballType);
    
    // Partículas de energía
    this.createEnergyParticles(position, ballType);
    
    // Ondas de energía
    this.createEnergyWaves(position, ballType);
  }
  
  // ✨ LUZ CENTRAL DE APERTURA
  createCentralOpeningLight(position, ballType) {
    const light = document.createElement('div');
    light.style.cssText = `
      position: fixed;
      left: ${position.x - 30}px;
      top: ${position.y - 30}px;
      width: 60px;
      height: 60px;
      background: radial-gradient(circle,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.8) 30%,
        ${this.getBallTypeColor(ballType)} 60%,
        transparent 80%);
      border-radius: 50%;
      z-index: 999;
      pointer-events: none;
      animation: opening-light-burst 1s ease-out forwards;
    `;
    
    document.body.appendChild(light);
    setTimeout(() => light.remove(), 1000);
  }
  
  // 🎨 OBTENER COLOR ESPECÍFICO POR TIPO DE POKEBALL
  getBallTypeColor(ballType) {
    const colors = {
      'pokeball': 'rgba(255, 100, 100, 0.6)',
      'greatball': 'rgba(100, 150, 255, 0.6)', 
      'ultraball': 'rgba(255, 215, 0, 0.6)',
      'masterball': 'rgba(160, 100, 255, 0.6)',
      'premierball': 'rgba(255, 255, 255, 0.6)',
      'quickball': 'rgba(100, 255, 255, 0.6)',
      'timerball': 'rgba(255, 150, 100, 0.6)',
      'duskball': 'rgba(100, 150, 100, 0.6)'
    };
    return colors[ballType] || 'rgba(173, 216, 230, 0.6)';
  }
  
  // 💫 PARTÍCULAS DE ENERGÍA
  createEnergyParticles(position, ballType) {
    for(let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      const angle = (i * 45) * (Math.PI / 180);
      const distance = 40 + Math.random() * 20;
      
      particle.innerHTML = '✨';
      particle.style.cssText = `
        position: fixed;
        left: ${position.x}px;
        top: ${position.y}px;
        font-size: ${6 + Math.random() * 4}px;
        z-index: 998;
        pointer-events: none;
        animation: energy-particle-burst 1.5s ease-out forwards;
        --end-x: ${Math.cos(angle) * distance}px;
        --end-y: ${Math.sin(angle) * distance}px;
        filter: drop-shadow(0 0 4px ${this.getBallTypeColor(ballType)});
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }
  }
  
  // 🌊 ONDAS DE ENERGÍA EXPANSIVAS
  createEnergyWaves(position, ballType) {
    for(let i = 0; i < 3; i++) {
      setTimeout(() => {
        const wave = document.createElement('div');
        wave.style.cssText = `
          position: fixed;
          left: ${position.x - 10}px;
          top: ${position.y - 10}px;
          width: 20px;
          height: 20px;
          border: 2px solid ${this.getBallTypeColor(ballType)};
          border-radius: 50%;
          z-index: 997;
          pointer-events: none;
          animation: energy-wave-expand 1.2s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 1200);
      }, i * 200);
    }
  }

  // 🧹 LIMPIEZA AUTOMÁTICA
  cleanup() {
    console.log('🧹 Cleaning up pokeball effects...');
    
    // Remover efectos huérfanos de pokeball avanzadas
    document.querySelectorAll('.pokeball-pro-container').forEach(el => {
      if (!this.activeEffects.has(el.dataset.effectId)) {
        console.log('🗑️ Removing orphan pokeball container');
        el.remove();
      }
    });
    
    // Remover partículas y ondas huérfanas
    document.querySelectorAll('[style*="position: fixed"][style*="pointer-events: none"]').forEach(el => {
      if (el.style.opacity === '0' || el.style.transform.includes('scale(0)')) {
        console.log('🗑️ Removing orphan particle/wave');
        el.remove();
      }
    });
    
    // Remover elementos de explosión y efectos temporales
    document.querySelectorAll('div').forEach(el => {
      const style = el.style.cssText;
      if (style.includes('central-explosion') || 
          style.includes('energy-wave-expand') || 
          style.includes('emergence-particle') ||
          style.includes('main-light-beam')) {
        const creationTime = el.dataset.createdAt;
        if (creationTime && Date.now() - parseInt(creationTime) > 5000) {
          console.log('🗑️ Removing expired effect element');
          el.remove();
        }
      }
    });
    
    console.log(`✅ Cleanup complete. Active effects: ${this.activeEffects.size}`);
  }

  // 🎾 SISTEMA SIMEYDOTME - Pokeball con spritesheet original
  createSimeydotmePokeballEffect(pokemonName, isShiny, position, ballType, onComplete) {
    console.log(`🎾 Creating simeydotme ${ballType} effect for ${pokemonName}${isShiny ? ' (SHINY)' : ''}`);
    
    // 1. CREAR CONTENEDOR
    const container = document.createElement('div');
    container.className = 'pokeball-simeydotme-container';
    container.style.cssText = `
      position: fixed;
      left: ${position.x - 20}px;
      top: ${position.y - 20}px;
      width: 41px;
      height: 41px;
      z-index: 1000;
      pointer-events: none;
    `;
    
    // 2. CREAR POKEBALL CON SPRITESHEET
    const pokeball = document.createElement('div');
    pokeball.className = `pokeball-simeydotme ${this.mapBallTypeToSimeydotme(ballType)}`;
    
    // 3. CREAR EFECTO DE LUZ
    const lightBurst = document.createElement('div');
    lightBurst.className = 'light-burst';
    
    container.appendChild(pokeball);
    container.appendChild(lightBurst);
    document.body.appendChild(container);
    
    // 4. SECUENCIA DE ANIMACIÓN CON EFECTOS ESPECIALES
    this.animateSimeydotmeSequenceWithEffects(pokeball, ballType, pokemonName, isShiny, onComplete);
    
    // 5. LIMPIEZA AUTOMÁTICA
    setTimeout(() => {
      container.remove();
    }, 5000);
    
    return container;
  }

  // 🗺️ MAPEAR TIPOS DE POKEBALL A CLASES DE SIMEYDOTME
  mapBallTypeToSimeydotme(ballType) {
    const ballMap = {
      'pokeball': 'poke',
      'greatball': 'great', 
      'ultraball': 'ultra',
      'masterball': 'master',
      'premierball': 'premier',
      'quickball': 'quick',
      'timerball': 'timer',
      'duskball': 'dusk'
    };
    
    return ballMap[ballType] || 'poke';
  }

  // 🎬 SECUENCIA DE ANIMACIÓN SIMEYDOTME CON EFECTOS ESPECIALES
  animateSimeydotmeSequenceWithEffects(pokeball, ballType, pokemonName, isShiny, onComplete) {
    // 1. POKEBALL CAE (ya está cerrada por defecto)
    pokeball.style.animation = 'pokeball-fall 1s ease-out forwards';
    
    setTimeout(() => {
      // 2. AGITACIÓN DE CAPTURA
      pokeball.classList.add('rock');
    }, 1000);
    
    setTimeout(() => {
      // 3. PARAR AGITACIÓN Y ABRIR
      pokeball.classList.remove('rock');
      pokeball.classList.add('open');
      
      // 4. ⭐ EFECTOS ESPECIALES PARA MASTER BALL
      if (ballType === 'masterball') {
        const rect = pokeball.getBoundingClientRect();
        const position = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        
        setTimeout(() => {
          if (isShiny) {
            // ✨ EFECTO EXTRA PARA POKÉMON SHINY
            console.log(`🌟 Master Ball + Shiny detected! Creating ULTIMATE effect for ${pokemonName}!`);
            this.createShinyMasterBallEffect(position, pokemonName);
          } else {
            // 🌟 EFECTO NORMAL DE MASTER BALL
            this.createMasterBallStarsEffect(position);
          }
        }, 300); // Pequeño delay después de abrir
      }
      
      // 5. LLAMAR CALLBACK PARA SPAWN DEL POKÉMON
      if (onComplete) {
        onComplete();
      }
    }, 2500);
  }
  
  // 🎬 SECUENCIA DE ANIMACIÓN SIMEYDOTME (método original mantenido por compatibilidad)
  animateSimeydotmeSequence(pokeball, ballType, onComplete) {
    this.animateSimeydotmeSequenceWithEffects(pokeball, ballType, 'unknown', false, onComplete);
  }

  // 🌟 EFECTO ESPECIAL MASTER BALL - Estrellas doradas como en los juegos
  createMasterBallStarsEffect(position) {
    console.log('✨ Creating Master Ball stars effect!');
    
    // Crear múltiples estrellas doradas
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        this.createMasterBallStar(position, i);
      }, i * 100); // Escalonar la aparición
    }
    
    // Efecto de luz dorada central
    this.createMasterBallGoldenBurst(position);
  }

  // ⭐ CREAR ESTRELLA INDIVIDUAL DE MASTER BALL
  createMasterBallStar(position, index) {
    const star = document.createElement('div');
    star.innerHTML = '✨';
    star.dataset.createdAt = Date.now();
    
    // Posición aleatoria alrededor del centro
    const angle = (index * 30) + Math.random() * 60; // Distribuir en círculo
    const distance = 40 + Math.random() * 80;
    const startX = position.x + Math.cos(angle * Math.PI / 180) * 20;
    const startY = position.y + Math.sin(angle * Math.PI / 180) * 20;
    const endX = position.x + Math.cos(angle * Math.PI / 180) * distance;
    const endY = position.y + Math.sin(angle * Math.PI / 180) * distance;
    
    star.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      font-size: ${16 + Math.random() * 12}px;
      z-index: 1001;
      pointer-events: none;
      color: #FFD700;
      text-shadow: 
        0 0 5px #FFD700,
        0 0 10px #FFD700,
        0 0 15px #FFA500;
      animation: master-ball-star 2s ease-out forwards;
      --end-x: ${endX - startX}px;
      --end-y: ${endY - startY}px;
    `;
    
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  }

  // 💫 RESPLANDOR DORADO CENTRAL DE MASTER BALL
  createMasterBallGoldenBurst(position) {
    const burst = document.createElement('div');
    burst.dataset.createdAt = Date.now();
    burst.style.cssText = `
      position: fixed;
      left: ${position.x - 50}px;
      top: ${position.y - 50}px;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle,
        rgba(255, 215, 0, 1) 0%,
        rgba(255, 215, 0, 0.8) 20%,
        rgba(255, 165, 0, 0.6) 40%,
        rgba(255, 215, 0, 0.3) 60%,
        transparent 80%);
      border-radius: 50%;
      z-index: 1000;
      pointer-events: none;
      animation: master-ball-golden-burst 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1500);
  }

  // ✨ EFECTO ESPECIAL PARA POKÉMON SHINY + MASTER BALL
  createShinyMasterBallEffect(position, pokemonName) {
    console.log(`🌟✨ Creating SHINY Master Ball effect for ${pokemonName}!`);
    
    // Efecto de estrellas normal
    this.createMasterBallStarsEffect(position);
    
    // Añadir estrellas extra multicolor para shiny
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        this.createShinySparkle(position, i);
      }, i * 150);
    }
    
    // Mensaje especial en consola
    setTimeout(() => {
      console.log(`🎆✨ ¡${pokemonName} SHINY emerge de la Master Ball con máximo esplendor! ✨🎆`);
    }, 1000);
  }

  // 🌈 CREAR DESTELLO SHINY MULTICOLOR
  createShinySparkle(position, index) {
    const sparkle = document.createElement('div');
    const colors = ['#FF69B4', '#00BFFF', '#32CD32', '#FFD700', '#FF6347', '#DA70D6'];
    const color = colors[index % colors.length];
    
    sparkle.innerHTML = '✨';
    sparkle.dataset.createdAt = Date.now();
    
    const angle = index * 45;
    const distance = 60 + Math.random() * 40;
    const startX = position.x;
    const startY = position.y;
    const endX = position.x + Math.cos(angle * Math.PI / 180) * distance;
    const endY = position.y + Math.sin(angle * Math.PI / 180) * distance;
    
    sparkle.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      font-size: ${20 + Math.random() * 8}px;
      z-index: 1002;
      pointer-events: none;
      color: ${color};
      text-shadow: 
        0 0 8px ${color},
        0 0 15px ${color},
        0 0 25px ${color};
      animation: shiny-sparkle 2.5s ease-out forwards;
      --end-x: ${endX - startX}px;
      --end-y: ${endY - startY}px;
    `;
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2500);
  }
}

// Exportar para uso global
window.AdvancedPokeballEffects = AdvancedPokeballEffects;
