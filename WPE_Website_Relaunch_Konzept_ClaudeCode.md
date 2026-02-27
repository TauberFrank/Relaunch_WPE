# WPE Website-Relaunch — Vollständiges Konzept & Claude Code Anweisungen
**Projekt:** `ClaudeCode_Websitenachbauen_Test2_Mit_Claude_KonzeptalsBasis`  
**Zielordner:** `W:\Websites\ClaudeCode_Websitenachbauen_Test2_Mit_Claude_KonzeptalsBasis\`  
**Szenario:** Sz.19 „Problemlöser — Purist" (88%) = Sz.16 Basis + M1 Journey + M4 Wizard  
**Erstellt:** 27.02.2026 · Basis: Workbench V5.6  

---

## TEIL 1 — STRATEGIE & MARKE

### 1.1 Positionierung (FAKT aus Workbench Sz.16/Sz.19)

WPE ist kein Online-Shop. WPE ist ein Systemintegrator für Maß-Waschplätze:  
**Kurbelwelle (Puntotre) → WPE baut den X5.** Puntotre nie als Hauptargument verwenden.

Einstieg: Problem-first. Kunden suchen „schmaler Waschtisch", „Waschtisch Nische", „Waschmaschine im Bad" — nicht „Puntotre" oder „Premium-Badmöbel".

**Kernaussage aller Seiten:** „Ihr Bad. Ihre Maße. Unsere Lösung."  
**Differenzierungsargument:** „6 Milliarden Konfigurationen — wir finden Ihre eine."

### 1.2 Tonalität (FAKT aus Workbench)

- Stimme: Empathisch-kompetent. Nicht beratend-dozierend.  
- Anrede: „Sie" (formal)  
- Satzlänge: max. 15 Wörter. Kein Schachtelsatz.  
- Kein Marketing-Bla: Keine „erstklassigen", „hochwertigen", „exklusiven" Phrasen.  
- Stärke zeigen durch Fakten: Zahlen, Maße, Lieferzeiten, Konfigurationsbreite.  
- Problem-Empathie zuerst, Lösungs-Kompetenz zweimal.  

**✓ So klingt es:** „Ihre Nische ist 38 cm tief. Wir liefern ab 15 cm Ausladung — auf Maß, in 6–7 Wochen."  
**✗ Nicht so:** „Als führender Premium-Anbieter bieten wir Ihnen exklusive Lösungen..."

### 1.3 Personas & Einstiege (FAKT aus Workbench)

| Persona | Primär-Einstieg | Content-Tiefe |
|---------|----------------|---------------|
| **Paul** (Sicherheitskäufer) | Raumlösungen / Problemseiten | Prozess, Garantien, Festpreis |
| **Felix** (Rechercheur) | Materialseiten, Techniktabellen | DIN, Toleranzen, Vergleiche |
| **Ester** (Design-Fokus) | Galerie, Serien | Bilder first, Fakten danach |

Sz.19 priorisiert Paul + Felix. Ester wird durch M1-Journey-Phasen mitgenommen.

---

## TEIL 2 — DESIGN SYSTEM (CSS Design Tokens)

### 2.1 Farben (FAKT — exakt aus Workbench Sz.16 JS-Datenstruktur)

```css
:root {
  /* Primärfarben */
  --color-primary:     #2D4A3E;  /* Waldgrün — Primärfarbe */
  --color-secondary:   #3A5A4C;  /* Waldgrün hell — Hover/States */
  --color-accent:      #E07A5F;  /* Korall — CTA, Akzente */

  /* Hintergründe */
  --color-bg:          #FAFAF5;  /* Seitenhintergrund */
  --color-card:        #FFFFFF;  /* Kartenhintergrund */
  --color-card-border: #E5E8E6;  /* Kartenrahmen, Trennlinien */

  /* Texte */
  --color-text:        #2D3436;  /* Fließtext */
  --color-text-light:  #636E72;  /* Sekundärtext, Meta */
  --color-heading:     #1A1A1A;  /* Headlines */

  /* Buttons */
  --btn-primary-bg:    #E07A5F;  /* Korall */
  --btn-primary-text:  #1A1A1A;  /* Near-Black — WCAG AA-konform auf Korall */
  --btn-primary-radius: 4px;

  /* WCAG-Notizen:
     Waldgrün #2D4A3E auf Weiß: 9.72:1 (AAA ✓)
     Near-Black #1A1A1A auf Korall #E07A5F: 5.90:1 (AA ✓)
     NIEMALS Waldgrün + Korall als Text-Kombi (3.29:1 — FAIL)
     Korall als Akzent ≥ 24pt oder mit dunklem Text auf Korall-BG
  */
}
```

### 2.2 Typografie (FAKT — aus Workbench Sz.16)

```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

:root {
  /* Headlines */
  --font-heading:       'Cabin', sans-serif;
  --font-heading-weight: 700;
  --font-heading-size:   30px;    /* H1 Desktop */
  --font-heading-tracking: -0.3px;

  /* Body */
  --font-body:          'DM Sans', sans-serif;
  --font-body-weight:   400;
  --font-body-size:     15px;
  --font-body-line:     1.7;

  /* Skala */
  --text-xs:   11px;   /* Labels, Tags */
  --text-sm:   13px;   /* Small text, Meta */
  --text-base: 15px;   /* Body */
  --text-lg:   17px;   /* Lead-Text */
  --text-xl:   22px;   /* H3 */
  --text-2xl:  26px;   /* H2 */
  --text-3xl:  30px;   /* H1 Desktop */
  --text-4xl:  38px;   /* Hero-Headline Desktop */
  --text-5xl:  48px;   /* Max Hero */
}

