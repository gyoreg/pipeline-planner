// Forgatókönyv-tesztek. Futtatás: npm test
import { loadApp, loadPlan, info, key } from './harness.mjs';

let fails = 0, passed = 0;
const t = async (name, fn) => {
  const app = await loadApp();
  try { await fn(app); if (app.errors.length) throw new Error('JS hiba: ' + app.errors.join('; ')); passed++; console.log('  ok  ', name); }
  catch (e) { fails++; console.log('  HIBA', name, '\n       ', e.message); }
};
const ok = (c, m) => { if (!c) throw new Error(m); };

await t('mintaterv betöltődik, nincs hiba', async a => { ok(a.pf.st.rooms.length === 2, 'két helyiség'); });

await t('üres kör kitöltése az osztóról ajtón át (háló)', async a => {
  a.pf.setMode('fill'); a.pf.tapFill([700, 200]);
  ok(/osztóról/.test(info(a)), info(a)); ok(a.pf.st.circuits[0].pts.length > 10, 'van cső');
  const A = a.pf.analyze(); ok(A.clash.length === 0 && A.wallX === 0, 'nincs ütközés/falátmenet');
});

await t('kitöltés nem módosít más kört', async a => {
  a.pf.setMode('fill'); a.pf.tapFill([700, 200]);
  a.pf.mutate(() => { a.pf.st.circuits.push({ name: '2. kör', color: '#1f6fd1', pts: [], feed: 0 }); a.pf.st.active = 1; });
  const before = JSON.stringify(a.pf.st.circuits[0].pts);
  a.pf.tapFill([120, 200]);
  ok(JSON.stringify(a.pf.st.circuits[0].pts) === before, 'az 1. kör változatlan');
});

await t('kígyóvonal azonos be- és kilépésnél érthető hibát ad', async a => {
  loadPlan(a, 'tests/fixtures/meander-entry-exit.json'); a.pf.setMode('fill'); a.pf.tapFill([400, -100]);
  ok(/kígyóvonal itt nem köthető be/.test(info(a)), info(a));
});

await t('oda-vissza kitöltés az osztó helyiségében (mosdó)', async a => {
  loadPlan(a, 'tests/fixtures/roundtrip-mosdo.json'); a.pf.setMode('fill'); a.pf.tapFill([290, 560]);
  ok(/előremenő az osztótól/.test(info(a)), info(a));
  const A = a.pf.analyze(); ok(A.clash.length === 0 && A.wallX === 0 && A.bad.length === 0, 'tiszta eredmény');
});

await t('zárolt pont nem törölhető területkijelöléssel', async a => {
  a.pf.mutate(() => { a.pf.st.circuits[0].pts = [[50, 50], [100, 50], [100, 100], [300, 100], [300, 200]]; });
  a.pf.setMode('lock'); a.pf.tapLock([200, 100]); a.pf.setMode('select');
  a.pf.setSel({ t: 'C', items: [0, 1, 2, 3, 4].map(pi => ({ ci: 0, pi })) }); key(a, 'Delete');
  ok(JSON.stringify(a.pf.st.circuits[0].pts) === '[[100,100],[300,100]]', JSON.stringify(a.pf.st.circuits[0].pts));
});

await t('csőpont nem tehető helyiségen kívülre', async a => {
  a.pf.setMode('pipe'); a.pf.tapPipe([-50, 100]); ok(a.pf.st.circuits[0].pts.length === 0, 'nem jött létre');
});

await t('raszterszám: 500 cm-es fal, 10 cm faltávolság = 39', async a => {
  ok(a.pf.rasterCount([0, 0], [500, 0], 10, 10) === 39, 'raszterszám');
});

await t('falhossz pontos megadása', async a => {
  a.pf.openDim(0, 0); a.d.getElementById('dimLen').value = '450'; a.pf.applyDim();
  ok(JSON.stringify(a.pf.st.rooms[0].pts) === '[[0,0],[450,0],[450,420],[0,420]]', JSON.stringify(a.pf.st.rooms[0].pts));
});

await t('ajtófelirat csak kijelölve látszik', async a => {
  const n = () => (a.d.getElementById('plan').innerHTML.match(/>ajtó \d/g) || []).length;
  a.pf.setMode('door'); ok(n() === 0, 'nem látszik'); a.pf.selectHit({ t: 'd', di: 0 }); ok(n() === 1, 'kijelölve látszik');
});

await t('nyomtatási oldalak: 2 oldal, feliratok nélkül', async a => {
  const ps = a.pf.buildPages(); ok(ps.length === 2, 'két oldal'); ok(!/ajtó \d/.test(ps[1].svg) && !/m²/.test(ps[1].svg), 'nincs ajtófelirat/terület a rajzon');
});

console.log(`\n${passed} sikeres, ${fails} hibás teszt.`);
process.exit(fails ? 1 : 0);
