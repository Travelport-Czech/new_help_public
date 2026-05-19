"use client";

import { useState, useEffect, useMemo } from "react";
import { SEED_CLIENTS } from "@/lib/seed";
import type { Client, Meeting, MeetingStatus } from "@/lib/types";

/* ── Constants ─────────────────────────── */
const STORAGE_KEY = "mtv1-clients";

const STATUS_LABELS: Record<MeetingStatus, string> = {
  proběhla:     "Proběhla ✅",
  odmítl:       "Odmítl ❌",
  odešel:       "Odešel 🚶",
  bez_odpovědi: "Bez odpovědi 📭",
  naplánovaná:  "Naplánovaná 📅",
  přesunuta:    "Přesunuta ➡️",
};

const STATUS_BADGE_CLASS: Record<MeetingStatus | "none", string> = {
  proběhla:     "status-badge badge-probiehla",
  odmítl:       "status-badge badge-odmitl",
  odešel:       "status-badge badge-odesel",
  bez_odpovědi: "status-badge badge-bez_odpovedi",
  naplánovaná:  "status-badge badge-naplanovana",
  přesunuta:    "status-badge badge-presunuta",
  none:         "status-badge badge-none",
};

const STATUS_DOT_COLOR: Record<MeetingStatus | "none", string> = {
  proběhla:     "#16a34a",
  odmítl:       "#dc2626",
  odešel:       "#d97706",
  bez_odpovědi: "#6b7a99",
  naplánovaná:  "#2563eb",
  přesunuta:    "#9333ea",
  none:         "#c8cfe0",
};

const ROW_STATUS_CLASS: Record<MeetingStatus | "none", string> = {
  proběhla:     "status-probiehla",
  odmítl:       "status-odmitl",
  odešel:       "status-odesel",
  bez_odpovědi: "status-bez_odpovedi",
  naplánovaná:  "status-naplanovana",
  přesunuta:    "status-presunuta",
  none:         "",
};

const PRODUCTS_LABELS: Record<string, string> = {
  gol_ibe:              "GOL IBE",
  higher_tier:          "Higher tier",
  tcp_search:           "TCP search",
  cm:                   "CM",
  qp:                   "QP",
  repricer:             "Repricer",
  tcp_exchange:         "TCP Exchange",
  trip_manager:         "Trip Manager",
  cee_ticket_itinerary: "CEE ticket",
  tg:                   "TG",
  tg_mobile:            "TG mobile",
  gol_mobile:           "GOL mobile",
  hotely:               "Hotely",
  ndc:                  "NDC",
};

/* ── Helpers ───────────────────────────── */
function lastMeeting(c: Client): Meeting | null {
  return c.meetings.length ? c.meetings[c.meetings.length - 1] : null;
}

function clientStatus(c: Client): MeetingStatus | "none" {
  const last = lastMeeting(c);
  return last ? last.status : "none";
}

