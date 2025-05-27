# 🔥 Timer-murphy RNG

Temporizador tipo EonTimer para realizar RNG en juegos de Pokémon (GBA).  
Desarrollado con **Electron.js**, **Bootstrap**, y almacenamiento local.
Como usa Bootstrap no lo consulta de forma local a tener en cuenta.
usa internet pasa ejecutar lo anterior mencionado.

![Preview](resources/themes/default/Preview/{9FAE8BFD-0399-430C-87F5-67E906853F68}.png)
![Preview](resources/themes/default/Preview/{F8F4F0BA-CB1B-47DE-9CCE-9419DFD30624}.png)
---

## 📦 Características

- Temporizador milimétrico para caer en el frame exacto
- Alarma sonora personalizada
- Cálculo de desfase y calibración
- Selección visual de fondo y logo
- Compatible con Windows y próximamente Android (vía WebView)

---

## 🛠️ Requisitos
- Visual Studio Code
- Node.js 18+
- npm

---

## 📂 Estructura del proyecto
```
eontimer-murphy/
├── config/
├── resources/
│   └── themes/
│       └── default/
│           ├── images/
│           └── logos/
├── index.html
├── main.js
├── preload.js
├── renderer.js
├── package.json
├── README.md
└── .gitignore
```
---

## 🚀 Instalación
ejecuta en el terminal de Visual Studio Code
```bash
git clone https://github.com/MurphyGamess/eontimer-murphy.git
cd eontimer-murphy
npm install
npm start

---
## 🔗 Repositorio

GitHub: [MurphyGamess/eontimer-murphy](https://github.com/MurphyGamess/eontimer-murphy)
