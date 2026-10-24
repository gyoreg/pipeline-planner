// Közös tesztkörnyezet: betölti az index.html-t jsdom-ba, és a window.__pf objektumon át elérhetővé teszi a belső függvényeket.
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOOK = 'window.__pf={get st(){return st;}, tapFill, setMode, mutate};';
const EXPOSE = `window.__pf={get st(){return st;}, get sel(){return sel;}, setSel:v=>{sel=v;}, setRuler:v=>{ruler=v;},
  tapFill, setMode, mutate, tapPipe, tapSep, tapExcl, tapLock, tapDoor, pick, selectHit, setItem, analyze, render, renderAll,
  buildPages, rasterCount, openDim, applyDim, openDoorEd, applyDoorEd, roomDelta, wallSnap, seqPts, stepKey, areaOf, deleteSel};`;

export function loadApp() {
  let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if (!html.includes(HOOK)) throw new Error('A tesztkampó (window.__pf) nem található az index.html-ben.');
  html = html.replace(HOOK, EXPOSE);
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true });
  const w = dom.window;
  w.SVGElement.prototype.getScreenCTM = function () { return { inverse() { return {}; } }; };
  w.SVGElement.prototype.getBoundingClientRect = function () { return { width: 900, height: 600, left: 0, top: 0, right: 900, bottom: 600 }; };
  const errors = [];
  w.addEventListener('error', e => errors.push(e.message));
  return new Promise(res => setTimeout(() => res({ w, d: w.document, pf: w.__pf, errors }), 200));
}

export function loadPlan(app, file) {
  const o = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  app.d.getElementById('jsonTxt').value = JSON.stringify(o);
  app.d.getElementById('imp').click();
}

export const info = app => app.d.getElementById('fillInfo').textContent;
export const key = (app, k) => app.d.dispatchEvent(new app.w.KeyboardEvent('keydown', { key: k, bubbles: true }));

// a rajz SVG-je önálló fájlként (CSS-változók világos színekre cserélve)
const LIGHT = { room: '#fff', panel: '#ddd', panelcut: '#eed', wallfill: '#999', wall: '#000', dot: '#aaa', ink: '#000', muted: '#666', sep: '#22f', warn: '#f00', panelstroke: '#bbb', sel: '#1f5fbf', surface: '#fff', surface2: '#eee', caution: '#c90' };
export function planSVG(app, viewBox) {
  let s = app.d.getElementById('plan').outerHTML.replace(/var\(--([a-z0-9]+)\)/g, (m, v) => LIGHT[v] || '#888');
  if (viewBox) s = s.replace(/ viewBox="[^"]*"/, '').replace('<svg', `<svg viewBox="${viewBox}" width="1200" height="${Math.round(1200 * viewBox.split(' ')[3] / viewBox.split(' ')[2])}"`);
  return s;
}
