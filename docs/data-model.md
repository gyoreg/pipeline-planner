# Adatmodell (`st`, mentett JSON)

| Mező | Leírás |
|---|---|
| `rooms[]` | `{name, pts:[[x,y],…], panel?:{rot,ox,oy}}` – helyiség belső (tiszta) sokszöge cm-ben; `panel` helyiségenkénti lemezkiosztás |
| `doors[]` | `{c:[x,y], u:[ux,uy], w, d}` – középpont, fal iránya (egységvektor), szélesség, mélység (falrés + 4 cm) |
| `seps[]` | körhatár töréspontjai `[[x,y],…]` (fél osztásra illesztve) |
| `excl[]` | kizárt terület `{pts:[[x,y],…]}` |
| `mans[]` | osztó `{name, a, u, n, w, k, mount:'surface'|'recessed'}` – `a` a fal belső síkján, `n` a helyiség felé |
| `activeMan`, `active`, `activeRoom` | aktív osztó / kör / helyiség indexe |
| `panel` | alapértelmezett lemezkiosztás `{rot, ox, oy}` |
| `goff` | csővonalak eltolása a lemezélhez képest (0 vagy 6,25) |
| `wallGap`, `wallT`, `doorW`, `minR`, `maxLen`, `dia`, `diag` | szabályok és alapértékek |
| `pat`, `pstep`, `mdir` | kitöltési minta (`bif`/`mea`), csőtávolság (raszterben), kígyó iránya |
| `circuits[]` | `{name, color, pts:[[x,y],…], feed, man?, slot?, lk?:[lépéskulcs], rev?}` |
| `ign[]` | elfogadott hibák kulcsai (`c:`, `b:`, `t:`, `o:`, `d:`, `w:` előtaggal) |

- A csőpontok a 12,5 cm-es rácson vannak (`gx0 = panel.ox + goff`).
- Zárolás lépésenként: kulcs `"x1,y1|x2,y2"` (rendezett), így szakaszbontás után is megmarad.
- Régi formátum (`room`, `man`, `zones`, `groups`, `lead`) betöltéskor átalakul (`normalize`).