/* Basis-Reset */
body {
  font-family: var(--font-body);
  font-size: var(--font-body-size);
  line-height: var(--font-body-line);
  color: var(--color-text);
  background-color: var(--color-bg);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: var(--font-heading-weight);
  letter-spacing: var(--font-heading-tracking);
  color: var(--color-heading);
}
```

### 2.3 Spacing & Layout

```css
:root {
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;
  --space-3xl: 96px;

  --container-max:  1200px;
  --container-pad:  24px;   /* Mobile */
  --container-pad-lg: 40px; /* Desktop */

  --section-pad: 80px 0;    /* Desktop */
  --section-pad-mob: 48px 0; /* Mobile */
}
```

### 2.4 Logo & Logoname (FAKT aus Workbench)

Logoname-Darstellung im Code: **`WASCHPLATZ—EXPERTEN`** (em-dash, nicht Bindestrich)  
Bindeglied-Darstellung: `&mdash;` in HTML

---

## TEIL 3 — SEITENARCHITEKTUR & URL-MAPPING

### 3.1 URL-Inventar (VOLLSTÄNDIG — alle URLs SEO-behalten)

Alle URLs aus `sitemap_index.xml` (Stand: Feb 2026). Jede URL = eigene `index.html` im gleichnamigen Ordner.

**Seiten (page-sitemap.xml):**
```
/                                                           → index.html
/beratung-kauf/                                             → beratung-kauf/index.html
/beratung-kauf/online-badplanung/                           → beratung-kauf/online-badplanung/index.html
/beratung-kauf/checkliste-perfekter-waschplatz/             → beratung-kauf/checkliste-perfekter-waschplatz/index.html
/sortiment/waschtisch-materialien/waschtische-material-mineralguss/  → [entsprechender Pfad]/index.html
/sortiment/waschtisch-materialien/waschtische-material-gress/
/sortiment/waschtisch-materialien/waschtische-material-solidtek/
/sortiment/waschtisch-materialien/waschtische-material-ocritech/
/sortiment/waschtisch-materialien/waschtische-material-corian/
/sortiment/waschtisch-materialien/waschtische-material-hpl/
[+ weitere Seiten aus page-sitemap — Claude Code: Live abrufen!]
```

**Produkte (product-sitemap.xml — ~45 URLs, Auszug):**
```
/produkt/holz-trifft-matten-glaswaschtisch-ein-besonderer-waschplatz/
/produkt/young-t-04-individual-waschplatz-loesung/
/produkt/outlet-aktionsware-koje-21-doppel-waschtisch-120-cm/
/produkt/outlet-aktionsware-koje-23-waschtisch-mit-hochwertigem-rahmen/
/produkt/doppelwaschtisch-185-cm-badmoebel-sale/
/produkt/abverkauf-ausstellungsstueck-solidtek-waschtisch-[...]
/produkt/abverkauf-ausstellungsstueck-deluxe-loesung-accademia-[...]
/produkt/abverkauf-ausstellungsstueck-moderne-hochwertige-waschplatz-[...]
/produkt/abverkauf-ausstellungsstueck-gerundeter-glaswaschtisch-[...]
/produkt/abverkauf-ausstellungsstueck-raffinierte-raumnutzung-[...]
/produkt/abverkauf-ausstellungsstueck-exklusive-waschtisch-badmoebel-[...]
/produkt/abverkauf-ausstellungsstueck-gerundete-exklusiv-loesung-[...]
/produkt/abverkauf-ausstellungsstueck-doppelwaschtisch-216-cm-[...]
/produkt/young-nw2_05-individual-waschplatz-loesung/
/produkt/edge-lecornici-08-individual-waschplatz-loesung/
/produkt/edge-modula-h-123-individual-waschplatz-loesung/
/produkt/waschtisch-mit-eckregal-und-tiefenversatz-flacher-ausladung/
/produkt/gress-waschtisch-auch-auf-mass/
/produkt/young-21-01-individual-waschplatz-loesung/
/produkt/young-f-509-individual-waschplatz-loesung-kopie/
/produkt/hpl-waschtisch-auf-mass/
/produkt/modula-badmoebel-auf-mass/
/produkt/young-21-12-individual-waschplatz-loesung/
/produkt/ola-21-20-individual-waschplatz-loesung/
/produkt/young-21-14-individual-waschplatz-loesung/
/produkt/zweifarbiger-waschtisch/
/produkt/corian-waschtisch-mit-unterschrank/
/produkt/waschtisch-aus-tecnoril-echte-alternative-zu-corian-[...]
/produkt/waschtisch-mit-reduzierter-tiefe-fuer-kleine-und-schmale-baeder/
/produkt/wandhaengender-waschtisch-mit-unterschrank-flache-ausfuehrung-[...]
/produkt/waschtisch-mit-versetztem-unterschrank-auch-auf-mass/
/produkt/ola-nw2_13-individual-waschplatz-loesung/
/produkt/edge-01-individual-waschplatz-loesung/
/produkt/farbenfroher-qualitaets-waschtisch-mit-aufsatzbecken-[...]
/produkt/exklusiver-gress-waschtisch-mit-umrahmten-badmoebel/
/produkt/freihaengender-gress-waschtisch-mit-exklusiven-badmoebeln/
/produkt/edge-14-individual-waschplatz-loesung/
/produkt/young-21-03-b-individual-waschplatz-loesung/
/produkt/gress-waschtisch-mit-badmoebeln-seidengrau-lackiert/
/produkt/moderner-bodenstehender-waschtisch-[...]
/produkt/eingelassenes-auflagebecken-mit-kombi-aus-[...]
/produkt/doppel-auflagewaschtisch-in-holzoptik-[...]
/produkt/keramik-waschtisch-mit-seitlich-versetztem-becken/
/produkt/moderner-auflagewaschtisch-mit-structura-elementen-[...]
[+ weitere — Claude Code: vollständige Liste live von product-sitemap.xml abrufen]
```

**FAQs (avada_faq-sitemap.xml):** Claude Code: vollständige Liste live abrufen.  
**Produktkategorien (product_cat-sitemap.xml):** Claude Code: vollständige Liste live abrufen.

### 3.2 Navigationsstruktur (FAKT — Sz.16 aus Workbench)

```
Hauptnavigation:
├── Raumlösungen          ← Problem-Einstieg (Paul + Felix)
│   ├── Kleines Bad / Geringe Tiefe
│   ├── Nische
│   ├── Dachschräge
│   ├── Waschmaschine im Bad
│   ├── Hauswirtschaftsraum
│   ├── Barrierefrei
│   └── Gäste-WC
├── So lösen wir das      ← Methoden
│   ├── 3D-Planung (online-badplanung)
│   ├── Maßanfertigung
│   └── Checkliste (checkliste-perfekter-waschplatz)
├── Design entdecken      ← Sortiment (Ester-Einstieg)
│   ├── Materialien       (→ /sortiment/waschtisch-materialien/)
│   ├── Serien
│   └── Galerie / Beispiel-Kombis
└── Beratung              ← Conversion CTA
    └── /beratung-kauf/
