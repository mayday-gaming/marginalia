// Flussi della cornice: prologo, avvio di un libro, salvataggio, sblocchi, modalità prova, epilogo.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { launch, openGame, waitForBoot } from './helpers/game.mjs';

let browser;
before(async () => {
  browser = await launch();
});
after(async () => {
  await browser.close();
});

// fa avanzare la cornice (prologhi, transizioni, finali) come farebbe il ciclo di gioco
// se `until` è dato, si ferma appena la cornice raggiunge quello stato
const advance = (page, seconds, press = false, until = null) =>
  page.evaluate(
    ([s, press, until]) => {
      for (let i = 0; i < s * 120; i++) {
        if (until && G.state === until && !G.turn) break;
        if (press && i % 120 === 60) inp.startP = true;
        step(1 / 120);
        inp.startP = false;
      }
      return G.state;
    },
    [seconds, press, until]
  );

test('al primo avvio parte il prologo, poi la biblioteca', async () => {
  const { page, errors, context } = await openGame(browser);
  assert.equal(await page.evaluate(() => G.state), 'intro');
  assert.equal(await advance(page, 60, true, 'title'), 'title');
  assert.equal(await page.evaluate(() => SAVE.pro), true);
  assert.deepEqual(errors, []);
  await context.close();
});

test('cominciare un libro dal primo livello mostra il suo prologo e poi il livello', async () => {
  const storage = { 'marginalia.v2': JSON.stringify({ books: [], pro: true }) };
  const { page, errors, context } = await openGame(browser, { storage });
  await page.evaluate(() => startGame(0, 0));
  await advance(page, 1);
  assert.equal(await page.evaluate(() => G.state + ':' + G.intro.style), 'intro:goth');
  assert.equal(await advance(page, 60, true, 'play'), 'play');
  assert.deepEqual(await page.evaluate(() => [G.chapter, G.li]), [0, 0]);
  assert.deepEqual(errors, []);
  await context.close();
});

test('i libri si aprono in ordine, e la modalità prova li apre tutti', async () => {
  const storage = { 'marginalia.v2': JSON.stringify({ books: [], pro: true }) };
  const { page, context } = await openGame(browser, { storage });
  const r = await page.evaluate(() => {
    const before = [0, 1, 2, 3, 4].map(unlocked);
    SAVE.books[0].done = true;
    const after1 = unlocked(1);
    SAVE.all = true;
    const all = [0, 1, 2, 3, 4].map(unlocked);
    return { before, after1, all };
  });
  assert.deepEqual(r.before, [true, false, false, false, false]);
  assert.equal(r.after1, true);
  assert.deepEqual(r.all, [true, true, true, true, true]);
  await context.close();
});

test('i progressi restano dopo aver ricaricato la pagina', async () => {
  const { page, context } = await openGame(browser, {
    storage: { 'marginalia.v2': JSON.stringify({ books: [], pro: true }) },
  });
  await page.evaluate(() => {
    SAVE.books[1].li = 3;
    SAVE.books[1].max = 3;
    SAVE.books[0].done = true;
    writeSave();
  });
  await page.reload();
  await waitForBoot(page);
  const s = await page.evaluate(() => [SAVE.books[0].done, SAVE.books[1].li, G.state]);
  assert.deepEqual(s, [true, 3, 'title']);
  await context.close();
});

test('un salvataggio della prima versione viene recuperato', async () => {
  const storage = { 'marginalia.v1': JSON.stringify({ li: 4, max: 5, done: false }) };
  const { page, context } = await openGame(browser, { storage });
  assert.deepEqual(await page.evaluate(() => [SAVE.books[0].li, SAVE.books[0].max]), [4, 5]);
  await context.close();
});

test('un salvataggio rovinato non blocca il gioco', async () => {
  const { page, errors, context } = await openGame(browser, { storage: { 'marginalia.v2': '{non è json' } });
  assert.equal(await page.evaluate(() => SAVE.books[0].li), 0);
  assert.deepEqual(errors, []);
  await context.close();
});

test('finire un livello porta al successivo e lo salva', async () => {
  const { page, context } = await openGame(browser, {
    storage: { 'marginalia.v2': JSON.stringify({ books: [], pro: true }) },
  });
  const r = await page.evaluate(() => {
    MarginaliaBots.line(0, 0, 120);
    for (let i = 0; i < 240; i++) step(1 / 120);
    return [G.li, SAVE.books[0].li, G.stats.points > 0];
  });
  assert.deepEqual(r, [1, 1, true]);
  await context.close();
});

test('la pausa ferma il tempo di gioco', async () => {
  const { page, context } = await openGame(browser, {
    storage: { 'marginalia.v2': JSON.stringify({ books: [], pro: true }) },
  });
  const r = await page.evaluate(() => {
    G.chapter = 0;
    G.state = 'play';
    loadLevel(0);
    G.paused = true;
    const t0 = G.t;
    for (let i = 0; i < 120; i++) step(1 / 120);
    return G.t === t0;
  });
  assert.equal(r, true);
  await context.close();
});

for (const choice of ['erase', 'keep']) {
  test(`epilogo: la scelta «${choice === 'erase' ? 'cancella il Refuso' : 'siediti accanto al lettore'}» porta al suo finale`, async () => {
    const { page, errors, context } = await openGame(browser);
    const r = await page.evaluate(choice => {
      G.chapter = NB;
      G.state = 'play';
      G.turn = null;
      G.intro = null;
      G.stats = { deaths: 0, time: 100, marks: 0, total: 6, points: 0, fixed: 0, full: true };
      loadLevel(0);
      const R = G.L.reader;
      P.x = R.x - 240;
      P.y = R.y - 30;
      P.born = 0;
      // prima del dialogo non si può scegliere
      P.x = G.L.exit.x;
      for (let i = 0; i < 120; i++) update(1 / 120);
      const tooEarly = G.epiChoice === null;
      P.x = R.x - 240;
      for (let i = 0; i < 120 * 30; i++) update(1 / 120);
      const talked = G.dlgDone;
      if (choice === 'erase') {
        P.x = G.L.refuso.x + 30;
        P.cd = 0;
        inp.eraseP = true;
        update(1 / 120);
        inp.eraseP = false;
      } else {
        P.x = G.L.exit.x;
        update(1 / 120);
      }
      for (let i = 0; i < 120 * 5 && G.state === 'play'; i++) step(1 / 120);
      return { tooEarly, talked, choice: G.epiChoice, state: G.state, first: CHAPTERS[NB].ending[0].lines[0][0] };
    }, choice);
    assert.ok(r.tooEarly, 'non si sceglie prima di aver ascoltato il lettore');
    assert.ok(r.talked);
    assert.equal(r.choice, choice);
    assert.equal(r.state, 'ending');
    assert.match(r.first, choice === 'erase' ? /cancellò il Refuso/ : /si sedette/);
    assert.deepEqual(errors, []);
    await context.close();
  });
}
