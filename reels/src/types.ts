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
  format: 'nein-vs-ja' | 'mythos' | 'aktuell' | 'it-sicherheit' | 'kundenfrage' | 'vorstellung';
  szenen: Scene[];
};

export const FPS = 30;
export const sek = (s: number) => Math.round(s * FPS);

// ---------- Lesezeit ----------
// Jede Szene läuft mindestens so lange, wie ihr Text zum Lesen braucht.
// LESETEMPO = Wörter pro Sekunde (kleiner = langsamer). PUFFER = Sekunden für Animation + Wirkenlassen.
export const LESETEMPO = 3.2;
const PUFFER = 1.0;

const woerter = (t?: string) => (t ? t.split(/\s+/).filter(Boolean).length : 0);

export const sceneText = (s: Scene): string[] => {
  switch (s.typ) {
    case 'hook':
      return [s.frage, s.stempel, s.nachsatz ?? ''];
    case 'liste':
      return [...s.punkte, s.fazit ?? ''];
    case 'statement':
      return [s.text];
    case 'karten':
      return [s.titel, s.titelAkzent ?? '', ...s.karten.flatMap((k) => [k.frage, k.antwort])];
    case 'ende':
      return [];
  }
};

/** Effektive Dauer in Sekunden: das Maximum aus Vorgabe und Lesezeit. Endkarte mindestens 4 s. */
export const dauerVon = (s: Scene): number => {
  if (s.typ === 'ende') return Math.max(s.dauer, 4);
  const w = sceneText(s).reduce((n, t) => n + woerter(t), 0);
  return Math.max(s.dauer, Math.round((PUFFER + w / LESETEMPO) * 10) / 10);
};

export const framesVon = (s: Scene) => sek(dauerVon(s));
