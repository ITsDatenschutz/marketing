# Wochenlauf (jeden Montag früh)

Ziel: Bis Montagmorgen liegen **freigabefertige Reel-Entwürfe** für die kommenden Freitage beim Nutzer, die ihn höchstens 15 Minuten kosten.

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

## 3. Entwürfe bauen
**Menge:** Zähle im Redaktionsplan die Entwürfe und freigegebenen Reels für kommende Freitage. Sind es **3 oder mehr**, baust du nur **1** neuen Entwurf, sonst so viele, dass wieder 3 Freitage abgedeckt sind (höchstens 3). Jeder neue Entwurf bekommt den nächsten freien Freitag als Datum.

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
- Push-Benachrichtigung: „Reel-Entwürfe für KW xx liegen zur Freigabe bereit.“
- Bitte um Antwort im Stil: „1 freigeben, 2 Hook ändern auf …, 3 verwerfen“

## 6. Nach der Freigabe (wenn der Nutzer in dieser Sitzung antwortet)
Nur bei **ausdrücklicher Freigabe** eines bestimmten Reels („1 freigeben“). Unklare Antworten wie „sieht gut aus“ oder „ok“ führen zu einer Rückfrage, nicht zur Planung.

1. Gewünschte Änderungen umsetzen, neu rendern und alle Szenenbilder prüfen. Wenn der Inhalt geändert wurde, schickst du das Video erneut und wartest auf die erneute Freigabe.
2. **Video öffentlich ablegen:** Klone `ITsDatenschutz/reels-medien` (add_repo, access "push") und kopiere die finale MP4 nach `JJJJ/<dateiname>.mp4`. Danach Commit und Push. **Verwende die URL mit Commit-Kennung**, nicht `main`, weil der Download-Server neue Dateien unter `main` minutenlang als 404 zwischenspeichert: `https://raw.githubusercontent.com/ITsDatenschutz/reels-medien/<commit-sha>/JJJJ/<dateiname>.mp4` (sha via `git rev-parse HEAD`). Prüfe mit `curl -sI`, dass sie HTTP 200 liefert. **Dort landen niemals Entwürfe.**
3. **Termin bestimmen:** Es ist der Freitag aus dem Dateinamen. Die Uhrzeit liefert `getBestTimeToPostByNetwork` (Metricool, brandId `7559109`, Zeitzone Europe/Berlin) für diesen Freitag, gewählt wird die beste Stunde zwischen 9 und 13 Uhr. Ohne Daten gilt: Facebook und Instagram 11:00, LinkedIn 8:00.
4. **In Metricool einplanen** mit `createScheduledPost`: ein Post pro Netzwerk, Text aus der Captions-Datei, `media` = öffentliche URL, `autoPublish: true`, `draft: false`. Facebook: `facebookData.type = "REEL"`. Instagram: `instagramData.type = "REEL"`. Plane nur Netzwerke ein, die in `getBrandSettings` verbunden sind.
5. Status im Redaktionsplan auf `geplant` setzen, mit Terminen und `plannerUrl` in den Notizen. Danach Commit und Push in `marketing`.
6. Bestätigung an den Nutzer: je Netzwerk Datum, Uhrzeit und Planner-Link, dazu der Hinweis: „Bis zum Termin in Metricool stoppbar.“
