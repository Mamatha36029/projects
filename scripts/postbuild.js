// scripts/postbuild.js
// Move frontend/dist to project root 'dist' for Vercel static build
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'frontend', 'dist');
const dest = path.resolve(__dirname, '..', 'dist');

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.error('❌ Frontend build missing – no "frontend/dist" folder found.');
    process.exit(1);
  }

  // Remove previous output if exists
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }

  // Ensure destination parent exists
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log('✅ Copied frontend/dist → root dist');
}

copyDir(src, dest);
