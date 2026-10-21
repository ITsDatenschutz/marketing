// Rendert ein Reel aus einer JSON-Datei.
// Aufruf:  npm run render -- ../content/reels/2026-10-27-mythos-20-mitarbeiter.json [--stills]
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

const run = (args) => execFileSync('npx', ['remotion', ...args], { stdio: 'inherit' });

if (flags.includes('--stills')) {
  let t = 0;
  data.szenen.forEach((s, i) => {
    const frame = Math.round((t + s.dauer * 0.85) * 30);
    run(['still', 'src/index.ts', 'Reel', `out/${name}-s${i + 1}.png`, `--frame=${frame}`, '--scale=0.5', `--props=${propsFile}`]);
    t += s.dauer;
  });
}
run(['render', 'src/index.ts', 'Reel', `out/${name}.mp4`, '--codec=h264', '--crf=18', `--props=${propsFile}`]);
console.log(`\nFertig: out/${name}.mp4`);
