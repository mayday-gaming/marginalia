# Marginalia

[![CI](https://github.com/mayday-gaming/marginalia/actions/workflows/ci.yml/badge.svg)](https://github.com/mayday-gaming/marginalia/actions/workflows/ci.yml)
![versione](https://img.shields.io/github/package-json/v/mayday-gaming/marginalia)
![licenza](https://img.shields.io/badge/licenza-MIT-blue)

**Un platform narrativo per browser in cui le piattaforme sono le righe dei libri.**

Esiste una biblioteca dove finiscono i libri che qualcuno ha amato troppo. Lì un errore di stampa, il **Refuso**, ha imparato a moltiplicarsi, e una nota a margine scritta a matita, **Postilla**, ha imparato a camminare. Postilla entra nei libri per ripararli. O così crede.

▶ **[Gioca online](https://mayday-gaming.github.io/marginalia/)**, oppure scarica `index.html` e aprilo: è un file unico, senza server e senza dipendenze.

## I libri

Ogni libro è un genere diverso, con la sua grafica, la sua musica, le sue meccaniche e un boss con una regola propria. Si aprono in ordine.

| | Libro | Genere | Idea centrale | Boss |
|---|---|---|---|---|
| I | **La casa di Vetrano** | gotico, diario | il narratore mente: righe false, righe nascoste, battito sotto il pavimento, la pagina al contrario, lo specchio | colpisci solo sul battito |
| II | **C'era una volta, forse** | fiaba illustrata | il ricalco: tocca «rana», «piuma», «sasso» e ne prendi le qualità; parole scambiate, il lupo, il bosco allagato | il Narratore rimescola le parole |
| III | **Chi ha strappato l'ultima pagina** | giallo su un treno | ombre, omissis, interrogatori, pedinamento, e Postilla indagata | porta le prove a Corsivo |
| IV | **Manuale del passeggero interstellare smarrito** | fantascienza comica | la gravità: ridotta, diversa per ogni pianetino, capovolta, risucchiata da un buco nero | metà delle frasi sono sul soffitto |
| ∞ | **Il margine** | epilogo | l'incontro con il lettore, e una scelta che decide il finale | — |

Gli asterischi a matita nascondono le note del lettore che ha dato origine a tutto: chi le trova tutte legge una nota in più alla fine di ogni libro. Il registro del lettore, in pausa e in biblioteca, tiene punti e statistiche di ogni libro. I progressi si salvano nel browser.

## Comandi

| | Tastiera | Telefono | Gamepad |
|---|---|---|---|
| muoversi | ← → oppure A D | ◀ ▶ | levetta o croce |
| saltare (anche due volte) | Spazio, ↑, W, Z | ▲ | A |
| sbianchetto | X, Shift, K | ✎ | X / B / RB |
| pausa e registro | P, Esc | ❙❙ | Start |
| audio | M | ♪ | |

In biblioteca, **Registro → Modalità prova** apre tutti i libri e i livelli senza doverli finire in ordine.

## Sviluppo

Serve Node 20 o più recente.

```bash
npm ci
npx playwright install chromium   # browser per i test, una volta sola
npm run build                     # genera index.html da src/
npm run check                     # formattazione, build, lint e test
```

| Comando | Cosa fa |
|---|---|
| `npm run build` | costruisce `index.html` (codice, stile e font in un solo file) |
| `npm run format` | formatta il codice con Prettier |
| `npm run lint` | ESLint sui sorgenti e controllo del bundle completo |
| `npm test` | 56 test automatici in Chromium |
| `npm run check` | tutto quanto sopra; la CI esegue lo stesso comando |

### Struttura

```
src/
  core.js      canvas, input, audio generato, particelle
  levels.js    i libri e i livelli (solo dati)
  game.js      fisica, Postilla, nemici, sbianchetto, boss
  render.js    disegno del mondo
  ui.js        biblioteca, registro, prologhi, finali, salvataggio, ciclo principale
tests/         test Node + Playwright e giocatori automatici
docs/          architettura
index.html     il gioco pubblicato (generato, non si modifica a mano)
```

### Test

I test non si limitano a controllare che il codice parta. Un **giocatore automatico** attraversa ogni livello usando solo i comandi (sinistra, destra, salto, sbianchetto), così ogni livello è verificato completabile. Le regole di ogni boss sono provate in entrambi i versi. Sono coperti anche prologo, salvataggio e ricaricamento, salvataggi vecchi o rovinati, sblocchi, epilogo con le sue due scelte, e il disegno di ogni schermata, anche su telefono. Dettagli in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#test).

## Documentazione

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): motore, formato dei livelli, tipi di piattaforma, boss, audio, salvataggi, test, come aggiungere un libro.
- [PROMPT.md](PROMPT.md): il prompt completo che descrive il gioco, tenuto sempre allineato, e il registro di ogni modifica con il suo perché. Il gioco è nato da qui.
- [CHANGELOG.md](CHANGELOG.md): tutte le versioni, dalla 0.1.0.
- [CONTRIBUTING.md](CONTRIBUTING.md): ciclo di lavoro, commit, rilasci.

## Licenza e crediti

Codice e testi sotto licenza [MIT](LICENSE). Font: EB Garamond, SIL Open Font License 1.1 (vedi `fonts/`). Musica ed effetti sonori sono generati dal codice.
