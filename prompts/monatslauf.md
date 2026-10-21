# Monatslauf Anzeigen (am 1. jedes Monats)

Ziel: **eine** pausierte, freigabefertige Kampagne pro Monat, aufgebaut auf dem Reel, das organisch am besten lief.

## 1. Gewinner bestimmen
- Lies `content/kennzahlen.md`. Dort trägt der Nutzer monatlich Reichweite, Interaktionen und Anfragen pro Reel ein.
- Fehlen Zahlen, frag nach und nimm vorläufig das zuletzt freigegebene `nein-vs-ja`- oder `mythos`-Reel.

## 2. Varianten bauen (`content/anzeigen/JJJJ-MM/`)
- 3 Hook-Varianten des Gewinner-Reels als eigene JSON-Dateien. Alles bleibt gleich, nur die Hook-Szene ändert sich. So testen wir, welcher Einstieg trägt.
- `anzeigen.md` mit:
  - **Meta (Facebook/Instagram):** Primärtext ≤ 125 Zeichen, Überschrift ≤ 40 Zeichen, CTA „Mehr dazu“
  - **LinkedIn:** Einleitungstext ≤ 150 Zeichen, Überschrift ≤ 70 Zeichen
  - **Ziel-URL** mit UTM: `https://www.its-datenschutz.de/?utm_source=<meta|linkedin>&utm_medium=paid&utm_campaign=<JJJJ-MM-kurztitel>#kontakt`
  - **Zielgruppe:** Oberfranken (Bayreuth, Bamberg, Hof, Kulmbach, Wunsiedel, Coburg, Forchheim, Kronach, Lichtenfels) plus Radius; LinkedIn nach Position (Geschäftsführung, Inhaber, Vorstand) und Unternehmensgröße 1–200
  - **Budgetvorschlag** im vom Nutzer festgelegten Rahmen, Laufzeit 14 Tage
- Kein Pixel, kein Retargeting, keine Lookalikes auf Basis von Websitebesuchern (siehe `CLAUDE.md` Regel 6).

## 3. Abgeben
- Varianten rendern und prüfen, Commit und Push
- Schicke 3 MP4s plus `anzeigen.md`
- Ist ein Anzeigen-Connector verbunden, legst du die Kampagne **pausiert** an. Aktivieren darf nur der Nutzer.

## 4. Monatsbericht (kurz, in der Antwort)
- Was lief, was nicht (aus `kennzahlen.md`)
- Eine Empfehlung für den nächsten Monat: Format, Thema oder Kanal
