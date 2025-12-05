# Digitalisierung von Lehrplanungsdokumenten 

Kurz: Web-Anwendung zur digitalen Erfassung, Prüfung, Freigabe und PDF-Generierung der Formulare **Dozentenblatt** und **Zuarbeitsblatt** (Node.js + einfache Dateispeicherung / Download-Ordner, ausführlich beschrieben in Kapitel 5 der zugehörigen Bachelorarbeit). 

---

## Repository klonen

SSH:

```bash
git clone git@github.com:fadimkhalale/Digitalisierung-von-Lehrplanungsdokumenten-der-Hochschule.git
```

HTTPS:

```bash
git clone https://github.com/fadimkhalale/Digitalisierung-von-Lehrplanungsdokumenten-der-Hochschule.git
```

---

## Voraussetzungen

* Node.js (empfohlen: Node.js ≥ 14 bzw. 16)
* npm
* (Optional für Container) Podman installiert

---

## Lokal installieren und starten

1. In das Projektverzeichnis wechseln:

```bash
cd Digitalisierung-von-Lehrplanungsdokumenten-der-Hochschule
```

2. Abhängigkeiten installieren:

```bash
npm install
```

3. Server starten:

```bash
node server.js
```

Der Server lauscht standardmäßig auf Port 3000 ([http://localhost:3000](http://localhost:3000)).

---

## Als Podman-Container (Beispiel)

1. Image bauen (im Projektverzeichnis, `.` nicht vergessen):

```bash
podman build -t digitalisierung .
```

2. Container starten und lokalen Download-Ordner mounten (ersetze `/pfad/zum/DownloadOrdner` durch den tatsächlichen Pfad auf deinem System):

```bash
podman run -p 3000:3000 ("-v /pfad/zum/DownloadOrdner") digitalisierung
```

* `-p 3000:3000` leitet Port 3000 des Containers an Host-Port 3000 weiter.
* `-v /host/pfad:/app/downloads` verbindet den Host-Downloadordner mit dem Container-Pfad, sodass generierte PDFs auf dem Host landen.
* Bei SELinux ggf. `:Z` anhängen: `-v /host/pfad:/app/downloads:Z`.

# Projektbeschreibung 

**Kurzbeschreibung**
Dieses Projekt bietet eine Web-Anwendung zur vollständigen Digitalisierung des Prozesses rund um die Lehrplanungs-Formulare *Dozentenblatt* und *Zuarbeitsblatt*. Ziel ist, die bisher papierbasierten Abläufe zu ersetzen: Dateneingabe durch Lehrende, Prüf- und Freigabeworkflow durch Studienamt/Dekan, sowie die automatisierte Generierung druckfertiger PDF-Formulare. Die Implementierung umfasst mehrere Webseiten als Frontend und einen Node.js-Server als Backend. 

**Kernfunktionen im Überblick**

* **Login und Zugriffskontrolle:** Authentifizierte Benutzer (z. B. Dozenten, Studienamt, Dekanat, Admin) melden sich an, nur berechtigte Rollen sehen bzw. bearbeiten die jeweiligen Daten. 
* **Generator (Hauptseite) mit JSON-Eingabe:** Auf der Hauptseite wählt der Nutzer Semester, Jahr und Planungswochen, lädt oder editiert JSON-Daten (Beispiel-JSONs sind verfügbar) und wählt dann eine Formularvorlage zur Vorschau und automatischen Befüllung aus. Gespeicherte Datensätze können per Liste oder Formular-ID geladen werden. 
* **Prüf- und Freigabeworkflow:** Prüfungsamt und Dekanat können Einträge prüfen, mit Häkchen bestätigen und digital unterschreiben, die Übersicht dokumentiert, wer schon bestätigt hat. Wenn alle Stellen freigegeben haben, kann das finale PDF generiert und heruntergeladen werden. 
* **PDF-Manager:** Alle erzeugten PDFs sind über einen separaten Manager einsehbar filtern, anzeigen, umbenennen oder löschen. Die Umsetzung nutzt zunächst das lokale Dateisystem, das Backend bietet API-Endpunkte zur Auflistung und Anzeige der PDF-Dateien. 

**Technische Entscheidungen & Umsetzung**

* **Stack:** Node.js (Express) für das Backend, HTML/CSS/JavaScript für die Vorlagen und die GUI. JSON ist das zentrale Austauschformat zur Abbildung und automatischen Befüllung der Formulare. 
* **Vorlagen:** Statt einer rein automatischen Konvertierung von PDF → HTML (z. B. pdf2htmlEX) wurden die Vorlagen rekonstruiert und manuell als semantisches HTML/CSS umgesetzt. Das war nötig, weil automatisch konvertierte HTML-Dateien zu positionsbasiert und unstrukturiert waren und damit eine zuverlässige, programmgesteuerte Befüllung mit JSON verhinderten. 
* **PDF-Erzeugung:** Die Vorschauen werden in HTML dargestellt, für die PDF-Erzeugung wird eine geeignete JavaScript-Bibliothek eingesetzt, die HTML in druckbare PDFs konvertiert. Generierte PDFs werden standardmäßig im lokalen Downloads-Ordner des Browsers abgelegt. 