document
  .getElementById("example-dozentenblatt-btn")
  .addEventListener("click", () => {
    document.getElementById("json-input").value = JSON.stringify({
      "id": "D12345",
      "dozent": {
        "titel": "Prof. Dr.",
        "vorname": "Max",
        "nachname": "Mustermann",
        "fakultaet": "FIM",
        "arbeitszeit": "Vollzeit",
        "vollzeitInput": "100%",
        "email": "max.mustermann@htwk-leipzig.de",
        "telefon": "+49 341 1234567",
        "dozentHinweise": "Bitte keine Veranstaltungen am Mittwochvormittag planen",
        "dekanatHinweise": "Raumzuweisung erfolgt nach Kapazität",
        "profUnterschrift": "Prof. Dr. Mustermann",
        "dekanUnterschrift": "Prof. Dr. Schmidt",
        "datumUnterschrift": "15.05.2025",
        "dozententag": "Mittwoch",
        "forschungstag": "Donnerstag",
        "ausnahmeTag": "Freitag Nachmittag",
        "sperrzeit": [
          {
            "wochen": "1-15",
            "wochentag": "Mittwoch",
            "uhrzeit": "08:00-10:00",
            "begruendung": "Forschungstag"
          },
          {
            "wochen": "2-14",
            "wochentag": "Freitag",
            "uhrzeit": "13:00-15:00",
            "begruendung": "Sprechstunde"
          }
        ],
        "einsatzzeit": [
          {
            "wochen": "1-15",
            "wochentag": "Dienstag",
            "uhrzeit": "09:15-10:45",
            "anmerkung": "Vorlesung"
          },
          {
            "wochen": "1-15",
            "wochentag": "Dienstag",
            "uhrzeit": "13:30-15:00",
            "anmerkung": "Seminar"
          }
        ],
        "lehrveranstaltung": [
          {
            "nummer": "1",
            "fakultaet": "FIM",
            "studiengang": "BIB",
            "fs": "3",
            "gruppen": "1-5",
            "modulnr": "1300",
            "modulname": "BAUKO I",
            "swsVorlesung": "2",
            "swsSeminar": "0",
            "swsPraktikum": "0",
            "digital": "nein",
            "bemerkung": "Für alle Gruppen gemeinsam"
          },
          {
            "nummer": "2",
            "fakultaet": "FIM",
            "studiengang": "BIB",
            "fs": "3",
            "gruppen": "1-3",
            "modulnr": "1301",
            "modulname": "BAUKO II",
            "swsVorlesung": "0",
            "swsSeminar": "2",
            "swsPraktikum": "0",
            "digital": "teilweise",
            "bemerkung": "Hybrid-Seminar (wöchentlich wechselnd)"
          }
        ]
      }
    }, null, 2);
    
    if (window.currentTemplate !== "dozent") {
      document.getElementById("switch-template-btn").click();
    }
  });

const formHTML = `
				<div class="container">
					 <div class="zuarbeit-header-box">
	<div class="zuarbeit-header-row">
		<div class="left">
			HTWK Leipzig<br>DS<br>ID: <span id="zuarbeit-id"></span>
		</div>
		<div class="center">
			<strong>Zuarbeit</strong><br>
			<strong>Stunden – Raumplanung</strong>
		</div>
		<div class="right">
			<span id="semester-display"></span><br>
			Präsenzplanung<br>
			(ggf. mit digitalen Anteilen)
		</div>
	</div>
</div>

<p class="planungswochen-display">
	<span id="semester-display"></span>: Planungswochen <span id="planungswochen-display"></span>
</p>

						<div class="section">
								<div class="form-row">
										<div class="form-label">Fakultät</div>
										<div class="form-input" id="fakultaet"></div>
										<div class="form-label" style="margin-left: 5mm;">Studiengang</div>
										<div class="form-input" style="width: 20mm;" id="studiengang"></div>
										<div class="form-label" style="margin-left: 5mm;">Fachsemester</div>
										<div class="form-input" style="width: 10mm;" id="fs"></div>
										<div class="form-label" style="margin-left: 5mm;">Gruppen</div>
										<div class="form-input" style="width: 30mm;" id="gruppen"></div>
								</div>
						</div>

						<div class="section">
								<div class="form-row">
										<div class="form-input" id="modulnr-name" data-label="Nummer und Bezeichnung des Moduls"></div>

								</div>
								<div class="form-row">
									 <div class="form-input" id="lehrveranstaltung" data-label="Nummer und Bezeichnung der Lehrveranstaltung/ des Teilmoduls"></div>

								</div>
						</div>

						<div class="section">
								<table>
										<thead>
												<tr>
														<th colspan="3">Gesamt SWS (bezogen auf einen Beispiel - Studenten):</th>
												</tr>
												<tr>
														<th></th>
														<th>Vorlesung</th>
														<th>Seminar</th>
														<th>Praktikum</th>
												</tr>
										</thead>
										<tbody>
												<tr>
														<td>davon SWS</td>
														<td id="sws-v"></td>
														<td id="sws-s"></td>
														<td id="sws-p"></td>
												</tr>
												<tr>
														<td>Raumanforderung</td>
														<td id="raumV"></td>
														<td id="raumS"></td>
														<td id="raumP"></td>
														
												</tr>
												<tr>
														<td>Technikanforderung (Campus - Bereich)</td>
														<td id="technikV"></td>
														<td id="technikS"></td>
														<td id="technikP"></td>
														
												</tr>
										</tbody>
								</table>

								<div class="notes">
										<p><strong>Hinweis:</strong> 1 SWS = 1 WS (Wochenstunde: 45 min) in jeder Woche des Semesters; geplant werden nur Lehreinheiten: 1 LE=2 WS=90 min</p>
										<p>Sind keine weiteren Erläuterungen vorhanden, wird für den Charakter der LV Präsenz angenommen.</p>
										<p>Weitere Möglichkeiten sind (siehe Hinweise auf Dozentenblatt):</p>
										<p><strong>digital asynchron</strong> (wird nur einmal im Semester im Plan in der Zeit von 07:00-07:30 Uhr eingesetzt),</p>
										<p><strong>digital asynchron mit zeitlicher Begrenzung</strong> (kann bei Bedarf auch mehrmals eingesetzt werden, wenn z.B. die KW definiert ist),</p>
										<p><strong>digital synchron.</strong></p>
								</div>
						</div>

						<div class="section">
								<div class="section-title">Lesende:</div>
								<table id="lesende-table">
										<thead>
												<tr>
														<th>F - Bereich / Titel, Name</th>
														<th>S - Gruppe</th>
														<th>Erläuterung</th>
												</tr>
										</thead>
										<tbody>
												 Rows will be added dynamically
										</tbody>
								</table>

								<div class="notes">
										<p>Geben Sie bitte an, welche Gruppen gemeinsam an einer Vorlesung teilnehmen oder ob für jede Gruppe einzeln gelesen wird.</p>
										<p>Bei mehreren Lesenden bitte die Art der Teilung erläutern:</p>
										<p>z. B. inhaltliche Teilung - die Lesenden übernehmen nacheinander ein bestimmtes Gebiet des Lehrstoffes ordnen Sie bitte die</p>
										<p>entsprechenden Kalenderwochen zu</p>
										<p>quantitative Teilung - jeder Lesende übernimmt eine oder mehrere Seminargruppen, es kann auch parallel geplant werden.</p>
								</div>
						</div>

						<div>

						</div>
						<div>

						</div>
						<div class="section">
								<div class="section-title">Seminarleiter:</div>
								<table id="seminarleiter-table">
										<thead>
												<tr>
														<th>F - Bereich / Titel, Name</th>
														<th>S - Gruppe</th>
														<th>Erläuterung</th>
												</tr>
										</thead>
										<tbody>
												 Rows will be added dynamically
										</tbody>
								</table>

								<div class="notes">
										<p>Bitte geben Sie an, ob die Seminare mit den einzelnen Seminargruppen, in mehreren Gruppen gemeinsam als Hörsaalseminar oder in anderen</p>
										<p>Varianten durchgeführt werden.</p>
								</div>
						</div>

						 
						<div class="page-break"></div>

								<div class="section">
										<div class="section-title">Praktikumsverantwortliche:</div>
										<table id="praktikumsleiter-table">
												<thead>
														<tr>
																<th>F - Bereich / Titel, Name</th>
																<th>S - Gruppe</th>
																<th>Erläuterung</th>
														</tr>
												</thead>
												<tbody>
														 Rows will be added dynamically
												</tbody>
										</table>

										<div class="notes">
												<p>Bitte geben Sie die Art der Praktikumsdurchführung an, eventuelle Teilnehmerzahlen je Veranstaltung, Staffelung der Praktika usw.</p>
										</div>
								</div>

								<div class="section">
										<div class="section-title">Wünsche zur Planung dieser Lehrveranstaltung in den umseitig angegebenen Gruppen:</div>
										<div class="checkbox-group">
												<div class="checkbox-item"><input type="checkbox" id="planung1"> <label for="planung1">gleichmäßige Verteilung von Vorlesungen und Seminaren auf gerade und ungerade Wochen</label></div>
												<div class="checkbox-item"><input type="checkbox" id="planung2"> <label for="planung2">Vorlesungen in der einen und Seminare in der anderen Woche</label></div>
												<div class="checkbox-item"><input type="checkbox" id="planung3"> <label for="planung3">Blockplanung (2 x 90 min hintereinander) von Vorlesungen, Seminaren oder Praktika einer Seminargruppe</label></div>
												<div class="checkbox-item"><input type="checkbox" id="planung4"> <label for="planung4">keine Blockplanung in einer Seminargruppe</label></div>
												<div class="checkbox-item"><input type="checkbox" id="planung5"> <label for="planung5">Vorlesung zwingend vor Seminar</label></div>
										</div>

										<div class="form-row" style="margin-top: 5mm;">
												<div class="form-label">Weitere Planungshinweise:</div>
												<div class="form-input" id="planungshinweise"></div>
										</div>
								</div>

								<div class="section">
										<div class="section-title">Weichen die angegebenen Lehrveranstaltungen vom allgemeinen Rhythmus ab, dann geben Sie unbedingt die konkreten Kalenderwochen zu den Veranstaltungen bzw. Dozenten an!</div>
										<div class="notes">
												<p>Die 15. Lehrveranstaltungswoche ist für Blockveranstaltungen, Prüfungsvorbereitung und Lehrveranstaltungen vorgesehen.</p>
										</div>

													 <div class="kw-grid">
												<div class="kw-item">01. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">02. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">03. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">04. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">05. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">06. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">07. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">08. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">09. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">10. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">11. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">12. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">13. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">14. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">15. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">16. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">17. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">18. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">19. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">20. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">21. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">22. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">23. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">24. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">25. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">26. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">27. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">28. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">29. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">30. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">31. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">32. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">33. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">34. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">35. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">36. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">37. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">38. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">39. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">40. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">41. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">42. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">43. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">44. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">45. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">46. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">47. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">48. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">49. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">50. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">51. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">52. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">53. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">54. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">55. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">56. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">57. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">58. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">59. <span class="form-input" style="width: 15mm;"></span></div>
												<div class="kw-item">60. <span class="form-input" style="width: 15mm;"></span></div>
										</div>
										<div class="container page-break">
										<div class="form-row">
												<div class="form-label">Name</div>
												<div class="form-input" id="kw-name"></div>
										</div>
								</div>

								<div class="section">
										<div class="form-row">
												<div class="form-label">Termin der Rückgabe an die Fakultät:</div>
												<div class="form-input" style="width: 30mm;" id="rueckgabedatum"></div>
												<div class="notes" style="margin-left: 5mm;">(Bei Bedarf von der Fakultät ausfüllen)</div>
										</div>
								</div>

		<div class="signature-area">
										<div class="signature-box">Datum, Unterschrift<br>Verantwortliche/r Professor/in</div>
										<div class="signature-box">Datum, Unterschrift<br>Dekan/in der Fakultät</div>
								</div>
</div>

								<div class="notes">
										<p>Bei Dienstleistung zusätzlich von der bedienenden Fakultät / dem bedienenden Bereich:</p>
								</div>

								<div class="signature-box" style="margin-left: auto;">Datum, Unterschrift<br>Dekan/in der Fakultät / Leiter/in Bereich</div>
						</div>
				</div>
				`;
        // Checkbox-Berechtigungen basierend auf Benutzerrolle
