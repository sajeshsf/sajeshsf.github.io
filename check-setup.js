// Quick diagnostic script to check if everything is set up correctly
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Checking project setup...\n');

const checks = [
  { name: 'package.json', path: join(__dirname, 'package.json') },
  { name: 'node_modules', path: join(__dirname, 'node_modules') },
  { name: 'vite.config.js', path: join(__dirname, 'vite.config.js') },
  { name: 'v2/index.html', path: join(__dirname, 'v2', 'index.html') },
  { name: 'src/v2/main.jsx', path: join(__dirname, 'src', 'v2', 'main.jsx') },
];

let allGood = true;
checks.forEach(check => {
  const exists = existsSync(check.path);
  console.log(`${exists ? '✓' : '✗'} ${check.name}`);
  if (!exists) allGood = false;
});

console.log('\n' + (allGood ? 'All files found! Ready to start server.' : 'Some files are missing!'));

if (allGood) {
  console.log('\nTo start the server, run:');
  console.log('  npm run dev');
}

