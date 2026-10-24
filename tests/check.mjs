// Szintaxis-ellenőrzés: a <script> tartalmát node --check-kel vizsgálja.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) { console.error('Nincs <script> blokk.'); process.exit(1); }
const tmp = path.join(os.tmpdir(), 'pipeline-planner-check.js');
fs.writeFileSync(tmp, m[1]);
execFileSync(process.execPath, ['--check', tmp], { stdio: 'inherit' });
const ver = (html.match(/Verzió: [0-9. :]+/) || ['(nincs verziószám!)'])[0];
console.log('Szintaxis rendben.', ver);
