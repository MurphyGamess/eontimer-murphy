# 🎮 EONTIMER-MURPHY - Timer Profesional para RNG de Pokémon

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Electron](https://img.shields.io/badge/electron-latest-brightgreen.svg)
![Bootstrap](https://img.shields.io/badge/bootstrap-5.3.0-purple.svg)
![Status](https://img.shields.io/badge/status-production--ready-success.svg)

**Timer profesional para RNG de Pokemon** con interfaz dashboard moderna, sistema completo de Pokemon flotantes, pokébolas animadas con 27 tipos oficiales, sistema de pause/resume inteligente y efectos especiales avanzados.

---

## ✨ **Características Principales v2.0**

### ⏱️ **Sistema de Timer Avanzado**
- **Timer principal y secundario** con precisión de milisegundos
- **Configuración CPS** para múltiples sistemas (GBA, DS, Channel)
- **Calibración personalizada** para ajustes finos
- **Pre-timer configurable** para preparación
- **Historial de cálculos** con éxito/fallo

### 🎾 **Sistema de Pokemon Completo** ⭐ **NUEVA CARACTERÍSTICA PRINCIPAL v2.0**
- **🎮 Sistema de Pokemon Flotantes** con más de 150 especies
- **✨ Sistema Shiny Avanzado** con efectos de texto brillante
- **👑 Clasificación Pokemon** (Regulares, Pseudo-Legendarios, Legendarios)
- **🎾 27 Pokeballs Diferentes** con lógica de captura realista
- **⏸️ Sistema Pause/Resume** que conserva progreso
- **📊 Estadísticas en Tiempo Real** (Activos, Shinies, Legendarios)
- **🌐 Grid Interactivo** de todas las pokeballs

### 🎨 **Efectos Visuales Avanzados**
- **Secuencias de Animación Completas**: Caída → Apertura → Pokemon emerge → Espera 10s → Captura
- **Efectos Shiny Especiales**: Texto "✨ SHINY! ✨" con múltiples sombras brillantes
- **Sistema de Translucencia**: Pokemon automáticamente translúcidos durante interacciones
- **Master Ball Épico**: Estrellas doradas, aura púrpura, partículas brillantes
- **Sprites Naturales**: Pokemon mantienen sus dimensiones originales de GIF

### 🔧 **Sistema de Configuración Mejorado**
- **Modal Completamente Visible**: Fondos sólidos, sin transparencias problemáticas
- **Controles Pokemon Integrados**: Toggle pause/resume, grid de pokeballs
- **Vista Previa de Logo**: Posicionamiento visual en tiempo real
- **Configuraciones de Fondo**: Selector visual y upload

### 📱 **Interfaz Dashboard Profesional**
- **Navegación por pestañas** organizada e intuitiva
- **Cards temáticas** con colores específicos por función
- **Iconos Bootstrap** profesionales y consistentes
- **Efectos hover** y animaciones suaves
- **Responsive design** adaptativo

---

## 🆕 **Nuevas Características v2.0**

### 🎮 **Sistema de Pokemon Flotantes**
```javascript
// Más de 150 Pokemon organizados por generaciones
Kanto (Gen I): bulbasaur, charizard, pikachu, mewtwo, mew...
Johto (Gen II): chikorita, typhlosion, lugia, hooh, celebi...
Hoenn (Gen III): treecko, blaziken, rayquaza, kyogre, latios...
Sinnoh (Gen IV): turtwig, infernape, dialga, palkia, arceus...
Unova (Gen V): snivy, emboar, reshiram, zekrom, victini...
Kalos (Gen VI): chespin, greninja, xerneas, yveltal...
Alola (Gen VII): rowlet, incineroar, solgaleo, lunala...
Galar (Gen VIII): grookey, cinderace, zacian, zamazenta...
```

### ✨ **Sistema Shiny Mejorado**
- **Detección Automática**: 20% base, 25% pseudo-legendarios, 35% legendarios
- **Efectos Visuales**: Texto "✨ SHINY! ✨" centrado en la cabeza del Pokemon
- **Styling Brillante**: Múltiples text-shadows en colores dorados y plateados
- **Sprites Especiales**: Carga automática desde carpeta `ani-shiny/`

### 🎾 **Sistema de Pokeballs Inteligente**
```javascript
// Lógica de asignación automática por rareza
Legendarios → Master Ball (siempre)
Pseudo-Legendarios → Ultra Ball, Timer Ball, Dusk Ball, Repeat Ball
Pokemon Regulares → Cualquier pokeball (excepto Master Ball)

// Efectos especiales por tipo
Master Ball → 15 estrellas doradas + aura púrpura
Ultra Ball → Rayos azules con ondas expansivas  
Quick Ball → Efectos de velocidad amarilla
Dusk Ball → Partículas oscuras para tipos Dark/Ghost
```

### ⏸️ **Sistema Pause/Resume Inteligente**
- **Pausa Real**: No elimina Pokemon, solo los pausa visualmente
- **Indicadores Visuales**: 50% opacidad + escala de grises durante pausa
- **Conserva Progreso**: Todas las animaciones y posiciones se mantienen
- **Reanudación Perfecta**: Continúa exactamente donde se pausó

### 📊 **Estadísticas en Tiempo Real**
```javascript
// Modal de configuración muestra:
Activos: 4/6        // Pokemon actuales vs máximo
Shinies: 2          // Pokemon shiny en pantalla  
Legendarios: 1      // Pokemon legendarios activos
Total Spawned: 47   // Total generado en sesión
```

### 🌐 **Grid Interactivo de Pokeballs**
- **27 Pokeballs en Grid 9×3**: Visualización completa de todos los tipos
- **Frame 1 por Defecto**: Todas las pokeballs en estado cerrado
- **Clickeable**: Cada pokeball ejecuta su secuencia de animación completa
- **Hover Effects**: Bordes dorados y escalado al pasar mouse
- **Fondo Temático**: Modal con blur y borde dorado

---

## 🔧 **Mejoras Técnicas v2.0**

### 🐛 **Corrección de Errores Pokemon**
```javascript
// Nombres arreglados para compatibilidad con archivos de sprite
❌ 'Ho-Oh' → ✅ 'Hooh'
❌ 'Kommo-o' → ✅ 'Kommoo'  
❌ 'tapu-koko' → ✅ 'tapukoko'
❌ 'type-null' → ✅ 'typenull'
❌ 'wo-chien' → ✅ 'wochien'
// Y más correcciones de nombres con guiones
```

### 🎨 **Modal de Configuración Optimizado**
```css
/* Antes: Fondos con transparencias problemáticas */
❌ bg-opacity-25, bg-opacity-50, bg-opacity-75

/* Ahora: Fondos sólidos completamente visibles */
✅ background-color: #1a1a1a !important;
✅ background-color: #2a2a2a !important; 
✅ background-color: #333333 !important;
✅ border-light border-3 para máximo contraste
```

### 🎯 **Sistema de Espaciado Pokemon**
- **120px mínimo entre Pokemon**: Previene superposiciones
- **Algoritmo de posicionamiento**: Máximo 10 intentos para encontrar posición libre
- **Fallback inteligente**: Si no encuentra espacio, usa posición aleatoria
- **Límite de 6 Pokemon**: Control de performance y visibilidad

### 🌊 **Sistema de Translucencia Automática**
```javascript
// Pokemon se vuelven automáticamente translúcidos durante:
✓ Apertura de modales (configuración, pokeball info)
✓ Clicks en botones del sistema
✓ Visualización del grid de pokeballs
✓ Cualquier interacción con la UI

// Y se restauran automáticamente al cerrar
```

---

## 🚀 **Instalación y Uso**

### 📦 **Requisitos Previos**
- **Node.js** v16 o superior
- **npm** v8 o superior  
- **Git** para clonado
- **Conexión a Internet** para descarga automática de Pokemon

### 🔧 **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/MurphyGamess/eontimer-murphy.git
cd eontimer-murphy

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para distribución
npm run build
```

### 🎾 **Sistema de Descarga Automática de Pokemon**

#### ✅ **Descarga Automática (Primera Ejecución)**
Al ejecutar la aplicación por primera vez:
1. **Detección automática**: Verifica si existen sprites de Pokemon localmente
2. **Descarga masiva**: Si no existen, descarga automáticamente desde [Pokemon Showdown](https://play.pokemonshowdown.com/sprites/ani/)
3. **UI de progreso**: Muestra barras de progreso para Pokemon normales y shiny
4. **Verificación de integridad**: Reintenta automáticamente las descargas fallidas
5. **Alerta de faltantes**: Si algunos Pokemon no se pueden descargar, muestra una burbuja roja

#### 📂 **Estructura de Archivos Descargados**
```
resources/
├── sprites/
│   ├── ani/           # ~1000+ Pokemon normales (.gif)
│   ├── ani-shiny/     # ~1000+ Pokemon shiny (.gif)
│   └── pokeball-sprites-oficial.png
├── config/
│   └── settings.json  # Flag de descarga completada
```

#### 🚨 **Si Aparece la Burbuja de "Pokemon Faltantes"**
1. **Click en la burbuja roja** para ver detalles de qué Pokemon faltan
2. **Verificar conexión** a internet estable
3. **Usar botón "Reintentar"** en el diálogo para reanudar descarga
4. **Descarga manual** como último recurso (ver abajo)

#### 📥 **Descarga Manual (Si es Necesario)**

**Opción 1: Enlaces Directos**
- **Pokemon Normales**: https://play.pokemonshowdown.com/sprites/ani/
- **Pokemon Shiny**: https://play.pokemonshowdown.com/sprites/ani-shiny/

**Opción 2: Script Manual desde Línea de Comandos**
```bash
# Descargar ambos tipos (normal + shiny)
node scripts/download-pokemon.js

# Solo Pokemon normales
node scripts/download-pokemon.js --normal-only

# Solo Pokemon shiny
node scripts/download-pokemon.js --shiny-only

# Forzar re-descarga con detalles
node scripts/download-pokemon.js --force --verbose

# Ver ayuda completa
node scripts/download-pokemon.js --help
```

**Opción 3: Reiniciar Sistema Automático**
```bash
# Eliminar flag de descarga completada
rm -rf config/settings.json

# Reiniciar aplicación - activará descarga automática
npm start
```

**Opción 4: Verificar Descargas Existentes**
```bash
# Verificar cuántos archivos hay descargados
ls resources/sprites/ani/ | wc -l      # Debería ser ~1000+
ls resources/sprites/ani-shiny/ | wc -l # Debería ser ~1000+
```

#### ⚡ **Características del Sistema**
- ✅ **Descarga concurrente**: 3 Pokemon simultáneamente (optimal performance)
- ✅ **Reintentos automáticos**: 3 intentos por Pokemon fallido
- ✅ **Pausa inteligente**: 800ms entre grupos para no sobrecargar servidor
- ✅ **Verificación de integridad**: Detecta archivos corruptos o faltantes
- ✅ **UI no bloqueante**: Puedes usar la aplicación durante la descarga

### Uso del Sistema Pokemon
1. **Abrir aplicación** y ir al modal de configuración (⚙️)
2. **Toggle "Sistema Pokemon"** para pausar/reanudar
3. **Click "📜 Todas"** para ver grid completo de pokeballs
4. **Observar estadísticas** en tiempo real en el modal
5. **Disfrutar efectos especiales** cuando aparezcan Pokemon shiny/legendarios

---

## 📁 **Estructura del Proyecto v2.0**

```
eontimer-murphy/
├── README.md ⭐                    # DOCUMENTACIÓN COMPLETA v2.0
├── index.html ⭐                   # PRINCIPAL - Sistema Pokemon completo
├── main.js ⭐                      # CONFIGURADO PANTALLA COMPLETA
├── assets/ ⭐                      
│   ├── css/
│   │   ├── main.css               # Layout dashboard profesional
│   │   ├── components.css         # Componentes UI optimizados
│   │   ├── pokeball-effects.css ⭐ # Efectos pokeballs + correcciones
│   │   ├── sprite-fixes.css ⭐     # NUEVO - Centralizó correcciones
│   │   └── style.css ⭐            # Pokemon flotantes mejorado
│   └── js/
│       ├── app.js                 # Timer + configuraciones
│       ├── renderer.js            # Temas y gestión UI
│       ├── pokeball-effects.js ⭐  # Efectos avanzados pokeballs
│       └── pokemon-floaters.js ⭐  # POKEMON SYSTEM v2.0 - 150+ especies
├── resources/ ⭐                   
│   ├── sprites/
│   │   ├── pokeball-sprites-oficial.png # 27×11 sprites oficiales
│   │   ├── ani/                   # 150+ Pokemon normales
│   │   └── ani-shiny/ ⭐           # 150+ Pokemon shiny
│   ├── sounds/                    # Efectos de sonido
│   └── themes/                    # Temas personalizables
├── prueba/ ⭐                      # DEMO TÉCNICA
│   ├── test-masterball.html       # Demo 27 pokeballs
│   └── assets/                    # Recursos demo
├── config/                        # Configuraciones guardadas
├── package.json ⭐                 # v2.0.0 + dependencias
└── LICENSE
```

---

## 🎮 **Nuevos Controles v2.0**

### 🎾 **Sistema Pokemon**
- **Toggle Pause/Resume**: Conserva todos los Pokemon en pantalla
- **Grid de Pokeballs**: Visualiza y prueba las 27 pokeballs
- **Estadísticas Live**: Contador en tiempo real de Pokemon activos
- **Límite Inteligente**: Máximo 6 Pokemon para optimal performance

### ✨ **Efectos Especiales**
- **Shiny Detection**: Automático con efectos de texto brillante
- **Master Ball Stars**: 15 estrellas doradas en explosión circular
- **Translucent Mode**: Pokemon semi-transparentes durante interacciones
- **Natural Sizing**: Pokemon mantienen dimensiones originales de GIF

### 📊 **Estadísticas Avanzadas**
```javascript
// Visible en modal de configuración:
🟢 Activos: 4        // Pokemon visibles ahora
✨ Shiny: 2          // Pokemon shiny en pantalla
👑 Legendarios: 1    // Pokemon legendarios activos  
📈 Total: 47         // Total spawned en sesión
```

---

## 🔧 **Configuración de Sistemas RNG**

| Sistema | CPS | Notas | Uso Recomendado |
|---------|-----|-------|-----------------|
| **GBA** | 59.7275 | Game Boy Advance original | Emerald, Ruby/Sapphire |
| **DS** | 59.6555 | Nintendo DS nativo | Diamond/Pearl, Platinum |
| **DS GBA** | 59.8261 | GBA en DS | Emerald en DS |
| **Channel NTSC** | 62/134/123 | Pokemon Channel NTSC | Canal Pokémon |
| **Channel PAL** | 52/112/103 | Pokemon Channel PAL | Canal Pokémon Europa |
| **Emulador** | 60 | Emuladores estándar | VBA, DeSmuME |
| **Personalizado** | Variable | Configuración manual | Casos específicos |

---

## 🎯 **Especificaciones Técnicas Pokemon v2.0**

### 🎮 **Sistema de Generaciones**
```javascript
// Organizados por generación para variedad
Generation I (Kanto): 45+ Pokemon incluidos
Generation II (Johto): 35+ Pokemon incluidos  
Generation III (Hoenn): 25+ Pokemon incluidos
Generation IV (Sinnoh): 20+ Pokemon incluidos
Generation V+ (Moderno): 25+ Pokemon incluidos

// Total: 150+ Pokemon únicos con sprites ani + ani-shiny
```

### ✨ **Sistema Shiny Mejorado**
```css
/* Efectos de texto shiny brillante */
.shiny-text-brilliant {
    color: #FFD700;
    text-shadow: 
        0 0 5px #FFD700,
        0 0 10px #FFD700, 
        0 0 15px #FFD700,
        0 0 20px #FFA500,
        0 0 35px #FFA500,
        2px 2px 4px rgba(0,0,0,0.8);
    animation: shinyTextPulse 1.5s ease-in-out infinite alternate;
}
```

### 🎾 **Lógica de Pokeball Inteligente**
```javascript
// Asignación automática por rareza
function getPokeballType(pokemonName, isShiny) {
    if (isLegendary(pokemonName) || isShiny) {
        return 'masterball'; // Siempre Master Ball
    }
    if (isPseudoLegendary(pokemonName)) {
        return randomSelect(['ultraball', 'timerball', 'duskball', 'repeatball']);
    }
    if (isDarkOrGhost(pokemonName)) {
        return 'duskball'; // Dusk Ball para tipos apropiados
    }
    if (isWaterOrBug(pokemonName)) {
        return 'netball'; // Net Ball para tipos Water/Bug
    }
    // Pokemon regulares: cualquier pokeball excepto Master Ball
    return randomRegularPokeball();
}
```

### ⏸️ **Sistema Pause/Resume Técnico**
```javascript
// Pausa inteligente que conserva estado
pauseSystem() {
    // ✅ Pausar timers sin eliminar
    this.isCountdownActive = true;
    clearTimeout(this.countdownTimer);
    
    // ✅ Pausar animaciones CSS
    document.querySelectorAll('[data-pokemon-id]').forEach(sprite => {
        sprite.style.animationPlayState = 'paused';
        sprite.style.opacity = '0.5';
        sprite.style.filter = 'grayscale(50%)';
    });
    
    // ✅ Conservar datos en memoria
    // this.activePokemon array se mantiene intacto
}

resumeSystem() {
    // ✅ Reanudar exactamente donde se pausó
    this.isCountdownActive = false;
    
    // ✅ Restaurar animaciones
    document.querySelectorAll('[data-pokemon-id]').forEach(sprite => {
        sprite.style.animationPlayState = 'running';
        sprite.style.opacity = '1';
        sprite.style.filter = 'none';
    });
    
    // ✅ Continuar spawning automático
    this.spawnRandomPokemon();
}
```

---

## 🌟 **Efectos Especiales Únicos v2.0**

### 👑 **Master Ball Épico Mejorado**
- **15 Estrellas Doradas**: Explosión circular perfecta con rotación
- **Aura Púrpura-Dorada**: Gradiente radial expansivo  
- **25 Partículas Brillantes**: Colores oro/púrpura aleatorios
- **Duración Extendida**: 3 segundos de efectos coordinados

### ✨ **Sistema Shiny Avanzado**
- **Texto Centrado**: "✨ SHINY! ✨" perfectamente posicionado en cabeza Pokemon
- **6 Capas de Sombra**: Efecto de resplandor dorado multicapa
- **Animación Pulse**: Respiración suave del texto brillante
- **Auto-Remove**: Desaparece automáticamente con el Pokemon

### 🌊 **Translucencia Inteligente**
```javascript
// Sistema automático durante interacciones UI
function applyTranslucency() {
    document.querySelectorAll('[data-pokemon-id]').forEach(pokemon => {
        pokemon.style.opacity = '0.3';
    });
}

function removeTranslucency() {
    document.querySelectorAll('[data-pokemon-id]').forEach(pokemon => {
        pokemon.style.opacity = '1';
    });
}

// Auto-aplicado en:
// - Modal openings
// - Button clicks  
// - Grid pokeball display
// - UI interactions
```

---

## 🎮 **Modo Pantalla Completa**

### ⚙️ **Configuración Electron**
```javascript
// main.js configurado para pantalla completa automática
const mainWindow = new BrowserWindow({
    fullscreen: true,        // ✅ Pantalla completa al abrir
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
});

// Atajos de teclado
// F11: Toggle fullscreen
// ESC: Salir de pantalla completa
```

---

## 🚀 **Rendimiento Optimizado v2.0**

### ✅ **Nuevas Optimizaciones**
- ✅ **120px Spacing**: Previene superposiciones de Pokemon
- ✅ **Límite 6 Pokemon**: Control de memoria y performance
- ✅ **Cleanup Automático**: Elementos DOM se eliminan tras animaciones
- ✅ **Pause Inteligente**: No elimina, solo pausa para conservar memoria
- ✅ **Sprites Naturales**: Sin redimensionado forzado, mejor calidad
- ✅ **Translucencia Automática**: Mejora UX durante interacciones
- ✅ **Grid Eficiente**: 27 pokeballs en modal optimizado

### 📊 **Estadísticas v2.0**
- **Pokemon Nombres Arreglados**: 8+ nombres corregidos sin guiones
- **Modal Visibilidad**: 100% opaco, sin transparencias problemáticas
- **Sistema Pause**: Conserva 100% del progreso vs eliminar todo
- **Especies Pokemon**: 150+ especies vs las anteriores ~50
- **Efectos Especiales**: 5x más efectos visuales que v1.0

---

## 🎯 **Casos de Uso v2.0**

### 🏃‍♂️ **Speedrunning Profesional**
- **Pantalla Completa**: Máxima inmersión sin distracciones
- **Sistema Pause**: Pausar Pokemon durante runs importantes
- **Timers Precisos**: Milisegundos exactos para splits

### 🎲 **RNG Manipulation + Entertainment**
- **Pokemon Flotantes**: Entretenimiento visual durante cálculos largos
- **Efectos Shiny**: Celebración automática cuando aparecen raros
- **Grid Pokeballs**: Explorar todos los tipos disponibles

### 🎮 **Streaming y Content Creation**
- **Efectos Espectaculares**: Master Ball con 15 estrellas impresiona viewers
- **Sistema de Stats**: Mostrar contadores de Pokemon en vivo
- **Pantalla Completa**: Mejor calidad visual para streaming

### 🔬 **Desarrollo y Testing**
- **150+ Pokemon**: Base amplia para testing de sprites
- **Sistema Modular**: Fácil agregar nuevos Pokemon/efectos
- **Debug Completo**: Logs detallados para troubleshooting

---

## 🤝 **Contribución al Proyecto v2.0**

### Nuevas Áreas de Mejora
- [ ] **Sonidos específicos** por tipo de pokeball y Pokemon
- [ ] **Evoluciones en vivo** de Pokemon después de captura
- [ ] **Biomas y habitats** que influyan en spawning
- [ ] **Sistema de favoritos** para Pokemon específicos
- [ ] **Estadísticas persistentes** guardadas localmente
- [ ] **Modo competitivo** con objetivos y logros
- [ ] **Export de highlights** (capturas de pantalla automáticas)

### Cómo Contribuir
1. **Fork** el repositorio
2. **Crea** rama feature (`git checkout -b feature/pokemon-evolution`)
3. **Implementa** mejoras siguiendo el estilo de código actual
4. **Testa** que funcione en index.html y no rompa el sistema existente
5. **Commit** con mensaje descriptivo (`git commit -m 'Add Pokemon evolution system'`)
6. **Push** y crea Pull Request

---

## 📋 **Solución de Problemas v2.0**

### ❌ **Problemas Nuevos y Soluciones**

1. **"Pokemon no aparecen después de arreglos de nombres"**
   - ✅ Verificar que los archivos GIF existan sin guiones: `hooh.gif`, `kommoo.gif`
   - ✅ Comprobar que pokemon-floaters.js use nombres sin guiones
   - ✅ Validar que index.html tenga nombres consistentes

2. **"Modal de configuración barely visible"**
   - ✅ Ya arreglado: fondos sólidos reemplazan transparencias
   - ✅ Verificar estilos CSS con `!important` para máxima visibilidad
   - ✅ Usar inspector F12 para confirmar colores aplicados

3. **"Toggle oculta Pokemon en lugar de pausar"** 
   - ✅ Ya arreglado: ahora usa `pauseSystem()` y `resumeSystem()`
   - ✅ Pokemon conservan posición con 50% opacidad + escala grises
   - ✅ Verificar que switch use nuevas funciones, no `removeAllPokemon()`

4. **"Grid de pokeballs no responde a clicks"**
   - ✅ Verificar event listeners en cada pokeball del grid
   - ✅ Comprobar que se cierre modal antes de ejecutar animación
   - ✅ Confirmar que `createFrameByFramePokeballSequenceMain()` existe

5. **"Aplicación no abre en pantalla completa"**
   - ✅ Verificar `main.js` tenga `fullscreen: true`
   - ✅ Probar F11 para toggle manual de fullscreen
   - ✅ Comprobar permisos de aplicación en sistema operativo

### 🔍 **Modo Debug v2.0**
```javascript
// Nuevos comandos de debug en consola
debugPokemonSystem();           // Estado completo del sistema
window.forceSpawnPokemon();     // Forzar aparición inmediata
window.clearAllPokemon();       // Limpiar todos (emergency)
window.testPokeballMain('masterball'); // Test pokeball específica

// Logs automáticos
console.log('🎮 Sistema Pokemon pausado/reanudado');
console.log('✨ Shiny Pokemon detected!');
console.log('👑 Legendary Pokemon using Master Ball');
console.log('📊 Stats updated: Active/Shiny/Legendary counts');
```

---

## 👨‍💻 **Desarrollador**

**MURPHY** - Creador y desarrollador principal del EonTimer v2.0

### Créditos v2.0
- **Simeydotme** - Spritesheet oficial de pokébolas
- **Pokemon Community** - Sprites GIF de 150+ especies
- **Bootstrap Team** - Framework CSS e iconografía
- **Electron Team** - Aplicación de escritorio
- **RNG Community** - Testing extensivo y feedback v2.0

---

## 📄 **Licencia**

Este proyecto está bajo la **Licencia MIT** - ver [LICENSE](LICENSE) para detalles.

---

## 🔗 **Enlaces v2.0**

- **📁 GitHub**: [MurphyGamess/eontimer-murphy](https://github.com/MurphyGamess/eontimer-murphy)
- **🎮 Aplicación Principal**: `index.html` - Sistema Pokemon completo
- **🎪 Demo Pokeballs**: `prueba/test-masterball.html` - 27 tipos
- **📚 Documentación**: Este README.md completo
- **⚙️ Configuración**: Modal integrado con controles Pokemon

---

## 🎉 **Estado del Proyecto v2.0**

### ✅ **PRODUCTION READY - COMPLETELY FUNCTIONAL**

**🔧 Correcciones Aplicadas:**
- ✅ **Pokemon Naming**: 8+ nombres corregidos (Ho-Oh→Hooh, etc.)
- ✅ **Modal Visibility**: 100% opaco, completamente visible
- ✅ **Pause System**: Conserva progreso, no elimina Pokemon
- ✅ **Fullscreen Mode**: Aplicación abre en pantalla completa
- ✅ **Grid System**: 27 pokeballs interactivas funcionando

**🚀 Nuevas Características:**
- ✅ **150+ Pokemon Species**: Base masiva de sprites ani + ani-shiny
- ✅ **Smart Pokeball Logic**: Asignación automática por rareza
- ✅ **Shiny Detection**: 20-35% probabilidad con efectos especiales
- ✅ **Real-time Stats**: Contadores live en modal configuración
- ✅ **Translucency System**: UX mejorada durante interacciones
- ✅ **Natural Sprite Sizing**: Pokemon mantienen dimensiones originales

**📊 Rendimiento v2.0:**
- ✅ **6 Pokemon Limit**: Optimal memory usage
- ✅ **120px Spacing**: No overlapping Pokemon
- ✅ **Auto Cleanup**: DOM elements removed after animations
- ✅ **60 FPS Stable**: requestAnimationFrame optimization
- ✅ **Intelligent Pause**: Preserves all state vs deleting

**🎮 User Experience:**
- ✅ **Fullscreen Launch**: Maximum immersion from start
- ✅ **One-Click Pokeball Grid**: Instant access to all 27 types
- ✅ **Pause/Resume Control**: Toggle system without losing progress
- ✅ **Visual Feedback**: Semi-transparent Pokemon during interactions
- ✅ **Professional UI**: Solid backgrounds, perfect contrast

**¡Listo para producción, distribución y uso profesional!** 🚀

---

## 🎯 **Quick Start v2.0**

```bash
# 1. Clonar y setup
git clone https://github.com/MurphyGamess/eontimer-murphy.git
cd eontimer-murphy && npm install

# 2. Ejecutar aplicación (pantalla completa automática)
npm start

# 3. Disfrutar Pokemon System
# - Toggle sistema en modal configuración (⚙️)
# - Click "📜 Todas" para ver grid pokeballs
# - Observar Pokemon shiny/legendarios con efectos especiales
# - Pausar/reanudar cuando necesites sin perder progreso
```

**¿Preguntas? ¿Sugerencias v2.0?** Abre un Issue en GitHub o contacta directamente.

🎮 **¡Happy RNG Hunting!** 🎯 ⚡ **¡Con sistema Pokemon completo v2.0!** 🎾

---

*Última actualización: Diciembre 2024 - v2.0.0*  
*Sistema completo probado: Pokemon + Pokeballs + Efectos + Pause/Resume*  
*Compatible: Windows/macOS/Linux vía Electron - Pantalla Completa*  
*150+ Pokemon species + 27 Pokeball types + Real-time stats* 