// Ein Reel ist reine Daten: eine Liste von Szenen. Der Agent schreibt nur JSON nach diesem Schema.
// Zeiten in Sekunden. Zeilenumbrüche im Text mit "\n".

export type HookScene = {
  typ: 'hook';
  dauer: number;
  frage: string; // kleine Zeile oben, z. B. "Kennen Sie diesen Datenschützer?"
  stempel: string; // großes, rotes Zitat im Stempel-Look
  nachsatz?: string; // kleine Zeile darunter
};

export type ListeScene = {
  typ: 'liste';
  dauer: number;
  art: 'nein' | 'ja'; // ✕ rot oder ✓ lime
  punkte: string[]; // 2–4 kurze Punkte
  fazit?: string;
};

export type StatementScene = {
  typ: 'statement';
  dauer: number;
  text: string; // 1–3 Wörter pro Zeile, max. 3 Zeilen
  farbe?: 'gruen' | 'lime' | 'rot';
};

export type KartenScene = {
  typ: 'karten';
  dauer: number;
  titel: string;
  titelAkzent?: string; // zweite Zeile in Lime
  karten: { frage: string; antwort: string }[]; // max. 3
};

export type EndScene = {
  typ: 'ende';
  dauer: number;
  claim?: string; // Standard: brand.claim
  claimAkzent?: string;
};

export type Scene = HookScene | ListeScene | StatementScene | KartenScene | EndScene;

export type ReelData = {
  titel: string; // intern
  format: 'nein-vs-ja' | 'mythos' | 'aktuell' | 'it-sicherheit' | 'kundenfrage';
  szenen: Scene[];
};

export const FPS = 30;
export const sek = (s: number) => Math.round(s * FPS);
