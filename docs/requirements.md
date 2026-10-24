# Követelmények és szabályok (a felhasználóval egyeztetett know-how)

A lista a fejlesztés során a felhasználótól kapott összes kérést és döntést tartalmazza, területenként csoportosítva.
Új igény esetén ide is vezesd fel.

## Alapok
- Poligon alakú helyiségekben padlófűtés csőnyomvonal tervezése; rendszerlemez 75×100 cm, 12,5×12,5 cm-es rácspont-mátrix, Ø14 mm cső.
- Több helyiség egy rajzon; két helyiség között **egy** fal van (falvastagság, alapból 10 cm), a falak nem lapolódnak át.
- Cső a falon nem mehet át, csak ajtónál; az ajtó a falban üres nyílás.
- Egy szinten egy osztó (de több is felvehető); a csövek az ajtókon át jutnak a többi helyiségbe.

## Eszközsor
- Sorrend: Kijelölés (nyíl ikon), Vonalzó (ikon), Zárolás (ikon), Helyiség (ikon), Ajtó (ikon), Cső (ikon), „…” menü (Körhatár, Kitöltés, Osztó, Kizárt terület). Az ikonos gombok neve tooltipben.
- „Cső” és „Kitöltés” módban körválasztó gomb (aktív kör színe és neve, legördülő lista hosszokkal, „+ Új kör”).
- Tervezett (backlog): fájl menü a bal szélen lemez ikonnal (mentés, betöltés, nyomtatás).

## Navigáció
- Görgetés: mozgatás mindkét irányba (Shift + görgetés vízszintes); Ctrl + görgetés: nagyítás.
- Szóköz nyomva tartva: mindig mozgatás, bármelyik eszköznél (húzás közben lenyomva is); középső egérgomb: mozgatás.
- A rajzra kattintva a fókusz lekerül a mezőkről/gombokról (a szóköz ne írjon mezőbe, ne nyomjon gombot).
- A rajzon a szövegek nem jelölhetők ki húzáskor.

## Kijelölés
- Kijelölés eszközzel bármelyik objektum kijelölhető (csőpont, körhatár – a vonalára kattintva is, mindkét végével –, helyiségsarok, helyiség, ajtó, osztó, kizárt terület és sarka).
- Üres helyen egérrel húzva területkijelölés: csak a csőpontokra vonatkozik; Delete törli (zárolt pontot soha).
- Nyilak: 12,5 cm-es lépés; Shift + nyíl: illesztési lépés (helyiség, ajtó, osztó, kizárt terület).
- Delete/Backspace töröl; a törlő eszköz megszűnt.
- Kijelölt helyiség sarkai jól láthatók (négyzetek), a kijelölt sarok kitöltött, a hozzá csatlakozó falak kiemelve.

## Húzás módosítókkal
- **Shift**: csak a mozgatott pont igazodik; a csatlakozó, 20°-on belül vízszintes/függőleges fal pontosan vízszintes/függőleges lesz.
- **Ctrl (Cmd)**: szögtartó mozgatás – a szomszédos sarkok a saját faluk mentén csúsznak, a falak szöge marad (0/30/45/60/90°-hoz 1,5°-on belül pontosan arra áll).

## Helyiségek, falak
- Új sarok csak a kijelölt helyiség falára kerül (első kattintás kijelöl, a következő szúr be); az új sarok kijelölve marad (Delete törli).
- Helyiség egészben húzható (Helyiség eszköz); a falak illeszkednek: szemben álló falak falvastagságnyira, azonos irányúak egy síkba.
- Falméret: hossz + zárójelben a raszterszám (hány cső fér el a fal mentén a faltávolsággal). Kattintva pontos hossz adható meg, a mozduló vég választható (Bal/Mindkét/Jobb, Felső/Alsó); a csatlakozó fal párhuzamosan tolódik.
- Külső falaknál a méret kívül; 70 cm alatti falnál callout szaggatott mutatóvonallal, mindig kívül, más számokat és feliratokat nem fedhet, a mutató nem mehet át helyiségen, falon, másik mutatón; zárt beugrónál (pillér) a helyiségen belül, rövid mutatóval.
- Méretszámok kisebb betűvel; cső/kitöltés/körhatár módban halványabbak.
- Helyiségnév és terület a helyiség közepén (képernyőn).

## Ajtók
- Ikonos eszköz; falra koppintva ajtó; szélesség pontosan megadható (gyors gombok: 75, 80, 90, 140), a mozduló szél választható.
- Ajtó felirata („ajtó 90”) csak a kijelölt ajtónál látszik.
- Az ajtó alatti sávban (a két oldali legközelebbi rácspontig) a cső bármilyen szögben mehet – sárga jelzés, nem számít hibának.

## Osztó
- Szélesebb doboz, megadható szélesség és körszám; falon vagy falba süllyesztve (ilyenkor a fal mindkét oldalára mehet cső); a fal másik oldalára fordítható.
- Csatlakozópárok: előremenő (kör) és visszatérő (négyzet) egymás mellett; körönként automatikus vagy kézi csatlakozóválasztás.
- Az osztó felirata csak kijelölve látszik.
- Az osztó 12,5 cm-es körzetében a bekötés szabad (rácson kívül, ferdén, falközelben – nem hiba).