```

**WICHTIG SEO:** Die neuen Navigationspunkte (Raumlösungen, So lösen wir das, Design entdecken) sind neue Landing-Seiten, die in der Live-Site noch nicht existieren. Diese werden NEU angelegt mit eigenen URLs:
- `/raumloesungen/` (Hub-Seite)
- `/raumloesungen/kleines-bad/`
- `/raumloesungen/nische/`
- `/raumloesungen/dachschraege/`
- `/raumloesungen/waschmaschine-im-bad/`
- `/raumloesungen/hauswirtschaftsraum/`
- `/raumloesungen/barrierefrei/`
- `/raumloesungen/gaeste-wc/`

---

## TEIL 4 — SEITENSPEZIFIKATIONEN

### 4.1 Homepage `/index.html`

**M1 Journey: Entdecken → Vertiefen → Handeln**

**Abschnitt 1: HERO (Entdecken)**
```
Headline (H1): "Ihr Bad. Ihre Maße. Unsere Lösung."
Sub-Headline: "Wo passt kein Standardwaschtisch? Wir bauen Ihren."
Hero-Image: Hochwertige Raumfoto mit Waschtisch (aus wp-content/uploads)
CTA primär: [Beratungsgespräch starten] → /beratung-kauf/
CTA sekundär: [Ihr Raumproblem lösen →] → /raumloesungen/
```

**Abschnitt 2: PROBLEM-GRID (Entdecken)**
```
Titel: "Welche Herausforderung bringt Ihr Bad?"
6–7 Kacheln (je mit Icon + Beschreibung):
  □ Kleines Bad / Geringe Tiefe   → /raumloesungen/kleines-bad/
  □ Nische                        → /raumloesungen/nische/
  □ Dachschräge                   → /raumloesungen/dachschraege/
  □ Waschmaschine im Bad          → /raumloesungen/waschmaschine-im-bad/
  □ Hauswirtschaftsraum           → /raumloesungen/hauswirtschaftsraum/
  □ Barrierefrei                  → /raumloesungen/barrierefrei/
  □ Gäste-WC                      → /raumloesungen/gaeste-wc/
```

**Abschnitt 3: ZAHLEN-FAKTEN (Vertiefen)**
```
3 Spalten:
  "9 Serien" / "400+ Farben" / "6–7 Wochen"
  "17–270 cm" / "15–67 cm Tiefe" / "100% Remote"
```

**Abschnitt 4: WIE WIR ARBEITEN (Vertiefen)**
```
H2: "Von 6 Milliarden Konfigurationen zu Ihrer einen."
3 Schritte:
  1. Raum vermessen + beschreiben (Teams-Video oder E-Mail)
  2. 3D-Planung mit 3CAD Evo — kostenlos
  3. Produktion + Lieferung in 6–7 Wochen, Festpreis
CTA: [Zur Online-Badplanung] → /beratung-kauf/online-badplanung/
```

**Abschnitt 5: BEISPIEL-KOMBIS TEASER (Vertiefen)**
```
H2: "Realisierte Waschplätze"
4–6 Produkt-Kacheln (neueste Produkte)
CTA: [Alle Beispiele ansehen] → /sortiment/ oder /produkt/
```

**Abschnitt 6: M4 WIZARD EINBETTUNG (Handeln)**
```
H2: "Welcher Waschplatz passt zu Ihrem Bad?"
Wizard-Teaser (5 Fragen, sofort sichtbar)
→ Implementierung: wizard.js (siehe Teil 6)
```

**Abschnitt 7: FOOTER-CTA**
```
Großer Banner: "Noch kein passendes Produkt gefunden?"
CTA: [Jetzt kostenloses Beratungsgespräch vereinbaren] → /beratung-kauf/
```

### 4.2 Raumlösungs-Hub `/raumloesungen/index.html`

```
H1: "Ihr Raumproblem. Unsere Lösung."
Intro: 2 Sätze. Problem-Empathie.
Grid: 7 Problem-Kacheln (wie Homepage, aber größer + mehr Text)
Jede Kachel: Raumbild + Problemname + 1-Satz-Beschreibung + CTA
```

### 4.3 Raumlösungs-Landingpages (je eine pro Problem)

**Template: `/raumloesungen/[problem]/index.html`**

```
H1: "[Problem-spezifisch]"
  z.B.: "Waschtisch für die Nische — ab 15 cm Ausladung"