function setupApprovalPermissions() {
  fetch('/check-auth')
    .then(response => response.json())
    .then(data => {
      if (data.authenticated) {
        const userRole = data.user.role;
        const roleCheckboxes = {
          'Dekan': 'checkbox-dekan',
          'Studienamt': 'checkbox-studienamt', 
          'Studiendekan': 'checkbox-studiendekan'
        };

        // Deaktiviere alle Checkboxen zunächst
        Object.values(roleCheckboxes).forEach(checkboxId => {
          const checkbox = document.getElementById(checkboxId);
          if (checkbox) {
            checkbox.disabled = true;
            checkbox.checked = false;
          }
        });

        // Aktiviere nur die Checkbox der eigenen Rolle
        if (roleCheckboxes[userRole]) {
          const userCheckbox = document.getElementById(roleCheckboxes[userRole]);
          if (userCheckbox) {
            userCheckbox.disabled = false;
            
            // Füge Label-Hinweis hinzu
            const label = userCheckbox.parentElement;
            if (label) {
              label.style.fontWeight = 'bold';
              label.title = `Sie können nur Ihre eigene Rolle (${userRole}) bestätigen`;
            }
          }
        }

        // Zeige aktuelle Rolle an
        const statusDiv = document.getElementById('approval-status');
        if (statusDiv) {
          statusDiv.innerHTML += `<br><small>Angemeldet als: <strong>${userRole}</strong> - Sie können nur Ihre eigene Rolle bestätigen</small>`;
        }
      }
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Benutzerrolle:', error);
    });
}
// Funktion zum Speichern der Dekan-Unterschrift
async function saveDekanSignature() {
  try {
    const userRole = await getUserRole();
    if (userRole !== 'Dekan') {
      alert('Nur der Dekan kann unterschreiben.');
      return;
    }

    const signature = document.getElementById('unterschrift-dekan').value.trim();
    if (!signature) {
      alert('Bitte geben Sie eine Unterschrift ein.');
      return;
    }

    // Bestimme Ziel-Datei (ähnlich wie bei saveApprovalToServer)
    let target = await determineTargetFromUIOrTextarea();

    // Füge Typ-Information zur Payload hinzu
    const payload = { 
      filename: target.filename, 
      id: target.id, 
      type: target.type,
      signature: signature
    };

    console.log('Saving signature with payload:', payload);

    const r = await fetch('/api/save-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      let txt;
      try { txt = await r.text(); } catch (e) { txt = r.statusText || 'Fehler'; }
      console.error('Server responded with error', r.status, txt);
      return alert('Speichern der Unterschrift fehlgeschlagen: ' + txt);
    }

    alert('Unterschrift wurde gespeichert.');

    // AUTOMATISCHE AKTUALISIERUNG: Auswahl in Eingabe übernehmen + Formular füllen
    await performAutoUpdateAfterSave(target);

  } catch (err) {
    console.error('saveDekanSignature error', err);
    alert('Speichern der Unterschrift fehlgeschlagen: ' + (err.message || err));
  }
}

