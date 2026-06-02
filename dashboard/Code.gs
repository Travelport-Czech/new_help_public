// ============================================================
// GOLIBE AGENCY DASHBOARD - Google Apps Script
// ============================================================
// Jak nasadit:
// 1. Otevři spreadsheet → Extensions → Apps Script
// 2. Vlož tento soubor jako Code.gs
// 3. Vlož index.html jako nový HTML soubor (File → New → HTML)
// 4. Uprav SHEET_NAME níže (název záložky v tabulce)
// 5. Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone with Google account (nebo Anyone)
// ============================================================

const SHEET_NAME = 'implementace'; // ← změň na název své záložky

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Golibe Agency Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();

  // Najdi header řádek (hledáme řádek s "AGENCY", "COUNTRY", "STATUS", "VERSION")
  let headerRow = -1;
  for (let i = 0; i < Math.min(5, data.length); i++) {
    const row = data[i].map(v => String(v).toUpperCase().trim());
    if (row.includes('AGENCY') && row.includes('STATUS')) {
      headerRow = i;
      break;
    }
  }
  if (headerRow === -1) headerRow = 0;

  const headers = data[headerRow].map(v => String(v).toUpperCase().trim());
  const agencyIdx  = headers.indexOf('AGENCY');
  const countryIdx = headers.indexOf('COUNTRY');
  const statusIdx  = headers.indexOf('STATUS');
  const versionIdx = headers.indexOf('VERSION');

  const rows = [];
  for (let i = headerRow + 1; i < data.length; i++) {
    const row = data[i];
    const agency  = String(row[agencyIdx]  || '').trim();
    const country = String(row[countryIdx] || '').trim().replace(/\s+$/, '');
    const status  = String(row[statusIdx]  || '').trim().toLowerCase();
    const version = String(row[versionIdx] || '').trim().toLowerCase();

    if (!agency || agency === '' || agency === '0') continue;

    rows.push({ agency, country, status, version });
  }

  return buildStats(rows);
}

function buildStats(rows) {
  const countBy = (key, filter) => {
    const map = {};
    rows.forEach(r => {
      if (filter && !filter(r)) return;
      const val = r[key] || 'Unknown';
      map[val] = (map[val] || 0) + 1;
    });
    return map;
  };

  const topN = (map, n) => {
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .reduce((acc, [k, v]) => { acc[k] = v; return acc; }, {});
  };

  const byStatus  = countBy('status');
  const byVersion = countBy('version');
  const byCountryActive      = countBy('country', r => r.status === 'active');
  const byCountryDeactivated = countBy('country', r => r.status === 'deactivated');

  return {
    total: rows.length,
    byStatus,
    byVersion,
    byCountryActive,
    byCountryDeactivated,
    top10Active:      topN(byCountryActive, 10),
    top10Deactivated: topN(byCountryDeactivated, 10),
    lastUpdated: new Date().toLocaleString('cs-CZ')
  };
}
