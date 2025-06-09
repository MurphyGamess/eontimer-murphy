# 🔮 Sistema de Animaciones de Pokébolas - Documentación Técnica

## 📋 Descripción del Proyecto

Este proyecto implementa un sistema completo de animaciones de **todas las 27 pokébolas** con efectos visuales realistas, incluyendo:
- **Animación de caída sincronizada** con apertura gradual del spritesheet (frames 1→11)
- **Efectos especiales únicos** para cada tipo de pokéball (Master Ball con estrellas púrpuras/doradas)
- **Liberación de Pokémon** con animaciones personalizadas
- **Cierre suave** de la pokéball después de la liberación

## 🎮 Características Principales

### ✨ Sistema de Animación Avanzado
- **27 pokébolas diferentes** con sprites individuales del spritesheet oficial
- **Sincronización perfecta** entre caída y apertura de frames
- **60 FPS** usando `requestAnimationFrame`
- **Easing natural** para movimiento realista de caída
- **Timing preciso**: ~136ms por frame durante 1.5 segundos

### 🌟 Efectos Especiales por Pokéball
- **Master Ball**: Estrellas púrpuras con destellos dorados
- **Ultra Ball**: Rayos de energía azul
- **Great Ball**: Partículas rojas brillantes
- **Premier Ball**: Destellos plateados elegantes
- **Timer Ball**: Efectos de tiempo naranja
- *[Y muchos más...]*

### 🎯 Navegación Interactiva
- **Flechas del teclado** para cambiar entre pokébolas
- **Detección automática** de dimensiones del spritesheet
- **Validación de frames** (máximo 11 por pokéball)
- **Información en tiempo real** de la pokéball actual

## 📁 Estructura del Proyecto

```
prueba/
├── README.md                    # Esta documentación
├── test-masterball.html         # Demo principal del sistema
└── assets/
    └── pokeballs/
        └── simeydotme-spritesheet.png  # Spritesheet oficial (1107×440px)
```

## 🛠️ Implementación Técnica

### 📊 Especificaciones del Spritesheet
- **Dimensiones totales**: 1107×440 píxeles
- **Grid**: 27 columnas × 11 filas
- **Tamaño por sprite**: 41×40 píxeles
- **Pokébolas**: 27 tipos diferentes (Poké Ball hasta Strange Ball)
- **Frames de animación**: 11 por pokéball (cerrada → abierta)

### 🔧 Función Principal: `animateFallWithFrames()`

```javascript
function animateFallWithFrames(ballData, duration = 1500) {
    const startTime = performance.now();
    const startY = 50;  // Posición inicial (arriba)
    const endY = 400;   // Posición final (suelo)
    const totalFrames = 11;
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing cuadrático para caída natural
        const easedProgress = progress * progress;
        
        // Sincronización: frame basado en progreso de caída
        const frameIndex = Math.floor(progress * (totalFrames - 1));
        const currentFrame = Math.min(frameIndex + 1, totalFrames);
        
        // Actualizar posición Y y frame simultáneamente
        updatePokeball(ballData, currentFrame, startY + (endY - startY) * easedProgress);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Pokéball tocó el suelo → activar efectos
            triggerSpecialEffects(ballData);
            releasePokemon();
            setTimeout(() => closeAnimation(ballData), 2000);
        }
    }
    
    requestAnimationFrame(animate);
}
```

### 🎨 Sistema de Efectos Especiales

#### Master Ball - Estrellas Púrpuras y Oro
```javascript
function createMasterBallStars() {
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'master-ball-star';
        star.style.cssText = `
            position: absolute;
            width: 8px; height: 8px;
            background: radial-gradient(circle, 
                #FFD700 0%, #9932CC 50%, transparent 100%);
            border-radius: 50%;
            animation: starBurst 2s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        pokeballContainer.appendChild(star);
        
        setTimeout(() => star.remove(), 2000);
    }
}
```

### 🗂️ Base de Datos de Pokébolas

```javascript
const pokeballDatabase = [
    { name: "Poké Ball", column: 0, color: "#FF0000", effect: "basicCapture" },
    { name: "Great Ball", column: 1, color: "#0066CC", effect: "energyBurst" },
    { name: "Safari Ball", column: 2, color: "#D4AF37", effect: "wildernessTheme" },
    { name: "Ultra Ball", column: 3, color: "#FFD700", effect: "ultraBeam" },
    { name: "Master Ball", column: 4, color: "#9932CC", effect: "masterStars" },
    // ... [27 pokébolas totales]
];
```

## 🎪 Cómo Usar el Sistema

### 🚀 Inicio Rápido
1. Abrir `test-masterball.html` en cualquier navegador
2. Hacer clic en **"Lanzar Pokéball"** para ver la animación
3. Usar **flechas izquierda/derecha** para cambiar pokébolas
4. Observar los diferentes efectos especiales

### ⌨️ Controles
- **← →**: Navegar entre pokébolas
- **Espacio**: Lanzar pokéball actual
- **R**: Reiniciar animación
- **D**: Activar modo debug (información técnica)

### 🔧 Personalización
```javascript
// Cambiar duración de caída
animateFallWithFrames(currentBall, 2000); // 2 segundos

// Modificar efectos especiales
function customEffect() {
    // Tu efecto personalizado aquí
}

// Agregar nueva pokéball
pokeballDatabase.push({
    name: "Mi Pokéball",
    column: 27,
    color: "#00FF00",
    effect: "customEffect"
});
```

## 🐛 Solución de Problemas

### ❌ Problemas Comunes

1. **"Pokéball no se muestra"**
   - Verificar ruta del spritesheet: `../resources/sprites/pokeballs/simeydotme-spritesheet.png`
   - Comprobar dimensiones: 1107×440px

2. **"Animación se ve cortada"**
   - Validar que el frame no exceda 11
   - Revisar cálculos de `background-position`

3. **"Efectos no aparecen"**
   - Verificar que `triggerSpecialEffects()` esté siendo llamado
   - Comprobar CSS de las animaciones

### 🔍 Modo Debug
```javascript
// Activar logs detallados
DEBUG_MODE = true;

// Ver información del sprite actual
console.log(`Frame: ${currentFrame}, Position: ${xPos}px ${yPos}px`);
```

## 📈 Rendimiento y Optimización

- **60 FPS estables** con `requestAnimationFrame`
- **Sprites optimizados** (41×40px cada uno)
- **Efectos con cleanup automático** (elementos eliminados tras 2s)
- **Memory management** eficiente para animaciones largas

## 🎯 Casos de Uso

### 🎮 Juegos Pokémon
- Simuladores de captura
- Batallas por turnos
- Coleccionadores de pokébolas

### 📚 Educativo
- Aprender sobre animaciones CSS/JS
- Estudiar sincronización de efectos
- Practicar manipulación del DOM

### 🎨 Creativo
- Portfolios interactivos
- Presentaciones animadas
- Demos técnicos

## 🔮 Próximas Mejoras

- [ ] **Sonidos** para cada tipo de pokéball
- [ ] **Más efectos especiales** (Beast Ball, Dream Ball)
- [ ] **Pokémon específicos** por tipo de ball
- [ ] **Modo batalla** con múltiples pokébolas
- [ ] **Guardado de favoritos** del usuario

---

*Desarrollado con ❤️ para la comunidad Pokémon*
*Sistema probado en Chrome, Firefox, Safari y Edge*

## 📞 Soporte

¿Encontraste un bug? ¿Tienes una sugerencia?
- Revisa esta documentación primero
- Verifica la consola del navegador para errores
- Comprueba que todos los archivos estén en las rutas correctas

**¡Gotta animate 'em all!** ⚡ 