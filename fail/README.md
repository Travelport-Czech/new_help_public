# FAIL – Future AI Leader
## Znalostní báze programu

> **Řečník:** Filip Dřímalka (Ability a.s.)
> **Program:** 10týdenní online program pro adopci AI v práci
> **Filosofie:** FAIL = First Attempt In Learning | Mistrovství = 10 000 iterací

---

## Rychlá navigace

| Co hledáš? | Kde to najdeš |
|---|---|
| Přepis konkrétního modulu | [`transcripts/`](#moduly-sessions) |
| Příklady AI promptů | [`docs/fail-svaly-prompty.md`](docs/fail-svaly-prompty.md) |
| Vysvětlení pojmu (vibe coding, PRD, agency...) | [`docs/glossary.md`](docs/glossary.md) |
| Interaktivní web | [`web/index.html`](web/index.html) |
| Doporučené nástroje | viz [Nástroje](#doporučené-nástroje) |

---

## Moduly (Sessions)

### ✅ K dispozici

| Modul | Téma | Datum | Soubor | Klíčová témata |
|---|---|---|---|---|
| 1 | AI First Mindset | – | [`transcripts/session-01-ai-first-mindset.md`](transcripts/session-01-ai-first-mindset.md) | FAIL filozofie, Agency, Mindset, Systém |
| 2 | Nástroje s AI | 20.3.2026 | [`transcripts/session-02-nastroje-ai.md`](transcripts/session-02-nastroje-ai.md) | Modely, Bezpečnost, Claude, NotebookLM, Cursor |
| 3 | Symbioza s AI | – | [`transcripts/session-03-symbioza-ai.md`](transcripts/session-03-symbioza-ai.md) | Vibe Working, 90-10, Orchestrace, Workflow |
| 4 | Druhý mozek | 2.4.2026 | [`transcripts/session-04-druhy-mozek.md`](transcripts/session-04-druhy-mozek.md) | Second Brain, Kontext, Znalosti, NotebookLM |
| 5 | Tvorba obsahu s AI | 10.4.2026 | [`transcripts/session-05-tvorba-obsahu.md`](transcripts/session-05-tvorba-obsahu.md) | Texty, Prezentace, Grafika, Audio/Video, Idea File |
| 6 | Práce na projektech | 17.4.2026 | [`transcripts/session-06-prace-na-projektech.md`](transcripts/session-06-prace-na-projektech.md) | 5fázový framework, AI WBS, Compound engineering, BUF |
| 7 | Vibe Coding | 24.4.2026 | [`transcripts/session-07-vibe-coding.md`](transcripts/session-07-vibe-coding.md) | Vibe Coding, 3 kategorie projektů, Rizika, Lovable, Cursor |
| 8 | Data a insighty | 30.4.2026 | [`transcripts/session-08-data-insighty.md`](transcripts/session-08-data-insighty.md) | Strukturovaná/nestrukturovaná data, Context engineering, Streamlit |
| 9 | Automatizace a agenti | – | [`transcripts/session-09-automatizace-agenti.md`](transcripts/session-09-automatizace-agenti.md) | Make, n8n, Relay, AI Agenti, Automatizace workflow |

### ⏳ Chybí přepis (modul 10)

Nahrajte přepis posledního modulu a doplňte tabulku výše.

---

## Dokumenty

| Soubor | Popis |
|---|---|
| [`docs/fail-svaly-prompty.md`](docs/fail-svaly-prompty.md) | Konkrétní AI prompty pro byznys použití ("Svaly") z prezentace FAIL 13.3. |
| [`docs/glossary.md`](docs/glossary.md) | Slovníček pojmů – Agency, Vibe Coding, PRD, Shadow AI, Deep Research a další |

---

## Doporučené nástroje

### Chatovací (konverzace, analýza)
- **Claude** (claude.ai) – dle Filipa nejinteligentnější, nejlepší pro komplexní práci. Projekt = uložený asistent.
- **ChatGPT** (chatgpt.com) – GPT = uložený asistent, obrázky
- **Gemini** (gemini.google.com) – Gem = uložený asistent, integrace s Google
- **NotebookLM** (notebooklm.google.com) – velké množství dokumentů, podcasty, veřejná data

### Programovací (vibe coding)
- **Cursor** (cursor.com) – agentní, pracuje s lokálními soubory, Filipův hlavní nástroj
- **Claude Code** – CLI, terminál, agentní
- **Makary** (makary.ai) – web, prezentace, nabídky; účastníci FAIL dostávají 10M kreditů

### Porovnání modelů
- **Artificial Analysis** (artificialanalysis.ai) – benchmark inteligence/rychlosti/ceny

---

## Klíčové principy (rychlý přehled)

1. **FAIL = First Attempt In Learning** – chyba je součástí učení, ne selhání
2. **Agency** – proaktivita je nejdůležitější dovednost budoucnosti
3. **AI First Mindset** – AI jako první volba, ne jako nástroj "navíc"
4. **Vibe Working** – zadávám cíle, AI exekutuje, já iteruji
5. **Princip 90-10** – AI udělá 90%, člověk doladí 10%
6. **Systém** – ne ad-hoc použití, ale systém práce s AI
7. **Kontext je král** – čím lepší kontext, tím lepší výstup
8. **Druhý mozek** – systém ukládání znalostí napojený na AI

---

## Bezpečnost (rychlý přehled)

| Typ dat | Co dělat |
|---|---|
| Veřejné (výroční zprávy, zákony, marketing) | Lze dát kamkoliv |
| Obchodní (brainstorming, projekty, skripty) | Placený nástroj s vypnutým trénováním |
| Důvěrné (citlivá firemní data) | Jen schválené firemní řešení |

**Klíčové pravidlo:** Placený nástroj + vypnuté trénování = bezpečné. Bezplatný nebo neznámý nástroj = riziko.

---

## Filipův osobní setup

```
90% chatů → Claude
Obrázky   → ChatGPT
Veřejná data → NotebookLM
Kód + soubory → Cursor
```

---

## Struktura složky

```
fail/
├── README.md                               ← tento soubor (hlavní navigace)
├── transcripts/
│   ├── session-01-ai-first-mindset.md      ← čistý přepis modulu 1
│   ├── session-01-raw.md
│   ├── session-02-nastroje-ai.md           ← čistý přepis modulu 2
│   ├── session-03-symbioza-ai.md           ← čistý přepis modulu 3
│   ├── session-03-raw.md
│   ├── session-04-druhy-mozek.md           ← čistý přepis modulu 4
│   ├── session-04-raw.md
│   ├── session-05-tvorba-obsahu.md         ← čistý přepis modulu 5
│   ├── session-05-raw.md
│   ├── session-06-prace-na-projektech.md   ← čistý přepis modulu 6
│   ├── session-06-raw.md
│   ├── session-07-vibe-coding.md           ← čistý přepis modulu 7
│   ├── session-07-raw.md
│   ├── session-08-data-insighty.md         ← čistý přepis modulu 8
│   ├── session-08-raw.md
│   ├── session-09-automatizace-agenti.md   ← čistý přepis modulu 9
│   └── session-09-raw.md
├── docs/
│   ├── fail-svaly-prompty.md               ← AI prompty pro byznys ("Svaly")
│   └── glossary.md                         ← slovníček pojmů
└── web/
    └── index.html                          ← interaktivní web (GitHub Pages)
```

---

*Obsah průběžně doplňován | Program FAIL – Future AI Leader | Filip Dřímalka, Ability a.s.*