Sektion A — Problem bestätigen:
  "Ihre Nische ist [X] cm tief und [Y] cm breit?"
  Konkrete Maß-Ranges, die WPE liefern kann.

Sektion B — Lösung zeigen:
  Technische Fakten (Mindestmaße, Serien, Materialien)
  2–3 Produkt-Beispiele (Bildkacheln → /produkt/[slug]/)

Sektion C — Beweis:
  "Wir haben bereits [X] Nischen-Lösungen realisiert."
  Falls verfügbar: Kundenbeispiel/Foto

Sektion D — Handeln (M4 Wizard):
  "Wie groß ist Ihre Nische?" → startet Wizard-Flow
  Fallback CTA: [Maße mitteilen + Beratung vereinbaren] → /beratung-kauf/
```

### 4.4 Materialseiten `/sortiment/waschtisch-materialien/[material]/index.html`

```
Template-Struktur:
  H1: "[Materialname] Waschtisch — auf Maß"
  Intro: Was ist dieses Material? 3 Sätze, Fakten.
  
  Material-Properties (Tabelle oder Grid):
  - Beckenformen (aus vorhandenem Content)
  - Farben/Dekore
  - Breiten-Range
  - Besonderheiten
  
  Bildgalerie: vorhandene WP-Bilder referenzieren
  
  Passende Serien-Links
  
  CTA: [Dieses Material anfragen] → /beratung-kauf/
```

**8 Materialseiten:** Mineralguss, Gress, SolidTek, OcriTech, Corian, HPL, Keramik, Glas  
Inhalt: 1:1 aus Live-Site übernehmen, Design neu.

### 4.5 Beratungsseite `/beratung-kauf/index.html`

```
H1: "Kostenlose Online-Badplanung — 100% Remote"
Kein Showroom-Hinweis (Showroom seit Mitte 2025 weg — nie erwähnen)

Conversion-Block:
  "3 Wege zur Beratung:"
  1. Microsoft Teams Videogespräch (preferred)
  2. E-Mail mit Maßzeichnung
  3. Kontaktformular / Telefon

Vertrauens-Signale:
  - Festpreisgarantie
  - 6–7 Wochen Lieferzeit
  - 75% zahlen Vorkasse (NICHT erwähnen — intern)
  - Lieber: "Abgesicherte Zahlung"

M4 Wizard CTA: "Nicht sicher, was Sie brauchen?"
  → Wizard starten

Seiten-Links:
  → /beratung-kauf/online-badplanung/
  → /beratung-kauf/checkliste-perfekter-waschplatz/
```

### 4.6 Produktseiten `/produkt/[slug]/index.html`

```
Template:
  H1: [Produktname aus WP übernehmen]
  
  Hero-Bild (aus WP-Content-URL direkt referenzieren)
  
  Produktdetails:
  - Material
  - Breite / Tiefe (falls verfügbar)
  - Besonderheiten
  
  "Diesen Waschtisch anfragen"
  CTA → /beratung-kauf/ (Parameter: ?produkt=[slug])
  
  Ähnliche Produkte (3 Kacheln, gleiche Materialkategorie)
  
  Breadcrumb: Start > Design entdecken > [Materialname] > [Produktname]
```

---

## TEIL 5 — DATEISTRUKTUR (Zielordner)

```
W:\Websites\ClaudeCode_Websitenachbauen_Test2_Mit_Claude_KonzeptalsBasis\
│
├── 00_KONZEPT\                          ← Dieses Dokument + Referenzen
│   ├── KONZEPT.md                       (= diese Datei)
│   ├── url-mapping.csv                  (Alt-URL → Neu-URL, alle 200+)
│   └── design-tokens-reference.html     (Visueller Design-Token-Check)
│
├── src\                                 ← Arbeitsbereich
│   │
│   ├── _includes\                       ← Wiederverwendbare HTML-Partials
│   │   ├── head.html                    (<head>-Block, Meta, Fonts, CSS)
│   │   ├── header.html                  (Navigation + Logo)
│   │   ├── footer.html                  (Footer + Kontakt)
│   │   └── wizard.html                  (M4 Wizard Einbettung)
│   │
│   ├── assets\
│   │   ├── css\
│   │   │   ├── tokens.css               (Design Tokens — SINGLE SOURCE OF TRUTH)
│   │   │   ├── base.css                 (Reset, Body, Typo)
│   │   │   ├── components.css           (Buttons, Cards, Grid, Hero)
│   │   │   ├── nav.css                  (Navigation, Mobile-Menu)
│   │   │   └── wizard.css               (M4 Wizard Styles)
│   │   │
│   │   ├── js\
│   │   │   ├── nav.js                   (Mobile-Menu-Toggle)
│   │   │   ├── wizard.js                (M4 Beratungsassistent)
│   │   │   └── lazy-images.js           (IntersectionObserver für Bilder)
│   │   │
│   │   └── images\                      ← Lokale Optimized-Copies (optional)
│   │       └── [hero-images etc.]
│   │
│   └── pages\                           ← Alle HTML-Seiten
│       ├── index.html                   (Homepage = /)
│       │
│       ├── beratung-kauf\
│       │   ├── index.html
│       │   ├── online-badplanung\
│       │   │   └── index.html
│       │   └── checkliste-perfekter-waschplatz\
│       │       └── index.html
│       │
│       ├── raumloesungen\               ← NEU (nicht in Live-Site)
│       │   ├── index.html               (Hub-Seite)
│       │   ├── kleines-bad\index.html
│       │   ├── nische\index.html
│       │   ├── dachschraege\index.html
│       │   ├── waschmaschine-im-bad\index.html
│       │   ├── hauswirtschaftsraum\index.html
│       │   ├── barrierefrei\index.html
│       │   └── gaeste-wc\index.html
│       │
│       ├── sortiment\
│       │   └── waschtisch-materialien\
│       │       ├── waschtische-material-mineralguss\index.html
│       │       ├── waschtische-material-gress\index.html
│       │       ├── waschtische-material-solidtek\index.html
│       │       ├── waschtische-material-ocritech\index.html
│       │       ├── waschtische-material-corian\index.html
│       │       └── waschtische-material-hpl\index.html
│       │
│       └── produkt\
│           ├── holz-trifft-matten-glaswaschtisch-[...]\index.html
│           ├── young-t-04-individual-waschplatz-loesung\index.html
│           └── [weitere ~43 Produkte — je eigener Ordner]
│
└── dist\                                ← Build-Output (deploy-ready)
    └── [identische Struktur wie src/pages, aber optimiert]
