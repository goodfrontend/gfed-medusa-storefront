#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const distDir = path.resolve(__dirname, '../dist');

function listClientAssets() {
  const clientDir = path.join(distDir, 'client');
  if (!fs.existsSync(clientDir)) return [];
  return fs.readdirSync(clientDir).map((name) => {
    const full = `/foundation-layout/client/${name}`;
    const type = name.endsWith('.css')
      ? 'css'
      : name.endsWith('.js')
        ? 'js'
        : 'asset';
    return { name, url: full, type };
  });
}

const manifest = {
  name: pkg.name,
  version: pkg.version,
  publishedAt: new Date().toISOString(),
  server: 'server.mjs',
  assets: listClientAssets(),
};

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(
  path.join(distDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('Wrote dist/manifest.json');
