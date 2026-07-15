# 🐍 AmbuSnake

AmbuSnake is a modern, standalone web implementation of the classic Snake game, built with Vue 3, TypeScript, and Vite. It serves as an interactive easter egg application designed to be completely self-contained.

## 🚀 Key Features

- **Vue 3 + TypeScript**: Clean, type-safe implementation of components and game engine.
- **Canvas-based Rendering**: Smooth, high-performance rendering using the HTML5 `<canvas>` API with inline SVGs for all sprites.
- **Single-File Bundling**: Uses `vite-plugin-singlefile` to bundle all CSS, JavaScript, and assets into a **single, standalone HTML file** (`dist/index.html`). This makes it extremely easy to serve from any route or embed anywhere.
- **Automated Deployment**: Built-in GitHub Actions pipeline that deploys the application directly to GitHub Pages on every push to the `main` branch.

---

## 🛠️ Project Structure

```
├── .github/workflows/       # CI/CD Workflows
│   └── deploy-pages.yml     # Automated GitHub Pages deploy pipeline
├── ambusnake_vue/           # Main Vue 3 + Vite application
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── game/            # Game logic (Engine, Snake, Input, Assets, etc.)
│   │   ├── AmbuSnake.vue    # Game UI & Canvas Component
│   │   ├── App.vue          # Root Application Component
│   │   └── main.ts          # Application Entry Point
│   ├── index.html           # HTML Entry template
│   ├── package.json         # Project dependencies and scripts
│   └── vite.config.ts       # Vite config (configured with viteSingleFile)
└── README.md                # Project documentation
```

---

## 💻 Local Development

Follow these steps to run the game locally:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 20 or higher is recommended).

### 2. Install Dependencies
Navigate to the Vue project folder and install the dependencies:
```bash
cd ambusnake_vue
npm install
```

### 3. Run the Dev Server
Launch the development server:
```bash
npm run dev
```
Open your browser and navigate to the address shown in the terminal (typically `http://localhost:5173`).

---

## 📦 Build & Production

To bundle the application into a single-file release:

```bash
cd ambusnake_vue
npm run build
```

This will create a `dist` directory containing a single `index.html` file that has all CSS, TypeScript/JS, and resources compiled directly inside it.

---

## ✈️ Deployment (CI/CD)

The project includes a GitHub Actions workflow that automates the build and deployment process to **GitHub Pages**:

- **Trigger**: Every push to the `main` branch.
- **Action**: Runs the build step in `ambusnake_vue` and deploys the generated `dist/` directory to GitHub Pages.
- **Access**: Once successfully deployed, the game is accessible via the repository's GitHub Pages URL.

