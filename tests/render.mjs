// Használat: node tests/render.mjs <terv.json> <kimenet.svg> [viewBox]
import fs from 'node:fs';
import { loadApp, loadPlan, planSVG } from './harness.mjs';
const [plan, out, vb] = process.argv.slice(2);
const app = await loadApp();
if (plan) loadPlan(app, plan);
fs.writeFileSync(out || 'out.svg', planSVG(app, vb));
console.log('Kiírva:', out || 'out.svg');
