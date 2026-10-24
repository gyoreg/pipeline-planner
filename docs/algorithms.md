# Algoritmusok és tapasztalatok

## Szabad terület és falak
- Szabad terület = helyiségek ∪ ajtó-téglalapok. A határát (`unionBoundary`) élenként számoljuk: minden él felosztva a többi alakzat éleivel, egy részszakasz akkor határ, ha a két oldalán eltér a „bent van-e” érték.
- A kizárt területek élei is határnak számítanak (0 vastag fal), de falvonalként nem rajzolódnak (`BW` csak az unió határa).
- `validPt(p)`: bent van a szabad területen, nincs kizárt területen, és a faltávolságnál messzebb van a határtól. Gyorsítótárazva (`GC.vc`).

## Csigavonal (bifiláris) – `genBifilar`
- 2s×2s-es cellák (s = csőtávolság) feszítőfájának kontúrja a finom rácson egyetlen zárt hurok; felvágva az előremenő és a visszatérő ág egymás mellett fut, soha nem keresztezik egymást (Spanning Tree Coverage).
- A fa spirál alakú: DFS a belépéshez legközelebbi gyökérből, gyűrűnként (mélység a széltől) vagy „egyenesen, akadálynál fordul” szabállyal.
- Jelöltek: a cellarács minden eltolása (96%-os lefedettségig), legfeljebb 9 gyökér a belépés közelében, minden indulási irány, mindkét forgásirány, mindkét bejárási mód; értékelés a kész hurok szoros visszafordulásainak számával (`tightCycle`).
- A felvágás először a gyökércella belépés felőli éleit próbálja.
- Téglalap zónában 12,5 cm-nél a spirál közepén mindig marad két szoros forduló (hajtű + rövid fa-szakasz); ezt a `refineTight` S alakú középpé alakítja (a két forduló közötti rövid sáv kimaradhat).

## Kígyóvonal – `genMeander`
- Soronként a leghosszabb szabad szakasz, váltakozó irányban; a sorok közti átkötés L alakban.
- Két vége a zóna ellentétes szélén van, ezért nem köthető be, ha a kör ugyanott lép be és ki.

## Kitöltés – `fillActive`
1. A koppintott zóna (helyiségen belül, körhatárok mentén) és az ajtók rácspontjai (`areaOf`).
2. Az aktív kör egységlépésekre bontott pontsora (`seqPts`); a zónába eső, nem zárolt szakaszok (`secs`).
3. Pontosan egy szakasz → előtte (`prefix`) és utána (`suffix`) változatlan; a minta a maradék szabad pontokon; összekötés `bfsPath`-szal a területen belül.
4. Átmenő kör (belépés és kilépés távol): `corridorPath` fal menti folyosó; a minta a folyosó elejéről ágazik le (`bfsToSet`) és később csatlakozik vissza.
5. Két szakasz a kör két végén, osztó a helyiségben → `fillRoundTrip`: előremenő az osztótól a kilépésig, visszatérő folyosón, a minta az osztó közelében ágazik le.
6. Üres kör → `fillFromManifold`: távolságmező az osztótól (`fieldFrom`), kapu a zóna szélén, a bekötés helyben vagy ajtón át (`withLeads`, `route` – fal menti preferencia, a visszatérő az előremenő mellé tapad: `adjSet`).
7. Végül `widenTips` (szabad ponttal tágítás) és `refineTight` (helyi átrendezés DFS-sel, ablak a forduló körül, kihagyási kerettel).

## Útkeresés
- `route`: Dijkstra 4-szomszédos rácson, faltávolság-szabályokkal (`edgeOk`), a fal menti lépés olcsóbb; opcionálisan területre korlátozva (`allow`) és az osztótól mért maximális célponttávolsággal (`maxGoal`).
- Az osztó csatlakozópontjához a rácsról egyenes csonk vezet (≤ 70 cm-nél bekötöttnek számít).

## Méretfeliratok
- Raszterszám: `rasterCount` – tengelyirányú szakasznál a valós rácsvonalak száma a két végén faltávolsággal csökkentett tartományban.
- Callout-elhelyezés: jelölt pozíciók a kifelé mutató normális körül, egyre távolabb; feltételek: épületen kívül, faltól távol, nem fed más feliratot (hosszabb falak felirata, helyiségnév, ajtófelirat), a mutató nem halad helyiségen, falrajzon, más mutatón át. Ha nincs ilyen: helyiségen belül, a fal közelében.

## Nyomtatás
- A published artifact védett keretben fut, ott a `window.print()` nem működik → PDF készül: az oldal SVG-je képpé alakítva (10–12 px/mm), jsPDF (cdnjs 2.5.1) A4-re teszi, a `downloads` képességgel menthető.

## Tesztelési tapasztalatok
- jsdom-ban a `getScreenCTM` és a `getBoundingClientRect` hiányzik, a tesztfuttató pótolja.
- Pixel alapú küszöbök (`pxScale`) a mockolt 900×600-as képernyőhöz igazodnak.
