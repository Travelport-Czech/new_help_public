# Golibe Agency Dashboard

## Jak nasadit (5 minut)

### 1. Otevři Apps Script editor
Ve spreadsheetu: **Extensions → Apps Script**

### 2. Vlož Code.gs
Obsah souboru `Code.gs` zkopíruj do editoru (přepíše výchozí kód).

> Uprav řádek `const SHEET_NAME = 'implementace';` — vlož přesný název záložky.

### 3. Přidej HTML soubor
- Klikni na **+** vedle "Files" → **HTML**
- Pojmenuj ho přesně `index` (bez přípony)
- Zkopíruj obsah souboru `index.html`

### 4. Nasaď jako Web App
1. Klikni **Deploy → New deployment**
2. Typ: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone with Google account** *(stejný přístup jako ke spreadsheetu)*
5. Klikni **Deploy** → zkopíruj URL

### 5. Hotovo
Dashboard se otevře na té URL. Tlačítko **↻ Obnovit** vždy načte aktuální data z tabulky.

---

## Grafy v dashboardu

| Graf | Popis |
|------|-------|
| KPI bar | Celkem / Active / Implementation / Deactivated |
| Doughnut – Stav | Počet agentur dle všech stavů |
| Doughnut – Verze | Standard / Enhanced / Enterprise |
| Bar – Top 10 Active | 10 zemí s nejvíce active agenturami |
| Bar – Top 10 Deactivated | 10 zemí s nejvíce deactivated agenturami |
| Bar – Všechny země Active | Kompletní přehled zemí (active) |
| Bar – Všechny země Deactivated | Kompletní přehled zemí (deactivated) |

## Aktualizace přístupu
Pokud chceš omezit přístup jen na konkrétní doménu (např. `@travelportgds.cz`), změň **Who has access** na **Anyone in [tvoje doména]** při deployi.
