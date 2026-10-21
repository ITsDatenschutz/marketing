// Rendert ein Reel aus einer JSON-Datei.
// Aufruf:  node scripts/render.mjs ../content/reels/<datei>.json [--stills] [--nur-stills]
// Ergebnis: out/<dateiname>.mp4  (mit --stills zusätzlich ein Kontaktbogen pro Szene als PNG)
import { execFileSync } from 'node:child_process';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

const [, , file, ...flags] = process.argv;
if (!file) {
  console.error('Bitte JSON-Datei angeben.');
  process.exit(1);
}
const data = JSON.parse(readFileSync(resolve(file), 'utf8'));
const name = basename(file, '.json');
mkdirSync('out', { recursive: true });
const propsFile = resolve('out', `${name}.props.json`);
writeFileSync(propsFile, JSON.stringify(data));

// Effektive Szenendauer wie in src/types.ts (dauerVon): Lesetempo von dort übernehmen
const typesSrc = readFileSync(resolve('src/types.ts'), 'utf8');
const LESETEMPO = Number(typesSrc.match(/LESETEMPO = ([\d.]+)/)[1]);
const PUFFER = Number(typesSrc.match(/PUFFER = ([\d.]+)/)[1]);
const W = (t) => (t ? t.split(/\s+/).filter(Boolean).length : 0);
const txt = (s) =>
  s.typ === 'hook' ? [s.frage, s.stempel, s.nachsatz]
  : s.typ === 'liste' ? [...s.punkte, s.fazit]
  : s.typ === 'statement' ? [s.text]
  : s.typ === 'karten' ? [s.titel, s.titelAkzent, ...s.karten.flatMap((k) => [k.frage, k.antwort])]
  : [];
const dauerVon = (s) =>
  s.typ === 'ende' ? Math.max(s.dauer, 4)
  : Math.max(s.dauer, Math.round((PUFFER + txt(s).reduce((n, t) => n + W(t), 0) / LESETEMPO) * 10) / 10);

const run = (args) => execFileSync('npx', ['remotion', ...args], { stdio: 'inherit' });

if (flags.includes('--stills')) {
  let t = 0;
  data.szenen.forEach((s, i) => {
    const d = dauerVon(s);
    const frame = Math.round((t + d * 0.85) * 30);
    run(['still', 'src/index.ts', 'Reel', `out/${name}-s${i + 1}.png`, `--frame=${frame}`, '--scale=0.5', `--props=${propsFile}`]);
    t += d;
  });
}
if (!flags.includes('--nur-stills')) run(['render', 'src/index.ts', 'Reel', `out/${name}.mp4`, '--codec=h264', '--crf=18', `--props=${propsFile}`]);
const gesamt = data.szenen.reduce((n, s) => n + dauerVon(s), 0);
console.log(`\nFertig: out/${name}${flags.includes('--nur-stills') ? ' (nur Szenenbilder)' : '.mp4'} – Länge ${gesamt.toFixed(1)} s`);