// Unterschriftsfeld nur für Dekan anzeigen
function setupSignatureField() {
  fetch('/check-auth')
    .then(response => response.json())
    .then(data => {
      if (data.authenticated && data.user.role === 'Dekan') {
        // Zeige Unterschriftsfeld nur für Dekan
        const signatureLabel = document.querySelector('label[for="unterschrift-dekan"]');
        const signatureInput = document.getElementById('unterschrift-dekan');
        const signatureButton = document.getElementById('save-signature-btn');
        
        if (signatureLabel) signatureLabel.style.display = 'inline-block';
        if (signatureInput) signatureInput.style.display = 'inline-block';
        if (signatureButton) signatureButton.style.display = 'inline-block';
      } else {
        // Verstecke Unterschriftsfeld für andere Rollen
        const signatureLabel = document.querySelector('label[for="unterschrift-dekan"]');
        const signatureInput = document.getElementById('unterschrift-dekan');
        const signatureButton = document.getElementById('save-signature-btn');
        
        if (signatureLabel) signatureLabel.style.display = 'none';
        if (signatureInput) signatureInput.style.display = 'none';
        if (signatureButton) signatureButton.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Fehler beim Überprüfen der Benutzerrolle für Unterschrift:', error);
    });
}

// Event Listener für Unterschrifts-Button
document.addEventListener('DOMContentLoaded', function() {
  const saveSignatureBtn = document.getElementById('save-signature-btn');
  if (saveSignatureBtn) {
    saveSignatureBtn.addEventListener('click', saveDekanSignature);
  }
  
  // Setup Unterschriftsfeld
  setupSignatureField();
});
document.getElementById("form-container").innerHTML = formHTML;
function resetForm() {
  document.getElementById("form-container").innerHTML = formHTML;
  document.getElementById("json-input").value = "";
  setupEventListeners();
}
function setupEventListeners() {
  document.getElementById("parse-btn").addEventListener("click", parseRDF);
  document
    .getElementById("generate-pdf")
    .addEventListener("click", generatePDF);
  document.getElementById("reset-form").addEventListener("click", resetForm);
}
setupEventListeners();


function parseJSON() {
  const jsonData = document.getElementById("json-input").value;

  if (!jsonData.trim()) {
    alert("Bitte JSON-Daten eingeben!");
    return;
  }

  try {
    const data = JSON.parse(jsonData);
    
    // Check if it's dozent or modul data based on structure
    const isDozent = data.dozent !== undefined;
    const isModul = data.modul !== undefined;

    if (window.currentTemplate === "zuarbeit" && isModul) {
      // Für Zuarbeit: data an fillZuarbeitsblatt übergeben (nicht data.modul)
      fillZuarbeitsblatt(data);
    } else if (window.currentTemplate === "dozent" && isDozent) {
      // Für Dozenten: data an fillDozentenblatt übergeben (nicht data.dozent)
      fillDozentenblatt(data);
    } else {
      alert("JSON-Daten passen nicht zum aktuellen Formulartyp!");
      return;
    }

    // Update approval status display after filling the form
    try { if (typeof renderApprovalStatusFromObject === "function") renderApprovalStatusFromObject(data); } catch(e) { console.warn("renderApprovalStatusFromObject error", e); }
    alert("Formular erfolgreich aus JSON-Daten gefüllt!");
  } catch (error) {
    console.error("Error parsing JSON:", error);
    alert("Fehler beim Parsen der JSON-Daten: " + error.message);
  }
}

function fillZuarbeitsblatt(data) {
  // ID von der obersten Ebene lesen
  setFieldContent("zuarbeit-id", data.id || data.ID); 
  
  // Daten aus dem modul-Objekt lesen
  const modulData = data.modul || {};
  
  setFieldContent("fakultaet", modulData.fakultaet);
  setFieldContent("studiengang", modulData.studiengang);
  setFieldContent("fs", modulData.fs);
  setFieldContent("gruppen", modulData.gruppen);
  setFieldContent("modulnr-name", `${modulData.modulnr} ${modulData.modulname}`);
  setFieldContent("lehrveranstaltung", modulData.lehrveranstaltung);
  setFieldContent("sws-v", modulData.swsVorlesung);
  setFieldContent("sws-s", modulData.swsSeminar);
  setFieldContent("sws-p", modulData.swsPraktikum);
  setFieldContent("raumV", modulData.raumV);
  setFieldContent("raumS", modulData.raumS);
  setFieldContent("raumP", modulData.raumP);
  setFieldContent("technikV", modulData.technikV);
  setFieldContent("technikS", modulData.technikS);
  setFieldContent("technikP", modulData.technikP);
  setFieldContent("rueckgabedatum", modulData.rueckgabedatum);
  setFieldContent("planungshinweise", modulData.planungshinweise);
  
  const signatureInput = document
    .getElementById("signature-name")
    ?.value?.trim();
  setFieldContent("kw-name", signatureInput || modulData.unterschrift || modulData.name);
  
  // Handle lesende, seminarleiter, praktikumsleiter
  if (modulData.lesende) {
    if (Array.isArray(modulData.lesende)) {
      fillPersonTable("lesende-table", modulData.lesende);
    } else {
      fillPersonTable("lesende-table", [modulData.lesende]);
    }
  }
  
  if (modulData.seminarleiter) {
    if (Array.isArray(modulData.seminarleiter)) {
      fillPersonTable("seminarleiter-table", modulData.seminarleiter);
    } else {
      fillPersonTable("seminarleiter-table", [modulData.seminarleiter]);
    }
  }
  
  if (modulData.praktikumsleiter) {
    if (Array.isArray(modulData.praktikumsleiter)) {
      fillPersonTable("praktikumsleiter-table", modulData.praktikumsleiter);
    } else {
      fillPersonTable("praktikumsleiter-table", [modulData.praktikumsleiter]);
    }
  }
  
  if (modulData.planungshinweise) {
    const hints = modulData.planungshinweise.toLowerCase();
    setCheckbox("planung1", hints.includes("gleichmäßige"));
    setCheckbox("planung2", hints.includes("vorlesungen in der einen"));
    setCheckbox("planung3", hints.includes("blockplanung"));
    setCheckbox("planung4", hints.includes("keine blockplanung"));
    setCheckbox("planung5", hints.includes("vorlesung zwingend"));
  }
  
  if (modulData.kwHinweise) {
    const kwInputs = document.querySelectorAll(".kw-grid .form-input");
    const kwList = modulData.kwHinweise.split(",");
    kwList.forEach((kw) => {
      const kwNum = kw.trim().replace("KW", "").replace(".", "");
      const input = Array.from(kwInputs).find((i) =>
        i.previousSibling.textContent.trim().startsWith(kwNum)
      );
      if (input) {
        input.textContent = modulData.name || "X";
      }
    });
  }
  
  document.querySelectorAll(".signature-box").forEach((box) => {
    if (box.textContent.includes("Professor/in")) {
      box.innerHTML = `Datum: ${
        modulData.datumUnterschrift || ""
      }<br>Unterschrift: ${
        modulData.profUnterschrift || ""
      }<br>Verantwortliche/r Professor/in`;
    } else if (box.textContent.includes("Dekan/in")) {
      box.innerHTML = `Datum: ${
        modulData.datumUnterschrift || ""
      }<br>Unterschrift: ${
        modulData.dekanUnterschrift || "" 
      }<br>Dekan/in der Fakultät`;
    }
  });
}

function fillDozentenblatt(data) {
  // ID von der obersten Ebene lesen
  setFieldContent("dozent-id", data.id || data.ID);
  setFieldContent("dozent-id-anlage", data.id || data.ID);
  
  // Daten aus dem dozent-Objekt lesen
  const dozentData = data.dozent || {};
  
  setFieldContent("titel", dozentData.titel);
  setFieldContent("vorname", dozentData.vorname);
  setFieldContent("nachname", dozentData.nachname);
  setFieldContent("email", dozentData.email);
  setFieldContent("telefon", dozentData.telefon);
  setFieldContent("hinweise", dozentData.hinweise);
  setFieldContent("dozent-hinweise", dozentData.hinweise || dozentData.dozentHinweise);
  setFieldContent("dekanat-hinweise", dozentData.dekanatHinweise);
  
  if (dozentData.fakultaet) {
    const checkbox = document.querySelector(
      `#fakultaet-group input[value="${dozentData.fakultaet}"]`
    );
    if (checkbox) checkbox.checked = true;
  }
  
  if (dozentData.arbeitszeit) {
    const isFulltime = dozentData.arbeitszeit.toLowerCase().includes("vollzeit");
    document.getElementById(
      isFulltime ? "fulltime" : "parttime"
    ).checked = true;

    if (isFulltime && dozentData.vollzeitInput) {
      setFieldContent("vollzeit-input", dozentData.vollzeitInput);
    }
  }
  
  const lvTable = document.querySelector("#lehrveranstaltungen tbody");
  if (lvTable && dozentData.lehrveranstaltung) {
    lvTable.innerHTML = "";
    dozentData.lehrveranstaltung.forEach((lv, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${lv.fakultaet || ""}</td>
        <td>${lv.studiengang || ""}</td>
        <td>${lv.fs || ""}</td>
        <td>${lv.gruppen || ""}</td>
        <td>${lv.modulnr || ""}</td>
        <td>${lv.modulname || ""}</td>
        <td>${lv.swsVorlesung || "0"}</td>
        <td>${lv.swsSeminar || "0"}</td>
        <td>${lv.swsPraktikum || "0"}</td>
        <td>${lv.digital || ""}</td>
        <td>${lv.bemerkung || ""}</td>
      `;
      lvTable.appendChild(row);
    });
  }
  
  setFieldContent("anlage-titel", dozentData.titel);
  setFieldContent("anlage-vorname", dozentData.vorname);
  setFieldContent("anlage-nachname", dozentData.nachname);
  
  const einsatzzeitenTable = document.querySelector("#einsatzzeiten tbody");
  if (einsatzzeitenTable && dozentData.einsatzzeit) {
    einsatzzeitenTable.innerHTML = "";
    dozentData.einsatzzeit.forEach((einsatz) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${einsatz.wochen || ""}</td>
        <td>${einsatz.wochentag || ""}</td>
        <td>${einsatz.uhrzeit || ""}</td>
        <td>${einsatz.anmerkung || ""}</td>
      `;
      einsatzzeitenTable.appendChild(row);
    });
  }
  
  const sperrzeitenTable = document.querySelector("#sperrzeiten tbody");
  if (sperrzeitenTable && dozentData.sperrzeit) {
    sperrzeitenTable.innerHTML = "";
    dozentData.sperrzeit.forEach((sperre) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${sperre.wochen || ""}</td>
        <td>${sperre.wochentag || ""}</td>
        <td>${sperre.uhrzeit || ""}</td>
        <td>${sperre.begruendung || ""}</td>
      `;
      sperrzeitenTable.appendChild(row);
    });
  }
  
  if (dozentData.dozententag || dozentData.forschungstag) {
    document
      .querySelectorAll('.time-table input[type="checkbox"]')
      .forEach((cb) => {
        cb.checked = false;
      });

    const checkboxContainer = document.querySelector(
      ".time-table tbody tr:first-child"
    );
    if (checkboxContainer) {
      const cells = checkboxContainer.querySelectorAll("td");
      cells.forEach((cell) => {
        const day = cell.textContent.trim().toLowerCase();
        if (dozentData.dozententag && day === dozentData.dozententag.toLowerCase()) {
          const checkbox = cell.querySelector('input[value="D"]');
          if (checkbox) checkbox.checked = true;
        }
        if (dozentData.forschungstag && day === dozentData.forschungstag.toLowerCase()) {
          const checkbox = cell.querySelector('input[value="F"]');
          if (checkbox) checkbox.checked = true;
        }
      });
    }

    if (dozentData.ausnahmeTag) {
      const ausnahmeField = document.querySelector(
        ".time-table tbody tr:last-child td span.form-input"
      );
      if (ausnahmeField) ausnahmeField.textContent = dozentData.ausnahmeTag;
    }
  }
  
  // Setze Unterschrift in den Signatur-Boxen
  document.querySelectorAll(".signature-box").forEach((box) => {
    if (box.textContent.includes("Professor/in")) {
      box.innerHTML = `Datum: ${
        dozentData.datumUnterschrift || ""
      }<br>Unterschrift: ${
        dozentData.profUnterschrift || ""
      }<br>Verantwortliche/r Professor/in`;
    } else if (box.textContent.includes("Dekan/in")) {
      box.innerHTML = `Datum: ${
        dozentData.datumUnterschrift || ""
      }<br>Unterschrift: ${
        dozentData.dekanUnterschrift || "" 
      }<br>Dekan/in der Fakultät`;
    }
  });
}

function setFieldContent(id, content) {
  const el = document.getElementById(id);
  if (el) el.textContent = content || "";
}

// --
// Function
// --
function fillPersonTable(tableId, persons) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  if (tbody) {
    tbody.innerHTML = "";
    persons.forEach((person) => {
      const row = document.createElement("tr");
      row.innerHTML = `
								<td>${person.titel || ""} ${person.name || ""}</td>
								<td>${person.gruppen || ""}</td>
								<td>${person.erlaeuterung || ""}</td>
						`;
      tbody.appendChild(row);
    });
  }
}

// --
// Function
// --
function setCheckbox(id, checked) {
  const checkbox = document.getElementById(id);
  if (checkbox) checkbox.checked = checked;
}

// --
// Function
// --
function getPDFFilename(isZuarbeit) {
  const nameField = isZuarbeit ? "kw-name" : "nachname";
  const nameElement = document.getElementById(nameField);
  const name = nameElement?.textContent?.trim() || "unbekannt";
  const prefix = isZuarbeit ? "Zuarbeitsblatt_" : "Dozentenblatt_";
  return `${prefix}${name}_${getCurrentSemester()}.pdf`;
}

// --
// Function
// --
function getCanvasOptions(isZuarbeit) {
  return {
    scale: 2,
    scrollY: 0,
    ignoreElements: (el) => {
      return (
        el.classList.contains("clear-signature") ||
        el.classList.contains("no-export")
      );
    },
    onclone: (clonedDoc) => {
      if (!isZuarbeit) {
        const dateFields = clonedDoc.querySelectorAll(".date-field");
        dateFields.forEach((field) => {
          if (!field.textContent.trim()) {
            field.textContent = new Date().toLocaleDateString("de-DE");
          }
        });
      }
    },
  };
}

// --
// Function
// --
function hideElementsDuringPDFGeneration() {
  document.querySelectorAll(".clear-signature, .no-export").forEach((el) => {
    el.style.visibility = "hidden";
  });
}

// --
// Function
// --
function showElementsAfterPDFGeneration() {
  document.querySelectorAll(".clear-signature, .no-export").forEach((el) => {
    el.style.visibility = "visible";
  });
}

// --
// Function
// --
function getCurrentSemester() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return month >= 4 && month <= 9 ? `SoSe_${year}` : `WiSe_${year}_${year + 1}`;
}

// --
// Function
// --
function getCurrentSemester() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  if (month >= 4 && month <= 9) {
    return `Sommersemester ${year}`;
  } else {
    return `Wintersemester ${year}/${year + 1}`;
  }
}
window.window.currentTemplate = window.window.currentTemplate || "zuarbeit";
window.window.zuarbeitHTML =
  window.window.zuarbeitHTML ||
  document.getElementById("form-container").innerHTML;

// --
// Function
// --
function switchTemplate() {
  const btn = document.getElementById("switch-template-btn");
  const container = document.getElementById("form-container");

  if (window.currentTemplate === "zuarbeit") {
    container.innerHTML = `
				<div class="container">
<div class="dozenten-header-box">
	<div class="dozenten-header-row">
		<div class="left">
			HTWK Leipzig<br>DS<br>ID: <span id="dozent-id"></span>
		</div>
		<div class="center">
			<strong>Dozentenblatt</strong>
		</div>
		<div class="right">
			<span id="semester-display"></span><br>
			Präsenzplanung<br>
			(ggf. mit digitalen Anteilen)
		</div>
	</div>
</div>
<p class="dozenten-note">Jeder Lehrende füllt bitte nur <u><strong>ein</strong></u> Dozentenblatt aus!</p>

						<div class="section">
								<div class="form-row">
										<div class="form-label">Titel</div>
										<div class="form-input" style="width: 20mm;" id="titel"></div>
										<div class="form-label" style="width: 20mm; margin-left: 5mm;">Vorname</div>
										<div class="form-input" style="flex-grow: 1;" id="vorname"></div>
										<div class="form-label" style="width: 20mm; margin-left: 5mm;">Name</div>
										<div class="form-input" style="flex-grow: 1;" id="nachname"></div>
								</div>
						</div>

						<div class="section">
								<div class="form-row">
										<div class="form-label">Fakultät/Bereich:</div>
										<div class="checkbox-group" id="fakultaet-group">
												<div class="checkbox-item"><input type="checkbox" value="FAS"> FAS</div>
												<div class="checkbox-item"><input type="checkbox" value="FB"> FB</div>
												<div class="checkbox-item"><input type="checkbox" value="FDIT"> FDIT</div>
												<div class="checkbox-item"><input type="checkbox" value="FIM"> FIM</div>
												<div class="checkbox-item"><input type="checkbox" value="FING"> FING</div>
												<div class="checkbox-item"><input type="checkbox" value="FWW"> FWW</div>
												<div class="checkbox-item"><input type="checkbox" value="HSZ"> HSZ</div>
												<div class="checkbox-item"><input type="checkbox" value="MNZ"> MNZ</div>
												<div class="checkbox-item"><input type="checkbox" value="Gast"> Gast</div>
												<div class="checkbox-item"><input type="checkbox" value="HonProf"> HonProf</div>
										</div>
								</div>
						</div>

						<div class="section">
								<div class="form-row">
										<div class="form-label">Arbeitszeit (Pflichtangabe, außer Gast)</div>
										<div class="radio-group">
												<div class="radio-item">
														<input type="radio" name="work_time" id="fulltime"> <label for="fulltime">Vollzeit</label>
														<span class="form-input" style="width: 10mm; margin-left: 2mm;" id="vollzeit-input"></span>
												</div>
												<div class="radio-item">
														<input type="radio" name="work_time" id="parttime"> <label for="parttime">Teilzeit</label>
														<span class="form-input" style="width: 10mm; margin-left: 2mm;" id="teilzeit-input"></span>
												</div>
										</div>
								</div>
						</div>

						<div class="section">
								<div class="form-row">
										<div class="form-label">E-Mailadresse (Pflichtangabe)</div>
										<div class="form-input" id="email"></div>
								</div>
								<div class="form-row">
										<div class="form-label">Telefonisch erreichbar unter (optional)</div>
										<div class="form-input" id="telefon"></div>
								</div>
						</div>

						<div class="section">
								<div class="section-title">Bitte geben Sie in der Tabelle Ihre Einsätze (auch Bedienfunktionen) an!</div>
								<div class="section-title">Durchzuführende Lehrveranstaltungen</div>

								<table id="lehrveranstaltungen">
										<thead>
												<tr>
														<th>Ifd. Nr.</th>
														<th>Fak</th>
														<th>Stg.</th>
														<th>FS</th>
														<th>Gruppen</th>
														<th>Modulnr./ LE</th>
														<th>Modulname (Kürzel)</th>
														<th colspan="3">Reale SWS (Präsenz)</th>
														<th>Digital</th>
														<th>Bemerkung</th>
												</tr>
												<tr>
														<th></th>
														<th></th>
														<th></th>
														<th></th>
														<th></th>
														<th></th>
														<th></th>
														<th>V</th>
														<th>S</th>
														<th>P</th>
														<th></th>
														<th></th>
												</tr>
										</thead>
										<tbody>
												 Rows will be added dynamically
										</tbody>
								</table>

								<div class="notes">
										<p>Reale SWS = tatsächlich zu realisierende SWS</p>
										<p>Beispiel: 2 SWS Seminar für 5 SG BIB einzeln durchgeführt ergibt 10 zu realisierende SWS</p>
										<p>oder</p>
										<p>2 SWS Vorlesung für 5 SG BIB, in 2 Blöcken mit jeweils 3 bzw. 2 SG durchgeführt, ergibt 4 zu realisierende SWS</p>
										<p>Zu jedem aufgeführten Modul/Teilmodul muss ein Zuarbeitsbogen ausgefüllt werden.</p>
								</div>
						</div>

						<div class="section">
								<div class="section-title">Hinweise zum Stundenplan:</div>
								<ul>
										<li>Wahlobligatorische Veranstaltungen werden in der ersten Planungsrunde geplant, wenn die Zahl der teilnehmenden Studenten vorliegt und größer als 9 ist. Fakultative und restliche wahlobligatorische Veranstaltungen werden nach Fertigstellung der Pläne in Absprache mit der Fakultät eingefügt.</li>
										<li>Da Doppelplanung der Dozenten nicht möglich ist, ist es notwendig, die Lehrkraft zu benennen, die die Lehrveranstaltung wirklich durchführt (z.B. Seminarleiter, Praktikumsbetreuer).</li>
								</ul>

								<div class="section-title">Lehrformen: Präsenz (mit digitalen Anteilen, wenn didaktisch vorteilhaft)</div>
								<ul>
										<li>Regelfall: Präsenz (es wird empfohlen, bei Bedarf eine virtuelle Teilnahme zu ermöglichen (hybride LV))</li>
										<li>Digital synchron (Wegezeiten für Studierende beachten)</li>
										<li>Digital asynchron</li>
								</ul>

								<div class="section-title">Digitale Lehre steht unter dem Genehmigungsvorbehalt des Dekans und bedarf der vorherigen Vorlage eines Lehrkonzeptes.</div>
								<div class="section-title">Der digitale Lehranteil darf pro Modul pro Semester max. 50% ausmachen. Für die Genehmigung und Anrechnung auf das Lehrdeputat sind Mindeststandards zu beachten (siehe Hinweise zu digitaler Lehre an der HTWK Leipzig, Kapitel 4.1).</div>
								<div class="section-title">Ferner steht jedwede digitale Lehre unter dem Ermöglichungsvorbehalt der Stunden- und Raumplanung.</div>
						</div>

<div class="section">
<div style="margin-bottom: 5mm;">
				<div><strong>Nach Möglichkeit ist folgender Dozenten-/Forschungstag einzuplanen:</strong> (nur bei <strong>Vollzeit</strong> angeben!)</div>
				<div>Die gewünschten Dozenten- und Forschungstage sind als Anlage 1 zum Dozentenblatt in der Fakultät einzureichen.</div>
				<div>Nach Prüfung werden diese zentral an DS übermittelt.</div>
		</div>

		<div style="margin-bottom: 5mm;">
				<div><strong>Notwendige Sperrzeiten sind:</strong> (nur bei <strong>Gästen</strong> und <strong>Teilzeit!</strong>)</div>
				<div>Die notwendigen Sperrzeiten sind als Anlage 1 zum Dozentenblatt in der Fakultät einzureichen.</div>
				<div>Nach Prüfung werden diese zentral an DS übermittelt.</div>
		</div>

	 <table class="form-table" style="width: 100%; margin-top: 5mm; border-collapse: collapse;">
		<tr>
				<th style="border: 1px solid #000; padding: 2mm; text-align: left; width: 50%;">Bei Bedarf vom Dozenten auszufüllen</th>
				<th style="border: 1px solid #000; padding: 2mm; text-align: left; width: 50%;">Nur vom Dekanat / Studienamt auszufüllen!</th>
		</tr>
		<tr>
				<td style="border: 1px solid #000; padding: 2mm; vertical-align: top;">
						<div><strong>Wichtige Hinweise zur Semesterplanung:</strong> <span id="dozent-hinweise"></span></div>
						<div style="height: 10mm;"></div>
				</td>
				<td style="border: 1px solid #000; padding: 2mm; vertical-align: top;">
						<div><strong>Hinweise bei Rückgabe an den Dozenten:</strong></div>
						<div id="dekanat-hinweise" style="height: 15mm;"></div>
				</td>
		</tr>
</table>
</div>

		 <div class="signature-area">
										<div class="signature-box">Datum, Unterschrift<br>Verantwortliche/r Professor/in</div>
										<div class="signature-box">Datum, Unterschrift<br>Dekan/in der Fakultät</div>
								</div>
</div>
				</div>

<!-- Page 2 - Anlage 1-->
				
				<div class="container page-break">
						<div class="dozenten-header-box">
								<div class="dozenten-header-row">
										<div class="left">
												HTWK Leipzig<br>DS<br>ID: <span id="dozent-id-anlage"></span>
										</div>
										<div class="center">
												<strong>Anlage 1 zum Dozentenblatt</strong>
										</div>
										<div class="right">
												
										</div>
								</div>
						</div>

						<div class="section">
								<div class="form-row">
										<div class="form-label">Titel</div>
										<div class="form-input" style="width: 20mm;" id="anlage-titel"></div>
										<div class="form-label" style="width: 20mm; margin-left: 5mm;">Vorname</div>
										<div class="form-input" style="flex-grow: 1;" id="anlage-vorname"></div>
										<div class="form-label" style="width: 20mm; margin-left: 5mm;">Name</div>
										<div class="form-input" style="flex-grow: 1;" id="anlage-nachname"></div>
								</div>
						</div>

						<div class="section">
								<div class="section-title">Regelmäßig mögliche Einsatzzeiten für externe Dozenten sind:</div>
								<table class="time-table" id="einsatzzeiten">
										<thead>
												<tr>
														<th colspan="3">Zeitangabe</th>
														<th>Anmerkung</th>
												</tr>
												<tr>
														<th>Wochen</th>
														<th>Wochentag</th>
														<th>Uhrzeit</th>
														<th></th>
												</tr>
										</thead>
										<tbody>
												 Rows will be added dynamically
										</tbody>
								</table>
						</div>

						<div class="section">
								<div class="section-title">Notwendige regelmäßige Sperrzeiten für interne Dozenten sind:</div>
								<table class="time-table" id="sperrzeiten">
										<thead>
												<tr>
														<th colspan="3">Zeitangabe</th>
														<th>Begründung</th>
												</tr>
												<tr>
														<th>Wochen</th>
														<th>Wochentag</th>
														<th>Uhrzeit</th>
														<th></th>
												</tr>
										</thead>
										<tbody>
												 Rows will be added dynamically
										</tbody>
								</table>
						</div>

						<div class="section">
								<div class="section-title">Nach Möglichkeit ist folgender Dozenten-/Forschungstag einzuplanen: (nur bei Vollzeit angeben!)</div>
								<table class="time-table">
										<thead>
												<tr>
														<th>Tag ist egal</th>
														<th>Montag</th>
														<th>Dienstag</th>
														<th>Mittwoch</th>
														<th>Donnerstag</th>
														<th>Freitag</th>
												</tr>
										</thead>
										<tbody>
												<tr>
														<td>
																<div class="checkbox-item"><input type="checkbox"> D</div>
																<div class="checkbox-item"><input type="checkbox"> F</div>
														</td>
														<td>
																<div class="checkbox-item"><input type="checkbox"> D</div>
																<div class="checkbox-item"><input type="checkbox"> F</div>
														</td>
														<td>
																<div class="checkbox-item"><input type="checkbox"> D</div>
																<div class="checkbox-item"><input type="checkbox"> F</div>
														</td>
														<td>
																<div class="checkbox-item"><input type="checkbox"> D</div>
																<div class="checkbox-item"><input type="checkbox"> F</div>
														</td>
														<td>
																<div class="checkbox-item"><input type="checkbox"> D</div>
																<div class="checkbox-item"><input type="checkbox"> F</div>
														</td>
														<td>
																<div class="checkbox-item"><input type="checkbox"> D</div>
																<div class="checkbox-item"><input type="checkbox"> F</div>
														</td>
												</tr>
												<tr>
														<td colspan="6">aber nicht: <span class="form-input" style="width: 100mm;"></span></td>
												</tr>
										</tbody>
								</table>
								<div class="notes">
										<p>Hinweis: D – Dozententag; F – Forschungstag → jeweils nur einmal auswählen!</p>
								</div>
						</div>

				 <div class="signature-area">
										<div class="signature-box">Datum, Unterschrift<br>Verantwortliche/r Professor/in</div>
										<div class="signature-box">Datum, Unterschrift<br>Dekan/in der Fakultät</div>
								</div>
				</div>
				`;
    window.currentTemplate = "dozent";
    btn.textContent = "Wechsel zu Zuarbeitsblatt";
  } else {
    container.innerHTML = window.zuarbeitHTML;
    window.currentTemplate = "zuarbeit";
    btn.textContent = "Wechsel zu Dozentenblatt";
  }
  setupEventListeners();
}

// --
// Function
// --
function updatePlanungswochenText() {
  if (window.currentTemplate !== "zuarbeit") return;
  const planungswochen =
    document.getElementById("planungswochen")?.value || "42–58";
  document.querySelectorAll("#planungswochen-display").forEach((el) => {
    el.textContent = planungswochen;
  });
}

// --
// Function
// --
function updateSemesterText() {
  const art =
    document.getElementById("semester-art")?.value || "Wintersemester";
  const jahr = document.getElementById("semester-jahr")?.value || "2025/26";
  const semesterText = `${art} ${jahr}`;
  document.querySelectorAll("#semester-display").forEach((el) => {
    el.textContent = semesterText;
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("planungswochen")
    ?.addEventListener("input", updatePlanungswochenText);
  document
    .getElementById("semester-art")
    ?.addEventListener("change", updateSemesterText);
  document
    .getElementById("semester-jahr")
    ?.addEventListener("input", updateSemesterText);
  document.getElementById("body-root").className = currentTemplate;
  updateSemesterText();
  updatePlanungswochenText();
});

// --
// Function
// --
function generatePDF() {
  const element = document.getElementById("form-container");
  const opt = {
    margin: 0,
    filename: (() => {
      const isZuarbeit = window.currentTemplate === "zuarbeit";
      const name = (
        document.getElementById(isZuarbeit ? "kw-name" : "nachname")
          ?.textContent || "unbekannt"
      ).trim();
      const prefix = isZuarbeit ? "Zuarbeitsblatt_" : "Dozentenblatt_";
      return `${prefix}${name || "unbekannt"}.pdf`;
    })(),
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: 0,
      onclone: function (clonedDoc) {
        const elementsToProtect = [
          ".section",
          "table",
          "tr",
          "td",
          "th",
          ".text-block",
          ".notes",
          ".form-row",
          ".checkbox-group",
          "ul",
          "ol",
          "li",
          ".signature-area",
          ".signature-box",
          ".zuarbeit-header-box",
          ".planungswochen-display",
        ];

        elementsToProtect.forEach((selector) => {
          clonedDoc.querySelectorAll(selector).forEach((el) => {
            el.style.pageBreakInside = "avoid";
            el.style.breakInside = "avoid";
            if (selector === "table") {
              el.style.display = "table";
              el.style.width = "100%";
            }
            if (selector === "tr") {
              el.style.display = "table-row";
            }
          });
        });
        clonedDoc.querySelectorAll("table").forEach((table) => {
          table.style.maxWidth = "190mm";
        });
        clonedDoc.querySelectorAll("p, li, .text-block").forEach((el) => {
          el.style.widows = "3";
          el.style.orphans = "3";
        });
      },
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
}

// Update event listener Einrichtung
function setupEventListeners() {
  document.getElementById("parse-btn").addEventListener("click", parseJSON);
  document
    .getElementById("generate-pdf")
    .addEventListener("click", generatePDF);
  document.getElementById("reset-form").addEventListener("click", resetForm);
}

// Update Beispiel button for Zuarbeitsblatt
document.addEventListener("DOMContentLoaded", () => {
  const exampleBtn = document.getElementById("example-btn");
  if (exampleBtn) {
    exampleBtn.addEventListener("click", () => {
      document.getElementById("json-input").value = JSON.stringify({
        "id": "Z12345",
        "modul": {
          "fakultaet": "FIM",
          "studiengang": "BIB",
          "fs": "3",
          "gruppen": "13 BIB 1 - 5",
          "modulnr": "1300",
          "modulname": "BAUKO I",
          "lehrveranstaltung": "Einführung in die Bibliothekswissenschaft",
          "swsVorlesung": "2",
          "swsSeminar": "1",
          "swsPraktikum": "2",
          "raumV": "Hörsaal 123",
          "raumS": "Seminarraum 45",
          "raumP": "Labor 67",
          "technikV": "Beamer, PC",
          "technikS": "Whiteboard",
          "technikP": "Spezialausrüstung",
          "planungshinweise": "Gleichmäßige Verteilung auf gerade/ungerade Wochen, Vorlesung zwingend vor Seminar",
          "kwHinweise": "KW42, KW43, KW44, KW45, KW46, KW47, KW48, KW49, KW50, KW51, KW52, KW01, KW02, KW03, KW04, KW05, KW06",
          "name": "Prof. Dr. Müller",
          "unterschrift": "Fadi Mkhalale",
          "rueckgabedatum": "15.05.2025",
          "profUnterschrift": "Prof. Dr. Mustermann",
          "dekanUnterschrift": "Prof. Dr. Schmidt",
          "datumUnterschrift": "15.05.2025",
          "lesende": {
            "titel": "Prof. Dr.",
            "name": "Schmidt",
            "gruppen": "1-5",
            "erlaeuterung": "Gemeinsame Vorlesung für alle Gruppen, montags 09:15-10:45 Uhr"
          },
          "seminarleiter": [
            {
              "titel": "Dr.",
              "name": "Meier",
              "gruppen": "1-3",
              "erlaeuterung": "Seminar in 2 Gruppen, Blockveranstaltung gerader Wochen, Dienstag 13:30-17:00 Uhr"
            },
            {
              "titel": "M.Sc.",
              "name": "Schulze",
              "gruppen": "4-5",
              "erlaeuterung": "Seminar in 2 Gruppen, Blockveranstaltung ungerader Wochen, Mittwoch 13:30-17:00 Uhr"
            }
          ],
          "praktikumsleiter": {
            "titel": "",
            "name": "Wagner",
            "gruppen": "1-5",
            "erlaeuterung": "Praktikum in Einzelgruppen, wöchentlich wechselnd: Gruppe 1+2 (KW42,44,...), Gruppe 3+4 (KW43,45,...), Gruppe 5 (flexibel)"
          }
        }
      }, null, 2);
    });
  }
});

// frontend: dynamisches Laden / Übernehmen gespeicherter JSONs
// Frontend: Separate UI für Zuarbeit und Dozenten
// Frontend: Separate UI für Zuarbeit und Dozenten
(function initSeparateJsonUIs() {
  // Zuarbeit UI
  initJsonUI(
    'saved-zuarbeit',
    'zuarbeit-input', 
    'load-zuarbeit-btn',
    'refresh-zuarbeit-btn',
    'zuarbeit'
  );

  // Dozenten UI
  initJsonUI(
    'saved-dozenten',
    'dozenten-input',
    'load-dozenten-btn', 
    'refresh-dozenten-btn',
    'dozenten'
  );

  function initJsonUI(selectId, inputId, loadBtnId, refreshBtnId, type) {
    const select = document.getElementById(selectId);
    const input = document.getElementById(inputId);
    const loadBtn = document.getElementById(loadBtnId);
    const refreshBtn = document.getElementById(refreshBtnId);
    const jsonTextarea = document.getElementById('json-input');

    async function fetchList() {
      try {
        const r = await fetch(`/api/json-list/${type}`);
        const list = await r.json();
        return list;
      } catch (err) {
        console.error(`Fehler beim Laden der ${type} Liste`, err);
        return [];
      }
    }

    function populateSelect(list) {
      select.innerHTML = '<option value="">-- keine ausgewählt --</option>';
      for (const item of list) {
        const opt = document.createElement('option');
        opt.value = item.filename;
        opt.textContent = item.id;
        if (item._error) opt.title = 'Fehlerhaftes JSON';
        select.appendChild(opt);
      }
    }

    async function refreshList() {
      const list = await fetchList();
      populateSelect(list);
    }

    // Initial laden
    refreshList();

    // Refresh Button
    refreshBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      refreshList();
    });

    // Laden Button - NEU: Sucht nur im entsprechenden Unterordner
    loadBtn?.addEventListener('click', async (e) => {
      e.preventDefault();
      const selectedFilename = select.value;
      const typed = (input.value || '').trim();

      try {
        let data = null;

        if (selectedFilename) {
          // Laden by filename aus dem entsprechenden Unterordner
          const r = await fetch(`/api/json-file/${type}/` + encodeURIComponent(selectedFilename));
          if (!r.ok) throw new Error('Datei konnte nicht geladen werden');
          data = await r.json();
        } else if (typed) {
          // NEU: Suche nur im entsprechenden Unterordner
          const list = await fetchList();
          const foundItem = list.find(item => 
            item.id.toLowerCase() === typed.toLowerCase() ||
            item.filename.toLowerCase() === typed.toLowerCase() ||
            item.filename.toLowerCase() === (typed + '.json').toLowerCase()
          );

          if (foundItem) {
            const r = await fetch(`/api/json-file/${type}/` + encodeURIComponent(foundItem.filename));
            if (!r.ok) throw new Error('Datei konnte nicht geladen werden');
            data = await r.json();
          } else {
            // Fallback: Versuche direkten Dateizugriff
            let tryName = typed.endsWith('.json') ? typed : typed + '.json';
            const r = await fetch(`/api/json-file/${type}/` + encodeURIComponent(tryName));
            if (r.ok) {
              data = await r.json();
            } else {
              throw new Error('Keine passende Datei/ID im ' + type + ' Ordner gefunden');
            }
          }
        } else {
          alert('Bitte eine Datei auswählen oder eine ID eingeben.');
          return;
        }

        // JSON in Textarea einfügen
        jsonTextarea.value = JSON.stringify(data, null, 2);
        
        // Automatisch Template wechseln basierend auf Typ
        if (typeof switchTemplate === 'function') {
          if (type === 'zuarbeit' && window.currentTemplate !== 'zuarbeit') {
            switchTemplate();
          } else if (type === 'dozenten' && window.currentTemplate !== 'dozent') {
            switchTemplate();
          }
        }

        // Approval Status aktualisieren
        try { 
          if (typeof renderApprovalStatusFromObject === 'function') 
            renderApprovalStatusFromObject(data); 
        } catch(e) { 
          console.warn('renderApprovalStatusFromObject error', e); 
        }

      } catch (err) {
        console.error(err);
        alert('Fehler beim Laden der JSON: ' + (err.message || err));
      }
    });

    // NEU: Enter-Taste in Eingabefeld unterstützen
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        loadBtn.click();
      }
    });
  }
})();

async function loadSelectedIntoTextarea() {
  const dozentSel = document.getElementById("saved-dozenten");
  const zuarbeitSel = document.getElementById("saved-zuarbeit");
  if (!dozentSel || !zuarbeitSel)
    return alert("Fehlende UI-Elemente für gespeicherte JSON-Daten.");

  const sel = dozentSel.value || zuarbeitSel.value;
  if (!sel) return alert("Bitte zunächst ein gespeichertes JSON auswählen.");

  const [file, id] = sel.split("||");
  try {
    const res = await fetch(
      `/json/get?file=${encodeURIComponent(file)}&id=${encodeURIComponent(id)}`
    );
    if (!res.ok) throw new Error("JSON nicht gefunden");
    const jsonData = await res.json();
    const jsonInput = document.getElementById("json-input");
    if (!jsonInput) return alert("json-input nicht gefunden.");
    
    // Create appropriate JSON structure based on type
    let jsonToDisplay;
    if (file.includes('dozentenblatt')) {
      jsonToDisplay = { dozent: jsonData };
    } else if (file.includes('zuarbeitsblatt')) {
      jsonToDisplay = { modul: jsonData };
    } else {
      jsonToDisplay = jsonData;
    }
    
    jsonInput.value = JSON.stringify(jsonToDisplay, null, 2);
    
    if (typeof switchTemplate === "function") {
      const wantDozent = file.toLowerCase().includes("dozenten");
      const wantZuar =
        file.toLowerCase().includes("zuarbeit") ||
        file.toLowerCase().includes("zuarbeits");
      if (typeof window.currentTemplate !== "undefined") {
        if (wantDozent && window.currentTemplate !== "dozent") switchTemplate();
        if (wantZuar && window.currentTemplate !== "zuarbeit") switchTemplate();
      } else {
        if (wantDozent) switchTemplate();
        if (wantZuar) switchTemplate();
      }
    }
  } catch (err) {
    console.error("loadSelectedIntoTextarea error:", err);
    alert("Konnte JSON nicht laden: " + (err.message || err));
  }
}

// Neue Funktion für automatische Aktualisierung nach Speichern
async function performAutoUpdateAfterSave(target) {
  try {
    // 1. Auswahl in Eingabe übernehmen
    if (target.filename) {
      // Lade die aktualisierte JSON-Datei vom Server
      let fetchUrl;
      if (target.type === 'zuarbeit') {
        fetchUrl = `/api/json-file/zuarbeit/${encodeURIComponent(target.filename)}`;
      } else if (target.type === 'dozenten') {
        fetchUrl = `/api/json-file/dozenten/${encodeURIComponent(target.filename)}`;
      } else {
        fetchUrl = `/api/json-file/${encodeURIComponent(target.filename)}`;
      }
      
      const r2 = await fetch(fetchUrl);
      if (r2.ok) {
        const obj = await r2.json();
        
        // Setze die aktualisierte JSON in die Textarea
        document.getElementById('json-input').value = JSON.stringify(obj, null, 2);
        
        // 2. Formular aus Eingabe füllen (mit richtiger Funktion je nach aktuellem Template)
        if (window.currentTemplate === 'zuarbeit') {
          // Für Zuarbeitsblatt: verwende fillZuarbeitsblatt
          if (typeof fillZuarbeitsblatt === 'function') {
            fillZuarbeitsblatt(obj);
          }
        } else if (window.currentTemplate === 'dozent') {
          // Für Dozentenblatt: verwende fillDozentenblatt
          if (typeof fillDozentenblatt === 'function') {
            fillDozentenblatt(obj);
          }
        } else {
          // Fallback: automatisch erkennen basierend auf JSON-Struktur
          if (obj.modul && typeof fillZuarbeitsblatt === 'function') {
            fillZuarbeitsblatt(obj);
            // Setze Template auf Zuarbeit falls nicht bereits gesetzt
            if (window.currentTemplate !== 'zuarbeit' && typeof switchTemplate === 'function') {
              setTimeout(() => switchTemplate(), 100);
            }
          } else if (obj.dozent && typeof fillDozentenblatt === 'function') {
            fillDozentenblatt(obj);
            // Setze Template auf Dozent falls nicht bereits gesetzt
            if (window.currentTemplate !== 'dozent' && typeof switchTemplate === 'function') {
              setTimeout(() => switchTemplate(), 100);
            }
          }
        }
        
        // Approval Status aktualisieren
        if (typeof renderApprovalStatusFromObject === 'function') {
          renderApprovalStatusFromObject(obj);
        }
        
        console.log('Automatische Aktualisierung erfolgreich durchgeführt');
      }
    } else if (target.id) {
      // Falls nur ID vorhanden ist, versuche die Datei zu finden und zu laden
      const listResponse = await fetch(`/api/json-list/${target.type || 'all'}`);
      if (listResponse.ok) {
        const list = await listResponse.json();
        const foundItem = list.find(item => item.id === target.id);
        
        if (foundItem) {
          // Simuliere Klick auf den entsprechenden "Auswahl in Eingabe übernehmen" Button
          if (target.type === 'zuarbeit' || (!target.type && window.currentTemplate === 'zuarbeit')) {
            document.getElementById('saved-zuarbeit').value = foundItem.filename;
            // Führe das Laden aus und warte darauf
            await simulateLoadButtonClick('load-zuarbeit-btn');
          } else if (target.type === 'dozenten' || (!target.type && window.currentTemplate === 'dozent')) {
            document.getElementById('saved-dozenten').value = foundItem.filename;
            // Führe das Laden aus und warte darauf
            await simulateLoadButtonClick('load-dozenten-btn');
          }
        }
      }
    }
  } catch (error) {
    console.warn('Automatische Aktualisierung fehlgeschlagen:', error);
    // Kein Fehler anzeigen, da die Hauptfunktion bereits erfolgreich war
  }
}

// Hilfsfunktion zum Simulieren eines Button-Klicks und Warten auf Abschluss
async function simulateLoadButtonClick(buttonId) {
  return new Promise((resolve) => {
    const button = document.getElementById(buttonId);
    if (button) {
      // Temporärer Event-Listener um zu wissen wann das Laden abgeschlossen ist
      const originalOnClick = button.onclick;
      button.onclick = async function(e) {
        if (originalOnClick) await originalOnClick(e);
        resolve();
      };
      button.click();
      // Fallback: nach 2 Sekunden auflösen
      setTimeout(resolve, 2000);
    } else {
      resolve();
    }
  });
}

// ----------------------
// Speichere Genehmigungsstatus: Sende den Zustand der Checkboxen an den Server und aktualisiere das JSON/Statusfeld
// ----------------------
async function determineTargetFromUIOrTextarea() {
  // Bestimme zuerst den Typ (Zuarbeit oder Dozenten) basierend auf der Auswahl
  const selDoz = document.getElementById('saved-dozenten');
  const selZu = document.getElementById('saved-zuarbeit');
  const inputDoz = document.getElementById('dozenten-input');
  const inputZu = document.getElementById('zuarbeit-input');

  let type = null;
  let selectedFilename = null;
  let typed = null;

  // Priorität: Zuerst Auswahl in den Dropdowns prüfen
  if (selDoz && selDoz.value) {
    type = 'dozenten';
    selectedFilename = selDoz.value;
  } else if (selZu && selZu.value) {
    type = 'zuarbeit';
    selectedFilename = selZu.value;
  } 
  // Dann Eingabefelder prüfen
  else if (inputDoz && inputDoz.value.trim()) {
    type = 'dozenten';
    typed = inputDoz.value.trim();
  } else if (inputZu && inputZu.value.trim()) {
    type = 'zuarbeit';
    typed = inputZu.value.trim();
  }
  // Fallback: Aktuelles Template verwenden
  else {
    type = window.currentTemplate === 'dozent' ? 'dozenten' : 'zuarbeit';
  }

  if (selectedFilename) {
    return { filename: selectedFilename, type: type, id: null };
  }

  if (typed) {
    // Suche in den Unterordnern
    try {
      const r = await fetch(`/api/json-list/${type}`);
      if (r.ok) {
        const list = await r.json();
        const foundItem = list.find(item => 
          item.id.toLowerCase() === typed.toLowerCase() ||
          item.filename.toLowerCase() === typed.toLowerCase() ||
          item.filename.toLowerCase() === (typed + '.json').toLowerCase()
        );

        if (foundItem) {
          return { filename: foundItem.filename, type: type, id: typed };
        }
      }
    } catch (e) {
      console.warn('Suche in Unterordner fehlgeschlagen', e);
    }
    
    return { filename: null, type: type, id: typed };
  }

  // Fallback: parse textarea
  const ta = document.getElementById('json-input');
  if (ta && ta.value.trim()) {
    try {
      const obj = JSON.parse(ta.value);
      // Prüfe die Struktur um den Typ zu bestimmen
      if (obj.dozent) {
        return { filename: null, type: 'dozenten', id: obj.id || obj.ID || (obj.dozent && (obj.dozent.id || obj.dozent.ID || obj.dozent.nachname)) };
      } else if (obj.modul) {
        return { filename: null, type: 'zuarbeit', id: obj.id || obj.ID || (obj.modul && (obj.modul.id || obj.modul.ID || obj.modul.modulnr)) };
      }
    } catch (e) { /* ignore */ }
  }

  return { filename: null, type: type, id: null };
}


async function saveApprovalToServer() {
  try {
    const userRole = await getUserRole();
    if (!userRole) {
      alert('Fehler: Benutzerrolle konnte nicht ermittelt werden.');
      return;
    }

    const roleCheckboxes = {
      'Dekan': 'checkbox-dekan',
      'Studienamt': 'checkbox-studienamt',
      'Studiendekan': 'checkbox-studiendekan'
    };

    const userCheckboxId = roleCheckboxes[userRole];
    if (!userCheckboxId) {
      alert('Ihre Rolle hat keine Berechtigung zum Bestätigen von Freigaben.');
      return;
    }

    const userCheckbox = document.getElementById(userCheckboxId);
    if (!userCheckbox) {
      alert('Checkbox für Ihre Rolle nicht gefunden.');
      return;
    }

    // Nur die eigene Rolle senden
    const approvals = {
      [userRole]: userCheckbox.checked ? 'ja' : 'nein'
    };

    // Bestimme Ziel MIT Typ-Information
    let target = await determineTargetFromUIOrTextarea();

    // Füge Typ-Information zur Payload hinzu
    const payload = { 
      filename: target.filename, 
      id: target.id, 
      type: target.type,
      approvals 
    };

    console.log('Saving approval with payload:', payload);

    const r = await fetch('/api/save-approval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      let txt;
      try { txt = await r.text(); } catch (e) { txt = r.statusText || 'Fehler'; }
      console.error('Server responded with error', r.status, txt);
      return alert('Speichern fehlgeschlagen: ' + txt);
    }

    alert(`Freigabe als ${userRole} wurde gespeichert.`);

    // AUTOMATISCHE AKTUALISIERUNG: Auswahl in Eingabe übernehmen + Formular füllen
    await performAutoUpdateAfterSave(target);

  } catch (err) {
    console.error('saveApprovalToServer error', err);
    alert('Speichern fehlgeschlagen: ' + (err.message || err));
  }
}

// Hilfsfunktion zur Rollenabfrage
async function getUserRole() {
  try {
    const response = await fetch('/check-auth');
    const data = await response.json();
    return data.authenticated ? data.user.role : null;
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzerrolle:', error);
    return null;
  }
}
// bind speichern button if present
document.addEventListener('DOMContentLoaded', function() {
 setTimeout(() => {
    setupApprovalPermissions();
    renderApprovalStatusFromTextarea();
  }, 500);

  // Save-Button Event Listener
  const saveBtn = document.getElementById('save-approval-btn');
  if (saveBtn) saveBtn.addEventListener('click', saveApprovalToServer);
});


// rekursive Suche nach einem Objekt mit key 'approvals'
function findApprovalsDeep(obj) {
  if (!obj || typeof obj !== 'object') return null;
  if (Object.prototype.hasOwnProperty.call(obj, 'approvals') && obj.approvals && typeof obj.approvals === 'object') {
    return obj.approvals;
  }
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    const v = obj[k];
    if (v && typeof v === 'object') {
      const found = findApprovalsDeep(v);
      if (found) return found;
    }
  }
  return null;
}

function normalizeApprovalValue(v) {
  if (v === true) return 'ja';
  if (v === false) return 'nein';
  if (v == null) return 'nein';
  return String(v).trim().toLowerCase() === 'ja' ? 'ja' : 'nein';
}

// Baut eine lesbare Status-Zeile aus approvals-Objekt
function buildApprovalStatusLine(approvals) {
  if (!approvals || typeof approvals !== 'object') return '';
  const parts = [];
  // die Reihenfolge: Dekan, Studienamt, Studiendekan
  const roles = ['Dekan', 'Studienamt', 'Studiendekan'];
  for (const r of roles) {
    const raw = approvals[r] ?? approvals[r.toLowerCase()] ?? approvals[r.toUpperCase()];
    const val = normalizeApprovalValue(raw);
    parts.push(`${r}: ${val === 'ja' ? 'bestätigt' : 'nicht bestätigt'}`);
  }
  return parts.join(' · ');
}

// rendert aus einem bereits geparsten JSON-Objekt
function renderApprovalStatusFromObject(parsed) {
  try {
    // ensure container exists: try to append under an element with id 'approval-area' or at the end of form
    var container = document.getElementById('approval-status');
    if (!container) {
      var approvalArea = document.getElementById('approval-area');
      if (approvalArea && approvalArea.parentNode) {
        container = document.createElement('div');
        container.id = 'approval-status';
        container.style.marginTop = '8px';
        container.style.fontSize = '13px';
        container.style.color = '#374151';
        approvalArea.parentNode.insertBefore(container, approvalArea.nextSibling);
      } else {
        // fallback: try to find a place near the form
        var form = document.querySelector('form') || document.body;
        container = document.createElement('div');
        container.id = 'approval-status';
        container.style.marginTop = '8px';
        container.style.fontSize = '13px';
        container.style.color = '#374151';
        form.appendChild(container);
      }
    }
    const approvals = findApprovalsDeep(parsed);
    if (!approvals) {
      container.textContent = 'Keine Freigaben gefunden.';
      return;
    }
    container.textContent = buildApprovalStatusLine(approvals);
  } catch (err) {
    console.warn('renderApprovalStatusFromObject error', err);
  }
}

// liest die textarea und rendert
function renderApprovalStatusFromTextarea() {
  const ta = document.getElementById('json-input');
  if (!ta) return;
  try {
    const parsed = JSON.parse(ta.value || '{}');
    renderApprovalStatusFromObject(parsed);
  } catch (err) {
    const container = document.getElementById('approval-status');
    if (container) container.textContent = '';
  }
}

// Wenn JSON per Fetch geladen wird, rufe renderApprovalStatusFromObject(obj) direkt danach auf.
// Versuche beim Laden einmal automatisch, falls textarea schon Inhalt hat
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(renderApprovalStatusFromTextarea, 200);
});




/* --------- Hinzugefügter Initialisierungs-Code (aus HTML entfernt) ---------
   Dieser Block führt die Authentifizierungsprüfung durch, setzt den Benutzernamen
   ins UI und hängt Event-Listener an Buttons (Abmelden, PDF-Manager, Template-Wechsel).
   Kommentare nur auf Deutsch wie gewünscht.
------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  // Authentifizierungsprüfung: Anfrage an '/check-auth' senden
  try {
    fetch('/check-auth')
      .then(function(response) { return response.json(); })
      .then(function(data) {
        if (!data.authenticated) {
          // Bei fehlender Authentifizierung: Weiterleitung zur Login-Seite
          window.location.href = '/login.html';
        } else {
          var cu = document.getElementById('currentUser');
          if (cu) cu.textContent = data.user && data.user.role ? data.user.role : '';
        }
      })
      .catch(function(error) {
        console.error('Auth check failed:', error);
        window.location.href = '/login.html';
      });
  } catch (e) {
    console.error('Fehler bei Authentifizierungsprüfung:', e);
  }

  // Abmelden-Button: fetch an /Abmelden und Weiterleitung
  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      fetch('/logout').then(function() {
        window.location.href = '/login.html';
      }).catch(function(e) {
        console.error('Fehler beim Logout:', e);
      });
    });
  }

  // PDF-Manager Button: Navigation zur Seite
  var pdfBtn = document.getElementById('pdf-manager-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', function () {
      window.location.href = 'pdf-manager.html';
    });
  }

// Schaltfläche: Template-Wechsel (ruft switchTemplate() auf, falls vorhanden)
  var switchBtn = document.getElementById('switch-template-btn');
  if (switchBtn) {
    switchBtn.addEventListener('click', function () {
      if (typeof switchTemplate === 'function') {
        try { switchTemplate(); } catch (e) { console.error(e); }
      } else {
        // Funktion nicht gefunden: nur loggen (keine Wirkung)
        console.warn('switchTemplate() ist nicht definiert.');
      }
    });
  }
});

