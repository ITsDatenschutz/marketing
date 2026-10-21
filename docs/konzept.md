# Konzept: Social-Media-Maschine ITs Hein

Stand: 21.10.2026

## Ziel
Regelmäßig sichtbar sein mit dem Claim **„Datenschutz ist Partnerschaft.“** und der Botschaft: Wir helfen, statt zu verhindern. Daraus sollen Erstgespräche über its-datenschutz.de entstehen.

## Grundsatz
Alles bis „fertig zur Freigabe“ läuft automatisch. **Freigabe, Veröffentlichung und Anzeigen-Aktivierung bleiben beim Menschen.** Für einen Datenschutzberater wäre eine fehlerhafte Rechtsaussage in einer Anzeige teurer als jede eingesparte Minute.

## Rhythmus & Kanäle
- **1 Reel pro Woche**, 12–18 Sekunden, Hochformat 1080×1920
- **1 Anzeigenkampagne pro Monat**, aufgebaut auf dem besten Reel des Vormonats
- **Kanäle:** LinkedIn (Geschäftsführer, Inhaber) und Facebook (Vereine, Gemeinden, lokale Betriebe) als Hauptkanäle, Instagram läuft mit

## Fünf rotierende Formate
1. **Nein vs. Ja.** Das Leitformat: typische Verbote gegen „so geht's“.
2. **Mythos oder Fakt.** Verbreitete Irrtümer, sauber aufgelöst.
3. **Aktuell erklärt.** Neue Beschlüsse und Urteile in 15 Sekunden.
4. **IT-Sicherheit-Tipp.** Macht das zweite Standbein sichtbar.
5. **Kundenfrage der Woche.** Echte, anonymisierte Fragen aus den Mandaten.

## Automatik
| Wann | Was | Aufwand Mensch |
|---|---|---|
| Montag 06:30 | Wochenlauf: Recherche → 3 Entwürfe → Push-Nachricht | 5–15 Min. Freigabe |
| nach Freigabe | Finales Video + Captions | 2 Min. in Meta Business Suite / LinkedIn einplanen |
| 1. des Monats | Monatslauf: 3 Anzeigen-Varianten + Texte + Zielgruppe, Kampagne pausiert | 10 Min. prüfen und aktivieren |
| Monatsende | Kennzahlen in `content/kennzahlen.md` eintragen | 5 Min. |

**Gesamt: etwa 1,5 Stunden im Monat.**

## Technik
- **GitHub-Repository** `ITsDatenschutz/marketing`: dauerhafter Speicher für Template, Inhalte und Redaktionsplan
- **Remotion:** Reels entstehen aus JSON-Dateien. Der Agent schreibt nur Inhalte, Design und Animation sind fest im Template verankert.
- **Geplante Aufgaben in Claude:** Wochenlauf und Monatslauf, jeweils in einer frischen Cloud-Sitzung mit Zugriff auf das Repository
- **Später optional:** LinkedIn-Scheduler-Connector (Typefully/Taplio) und Anzeigen-Connector (Adspirer), sobald der Rhythmus 6–8 Wochen stabil läuft

## Werbung ohne Selbstwiderspruch
- Kein Meta-Pixel, kein LinkedIn Insight Tag, kein Retargeting. Die Website bleibt trackingfrei, das ist selbst ein Verkaufsargument.
- Messung über UTM-Parameter und eingehende Kontaktanfragen
- Zielgruppen nach Region (Oberfranken), Position und Unternehmensgröße
- Startbudget-Vorschlag: 300–500 €/Monat für einen Test, nach 3 Monaten bewerten

## Qualitätsregeln
Die Qualitätsregeln stehen in `CLAUDE.md`: Quellenpflicht für Rechtsaussagen, verbotene Versprechen („rechtssicher“, „100 % konform“), Siezen, Anonymisierung.

## Offene Entscheidungen
- [x] Claim: „Datenschutz ist Partnerschaft.“ (einheitlich mit der Website)
- [ ] Anzeigenbudget pro Monat
- [ ] Wer schaltet Anzeigen frei?
