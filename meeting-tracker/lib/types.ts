export type MeetingStatus =
  | "proběhla"
  | "odmítl"
  | "odešel"
  | "bez_odpovědi"
  | "naplánovaná"
  | "přesunuta";

export type Meeting = {
  id: string;
  date: string;
  status: MeetingStatus;
  reason: string;
  notes: string;
};

export type Products = {
  gol_ibe: boolean;
  higher_tier: boolean;
  tcp_search: boolean;
  cm: boolean;
  qp: boolean;
  repricer: boolean;
  tcp_exchange: boolean;
  trip_manager: boolean;
  cee_ticket_itinerary: boolean;
  tg: boolean;
  tg_mobile: boolean;
  gol_mobile: boolean;
  hotely: boolean;
  ndc: boolean;
};

export type Client = {
  id: string;
  agency: string;
  pos: string;
  active: boolean;
  products: Products;
  meetings: Meeting[];
};