```

---

## TEIL 6 — M4 WIZARD SPEZIFIKATION

### 6.1 Funktionsbeschreibung (FAKT aus Workbench Modul M4)

Der Wizard ersetzt das statische Kontaktformular durch einen geführten 5-Fragen-Dialog.  
Technologie: JavaScript (vanilla oder Alpine.js), standalone embedded.  
Einstiegsfrage adaptiert sich je nach aktueller Seite.

### 6.2 Fragen-Flow

```
Frage 1: "Welche Herausforderung bringt Ihr Bad?"
  □ Kleines Bad / geringe Tiefe   □ Nische    □ Dachschräge
  □ Waschmaschine muss rein       □ Gäste-WC  □ Barrierefreiheit
  □ Hauswirtschaftsraum           □ Kein spezielles Problem (Design-Suche)

Frage 2: "Wie groß ist Ihr verfügbarer Platz?"
  Breite: [Eingabefeld] cm   Tiefe: [Eingabefeld] cm
  Hinweis: "Keine Sorge — auch für schwierige Maße finden wir eine Lösung."

Frage 3: "Welchen Stil bevorzugen Sie?"
  □ Minimalistisch / Schlicht   □ Holzoptik / Warm   □ Farbe / Persönlich
  □ Industrie / Beton           □ Weiß / Hell         □ Bin offen

Frage 4: "Welches Material interessiert Sie?"
  □ Fugenloser Mineralguss   □ Keramik auf Maß   □ Gress (Feinsteinzeug)
  □ HPL (Holzoptik)          □ Corian            □ Noch keine Ahnung

Frage 5: "Wann planen Sie Ihren Umbau?"
  □ In den nächsten 3 Monaten   □ In 3–6 Monaten   □ Noch offen / Erstinfo

→ ERGEBNIS-SEITE:
  "Perfekt — hier ist Ihre persönliche Auswahl:"
  3 passende Produkt-Beispiele (anhand Fragen 3+4 gefiltert)
  
  CTA: [Kostenloses Beratungsgespräch vereinbaren]
  Mit Summary der Antworten als GET-Parameter für Frank:
  ?breite=[X]&tiefe=[Y]&stil=[Z]&material=[W]&timing=[T]
```

### 6.3 Implementierung (wizard.js Grundgerüst)

```javascript
// wizard.js — M4 Beratungsassistent
// Einbindung: <script src="/assets/js/wizard.js"></script>
// HTML: <div id="wpe-wizard" data-context="homepage"></div>

