/**
 * Apre il gioco costruito (index.html) in un Chromium senza finestra e lo rende pilotabile dai test.
 *
 * Il browser usato è quello di Playwright; con la variabile CHROME_PATH si può puntare a un
 * Chrome già installato (utile in locale quando i browser di Playwright non sono scaricati).
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const GAME_URL = new URL('../../index.html', import.meta.url).href;
const BOTS = fileURLToPath(new URL('./bots.js', import.meta.url));

export async function launch() {
  return chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'],
  });
}

/**
 * Aspetta che il gioco abbia finito l'avvio (font caricati, salvataggio letto): solo da lì lo stato è affidabile.
 */
export async function waitForBoot(page) {
  await page.waitForFunction(() => typeof booted !== 'undefined' && booted === true);
}

/**
 * Apre una pagina di gioco pulita. Restituisce la pagina e l'elenco degli errori JavaScript
 * raccolti, che i test controllano alla fine.
 */
export async function openGame(
  browser,
  { viewport = { width: 960, height: 540 }, touch = false, storage = null } = {}
) {
  const context = await browser.newContext({ viewport, hasTouch: touch, isMobile: touch });
  if (storage)
    // lo stato iniziale si scrive una volta sola: dopo un ricaricamento resta quello salvato dal gioco
    await context.addInitScript(
      s => Object.entries(s).forEach(([k, v]) => localStorage.getItem(k) === null && localStorage.setItem(k, v)),
      storage
    );
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  await page.goto(GAME_URL);
  await waitForBoot(page);
  await page.addScriptTag({ path: BOTS });
  // ferma il ciclo di gioco reale: i test fanno avanzare la simulazione a mano, in modo deterministico
  await page.evaluate(() => {
    window.requestAnimationFrame = () => 0;
  });
  return { page, errors, context };
}
