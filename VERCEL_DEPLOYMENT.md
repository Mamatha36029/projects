# Vercel Deployment Guide for AgroVision

This project is configured as a monorepo containing a **Vite React frontend** and an **Express.js backend**. It is set up to deploy as a single project on Vercel, running the Express backend as a Serverless Function and serving the frontend from the Vercel CDN.

---

## What We Configured

1. **`vercel.json` (Root)**: Configures Vercel to route all `/api/*` endpoints to the serverless function, and any other routes to the React SPA (`index.html`) in the built output folder (`frontend/dist`).
2. **`api/index.js` (Root)**: Entry point for Vercel's serverless environment, importing and exporting the Express `app` instance.
3. **`backend/server.js` (Modified)**: 
   - Exported the `app` instance.
   - Wrapped `app.listen()` to only start when the server is run directly (local development), avoiding startup blocks on Vercel.
   - Bypassed Express static serving in the production branch when running under Vercel (`process.env.VERCEL` check) to keep the function package small and efficient.

---

## Deployment Options

### Option 1: Deploy using Git (Recommended)
This is the simplest way to deploy and get automatic preview builds for every pull request:
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
3. Import your repository.
4. Keep the **Root Directory** as `./` (default root).
5. Vercel will automatically detect the build settings because of `vercel.json`.
6. Add your environment variables in the Vercel settings (e.g. `MONGODB_URI`, `OPENROUTER_API_KEY`).
7. Click **Deploy**.

### Option 2: Deploy using Vercel CLI
If you want to deploy directly from your local terminal:
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Run the login command:
   ```bash
   vercel login
   ```
3. Deploy the project:
   ```bash
   vercel
   ```
4. Follow the prompts (use default root `./` directory).
5. Set your environment variables in the dashboard or via CLI.
6. Deploy to production when ready:
   ```bash
   vercel --prod
   ```

---

## Compressed Source Zip

We created a Vercel-ready zip file containing only the source code files and configurations at:
`project_vercel_ready.zip`

It excludes heavy folders like `node_modules/`, `dist/`, `.git/`, `.vscode/`, and any `.env` secrets. This file is extremely small and lightweight, making it ideal if you need to upload or share the codebase.