const WPEWizard = {
  currentStep: 0,
  answers: {},
  
  init(containerId, context = 'homepage') {
    this.container = document.getElementById(containerId);
    this.context = context;
    this.render();
  },

  questions: [
    {
      id: 'problem',
      question: 'Welche Herausforderung bringt Ihr Bad?',
      type: 'single-choice',
      options: [
        { label: 'Kleines Bad / geringe Tiefe', value: 'kleines-bad', link: '/raumloesungen/kleines-bad/' },
        { label: 'Nische', value: 'nische', link: '/raumloesungen/nische/' },
        { label: 'Dachschräge', value: 'dachschraege', link: '/raumloesungen/dachschraege/' },
        { label: 'Waschmaschine muss rein', value: 'waschmaschine', link: '/raumloesungen/waschmaschine-im-bad/' },
        { label: 'Gäste-WC', value: 'gaeste-wc', link: '/raumloesungen/gaeste-wc/' },
        { label: 'Barrierefreiheit', value: 'barrierefrei', link: '/raumloesungen/barrierefrei/' },
        { label: 'Hauswirtschaftsraum', value: 'hwz', link: '/raumloesungen/hauswirtschaftsraum/' },
        { label: 'Design-Suche (kein Problem)', value: 'design', link: null }
      ]
    },
    {
      id: 'masse',
      question: 'Wie groß ist Ihr verfügbarer Platz?',
      type: 'input-dual',
      fields: [
        { label: 'Breite', unit: 'cm', min: 17, max: 270, placeholder: 'z.B. 80' },
        { label: 'Tiefe', unit: 'cm', min: 15, max: 67, placeholder: 'z.B. 45' }
      ],
      hint: 'Auch für schwierige Maße finden wir eine Lösung.'
    },
    {
      id: 'stil',
      question: 'Welchen Stil bevorzugen Sie?',
      type: 'single-choice',
      options: [
        { label: 'Minimalistisch / Schlicht', value: 'minimal' },
        { label: 'Holzoptik / Warm', value: 'holz' },
        { label: 'Farbe / Persönlich', value: 'farbe' },
        { label: 'Industrie / Beton', value: 'beton' },
        { label: 'Weiß / Hell', value: 'weiss' },
        { label: 'Bin offen', value: 'offen' }
      ]
    },
    {
      id: 'material',
      question: 'Welches Material interessiert Sie?',
      type: 'single-choice',
      options: [
        { label: 'Fugenloser Mineralguss', value: 'mineralguss' },
        { label: 'Keramik auf Maß', value: 'keramik' },
        { label: 'Gress (Feinsteinzeug)', value: 'gress' },
        { label: 'HPL (Holzoptik)', value: 'hpl' },
        { label: 'Corian', value: 'corian' },
        { label: 'Noch keine Ahnung', value: 'offen' }
      ]
    },
    {
      id: 'timing',
      question: 'Wann planen Sie Ihren Umbau?',
      type: 'single-choice',
      options: [
        { label: 'In den nächsten 3 Monaten', value: 'kurzfristig' },
        { label: 'In 3–6 Monaten', value: 'mittelfristig' },
        { label: 'Noch offen / Erstinfo', value: 'offen' }
      ]
    }
  ],

  // Weiterleitung nach Schritt 1 (Problem) direkt zur Landingpage
  onAnswer(questionId, value, link) {
    this.answers[questionId] = value;
    if (questionId === 'problem' && link) {
      // Optional: Direkt weiterleiten oder im Wizard bleiben
      // Empfehlung: Im Wizard bleiben, Link am Ende zeigen
    }
    this.currentStep++;
    this.render();
  },

  getResultURL() {
    const a = this.answers;
    return `/beratung-kauf/?breite=${a.breite||''}&tiefe=${a.tiefe||''}&stil=${a.stil||''}&material=${a.material||''}&timing=${a.timing||''}`;
  }
};
```

---

## TEIL 7 — CLAUDE CODE ANWEISUNGEN

### ⚠️ WICHTIG VOR START

1. Dieses Konzeptdokument vollständig lesen.
2. Live-Site `https://www.waschplatz-experten.com` im Browser öffnen.
3. Alle Sitemaps abrufen und vollständige URL-Liste erstellen.
4. Für jede Seite: **Originalen Textinhalt 1:1 übernehmen** — nur Design + Struktur neu.
5. Bilder: **direkt von Live-WP-URLs referenzieren** (keine lokale Kopie nötig). WP bleibt vorerst live.

### PHASE 1: PROJEKT-SETUP (Schritt 1–3)

**Schritt 1: Ordnerstruktur anlegen**
```
Lege folgende Ordnerstruktur in 
W:\Websites\ClaudeCode_Websitenachbauen_Test2_Mit_Claude_KonzeptalsBasis\ an:

- 00_KONZEPT\
- src\
- src\_includes\
- src\assets\css\
- src\assets\js\
- src\assets\images\
- src\pages\
- src\pages\beratung-kauf\
- src\pages\beratung-kauf\online-badplanung\
- src\pages\beratung-kauf\checkliste-perfekter-waschplatz\
- src\pages\raumloesungen\
- src\pages\raumloesungen\kleines-bad\
- src\pages\raumloesungen\nische\
- src\pages\raumloesungen\dachschraege\
- src\pages\raumloesungen\waschmaschine-im-bad\
- src\pages\raumloesungen\hauswirtschaftsraum\
- src\pages\raumloesungen\barrierefrei\
- src\pages\raumloesungen\gaeste-wc\
- src\pages\sortiment\waschtisch-materialien\waschtische-material-mineralguss\
- src\pages\sortiment\waschtisch-materialien\waschtische-material-gress\
- src\pages\sortiment\waschtisch-materialien\waschtische-material-solidtek\
- src\pages\sortiment\waschtisch-materialien\waschtische-material-ocritech\
- src\pages\sortiment\waschtisch-materialien\waschtische-material-corian\
- src\pages\sortiment\waschtisch-materialien\waschtische-material-hpl\
- src\pages\produkt\  [+ je ein Unterordner pro Produkt-Slug]
- dist\
```

**Schritt 2: Design Tokens erstellen**
```
Erstelle src\assets\css\tokens.css mit exakt den CSS-Variablen aus Teil 2 dieses Dokuments.
Keine Abweichung. Keine kreativen Ergänzungen ohne Rückfrage.
```

**Schritt 3: Base CSS + Components**
```
Erstelle src\assets\css\base.css:
  - CSS Reset (box-sizing, margin, padding)
  - Body-Styles (font, color, background aus tokens.css)
  - Typografie-Hierarchie (h1–h4, p, a)
  - Container-Klasse (.container: max-width 1200px, auto-margin, padding)
  
Erstelle src\assets\css\components.css:
  - .btn-primary (Korall-Button, #1A1A1A Text, 4px Radius, hover: Secondary)
  - .btn-secondary (outlined, Waldgrün)
  - .card (weißer BG, border #E5E8E6, 8px Radius, box-shadow leicht)
  - .section-pad (80px 0 Desktop, 48px 0 Mobile)
  - .hero (full-width, Overlay)
  - .problem-grid (CSS Grid, 3–4 Spalten Desktop, 2 Mobile, 1 xs)
  - .problem-tile (Card mit Icon + Titel + CTA)
  - .stats-row (3 Spalten Flexbox, Zahl groß + Label klein)
  - .breadcrumb (klein, dezent, Waldgrün-Links)
  - .material-table (responsive Tabelle)
```