## Csövek, körök
- Haladási irány nyilakkal; Cső módban az aktív kör előremenő fele piros, visszatérő fele kék (a hossz felénél vált), más módban a kör saját színe.
- Visszafordulás (hajtű) félkörívként rajzolva.
- Cső módban: másik kör csövére kattintva aktív kör váltás; az aktív kör csövére kattintva pont beszúrása oda; új pont mindig a cső legközelebbi részére (végére/elejére vagy a legközelebbi szakaszba kitérővel); Ctrl + kattintás mindig új pontot tesz.
- Nyitott körvég szaggatott körrel jelölve (nem húz falon átmenő vonalat), a hossza nem számít bele.
- „Bekötés az osztóig” gomb: a nyitott végeket a többi kör között az osztóig vezeti (előremenő és visszatérő egymás mellett).
- Előremenő/visszatérő csere megtartja az irányt újratöltésnél is (`rev`).

## Zárolás
- Zárolás eszköz: csőszakaszra kattintva zárol/felold; sötét keret és lakat jelzi.
- Zárolt csövet az automatikus kitöltés nem mozdíthat, Delete nem törölhet (területkijelölésnél a zárolt pontok megmaradnak, üzenettel).

## Automatikus kitöltés
- Minták: csigavonal (bifiláris) és kígyóvonal; csőtávolság 12,5/25/37,5 cm.
- **Mindig az aktív kör** tölti ki a koppintott zónát; a kör ott lévő, nem zárolt szakaszát cseréli; ott csatlakozik, ahol a kör a zónába belép/kilép, illetve az első/utolsó nem zárolt pontnál.
- Több nem zárolt szakasz esetén hibaüzenet (kivéve: az osztó ebben a helyiségben van, és a kör innen indul és ide tér vissza – oda-vissza kitöltés).
- Üres kör: ha az osztó a helyiségből elérhető, onnan indul; ha nem, ajtón át vezeti be (derékszögben, csak az osztó mellett térhet el); ha nem megy, hibaüzenet.
- Átmenő kör (a cső továbbmegy egy másik helyiségbe): a lecserélhető ágból fal menti folyosó a kilépésig, a minta a maradékot tölti ki. Javaslat: a fal felőli ágat zárolni.
- Kígyóvonal nem köthető be, ha a belépés és kilépés egymás mellett van – ezt hibaüzenet mondja meg (csigavonal javasolt).
- Más kört, más helyiséget a kitöltés nem módosít.
- Helyiség része vagy vegyes kitöltés körhatárral elválasztott zónákkal.
- Csigavonal: a középen és a belépésnél lehetőleg ne legyen szoros (180°, egy raszteren belüli) forduló – jelöltek közül a legkevesebb szoros fordulójút választja, a közepet S alakúra alakítja.
- Tervezett (backlog): „szoros fordulók tiltása” jelölő.

## Körhatár, kizárt terület
- Körhatár fél osztásra illeszkedik, zónákra bontja a helyiséget; a vonalára kattintva egészben kijelölhető/mozgatható.
- Kizárt terület („…” menü): 0 vastag falként viselkedik (faltávolsággal kerülendő), alatta halványítva/sraffozva, oldalméretei megadhatók; a helyiség nettó területét csökkenti (az összesítőben bruttó és nettó).
- Csőpont, körhatár- és kizártterület-pont helyiségen kívülre nem tehető.

## Ellenőrzés
- Hibák piros jellel a rajzon (ferde szakasz: piros sáv + „!”, rácson kívüli: rombusz, fal alatti: vastag piros, ütközés: X, falközeli: kör, szoros forduló: szaggatott kör).
- Hibák egyenként elfogadhatók (Alt + kattintás vagy lista) – sárgák lesznek és nem számítanak bele; a státuszsor az összes nem elfogadott egyedi hibát számolja.

## Vonalzó
- Ideiglenes mérés (nem mentődik), eltűnik új mérésnél, eszközváltáskor, Esc-re; mutatja a távolságot és a beférő csövek számát (fal melletti végeken faltávolsággal).

## Rendszerlemez
- Helyiségenként optimalizálható irány és eltolás (kevesebb lemez/vágás), a csőraszter változatlan.

## Nyomtatás
- PDF (jsPDF): 1. oldal álló, összesítés és táblázatok; 2. oldal a rajz a teljes lapon (egész méretarány), fejléccel.
- A nyomtatott alaprajzon: helyiségnév kívül, terület nélkül; ajtó- és osztófelirat nincs; rácspontok, hibajelek nincsenek.
- HTML-es nyomtatható lap is menthető.

## Mentés
- Automatikus mentés böngészőbe; fájlba mentés (downloads képesség), megnyitás fájlból, rajzra húzva is; JSON szövegként is.

## Oldalsáv
- Magyarázó szövegek mindig bezárt „Súgó” elemben (a panel tetején is).
- Verziószám a cím alatt.
