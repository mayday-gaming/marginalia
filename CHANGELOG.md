# Changelog

Tutte le modifiche rilevanti al gioco sono registrate qui.

Il formato segue [Keep a Changelog](https://keepachangelog.com/it/1.1.0/) e le versioni seguono il [versionamento semantico](https://semver.org/lang/it/): un nuovo libro o una nuova meccanica alzano la versione minore, una correzione la patch. Ogni versione ha un tag `vX.Y.Z` nel repository. Il perché di ogni scelta di design è nel registro in fondo a [PROMPT.md](PROMPT.md).

## [Non rilasciato]

### Modificato
- Il repository si è spostato nell'organizzazione `mayday-gaming`: link, badge e indirizzo del gioco online aggiornati.

## [1.0.0] — 2026-11-15

Prima versione completa: quattro libri, epilogo, e un progetto con standard di ingegneria.

### Aggiunto
- Test automatici (Node e Playwright, 56 test): validazione dei dati di ogni libro e livello; un giocatore automatico che completa ogni livello normale usando solo i comandi; le regole dei quattro boss verificate in positivo e in negativo; prologo, avvio di un libro, salvataggio e ricaricamento, recupero dei salvataggi vecchi o rovinati, sblocchi, modalità prova, pausa, entrambi i finali dell'epilogo; disegno di ogni schermata e dei tasti su telefono.
- Integrazione continua su GitHub Actions: formattazione, build, lint e test a ogni push e pull request.
- Lint con ESLint sui sorgenti e sul bundle completo, che segnala simboli non definiti o mai usati; formattazione con Prettier; `.editorconfig`.
- `npm run check` esegue tutti i controlli in un comando; `node build.js --check` verifica che `index.html` sia allineato ai sorgenti.
- Numero di versione mostrato in biblioteca, preso da `package.json`.
- Documentazione: README rifatto, `docs/ARCHITECTURE.md` (motore, formato dei livelli, boss, audio, salvataggi, test), `CONTRIBUTING.md`, questo changelog.

### Modificato
- Codice riformattato e commentato; dichiarazioni globali una per riga; blocchi `catch` documentati.

### Rimosso
- Codice rimasto dalla prima versione del quarto libro (timbri, sportelli, piattaforme a coincidenze, modi di dire, temi «manuale» e «ufficio»).

### Corretto
- Il giocatore automatico del bosco allagato ora arriva davvero all'uscita (prima la superava nuotando troppo in alto).

## [0.8.1] — 2026-11-15
### Corretto
- I titoli lunghi delle copertine si rimpiccioliscono e non coprono più l'etichetta del libro.

## [0.8.0] — 2026-11-15
### Aggiunto
- Epilogo «Il margine», sbloccato dai quattro libri: la biblioteca, l'incontro con il lettore e una scelta (cancellare il Refuso o sedersi accanto al lettore) con due finali.

## [0.7.0] — 2026-11-15
### Modificato
- Ogni boss ha una regola propria: il battito (I), le parole rimescolate dal Narratore (II), le prove da consegnare a Corsivo (III), le frasi sul soffitto con le piastre di gravità (IV).

## [0.6.0] — 2026-11-15
### Modificato
- Quarto libro rifatto da capo nello spazio, con la gravità come idea centrale: decollo, passeggiata spaziale, piccoli pianeti, campo di asteroidi, sottosopra, buco nero, teletrasporto, boss MARGINE.
- Il bordo superiore della pagina fa da soffitto: si muore solo cadendo nel verso della gravità.

### Rimosso
- Livelli burocratici del primo quarto libro (ufficio moduli, note a piè di pagina, motore a coincidenze, traduttore letterale, «vedi alla voce»).

## [0.5.1] — 2026-11-14
### Corretto
- Nei livelli scuri le parole-nemico e le macchie si staccano dallo sfondo.

## [0.5.0] — 2026-11-14
### Aggiunto
- Modalità prova: dal registro apre tutti i libri e tutti i livelli.

## [0.4.0] — 2026-11-14
### Aggiunto
- Quarto libro, prima versione: «Manuale del passeggero interstellare smarrito».
- Prologo del gioco e prologo di ogni libro, nel registro del proprio genere.

### Corretto
- I tocchi brevissimi dei tasti non vanno più persi.

## [0.3.1] — 2026-11-13
### Modificato
- «Il pedinamento» più facile: torce più lente, ombre più larghe, mezzo secondo di tolleranza.

## [0.3.0] — 2026-11-13
### Aggiunto
- Terzo libro, il giallo «Chi ha strappato l'ultima pagina»: un treno di notte, Corsivo e Tondo, Postilla indagata, «sono stati tutti».

## [0.2.0] — 2026-11-13
### Aggiunto
- Secondo libro, la fiaba «C'era una volta, forse», con il ricalco delle parole, Brina e il viandante; si apre a primo libro finito.
- Registro del lettore con i punti di ogni libro, visibile in pausa e in biblioteca.
- Segnalibro a nastro sulle copertine e salto animato di Postilla da un libro all'altro.

## [0.1.0] — 2026-11-13
### Aggiunto
- Primo libro giocabile, «La casa di Vetrano»: otto livelli e un boss, colonna sonora generata, finale aperto, annotazioni del lettore da raccogliere.
- `PROMPT.md` con il prompt completo e il registro delle modifiche; licenza MIT.

[Non rilasciato]: https://github.com/mayday-gaming/marginalia/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mayday-gaming/marginalia/compare/v0.8.1...v1.0.0
[0.8.1]: https://github.com/mayday-gaming/marginalia/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/mayday-gaming/marginalia/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/mayday-gaming/marginalia/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/mayday-gaming/marginalia/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/mayday-gaming/marginalia/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/mayday-gaming/marginalia/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/mayday-gaming/marginalia/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/mayday-gaming/marginalia/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/mayday-gaming/marginalia/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/mayday-gaming/marginalia/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mayday-gaming/marginalia/releases/tag/v0.1.0
