# Wochenlauf (jeden Montag früh)

Ziel: Bis Montagmorgen liegen **drei freigabefertige Reel-Entwürfe** beim Nutzer, die ihn höchstens 15 Minuten kosten.

## 1. Lage prüfen
- Lies `CLAUDE.md`, `content/redaktionsplan.md` und `content/themen-backlog.md`.
- Gibt es freigegebene Reels aus der Vorwoche, die noch nicht `geplant` sind? Dann erinnere den Nutzer am Ende daran.
- Welches Format lief zuletzt? Wähle für diese Woche Formate, die nicht direkt wiederholen.

## 2. Themen finden (max. 20 Minuten Recherche)
Quellen, jeweils nur Neues seit dem letzten Lauf:
- Datenschutzkonferenz (DSK): neue Beschlüsse, Orientierungshilfen
- BayLDA: Pressemitteilungen, Tätigkeitsbericht
- EuGH / BGH: Urteile zu DSGVO, Schadensersatz, Auskunft
- IT-Sicherheit: BSI-Warnungen, aktuelle Phishing-Wellen
- Skill `datenschutzarchiv-suche` für Fälle aus Tätigkeitsberichten (gute „Mythos“- und „Nein vs. Ja“-Stoffe)
- `content/themen-backlog.md` (dort notiert der Nutzer Kundenfragen und Ideen)

Auswahlkriterien: Betrifft es kleine und mittlere Betriebe, Vereine oder Gemeinden? Lässt es sich in 15 Sekunden **positiv** lösen („so geht's“)? Wenn nicht, ist es kein Reel.

## 3. Drei Entwürfe bauen
Für jedes Thema:
1. Reel-JSON nach Schema (`reels/src/types.ts`), mit `quellen`
2. Captions-Datei mit LinkedIn-, Facebook- und Instagram-Version
3. Rendern mit `--stills`, alle Szenenbilder prüfen, Fehler beheben
4. Eintrag in `content/redaktionsplan.md` mit Status `entwurf`

## 4. Faktencheck
Prüfe jede rechtliche Aussage gegen ihre Quelle. Für jede Aussage notierst du in der Caption-Datei unter „Faktencheck“: Aussage → Quelle → geprüft am.

## 5. Abgeben
- Commit und Push nach `main`: `Wochenlauf KW xx: 3 Entwürfe`
- Schicke die drei MP4s mit je einer Zeile: Format, Thema, warum jetzt.
- Push-Benachrichtigung: „3 Reel-Entwürfe für KW xx liegen zur Freigabe bereit.“
- Bitte um Antwort im Stil: „1 freigeben, 2 Hook ändern auf …, 3 verwerfen“

## 6. Nach der Freigabe (wenn der Nutzer in dieser Sitzung antwortet)
- Änderungen umsetzen, neu rendern, prüfen
- Status `freigegeben` setzen und Veröffentlichungstermin vorschlagen. Beste Zeiten im B2B: LinkedIn Di–Do 7:30–8:30, Facebook Mi/Do 18–19 Uhr.
- Finale MP4 plus fertige Caption-Texte zum Kopieren schicken
- Commit und Push
