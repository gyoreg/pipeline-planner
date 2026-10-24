# CLAUDE.md – Padlófűtés nyomvonaltervező (pipeline-planner)

Ez a fájl a Claude Code projektmemóriája. Minden munkamenet elején olvasd el, és tartsd be a benne lévő szabályokat.
A részletes követelmények: `docs/requirements.md`, az algoritmusok: `docs/algorithms.md`, az adatmodell: `docs/data-model.md`,
a nyitott feladatok: `docs/backlog.md`.

## A projekt
- Egyetlen, önálló HTML-alkalmazás: `index.html` (HTML + CSS + JS egy fájlban, külső függőség csak a Google Fonts és – nyomtatáskor – a jsPDF a cdnjs-ről).
- Padlófűtés csőnyomvonalának tervezése alaprajzon: helyiségek, falak, ajtók, osztók, rendszerlemez-kiosztás, kézi és automatikus csővezetés, ellenőrzés, nyomtatás.
- Eredetileg Claude-artifactként készült: https://claude.ai/artifact/1UkdpoWvcM47Jjo1Fewk3j (ugyanez a fájl publikálható GitHub Pages-re is).
- A felhasználói felület **magyar nyelvű**. A felhasználó szakember (tervező/kivitelező), magyarul kommunikál.

## Kötelező munkaszabályok
1. **Verziószám**: a cím alatti `Verzió: ÉÉÉÉ.HH.NN. ÓÓ:PP` sort minden kiadott változtatásnál frissítsd (Europe/Budapest idő). A felhasználó erről ellenőrzi, hogy az új változat töltődött-e be.
2. **Tesztelés minden módosítás után**: `npm test` (jsdom alapú forgatókönyv-tesztek, `tests/run.mjs`). Új funkcióhoz írj új forgatókönyvet; felhasználói terven jelzett hibához tedd be a tervet `tests/fixtures/`-ba és írj rá tesztet.
3. **Szintaxis-ellenőrzés**: `npm run check` (kiveszi a `<script>` tartalmát és `node --check`-kel ellenőrzi).
4. **Vizuális ellenőrzés**: a rajz SVG-jét `tests/render.mjs`-sel ki lehet írni fájlba; PNG-hez `python3 -m pip install cairosvg` és `cairosvg`. A CSS-változókat (`var(--x)`) a renderelés előtt helyettesíteni kell.
5. **Szövegezés**: magyar tipográfia: „idézőjel”, ’ aposztróf; a kódban egyenes idézőjel. Felhasználói üzenetek teljes mondatok, a hiba oka és a teendő is benne van.
6. **Más kör és más helyiség védelme**: az automatikus kitöltés csak az aktív kört és csak a kiválasztott zónát módosíthatja (kivétel: üres kör bekötése az osztótól, „Bekötés az osztóig” gomb). Zárolt csőhöz automatika soha nem nyúlhat, Delete sem törölheti.
7. **Sikertelen művelet**: ne módosítson semmit, hanem adjon pontos hibaüzenetet (`#fillInfo`, illetve `flash()` a súgósorban).
8. **Súgószövegek**: az oldalsáv magyarázó szövegei (`p.note`) mindig egy alapból bezárt „Súgó” `details.help` elemben legyenek (ezt induláskor egy szkript rendezi). Az eredményüzenetek (`.note.result`, `id`-s elemek) kívül maradnak.
9. **Kérdezz, ha az utasítás nem egyértelmű** (a felhasználó kifejezetten ezt kéri).

## Szakmai alapértékek (alapbeállítások)
- Rendszerlemez 75×100 cm, csőraszter 12,5 cm (`S=12.5`), cső Ø14 mm.
- Legkisebb hajlítási sugár 5×D ≈ 7 cm (`minR`); 12,5 cm-es visszafordulás (r=6,25) szűknek számít.
- Falvastagság 10 cm (`wallT`), faltávolság 10 cm (`wallGap`, a felhasználó terveiben 5 cm), max. körhossz 80 m (a felhasználónál 90 m).

## Architektúra röviden (index.html)
- Állapot: `st` (lásd `docs/data-model.md`), `localStorage` kulcs: `padlofutes-tervezo-v1`, visszavonás: `hist` + `mutate(fn)`.
- Geometria-gyorsítótár: `geo()` → `GC` (szabad terület = helyiségek ∪ ajtók uniója, határa `B`/`BW`, kizárt területek élei `B`-ben), `validPt`, `edgeOk`, `distSolid`, `crossSolid`. Minden állapotváltozás után `GC=null`.
- Rajzolás: `render()` egy SVG-stringet épít (`PRINT=true` esetén a nyomtatási változatot adja vissza), `renderSide()` az oldalsávot.
- Elemzés: `analyze()` → hibák (ütközés, falközeli, szoros forduló, rácson kívüli, ferde, fal alatti), elfogadott hibák (`st.ign`), ajtó alatti ferde szakasz (sárga).
- Kitöltés: `tapFill` → `fillActive` / `fillFromManifold` / `fillRoundTrip`; minták: `genBifilar` (feszítőfa-kontúr, STC), `genMeander`; útkeresés: `route`, `corridorPath`, `bfsPath`, `bfsToSet`; szoros fordulók javítása: `widenTips`, `refineTight`.
- Nyomtatás: `buildPages()` (2 SVG oldal) → `doPdf()` (jsPDF, raszterizálva) vagy HTML lap.
- Teszteléshez a `window.__pf` objektumon keresztül érhetők el belső függvények; a tesztfuttató a sort lecseréli, hogy többet is elérjen.

## Publikálás
- GitHub Pages: a repó gyökerében lévő `index.html` közvetlenül kiszolgálható.
- Claude-artifact: a fájl változatlanul publikálható; a published oldal CSP-je miatt külső szkript csak cdnjs/jsdelivr/unpkg-mentes forrásból tölthető (jsPDF: cdnjs, rögzített verzió).