### PHASE 2: INCLUDES + NAVIGATION (Schritt 4–6)

**Schritt 4: `src\_includes\head.html`**
```html
<!-- Einfügen: Google Fonts (Cabin 700 + DM Sans 400/500/600) -->
<!-- Einfügen: CSS Links (tokens, base, components, page-spezifisch) -->
<!-- Meta-Template: title, description, canonical, og:* -->
<!-- Hinweis: title und description sind per Seite unterschiedlich — Platzhalter verwenden -->
```

**Schritt 5: `src\_includes\header.html`**
```
Logo: WASCHPLATZ—EXPERTEN (em-dash, Waldgrün, Cabin 700)
Navigation: Raumlösungen | So lösen wir das | Design entdecken | Beratung
Mobile: Hamburger-Menu (nav.js)
CTA in Header: [Jetzt beraten lassen] → /beratung-kauf/

Hover-States: Unterline aus Waldgrün, smooth
Aktive Seite: Waldgrün-Underline permanent
```

**Schritt 6: `src\_includes\footer.html`**
```
3-Spalten-Footer:
  Spalte 1: Logo + Kurzbeschreibung (2 Sätze)
  Spalte 2: Navigation (Kurzlinks)
  Spalte 3: Kontakt + Rechtliches
  
Unterer Footer-Strip: Copyright + Impressum + Datenschutz
```

### PHASE 3: HOMEPAGE (Schritt 7)

**Schritt 7: `src\pages\index.html`**

```
Abrufen der aktuellen Homepage: https://www.waschplatz-experten.com/
Text-Inhalte 1:1 übernehmen, aber nach Sz.16-Tonalität redigieren:
  - Headlines: Problem-first, kurz
  - Body: Max 15 Wörter pro Satz
  - Alle Bilder: WP-URL direkt referenzieren

Implementiere alle 7 Abschnitte aus Teil 4.1 dieses Dokuments.
Homepage ist die wichtigste Seite — Design-Qualität maximieren.
Hero: Vollbreit, Overlay dunkel (rgba(45,74,62,0.82) = Waldgrün-Overlay)
```

### PHASE 4: MATERIALSEITEN (Schritt 8–13)

**Schritt 8–13: Je eine Materialseite**

```
Für jede Materialseite:
1. Live-Inhalt abrufen: https://www.waschplatz-experten.com/sortiment/waschtisch-materialien/[material]/
2. Alle Texte + Tabellen + Bilder-URLs extrahieren
3. Template aus Teil 4.4 anwenden
4. Bilder: wp-content/uploads URLs direkt referenzieren
5. Breadcrumb: Start > Materialien > [Materialname]
6. Cross-Links zu anderen Materialseiten

Reihenfolge (Priorität nach Suchvolumen — SCHÄTZUNG):
  8. Mineralguss (fugenlos = Alleinstellungsmerkmal)
  9. Gress
  10. HPL
  11. SolidTek
  12. OcriTech
  13. Corian
```

### PHASE 5: BERATUNGSSEITEN (Schritt 14–16)

```
Schritt 14: /beratung-kauf/index.html (aus Teil 4.5)
Schritt 15: /beratung-kauf/online-badplanung/index.html
Schritt 16: /beratung-kauf/checkliste-perfekter-waschplatz/index.html
```

### PHASE 6: M4 WIZARD (Schritt 17)

```
Schritt 17: Implementiere wizard.js nach Spezifikation in Teil 6.
  - Vanilla JavaScript, keine Abhängigkeiten
  - Mobile-first responsive
  - Progress-Indikator (Schritt X von 5)
  - Zurück-Button ab Schritt 2
  - Keyboard-Navigation (Tab, Enter, Escape)
  - Ergebnis-URL mit GET-Parametern für Frank
  - Einbettung auf Homepage + /beratung-kauf/ + alle Raumlösungs-Seiten
```

### PHASE 7: RAUMLÖSUNGS-SEITEN (Schritt 18–25)

```
Schritt 18: /raumloesungen/index.html (Hub)
Schritt 19–25: Je eine Landing-Page pro Problem (7 Stück)

Für jede Seite:
  - Template aus Teil 4.3
  - Content: Fakten aus Produktdatenbank + WPE-Specs (Mindestmaße etc.)
  - 2–3 passende Produkt-Links (Produktseiten)
  - Wizard eingebettet (context=[problem-name])
  - SEO: Meta-Title mit Problem-Keyword + Maßangabe
  
Fakten für Content (FAKT — WPE-Specs):
  Mindesttiefe: 15 cm
  Mindestbreite: 17 cm
  Maximale Breite: 270 cm
  Tiefe-Range: 15–67 cm
  Lieferzeit: 6–7 Wochen
  Beratung: 100% Remote via Microsoft Teams
```

### PHASE 8: PRODUKTSEITEN (Schritt 26–70)

```
Für jede der ~45 Produktseiten:
1. Live-Inhalt von https://www.waschplatz-experten.com/produkt/[slug]/ abrufen
2. Template aus Teil 4.6 anwenden
3. Bilder-URLs aus WP übernehmen
4. Beratungs-CTA mit Produkt-Parameter

WICHTIG: Produktseiten zuletzt — wenn Homepage + Materialseiten laufen, 
ist das SEO-Fundament gelegt. Produkte sind Tier-3-Priorität.
```

