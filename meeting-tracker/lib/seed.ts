import type { Client, Products } from "./types";

const n: Products = {
  gol_ibe: false, higher_tier: false, tcp_search: false,
  cm: false, qp: false, repricer: false, tcp_exchange: false,
  trip_manager: false, cee_ticket_itinerary: false,
  tg: false, tg_mobile: false, gol_mobile: false,
  hotely: false, ndc: false,
};

function p(vals: Partial<Products>): Products {
  return { ...n, ...vals };
}

export const SEED_CLIENTS: Client[] = [
  /* ── TH skupina – zatím bez kontaktu ──────────────────── */
  { id: "mgc-aviation",   agency: "MGC Aviation",              pos: "TH", active: true,  products: n, meetings: [] },
  { id: "hero-solutions", agency: "Hero Solutions",            pos: "TH", active: true,  products: n, meetings: [] },
  { id: "blessing",       agency: "Blessing Holidays",         pos: "TH", active: true,  products: n, meetings: [] },
  { id: "arpae",          agency: "Arpae Infinities",          pos: "TH", active: true,  products: n, meetings: [] },
  { id: "roong-sarp",     agency: "Roong Sarp Holiday",        pos: "TH", active: false, products: n, meetings: [] },
  { id: "khobfah",        agency: "Khobfah Travel",            pos: "TH", active: true,  products: n, meetings: [] },
  { id: "avenue-inter",   agency: "Avenue Inter Travel",       pos: "TH", active: false, products: n, meetings: [] },
  { id: "genius",         agency: "Genius Traveler",           pos: "TH", active: true,  products: n, meetings: [] },
  { id: "safe-t",         agency: "Safe T Travel",             pos: "TH", active: true,  products: n, meetings: [] },
  { id: "thai-airticket", agency: "Thai Airticket",            pos: "TH", active: true,  products: n, meetings: [] },
  { id: "laos-airtickets",agency: "Laos Airtickets Agency",    pos: "TH", active: false, products: n, meetings: [] },
  { id: "world-thara",    agency: "World Thara Travel",        pos: "TH", active: true,  products: n, meetings: [] },
  { id: "fantastic",      agency: "Fantastic International Tour", pos: "TH", active: true, products: n, meetings: [] },

  /* ── Aktivní klienti ───────────────────────────────────── */
  { id: "eurovina",       agency: "Eurovina",                  pos: "VI",  active: true,  products: p({ gol_ibe: true, cm: true, qp: true }), meetings: [] },
  { id: "elgrass",        agency: "Elgrass Travel",            pos: "ZW",  active: true,  products: p({ gol_ibe: true, trip_manager: true, cee_ticket_itinerary: true, tg: true, tg_mobile: true }), meetings: [] },
  { id: "samblue",        agency: "Samblue Travel",            pos: "SR",  active: true,  products: p({ gol_ibe: true, higher_tier: true, tcp_exchange: true }), meetings: [] },
  { id: "odisea",         agency: "Odisea",                    pos: "AL",  active: true,  products: p({ gol_ibe: true, tcp_exchange: true }), meetings: [] },
  { id: "aries",          agency: "Aries Travel",              pos: "MK",  active: true,  products: p({ gol_ibe: true, tcp_exchange: true }), meetings: [] },
  { id: "briton",         agency: "Briton Travel",             pos: "MU",  active: true,  products: p({ gol_ibe: true, qp: true, trip_manager: true, tg: true, tg_mobile: true }), meetings: [] },
  { id: "skyceylon",      agency: "Skyceylon",                 pos: "AU",  active: true,  products: p({ gol_ibe: true, higher_tier: true, tcp_exchange: true }), meetings: [] },
  { id: "czech-kiwis",    agency: "Czech Kiwis",               pos: "CZ",  active: true,  products: p({ gol_ibe: true, higher_tier: true }), meetings: [] },
  { id: "national-tickets",agency: "National Tickets",         pos: "ZW",  active: true,  products: p({ gol_ibe: true, higher_tier: true, tcp_exchange: true }), meetings: [] },
  { id: "baya-tv",        agency: "Baya Tv",                   pos: "ML",  active: true,  products: p({ gol_ibe: true, tcp_exchange: true }), meetings: [] },
  { id: "thetravellist",  agency: "Thetravellist",             pos: "NZ",  active: true,  products: p({ gol_ibe: true }), meetings: [] },
  { id: "four-winds",     agency: "Four Winds Travel",         pos: "ET",  active: true,  products: n, meetings: [] },
  { id: "friends-travel", agency: "Friends Travel",            pos: "AL",  active: true,  products: n, meetings: [] },
  { id: "waljis",         agency: "Waljis Travel",             pos: "ZW",  active: true,  products: n, meetings: [] },
  { id: "magellan-swiss", agency: "Magellan Swiss Travel",     pos: "CHE", active: true,  products: n, meetings: [] },
  { id: "jack-tours",     agency: "Jack Tours",                pos: "SR",  active: true,  products: p({ gol_ibe: true, trip_manager: true, tg: true, tg_mobile: true }), meetings: [] },
  { id: "kelvin",         agency: "Kelvin Travel",             pos: "AL",  active: true,  products: p({ gol_ibe: true, cm: true, repricer: true }), meetings: [] },
  { id: "the-travellist", agency: "The Travellist",            pos: "AU",  active: true,  products: p({ gol_ibe: true }), meetings: [] },
  { id: "korny",          agency: "Korny Travel",              pos: "SK",  active: true,  products: p({ gol_ibe: true, cm: true, tcp_exchange: true, hotely: true, ndc: true }), meetings: [] },
  { id: "flyiisi",        agency: "Flyiisi",                   pos: "FI",  active: true,  products: p({ gol_ibe: true }), meetings: [] },
  { id: "ola-air",        agency: "Ola Air",                   pos: "NL",  active: true,  products: p({ gol_ibe: true, trip_manager: true }), meetings: [] },
  { id: "kathmandu",      agency: "Kathmandu Travel",          pos: "AU",  active: true,  products: p({ gol_ibe: true, hotely: true, ndc: true }), meetings: [] },
  { id: "applause",       agency: "Applause Global Services",  pos: "NG",  active: true,  products: p({ gol_ibe: true }), meetings: [] },
  { id: "airways",        agency: "Airways Travel",            pos: "AU",  active: true,  products: p({ gol_ibe: true }), meetings: [] },
  { id: "iace",           agency: "IACE Travel",               pos: "JP",  active: true,  products: p({ gol_ibe: true }), meetings: [] },
  { id: "wings",          agency: "Wings Travel Bureau",       pos: "GH",  active: true,  products: n, meetings: [] },
  { id: "praga-ch",       agency: "Praga CH",                  pos: "CZ",  active: true,  products: p({ gol_ibe: true, gol_mobile: true, hotely: true, ndc: true }), meetings: [] },
  { id: "faredeal",       agency: "Faredeal Travel",           pos: "NG",  active: true,  products: p({ gol_ibe: true, hotely: true, ndc: true }), meetings: [] },
  { id: "world-discovery",agency: "World Discovery Travel",    pos: "MY",  active: true,  products: p({ gol_ibe: true, repricer: true, ndc: true }), meetings: [] },
  { id: "travelfox",      agency: "Travelfox.ch",              pos: "CHE", active: true,  products: p({ gol_ibe: true, hotely: true, ndc: true }), meetings: [] },
];
