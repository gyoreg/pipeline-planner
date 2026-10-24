A felhasználó egy tervet (JSON) küldött, amelyen valami nem működik: $ARGUMENTS

1. Mentsd a tervet a `tests/fixtures/` mappába beszédes névvel.
2. Reprodukáld a hibát egy új teszttel a `tests/run.mjs`-ben (a `loadPlan` és `info` segédfüggvényekkel).
3. Szükség esetén rajzold ki: `node tests/render.mjs tests/fixtures/<terv>.json out.svg "<viewBox>"`.
4. Javítsd a hibát az `index.html`-ben a `CLAUDE.md` szabályai szerint (más kört/helyiséget nem módosíthat, sikertelen műveletnél pontos hibaüzenet).
5. Futtasd a teszteket, frissítsd a verziósort, és magyarul magyarázd el a felhasználónak az okot és a javítást.