### PHASE 9: SEO-DATEIEN (Schritt 71)

```
Erstelle im Wurzelordner (dist/):
  
sitemap.xml:
  - Alle URLs aus URL-Inventar (Teil 3.1)
  - + Neue Raumlösungs-URLs
  - Lastmod: aktuelles Datum
  - Changefreq: homepage=daily, materialien=monthly, produkte=monthly
  
robots.txt:
  User-agent: *
  Allow: /
  Sitemap: https://www.waschplatz-experten.com/sitemap.xml
  
404.html:
  Design-konform
  CTA: → Homepage + Beratung
  
_redirects (für Netlify/Vercel falls genutzt):
  [Falls URLs von WP abweichen — explizit mappen]
```

---

## TEIL 8 — TECHNISCHE ENTSCHEIDUNGEN

### 8.1 Stack (FAKT — kein CMS, kein Framework)

- **HTML:** Statisches HTML. Keine Template-Engine erforderlich für Phase 1.
- **CSS:** Vanilla CSS mit Custom Properties (tokens.css). Kein SASS nötig.
- **JS:** Vanilla JavaScript. Keine Frameworks. Wizard als standalone Modul.
- **Bilder:** Live-WP-CDN referenzieren (kein Download nötig, spart Zeit).
- **Hosting:** Entscheidung offen (Netlify / Vercel / direktes Hosting).
- **Fonts:** Google Fonts CDN (Cabin + DM Sans).

### 8.2 Bild-Strategie

```html
<!-- Bilder direkt von WP referenzieren — kein Download nötig -->
<img 
  src="https://www.waschplatz-experten.com/wp-content/uploads/2022/04/Young21-14_[...].jpg"
  alt="[Beschreibender Alt-Text mit Keyword]"
  loading="lazy"
  width="800"
  height="534"
>
```

**Wichtig:** Alt-Texte immer beschreibend + keyword-relevant.  
**Nie:** `alt="image"` oder `alt=""` für Inhalt-Bilder.

### 8.3 Performance-Grundregeln

- Alle `<img>` außer Hero: `loading="lazy"`
- Google Fonts: `<link rel="preconnect">` vorab
- CSS in `<head>`, JS am Ende `</body>` oder `defer`
- Keine externen Skripte außer Google Fonts und ggf. Analytics

### 8.4 SEO-Grundregeln

```html
<!-- Jede Seite braucht: -->
<title>[Keyword] — Waschplatz-Experten</title>
<meta name="description" content="[Max 155 Zeichen, mit Keyword]">
<link rel="canonical" href="https://www.waschplatz-experten.com/[pfad]/">

<!-- Strukturierte Daten (falls Zeit): -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Waschplatz-Experten",
  "url": "https://www.waschplatz-experten.com"
}
</script>
```

---

## TEIL 9 — QUALITÄTSSICHERUNG (Checkliste)

### Pro Seite prüfen:

- [ ] URL identisch zur Live-Site
- [ ] `<title>` und `<meta description>` vorhanden und einzigartig
- [ ] `<link rel="canonical">` korrekt
- [ ] Alle internen Links funktionieren
- [ ] Alle Bilder laden (WP-URLs erreichbar)
- [ ] Alt-Texte an allen `<img>` vorhanden
- [ ] Mobile-Darstellung: Navigation + Lesbarkeit
- [ ] Buttons: Text auf Korall = #1A1A1A (WCAG AA)
- [ ] Keine Showroom-Erwähnung
- [ ] Kein „Puntotre" als Hauptargument prominent
- [ ] Tonalität: empathisch-kompetent, kein Marketing-Bla

### Technisch:

- [ ] CSS tokens.css wird auf allen Seiten geladen
- [ ] Wizard funktioniert auf Homepage + Beratung + Raumlösungen
- [ ] sitemap.xml enthält ALLE URLs
- [ ] robots.txt vorhanden
- [ ] 404.html vorhanden

---

## TEIL 10 — NICHT IN SCOPE

Folgende Elemente werden in diesem Projekt-Stand NICHT umgesetzt:

- M2 Stilwelten-Filter (Phase 2 — nach Traffic-Nachweis)
- M3 Persona-Views (Phase 2)
- M5 Konfigurator / STAGGS (Phase 3 — nach Conversion-Baseline)
- E-Commerce-Funktionen (Warenkorb, Checkout) — WPE verkauft über Beratung
- CMS-Integration (Storyblok etc.) — Phase 2-Entscheidung
- Avada/WordPress-Migration — dieses Projekt baut parallele statische Version

---

## REFERENZEN

- **Live-Site:** https://www.waschplatz-experten.com
- **Sitemap Index:** https://www.waschplatz-experten.com/sitemap_index.xml
- **Seiten-Sitemap:** https://www.waschplatz-experten.com/page-sitemap.xml
- **Produkt-Sitemap:** https://www.waschplatz-experten.com/product-sitemap.xml
- **FAQ-Sitemap:** https://www.waschplatz-experten.com/avada_faq-sitemap.xml
- **Kategorie-Sitemap:** https://www.waschplatz-experten.com/product_cat-sitemap.xml
- **Workbench:** 1_WPE_MARKENDEFINITION_-_Workbench_V56_2026-02-23.html (Szenario Sz.19/Sz.16)
- **Personas:** 1_WPE_BASIS_-_Personas_FINAL.docx

---

*Dieses Konzept basiert auf Workbench V5.6 (23.02.2026). Bei Widersprüchen gilt die Workbench.*  
*Erstellt: 27.02.2026 | Szenario: Sz.19 „Problemlöser — Purist" (88%)*