function activeProducts(c: Client): string[] {
  return Object.entries(c.products)
    .filter(([, v]) => v)
    .map(([k]) => PRODUCTS_LABELS[k] ?? k);
}

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/* ── Modal ─────────────────────────────── */
function AddMeetingModal({
  client,
  onSave,
  onClose,
}: {
  client: Client;
  onSave: (m: Meeting) => void;
  onClose: () => void;
}) {
  const [date, setDate] = useState(todayISO());
  const [status, setStatus] = useState<MeetingStatus>("proběhla");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ id: uid(), date, status, reason, notes });
  }

  const showReason = status === "odmítl" || status === "odešel";

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Zavřít">✕</button>
        <div className="modal-title">Přidat záznam schůzky</div>
        <div className="modal-subtitle">{client.agency} · {client.pos}</div>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="m-date">Datum schůzky</label>
            <input id="m-date" type="date" className="form-input" value={date}
              onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="m-status">Výsledek</label>
            <select id="m-status" className="form-select" value={status}
              onChange={(e) => setStatus(e.target.value as MeetingStatus)}>
              {(Object.entries(STATUS_LABELS) as [MeetingStatus, string][]).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          {showReason && (
            <div className="form-group">
              <label className="form-label" htmlFor="m-reason">Důvod (proč odmítl / odešel)</label>
              <input id="m-reason" type="text" className="form-input" value={reason}
                placeholder="Napiš důvod…"
                onChange={(e) => setReason(e.target.value)} />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="m-notes">Poznámky / průběh</label>
            <textarea id="m-notes" className="form-textarea" value={notes}
              placeholder="Co bylo probráno, co bylo dohodnuto…"
              onChange={(e) => setNotes(e.target.value)} />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={onClose}>Zrušit</button>
            <button type="submit" className="btn-primary">Uložit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Main dashboard ────────────────────── */
export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterActive, setFilterActive] = useState("all");

  /* Load from localStorage or seed */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setClients(JSON.parse(stored));
      } else {
        setClients(SEED_CLIENTS);
      }
    } catch {
      setClients(SEED_CLIENTS);
    }
  }, []);

  /* Persist on change */
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    }
  }, [clients]);

  /* Add a meeting to a client */
  function saveMeeting(clientId: string, meeting: Meeting) {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? { ...c, meetings: [...c.meetings, meeting] }
          : c
      )
    );
    setModal(null);
    setExpanded((prev) => new Set([...prev, clientId]));
  }

  /* Delete a meeting */
  function deleteMeeting(clientId: string, meetingId: string) {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? { ...c, meetings: c.meetings.filter((m) => m.id !== meetingId) }
          : c
      )
    );
  }

  /* Toggle expand */
  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* Stats */
  const stats = useMemo(() => {
    const total = clients.length;
    const active = clients.filter((c) => c.active).length;
    const met = clients.filter((c) => clientStatus(c) === "proběhla").length;
    const declined = clients.filter((c) => clientStatus(c) === "odmítl").length;
    const noContact = clients.filter((c) => clientStatus(c) === "none").length;
    return { total, active, met, declined, noContact };
  }, [clients]);

  /* Filter */
  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (filterActive === "active" && !c.active) return false;
      if (filterActive === "inactive" && c.active) return false;

      const status = clientStatus(c);
      if (filterStatus !== "all" && status !== filterStatus) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        if (!c.agency.toLowerCase().includes(q) && !c.pos.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [clients, search, filterStatus, filterActive]);

  return (
    <div className="app">
      {/* ── Top bar ── */}
      <div className="topbar">
        <div className="topbar-brand">
          <div className="topbar-dot" />
          Přehled schůzek
        </div>
        <div className="topbar-count">
          {stats.total} klientů celkem
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-num">{stats.total}</div>
          <div className="stat-label">Celkem klientů</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-num">{stats.noContact}</div>
          <div className="stat-label">Bez kontaktu</div>
        </div>
        <div className="stat-card green">
          <div className="stat-num">{stats.met}</div>
          <div className="stat-label">Schůzka proběhla</div>
        </div>
        <div className="stat-card red">
          <div className="stat-num">{stats.declined}</div>
          <div className="stat-label">Odmítl schůzku</div>
        </div>
        <div className="stat-card gray">
          <div className="stat-num">{clients.filter((c) => clientStatus(c) === "bez_odpovědi").length}</div>
          <div className="stat-label">Bez odpovědi</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="filters">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Hledat agenturu nebo zemi…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Všechny stavy</option>
          <option value="none">Bez kontaktu</option>
          {(Object.entries(STATUS_LABELS) as [string, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <select className="filter-select" value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}>
          <option value="all">Aktivní i neaktivní</option>
          <option value="active">Jen aktivní</option>
          <option value="inactive">Jen deaktivované</option>
        </select>

        <span className="filter-count">
          {filtered.length} {filtered.length === 1 ? "klient" : filtered.length < 5 ? "klienti" : "klientů"}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="table-wrap">
        <table className="client-table">
          <thead>
            <tr className="table-head">
              <th style={{ width: "28%" }}>Agentura</th>
              <th style={{ width: "25%" }}>Produkty</th>
              <th style={{ width: "16%" }}>Poslední schůzka</th>
              <th style={{ width: "16%" }}>Stav</th>
              <th style={{ width: "15%" }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => {
              const isExpanded = expanded.has(client.id);
              const status = clientStatus(client);
              const last = lastMeeting(client);
              const products = activeProducts(client);
              const rowStatusClass = ROW_STATUS_CLASS[status];

              return [
                /* ── Main row ── */
                <tr
                  key={client.id}
                  className={`client-row ${rowStatusClass} ${client.meetings.length > 0 ? "has-history" : ""}`}
                  onClick={() => toggle(client.id)}
                >
                  <td>
                    <span className="agency-name">{client.agency}</span>
                    <span className="agency-pos">{client.pos}</span>
                    {!client.active && <span className="inactive-badge">Disabled</span>}
                  </td>

                  <td>
                    {products.length > 0 ? (
                      <div className="product-dots">
                        {products.map((p) => (
                          <span key={p} className="product-dot">{p}</span>
                        ))}
                      </div>
                    ) : (
                      <span className="no-products">—</span>
                    )}
                  </td>

                  <td>
                    {last ? (
                      <span style={{ fontSize: 14, color: "#4a5568" }}>{formatDate(last.date)}</span>
                    ) : (
                      <span style={{ fontSize: 13, color: "#c8cfe0" }}>—</span>
                    )}
                  </td>

                  <td>
                    <span className={STATUS_BADGE_CLASS[status]}>
                      {status === "none" ? "Bez kontaktu" : STATUS_LABELS[status as MeetingStatus].split(" ")[0]}
                    </span>
                  </td>

                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                      <button className="btn-add" onClick={() => setModal(client)}>
                        + Schůzka
                      </button>
                      {client.meetings.length > 0 && (
                        <span className="chevron" style={{ transform: isExpanded ? "rotate(90deg)" : "none" }}>›</span>
                      )}
                    </div>
                  </td>
                </tr>,

                /* ── History row ── */
                isExpanded && client.meetings.length > 0 && (
                  <tr key={`${client.id}-history`} className="history-row">
                    <td colSpan={5}>
                      <div className="history-inner">
                        <div className="history-title">
                          Historie schůzek ({client.meetings.length})
                        </div>
                        <div className="history-list">
                          {[...client.meetings].reverse().map((m) => (
                            <div key={m.id} className="history-item">
                              <div
                                className="history-dot"
                                style={{ background: STATUS_DOT_COLOR[m.status] }}
                              />
                              <span className="history-date">{formatDate(m.date)}</span>
                              <span
                                className="history-status"
                                style={{ color: STATUS_DOT_COLOR[m.status] }}
                              >
                                {STATUS_LABELS[m.status]}
                              </span>
                              {m.reason && (
                                <span className="history-reason">— {m.reason}</span>
                              )}
                              {m.notes && (
                                <span className="history-notes">{m.notes}</span>
                              )}
                              <button
                                className="history-delete"
                                title="Smazat záznam"
                                onClick={() => {
                                  if (confirm("Smazat tento záznam?")) {
                                    deleteMeeting(client.id, m.id);
                                  }
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ),
              ];
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9aa5b8", fontSize: 15 }}>
            Žádní klienti neodpovídají filtru.
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {modal && (
        <AddMeetingModal
          client={modal}
          onSave={(m) => saveMeeting(modal.id, m)}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
