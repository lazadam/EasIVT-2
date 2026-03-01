// ============================================================
// EasIVT v2.0 - Calculateur IVT & Analyseur OCT
// ============================================================

// =================== DONNEES ===================
const medicationData = {
  anti_vegf: [
    { name: "Lucentis", molecule: "Ranibizumab", dose: "0.5mg", intervals: "4-12 semaines", amm: true, indications: ["DMLA", "Diabetique", "OVCR/OBVR"], minWeeks: 4, maxWeeks: 12, loadingDose: 3 },
    { name: "Eylea", molecule: "Aflibercept", dose: "2mg", intervals: "4-16 semaines", amm: true, indications: ["DMLA", "Diabetique", "OVCR/OBVR"], minWeeks: 4, maxWeeks: 16, loadingDose: 3 },
    { name: "Eylea HD", molecule: "Aflibercept", dose: "8mg", intervals: "8-16 semaines", amm: true, indications: ["DMLA", "Diabetique"], minWeeks: 8, maxWeeks: 16, loadingDose: 3 },
    { name: "Vabysmo", molecule: "Faricimab", dose: "6mg", intervals: "8-16 semaines", amm: true, indications: ["DMLA", "Diabetique"], minWeeks: 8, maxWeeks: 16, loadingDose: 4 },
    { name: "Beovu", molecule: "Brolucizumab", dose: "6mg", intervals: "8-12 semaines", amm: true, indications: ["DMLA"], minWeeks: 8, maxWeeks: 12, loadingDose: 3 },
    { name: "Avastin", molecule: "Bevacizumab", dose: "1.25mg", intervals: "4-8 semaines", amm: false, indications: ["DMLA", "Diabetique", "OVCR/OBVR"], minWeeks: 4, maxWeeks: 8, loadingDose: 3 }
  ],
  corticoids: [
    { name: "Ozurdex", molecule: "Dexamethasone", dose: "0.7mg", type: "implant", duration: "4-6 mois", amm: true, indications: ["Diabetique", "OVCR/OBVR", "Uveites"], minWeeks: 16, maxWeeks: 26 },
    { name: "Kenacort", molecule: "Triamcinolone", dose: "4mg", type: "injection", duration: "3-4 mois", amm: false, indications: ["Diabetique", "OVCR/OBVR", "Uveites", "Irvine-Gass"], minWeeks: 12, maxWeeks: 16 }
  ]
};

const pathologyData = {
  dmla: { name: "DMLA humide", nameEn: "Wet AMD", first_line: ["Lucentis", "Eylea", "Eylea HD", "Vabysmo", "Beovu"], protocol: "3 injections mensuelles puis Treat & Extend" },
  diabetic: { name: "Maculopathie diabetique", nameEn: "Diabetic maculopathy", first_line: ["Lucentis", "Eylea", "Eylea HD", "Vabysmo"], alternatives: ["Ozurdex"], protocol: "Injections mensuelles puis extension" },
  rvo: { name: "Occlusions veineuses", nameEn: "Retinal vein occlusions", first_line: ["Lucentis", "Eylea", "Eylea HD", "Vabysmo", "Beovu", "Avastin"], alternatives: ["Ozurdex"], protocol: "Tous anti-VEGF autorises" },
  irvine_gass: { name: "Syndrome d'Irvine-Gass", nameEn: "Irvine-Gass syndrome", first_line: ["AINS topiques", "Acetazolamide"], second_line: ["Ozurdex"], protocol: "Escalade therapeutique" },
  uveitis: { name: "Uveites", nameEn: "Uveitis", first_line: ["Ozurdex"], protocol: "Selon severite et reponse" }
};

// =================== TRADUCTIONS ===================
const translations = {
  fr: {
    "nav.calculator": "Calculateur", "nav.scheduler": "Planificateur", "nav.oct": "OCT", "nav.medications": "Medicaments",
    "hero.title": "Calculateur IVT", "hero.subtitle": "Calcul de prochaine injection & prochains RDV",
    "calculator.title": "Calculateur de prochaine injection", "calculator.calculate": "Calculer prochaine injection", "calculator.result": "Resultat :",
    "delay.result": "Delai :", "scheduler.title": "Planificateur d'injections", "scheduler.subtitle": "Generez un schema complet d'injections",
    "scheduler.generate": "Generer les dates", "medications.hero_title": "Base de donnees Medicaments IVT",
    "medications.hero_subtitle": "Reference des molecules disponibles", "medications.anti_vegf": "Anti-VEGF", "medications.corticoids": "Corticoides",
    "recommendations.title": "Recommandations therapeutiques",
    "oct.title": "Analyseur OCT Spectralis", "oct.subtitle": "Suivi d'evolution et aide a la decision", "oct.add_visit": "Ajouter cette visite",
    "disclaimer.title": "Avertissement legal"
  },
  en: {
    "nav.calculator": "Calculator", "nav.scheduler": "Scheduler", "nav.oct": "OCT", "nav.medications": "Medications",
    "hero.title": "IVT Calculator", "hero.subtitle": "Next injection calculation & upcoming appointments",
    "calculator.title": "Next injection calculator", "calculator.calculate": "Calculate next injection", "calculator.result": "Result:",
    "delay.result": "Delay:", "scheduler.title": "Injection Scheduler", "scheduler.subtitle": "Generate a complete injection schedule",
    "scheduler.generate": "Generate dates", "medications.hero_title": "IVT Medications Database",
    "medications.hero_subtitle": "Complete reference of available molecules", "medications.anti_vegf": "Anti-VEGF", "medications.corticoids": "Corticosteroids",
    "recommendations.title": "Therapeutic recommendations",
    "oct.title": "OCT Analyzer - Spectralis", "oct.subtitle": "Follow-up and decision support", "oct.add_visit": "Add this visit",
    "disclaimer.title": "Legal disclaimer"
  }
};

let currentLanguage = 'fr';
let octVisits = [];
let patients = [];
let currentPatientId = null;
let currentOCTImageData = null;

// =================== INITIALISATION ===================
document.addEventListener('DOMContentLoaded', function () {
  // Modal professionnel
  const confirmBtn = document.getElementById('confirm-professional');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function () {
      document.getElementById('professional-warning').classList.add('hidden');
      document.getElementById('main-content').classList.remove('hidden');
    });
  }

  // Langue
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.addEventListener('change', function () {
      currentLanguage = this.value;
      updateLanguage();
    });
  }

  // Tabs
  setupTabs();
  setupCalculator();
  setupDelayCalculator();
  setupScheduler();
  renderMedications();
  renderPathologyRecommendations();
  setupOCTAnalyzer();
  loadOCTVisits();
  setupPatientsTab();
  loadPatients();
  setupExamTab();

  // Date default today
  const today = new Date().toISOString().split('T')[0];
  ['oct-visit-date', 'exam-date', 'ivt-start-date'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.value) el.value = today;
  });

  // Populate scheduler medication
  populateSchedulerMeds();
});

// =================== TABS ===================
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('tab-' + this.dataset.tab);
      if (target) target.classList.add('active');

      // Refresh exam patient list
      if (this.dataset.tab === 'exam') refreshExamPatientList();
    });
  });
}

// =================== CALCULATOR ===================
function setupCalculator() {
  const pathologySelect = document.getElementById('pathology');
  const calculateBtn = document.getElementById('calculate-btn');
  const calculateRdvBtn = document.getElementById('calculate-rdv-btn');

  if (pathologySelect) {
    pathologySelect.addEventListener('change', function () {
      updateMedicationOptions(this.value);
      highlightActivePathology(this.value);
    });
  }
  if (calculateBtn) calculateBtn.addEventListener('click', calculateNextInjection);
  if (calculateRdvBtn) calculateRdvBtn.addEventListener('click', calculateNextRDV);
}

function updateMedicationOptions(pathology) {
  const medSelect = document.getElementById('medication');
  if (!medSelect) return;
  medSelect.innerHTML = '<option value="">-- Selectionner --</option>';

  const allMeds = [...medicationData.anti_vegf, ...medicationData.corticoids];
  const indicationMap = { dmla: "DMLA", diabetic: "Diabetique", rvo: "OVCR/OBVR", irvine_gass: "Irvine-Gass", uveitis: "Uveites" };
  const indication = indicationMap[pathology];

  allMeds.forEach(med => {
    if (!indication || (med.indications && med.indications.indexOf(indication) !== -1)) {
      const option = document.createElement('option');
      option.value = med.name;
      option.textContent = med.name + ' (' + med.molecule + ')' + (med.amm ? '' : ' [Hors AMM]');
      medSelect.appendChild(option);
    }
  });
}

function highlightActivePathology(pathology) {
  document.querySelectorAll('.pathology-card').forEach(card => {
    card.classList.toggle('active', card.dataset.pathology === pathology);
  });
}

function calculateNextInjection() {
  const lastDate = document.getElementById('last-injection-date').value;
  const interval = parseInt(document.getElementById('interval').value);

  if (!lastDate || !interval) {
    alert(currentLanguage === 'en' ? 'Please enter date and interval.' : 'Veuillez saisir la date et l\'intervalle.');
    return;
  }

  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + interval * 7);

  const medication = document.getElementById('medication').value;
  const pathology = document.getElementById('pathology').value;

  let html = '<p><strong>' + (currentLanguage === 'en' ? 'Next injection:' : 'Prochaine injection :') + '</strong> ' + formatDate(nextDate) + '</p>';

  if (medication) {
    const allMeds = [...medicationData.anti_vegf, ...medicationData.corticoids];
    const medInfo = allMeds.find(m => m.name === medication);
    if (medInfo && !medInfo.amm) {
      html += '<p style="color:var(--rose);font-size:0.78rem;font-weight:600;">Hors AMM - Responsabilite du prescripteur</p>';
    }
  }

  const resultDiv = document.getElementById('result');
  const contentDiv = document.getElementById('result-content');
  if (contentDiv) contentDiv.innerHTML = html;
  if (resultDiv) resultDiv.classList.remove('hidden');
}

// =================== NEXT RDV ===================
function calculateNextRDV() {
  const lastDate = document.getElementById('next-rdv-last-date').value;
  const interval = parseInt(document.getElementById('next-rdv-interval').value);
  const protocol = document.getElementById('next-rdv-protocol').value;
  const count = parseInt(document.getElementById('next-rdv-count').value);

  if (!lastDate || !interval || !count) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  const startDate = new Date(lastDate);
  const rdvs = [];
  let currentDate = new Date(startDate);
  let currentInterval = interval;

  for (let i = 0; i < count; i++) {
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + currentInterval * 7);

    rdvs.push({ type: 'injection', date: new Date(currentDate), interval: currentInterval });

    if (protocol === 'te') {
      const evalDate = new Date(currentDate);
      evalDate.setDate(evalDate.getDate() + 21);
      rdvs.push({ type: 'consultation', date: evalDate, reason: 'Evaluation efficacite' });
      currentInterval = Math.min(currentInterval + 2, 16);
    } else if (protocol === 'prn') {
      const preDate = new Date(currentDate);
      preDate.setDate(preDate.getDate() - 7);
      rdvs.push({ type: 'consultation', date: preDate, reason: 'Evaluation besoin (PRN)' });
    }
  }

  rdvs.sort((a, b) => a.date - b.date);

  let html = '<div class="rdv-timeline">';
  rdvs.forEach(rdv => {
    const dateStr = formatDate(rdv.date);
    if (rdv.type === 'injection') {
      html += '<div class="rdv-item rdv-injection"><span class="rdv-icon">&#128137;</span><div class="rdv-details"><strong>Injection</strong><span class="rdv-date">' + dateStr + '</span><br><span class="rdv-interval">q' + rdv.interval + 'S</span></div></div>';
    } else {
      html += '<div class="rdv-item rdv-consultation"><span class="rdv-icon">&#128064;</span><div class="rdv-details"><strong>' + rdv.reason + '</strong><span class="rdv-date">' + dateStr + '</span></div></div>';
    }
  });
  html += '</div>';

  document.getElementById('rdv-content').innerHTML = html;
  document.getElementById('rdv-result').classList.remove('hidden');
}

// =================== DELAY CALCULATOR ===================
function setupDelayCalculator() {
  const btn = document.getElementById('calculate-delay-btn');
  if (btn) btn.addEventListener('click', calculateDelay);
}

function calculateDelay() {
  const date1 = document.getElementById('first-injection-date').value;
  const date2 = document.getElementById('second-injection-date').value;

  if (!date1 || !date2) {
    alert('Veuillez saisir les deux dates.');
    return;
  }

  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffDays = Math.abs(Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));
  const diffWeeks = Math.floor(diffDays / 7);
  const remainDays = diffDays % 7;

  let html = '<p><strong>' + diffDays + ' jours</strong> (' + diffWeeks + ' semaines';
  if (remainDays > 0) html += ' et ' + remainDays + ' jours';
  html += ')</p>';

  document.getElementById('delay-content').innerHTML = html;
  document.getElementById('delay-result').classList.remove('hidden');
}

// =================== SCHEDULER ===================
function setupScheduler() {
  const protocolSelect = document.getElementById('ivt-protocol');
  const generateBtn = document.getElementById('generate-dates-btn');

  if (protocolSelect) {
    protocolSelect.addEventListener('change', function () {
      document.getElementById('te-params').style.display = this.value === 'te' ? 'block' : 'none';
      document.getElementById('ozurdex-params').style.display = this.value === 'ozurdex_initial' ? 'block' : 'none';
    });
  }
  if (generateBtn) generateBtn.addEventListener('click', generateIVTPlan);
}

function populateSchedulerMeds() {
  const select = document.getElementById('scheduler-medication');
  if (!select) return;
  const allMeds = [...medicationData.anti_vegf, ...medicationData.corticoids];
  allMeds.forEach(med => {
    const option = document.createElement('option');
    option.value = med.name;
    option.textContent = med.name + ' (' + med.molecule + ')';
    select.appendChild(option);
  });
}

function generateIVTPlan() {
  const startDateStr = document.getElementById('ivt-start-date').value;
  const protocol = document.getElementById('ivt-protocol').value;
  const selectedMed = document.getElementById('scheduler-medication').value;

  if (!startDateStr) { alert('Veuillez selectionner une date.'); return; }

  const start = new Date(startDateStr);
  const dates = [], intervals = [], notes = [];

  switch (protocol) {
    case 'loading':
      for (let i = 0; i < 3; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i * 30);
        dates.push(d); intervals.push(i === 0 ? 0 : 4); notes.push(i === 0 ? 'Debut' : 'Dose de charge');
      }
      break;
    case 'loading4':
      for (let i = 0; i < 4; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i * 28);
        dates.push(d); intervals.push(i === 0 ? 0 : 4); notes.push(i === 0 ? 'Debut' : 'Dose de charge');
      }
      break;
    case 'te': {
      const initInt = parseInt(document.getElementById('te-initial-interval').value) || 6;
      const extStep = parseInt(document.getElementById('te-extension-step').value) || 2;
      const maxInt = parseInt(document.getElementById('te-max-interval').value) || 12;
      for (let i = 0; i < 3; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i * 28);
        dates.push(d); intervals.push(i === 0 ? 0 : 4); notes.push(i === 0 ? 'Debut (charge)' : 'Dose de charge');
      }
      let ci = initInt, last = dates[dates.length - 1], ec = 0;
      while (ci <= maxInt && ec < 8) {
        const d = new Date(last); d.setDate(last.getDate() + ci * 7);
        dates.push(d); intervals.push(ci); notes.push('T&E q' + ci + 'S');
        last = d; ci = Math.min(ci + extStep, maxInt); ec++;
      }
      break;
    }
    case 'ozurdex_initial': {
      dates.push(new Date(start)); intervals.push(0); notes.push('Ozurdex #1');
      const pio = new Date(start); pio.setDate(start.getDate() + 10);
      dates.push(pio); intervals.push(0); notes.push('Controle PIO');
      const eval1 = new Date(start); eval1.setMonth(start.getMonth() + 1);
      dates.push(eval1); intervals.push(0); notes.push('Evaluation M1');
      const reinj = new Date(start); reinj.setMonth(start.getMonth() + 3);
      dates.push(reinj); intervals.push(0); notes.push('Ozurdex #2 (si efficace)');
      const pio2 = new Date(reinj); pio2.setDate(reinj.getDate() + 10);
      dates.push(pio2); intervals.push(0); notes.push('Controle PIO');
      break;
    }
    case 'fixed':
      for (let i = 0; i < 6; i++) {
        const d = new Date(start); d.setMonth(start.getMonth() + i);
        dates.push(d); intervals.push(i === 0 ? 0 : 4); notes.push(i === 0 ? 'Debut' : 'Mensuel');
      }
      break;
    case 'bimonthly':
      for (let i = 0; i < 6; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i * 56);
        dates.push(d); intervals.push(i === 0 ? 0 : 8); notes.push(i === 0 ? 'Debut' : 'q8S');
      }
      break;
  }

  const listDiv = document.getElementById('ivt-dates-list');
  const resultDiv = document.getElementById('ivt-dates-result');
  const summaryDiv = document.getElementById('schedule-summary');

  if (listDiv) {
    listDiv.innerHTML = '';
    dates.forEach((date, i) => {
      const item = document.createElement('div');
      item.className = 'schedule-item';
      item.innerHTML = '<span class="schedule-item-number">' + (i + 1) + '</span>'
        + '<div style="flex:1;"><span class="schedule-item-date">' + formatDateShort(date) + '</span>'
        + (notes[i] ? '<span class="schedule-item-note">' + notes[i] + '</span>' : '') + '</div>'
        + '<span class="schedule-item-info">' + (intervals[i] > 0 ? 'q' + intervals[i] + 'S' : '') + '</span>';
      listDiv.appendChild(item);
    });
  }

  if (summaryDiv && dates.length > 1) {
    const totalDays = Math.ceil((dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24));
    summaryDiv.innerHTML = '<strong>Resume : </strong>' + dates.length + ' RDV sur ' + Math.floor(totalDays / 7) + ' semaines' + (selectedMed ? ' (' + selectedMed + ')' : '');
  }

  if (resultDiv) resultDiv.style.display = '';
}

// =================== MEDICATIONS ===================
function renderMedications() {
  const antiVegfList = document.getElementById('anti-vegf-list');
  const corticoidsList = document.getElementById('corticoids-list');

  if (antiVegfList) {
    antiVegfList.innerHTML = '';
    medicationData.anti_vegf.forEach(med => antiVegfList.appendChild(createMedCard(med)));
  }
  if (corticoidsList) {
    corticoidsList.innerHTML = '';
    medicationData.corticoids.forEach(med => corticoidsList.appendChild(createMedCard(med)));
  }
}

function createMedCard(med) {
  const div = document.createElement('div');
  div.className = 'med-card';
  div.innerHTML = '<div class="med-card-name">' + med.name + ' <span class="amm-badge amm-badge--' + (med.amm ? 'yes' : 'no') + '">' + (med.amm ? 'AMM' : 'Hors AMM') + '</span></div>'
    + '<div class="med-card-molecule">' + med.molecule + '</div>'
    + '<div class="med-card-detail"><span>Dose</span><strong>' + med.dose + '</strong></div>'
    + '<div class="med-card-detail"><span>Intervalles</span><strong>' + (med.intervals || med.duration || '') + '</strong></div>'
    + '<div class="med-card-detail"><span>Indications</span><strong>' + (med.indications ? med.indications.join(', ') : '-') + '</strong></div>';
  return div;
}

// =================== PATHOLOGY RECOMMENDATIONS ===================
function renderPathologyRecommendations() {
  const container = document.getElementById('pathology-info');
  if (!container) return;
  container.innerHTML = '';

  Object.keys(pathologyData).forEach(key => {
    const p = pathologyData[key];
    const div = document.createElement('div');
    div.className = 'pathology-card';
    div.dataset.pathology = key;

    let html = '<h4>' + p.name + '</h4>';
    html += '<p><strong>Protocole :</strong> ' + p.protocol + '</p>';
    if (p.first_line) { html += '<p style="font-size:0.72rem;color:var(--text-secondary);">1ere ligne : ' + p.first_line.join(', ') + '</p>'; }
    if (p.alternatives) { html += '<p style="font-size:0.72rem;color:var(--text-secondary);">Alternatives : ' + p.alternatives.join(', ') + '</p>'; }
    if (p.second_line) { html += '<p style="font-size:0.72rem;color:var(--text-secondary);">2e ligne : ' + p.second_line.join(', ') + '</p>'; }

    div.innerHTML = html;
    div.addEventListener('click', function () { showPathologyDetails(key, p); });
    container.appendChild(div);
  });
}

function showPathologyDetails(key, p) {
  const details = {
    dmla: 'DMLA Humide\n\nProtocoles recommandes:\n- Treat & Extend: 3 injections mensuelles, puis extension progressive\n- PRN: Selon reponse clinique et OCT\n\nMedicaments: Lucentis, Eylea, Eylea HD, Vabysmo, Beovu\n\nObjectif: Retine seche, stabilisation AV',
    diabetic: 'Maculopathie Diabetique\n\nAnti-VEGF en 1ere ligne (Eylea, Vabysmo, Lucentis)\nCorticoides (Ozurdex) en alternative\nControle glycemique et tensionnel essentiel\n\nSuivi OCT mensuel initialement',
    rvo: 'Occlusions Veineuses\n\nTous anti-VEGF autorises pour OVR\nOzurdex en alternative\nSuivi ophtalmologique regulier',
    irvine_gass: 'Syndrome Irvine-Gass\n\nNiveau 1: AINS topiques + acetazolamide\nNiveau 2: Triamcinolone (hors AMM)\nNiveau 3: Ozurdex\n\nAvis retine si membrane tractionnelle',
    uveitis: 'Uveites\n\nOzurdex en 1ere intention\nAnti-VEGF si inflammation mal controlee\nTraiter la cause sous-jacente'
  };
  alert(details[key] || p.name + '\n' + p.protocol);
}

// =================== OCT ANALYZER ===================
function setupOCTAnalyzer() {
  const addBtn = document.getElementById('oct-add-visit-btn');
  const clearBtn = document.getElementById('oct-clear-btn');
  const uploadZone = document.getElementById('oct-upload-zone');
  const fileInput = document.getElementById('oct-image-input');

  if (addBtn) addBtn.addEventListener('click', addOCTVisit);
  if (clearBtn) clearBtn.addEventListener('click', function () {
    if (confirm('Reinitialiser toutes les visites ?')) { octVisits = []; saveOCTVisits(); renderOCTVisits(); }
  });

  if (uploadZone && fileInput) {
    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.style.borderColor = 'var(--purple)'; });
    uploadZone.addEventListener('dragleave', () => { uploadZone.style.borderColor = ''; });
    uploadZone.addEventListener('drop', e => {
      e.preventDefault(); uploadZone.style.borderColor = '';
      if (e.dataTransfer.files.length > 0) handleOCTImage(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', function () { if (this.files.length > 0) handleOCTImage(this.files[0]); });
  }

  // Compare selectors
  const compareA = document.getElementById('oct-compare-a');
  const compareB = document.getElementById('oct-compare-b');
  if (compareA) compareA.addEventListener('change', renderOCTComparison);
  if (compareB) compareB.addEventListener('change', renderOCTComparison);
}

function handleOCTImage(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    currentOCTImageData = e.target.result;
    const preview = document.getElementById('oct-image-preview');
    const img = document.getElementById('oct-preview-img');
    if (img) img.src = currentOCTImageData;
    if (preview) preview.classList.remove('hidden');
    const uploadZone = document.getElementById('oct-upload-zone');
    if (uploadZone) uploadZone.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function addOCTVisit() {
  const visitDate = document.getElementById('oct-visit-date').value;
  const crt = parseInt(document.getElementById('oct-crt').value);
  const va = document.getElementById('oct-va').value;
  const interval = parseInt(document.getElementById('oct-interval').value);
  const notes = document.getElementById('oct-notes').value;

  if (!visitDate || !crt) { alert('Date et CRT obligatoires.'); return; }

  const srf = document.querySelector('input[name="oct-srf"]:checked').value;
  const irf = document.querySelector('input[name="oct-irf"]:checked').value;
  const ped = document.querySelector('input[name="oct-ped"]:checked').value;
  const dril = document.querySelector('input[name="oct-dril"]:checked').value;
  const ez = document.querySelector('input[name="oct-ez"]:checked').value;
  const elm = document.querySelector('input[name="oct-elm"]:checked').value;
  const erm = document.querySelector('input[name="oct-erm"]:checked').value;

  octVisits.push({
    id: Date.now().toString(), date: visitDate, crt: crt, va: va || '', srf: srf, irf: irf, ped: ped,
    dril: dril, ez: ez, elm: elm, erm: erm, interval: interval || 4, notes: notes || '',
    imageData: currentOCTImageData || null,
    eye: document.getElementById('oct-eye').value,
    pathology: document.getElementById('oct-pathology').value,
    medication: document.getElementById('oct-medication').value
  });

  saveOCTVisits();
  renderOCTVisits();
  resetOCTForm();
}

function resetOCTForm() {
  document.getElementById('oct-crt').value = '';
  document.getElementById('oct-va').value = '';
  document.getElementById('oct-notes').value = '';
  currentOCTImageData = null;
  const preview = document.getElementById('oct-image-preview');
  if (preview) preview.classList.add('hidden');
  const uploadZone = document.getElementById('oct-upload-zone');
  if (uploadZone) uploadZone.style.display = '';
  const fileInput = document.getElementById('oct-image-input');
  if (fileInput) fileInput.value = '';

  ['oct-srf', 'oct-irf', 'oct-ped', 'oct-dril'].forEach(name => {
    const r = document.querySelector('input[name="' + name + '"][value="absent"]');
    if (r) r.checked = true;
  });
  const ezR = document.querySelector('input[name="oct-ez"][value="intact"]');
  if (ezR) ezR.checked = true;
  const elmR = document.querySelector('input[name="oct-elm"][value="intact"]');
  if (elmR) elmR.checked = true;
  const ermR = document.querySelector('input[name="oct-erm"][value="absent"]');
  if (ermR) ermR.checked = true;

  document.getElementById('oct-visit-date').value = new Date().toISOString().split('T')[0];
}

function saveOCTVisits() {
  try {
    const noImg = octVisits.map(v => { const c = Object.assign({}, v); c.imageData = null; return c; });
    localStorage.setItem('easivt_oct_visits', JSON.stringify(noImg));
  } catch (e) { /* ignore */ }
}

function loadOCTVisits() {
  try {
    const saved = localStorage.getItem('easivt_oct_visits');
    if (saved) { octVisits = JSON.parse(saved); renderOCTVisits(); }
  } catch (e) { octVisits = []; }
}

function deleteOCTVisit(id) {
  octVisits = octVisits.filter(v => v.id !== id);
  saveOCTVisits();
  renderOCTVisits();
}

// =================== OCT RENDERING ===================
function renderOCTVisits() {
  const listDiv = document.getElementById('oct-visits-list');
  const clearBtn = document.getElementById('oct-clear-btn');
  const chartCard = document.getElementById('oct-chart-card');
  const fluidCard = document.getElementById('oct-fluid-card');
  const decisionCard = document.getElementById('oct-decision-card');
  const compareCard = document.getElementById('oct-compare-card');

  if (!listDiv) return;

  if (octVisits.length === 0) {
    listDiv.innerHTML = '<div class="oct-empty-state">Aucune visite. Ajoutez une premiere visite.</div>';
    if (clearBtn) clearBtn.style.display = 'none';
    [chartCard, fluidCard, decisionCard, compareCard].forEach(c => { if (c) c.style.display = 'none'; });
    return;
  }

  if (clearBtn) clearBtn.style.display = '';
  listDiv.innerHTML = '';

  octVisits.forEach(visit => {
    const item = document.createElement('div');
    item.className = 'oct-visit-item';
    item.innerHTML = '<div class="oct-visit-thumb">' + (visit.imageData ? '<img src="' + visit.imageData + '" alt="OCT">' : '<span class="oct-visit-thumb-placeholder">OCT</span>') + '</div>'
      + '<div class="oct-visit-info"><div class="oct-visit-date">' + formatDateShort(new Date(visit.date)) + '</div>'
      + '<div class="oct-visit-metrics"><span class="oct-metric oct-metric--highlight">CRT: ' + visit.crt + '</span><span class="oct-metric">q' + visit.interval + 'S</span>'
      + (visit.va ? '<span class="oct-metric">AV: ' + visit.va + '</span>' : '') + '</div>'
      + '<div class="oct-visit-fluids">' + getFluidTag('SRF', visit.srf) + getFluidTag('IRF', visit.irf) + getFluidTag('PED', visit.ped) + '</div></div>'
      + '<div class="oct-visit-actions"><button class="oct-visit-delete" data-id="' + visit.id + '">&times;</button></div>';
    item.querySelector('.oct-visit-delete').addEventListener('click', () => deleteOCTVisit(visit.id));
    listDiv.appendChild(item);
  });

  if (chartCard && octVisits.length >= 1) { chartCard.style.display = ''; renderCRTChart(); }
  if (fluidCard && octVisits.length >= 2) { fluidCard.style.display = ''; renderFluidTimeline(); }
  if (decisionCard && octVisits.length >= 1) { decisionCard.style.display = ''; renderDecisionSupport(); }
  if (compareCard && octVisits.length >= 2) { compareCard.style.display = ''; updateCompareSelectors(); }
}

function getFluidTag(label, value) {
  let cls = 'oct-fluid-tag--good';
  if (value === 'present' || value === 'dome' || value === 'irregular') cls = 'oct-fluid-tag--bad';
  else if (value === 'trace' || value === 'flat') cls = 'oct-fluid-tag--warn';
  const labels = { absent: '-', trace: '~', present: '+', flat: 'P', dome: 'B', irregular: 'I', intact: 'OK', disrupted: 'Alt' };
  return '<span class="oct-fluid-tag ' + cls + '">' + label + ': ' + (labels[value] || value) + '</span>';
}

// =================== CRT CHART ===================
function renderCRTChart() {
  const container = document.getElementById('oct-crt-chart');
  if (!container || octVisits.length === 0) return;

  const w = 500, h = 220, p = { top: 20, right: 20, bottom: 40, left: 50 };
  const cw = w - p.left - p.right, ch = h - p.top - p.bottom;
  const vals = octVisits.map(v => v.crt);
  const mn = Math.max(100, Math.min(...vals) - 30), mx = Math.max(...vals) + 30;

  let svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">';

  // Normal band
  if (300 > mn) {
    const by = p.top + ch * (1 - (300 - mn) / (mx - mn));
    svg += '<rect x="' + p.left + '" y="' + Math.max(by, p.top) + '" width="' + cw + '" height="' + Math.min(ch - (ch * (1 - (300 - mn) / (mx - mn))), ch) + '" fill="rgba(16,185,129,0.06)" />';
    svg += '<line x1="' + p.left + '" y1="' + by + '" x2="' + (w - p.right) + '" y2="' + by + '" stroke="rgba(16,185,129,0.3)" stroke-dasharray="4,4" />';
    svg += '<text x="' + (w - p.right - 2) + '" y="' + (by - 4) + '" font-size="9" fill="rgba(16,185,129,0.6)" text-anchor="end">300um</text>';
  }

  // Y ticks
  for (let i = 0; i <= 5; i++) {
    const val = Math.round(mn + (mx - mn) * (i / 5));
    const y = p.top + ch * (1 - i / 5);
    svg += '<line x1="' + (p.left - 4) + '" y1="' + y + '" x2="' + (w - p.right) + '" y2="' + y + '" stroke="rgba(128,128,128,0.1)" />';
    svg += '<text x="' + (p.left - 8) + '" y="' + (y + 3) + '" font-size="10" fill="rgba(128,128,128,0.6)" text-anchor="end">' + val + '</text>';
  }

  // Line
  if (octVisits.length > 1) {
    let d = '';
    octVisits.forEach((v, i) => {
      const x = p.left + (i / (octVisits.length - 1)) * cw;
      const y = p.top + ch * (1 - (v.crt - mn) / (mx - mn));
      d += (i === 0 ? 'M' : 'L') + x + ',' + y;
    });
    svg += '<path d="' + d + '" fill="none" stroke="rgba(139,92,246,0.8)" stroke-width="2" stroke-linejoin="round" />';
  }

  // Points
  octVisits.forEach((v, i) => {
    const x = octVisits.length === 1 ? p.left + cw / 2 : p.left + (i / (octVisits.length - 1)) * cw;
    const y = p.top + ch * (1 - (v.crt - mn) / (mx - mn));
    const color = v.crt > 300 ? 'rgba(244,63,94,0.8)' : 'rgba(139,92,246,0.8)';
    svg += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="' + color + '" stroke="#fff" stroke-width="1.5" />';
    svg += '<text x="' + x + '" y="' + (y - 8) + '" font-size="9" fill="' + color + '" text-anchor="middle" font-weight="600">' + v.crt + '</text>';
    const dl = new Date(v.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    svg += '<text x="' + x + '" y="' + (h - 8) + '" font-size="9" fill="rgba(128,128,128,0.6)" text-anchor="middle">' + dl + '</text>';
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

// =================== FLUID TIMELINE ===================
function renderFluidTimeline() {
  const container = document.getElementById('oct-fluid-timeline');
  if (!container || octVisits.length < 2) return;

  let html = '';
  [{ key: 'srf', label: 'SRF' }, { key: 'irf', label: 'IRF' }, { key: 'ped', label: 'PED' }].forEach(f => {
    html += '<div class="fluid-timeline-row"><span class="fluid-timeline-label">' + f.label + '</span><div class="fluid-timeline-blocks">';
    octVisits.forEach(v => {
      html += '<div class="fluid-block fluid-block--' + v[f.key] + '">' + ({ absent: '-', trace: '~', present: '+', flat: 'P', dome: 'B', irregular: 'I' }[v[f.key]] || v[f.key]) + '</div>';
    });
    html += '</div></div>';
  });
  html += '<div class="fluid-timeline-row"><span class="fluid-timeline-label">Int.</span><div class="fluid-timeline-blocks">';
  octVisits.forEach(v => { html += '<div class="fluid-block" style="background:rgba(139,92,246,0.15);color:var(--purple);">' + v.interval + 'S</div>'; });
  html += '</div></div>';
  container.innerHTML = html;
}

// =================== DECISION SUPPORT ===================
function renderDecisionSupport() {
  const container = document.getElementById('oct-decision-content');
  if (!container || octVisits.length === 0) return;

  const latest = octVisits[octVisits.length - 1];
  const previous = octVisits.length >= 2 ? octVisits[octVisits.length - 2] : null;
  const rec = analyzeOCTData(latest, previous);

  let html = '<div class="decision-recommendation decision-recommendation--' + rec.level + '">';
  html += '<div class="decision-title">' + rec.title + '</div>';
  html += '<div class="decision-details">' + rec.details + '</div></div>';
  if (rec.suggestedInterval) {
    html += '<div style="margin-top:10px;font-size:0.78rem;color:var(--text-secondary);"><strong>Intervalle suggere : </strong>' + rec.suggestedInterval + ' semaines</div>';
  }
  container.innerHTML = html;
}

function analyzeOCTData(latest, previous) {
  const hasFluid = latest.srf === 'present' || latest.irf === 'present';
  const hasTrace = latest.srf === 'trace' || latest.irf === 'trace';
  const crtHigh = latest.crt > 300;
  const hasErmTraction = latest.erm === 'traction';

  let fluidBetter = false, fluidWorse = false, crtDelta = 0;
  if (previous) {
    const prevFluid = previous.srf === 'present' || previous.irf === 'present';
    fluidBetter = prevFluid && !hasFluid;
    fluidWorse = !prevFluid && hasFluid;
    crtDelta = latest.crt - previous.crt;
  }

  if (hasErmTraction) {
    return { level: 'urgent', title: 'Membrane epiretinienne tractionnelle', details: '<ul><li>Avis specialise retine recommande</li><li>Evaluation chirurgie vitreo-retinienne</li></ul>', suggestedInterval: null };
  }
  if (hasFluid && crtHigh) {
    return { level: 'reduce', title: 'Raccourcir l\'intervalle', details: '<ul><li>Fluide actif (SRF/IRF)</li><li>CRT eleve (' + latest.crt + ' um)</li><li>Raccourcir de 2 semaines</li></ul>', suggestedInterval: Math.max(4, latest.interval - 2) };
  }
  if (fluidWorse) {
    return { level: 'urgent', title: 'Reactivation', details: '<ul><li>Reapparition de fluide</li><li>CRT: ' + latest.crt + ' um (delta: ' + (crtDelta > 0 ? '+' : '') + crtDelta + ')</li></ul>', suggestedInterval: Math.max(4, latest.interval - 2) };
  }
  if (hasTrace && !crtHigh) {
    return { level: 'maintain', title: 'Maintenir l\'intervalle', details: '<ul><li>Traces residuelles</li><li>CRT acceptable (' + latest.crt + ' um)</li></ul>', suggestedInterval: latest.interval };
  }
  if (!hasFluid && !hasTrace && !crtHigh) {
    if (latest.interval < 16) {
      return { level: 'extend', title: 'Etendre l\'intervalle', details: '<ul><li>Retine seche</li><li>CRT normal (' + latest.crt + ' um)</li><li>Extension de 2 semaines</li></ul>', suggestedInterval: Math.min(16, latest.interval + 2) };
    }
    return { level: 'maintain', title: 'Intervalle maximal maintenu', details: '<ul><li>Retine seche, intervalle max</li></ul>', suggestedInterval: latest.interval };
  }
  if (hasFluid && !crtHigh) {
    return { level: 'reduce', title: 'Raccourcir l\'intervalle', details: '<ul><li>Fluide actif malgre CRT acceptable</li></ul>', suggestedInterval: Math.max(4, latest.interval - 2) };
  }
  return { level: 'maintain', title: 'Evaluation clinique necessaire', details: '<ul><li>CRT: ' + latest.crt + ' um</li></ul>', suggestedInterval: null };
}

// =================== OCT COMPARISON ===================
function updateCompareSelectors() {
  const sA = document.getElementById('oct-compare-a'), sB = document.getElementById('oct-compare-b');
  if (!sA || !sB) return;
  [sA, sB].forEach((s, si) => {
    s.innerHTML = '';
    octVisits.forEach((v, i) => {
      const o = document.createElement('option');
      o.value = i;
      o.textContent = formatDateShort(new Date(v.date)) + ' (CRT: ' + v.crt + ')';
      if (si === 0 && i === Math.max(0, octVisits.length - 2)) o.selected = true;
      if (si === 1 && i === octVisits.length - 1) o.selected = true;
      s.appendChild(o);
    });
  });
  renderOCTComparison();
}

function renderOCTComparison() {
  const container = document.getElementById('oct-comparison-view');
  const sA = document.getElementById('oct-compare-a'), sB = document.getElementById('oct-compare-b');
  if (!container || !sA || !sB) return;

  const vA = octVisits[parseInt(sA.value)], vB = octVisits[parseInt(sB.value)];
  if (!vA || !vB) return;

  let html = '';
  [{ v: vA, label: 'A' }, { v: vB, label: 'B' }].forEach(({ v, label }) => {
    html += '<div class="oct-compare-panel"><div class="oct-compare-panel-header">Visite ' + label + ' - ' + formatDateShort(new Date(v.date)) + '</div>'
      + '<div class="oct-compare-panel-image">' + (v.imageData ? '<img src="' + v.imageData + '">' : '<span style="color:rgba(255,255,255,0.3);font-size:0.7rem;">No image</span>') + '</div>'
      + '<div class="oct-compare-panel-data"><strong>CRT:</strong> ' + v.crt + ' um<br><strong>SRF:</strong> ' + v.srf + ' | <strong>IRF:</strong> ' + v.irf + '<br><strong>PED:</strong> ' + v.ped
      + (v.erm ? '<br><strong>ERM:</strong> ' + v.erm : '') + (v.va ? '<br><strong>AV:</strong> ' + v.va : '') + '</div></div>';
  });

  const delta = vB.crt - vA.crt;
  const cls = delta > 0 ? 'delta-positive' : delta < 0 ? 'delta-negative' : 'delta-neutral';
  html += '<div class="oct-compare-delta"><div class="oct-compare-delta-title">Evolution</div>'
    + '<strong>CRT:</strong> <span class="' + cls + '">' + (delta > 0 ? '+' : '') + delta + ' um</span>';
  const changes = [];
  ['srf', 'irf', 'ped'].forEach(k => { if (vA[k] !== vB[k]) changes.push(k.toUpperCase() + ': ' + vA[k] + ' -> ' + vB[k]); });
  html += changes.length ? '<br><strong>Changements : </strong>' + changes.join(' | ') : '<br><em>Pas de changement</em>';
  const days = Math.ceil(Math.abs(new Date(vB.date) - new Date(vA.date)) / (1000 * 60 * 60 * 24));
  html += '<br><strong>Delai : </strong>' + days + ' jours</div>';

  container.innerHTML = html;
}

// =================== LANGUAGE ===================
function updateLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLanguage] && translations[currentLanguage][key]) el.textContent = translations[currentLanguage][key];
  });
  renderPathologyRecommendations();
  if (octVisits.length > 0) renderOCTVisits();
}

// =================== PATIENTS ===================
function setupPatientsTab() {
  const newBtn = document.getElementById('new-patient-btn');
  const exportBtn = document.getElementById('export-patients-btn');
  const importBtn = document.getElementById('import-patients-btn');
  const importFile = document.getElementById('import-file-input');
  const saveBtn = document.getElementById('save-patient-btn');
  const deleteBtn = document.getElementById('delete-patient-btn');

  if (newBtn) newBtn.addEventListener('click', createNewPatient);
  if (exportBtn) exportBtn.addEventListener('click', exportPatients);
  if (importBtn) importBtn.addEventListener('click', () => importFile.click());
  if (importFile) importFile.addEventListener('change', importPatients);
  if (saveBtn) saveBtn.addEventListener('click', saveCurrentPatient);
  if (deleteBtn) deleteBtn.addEventListener('click', deleteCurrentPatient);

  document.querySelectorAll('.patient-field').forEach(f => f.addEventListener('change', saveCurrentPatient));
}

function createNewPatient() {
  const fn = prompt('Prenom :');
  if (!fn) return;
  const ln = prompt('Nom :');
  if (!ln) return;

  const patient = {
    id: Date.now().toString(), firstName: fn, lastName: ln, dob: '', sex: '', laterality: '', lens_status: '',
    pathology: '', treatment: '', protocol: '', injection_count: '',
    av_od: '', av_os: '', av_bi: '', pio_od: '', pio_os: '',
    atcd_general: '', atcd_ophtalmo: '', allergies: '', notes: '',
    visits: [], exams: [], createdAt: new Date().toISOString()
  };

  patients.push(patient);
  savePatients();
  renderPatientsList();
  selectPatient(patient.id);
}

function selectPatient(id) {
  currentPatientId = id;
  renderPatientsList();
  loadPatientFile(id);
}

function renderPatientsList() {
  const list = document.getElementById('patients-list');
  if (!list) return;

  if (patients.length === 0) {
    list.innerHTML = '<div class="patients-empty"><p>&#128100;</p><p>Aucun patient</p></div>';
    document.getElementById('patient-file-section').style.display = 'none';
    return;
  }

  list.innerHTML = '';
  patients.forEach(p => {
    const item = document.createElement('div');
    item.className = 'patient-item' + (p.id === currentPatientId ? ' active' : '');
    const initials = (p.firstName[0] || '') + (p.lastName[0] || '');
    item.innerHTML = '<div class="patient-avatar">' + initials.toUpperCase() + '</div>'
      + '<div><div class="patient-item-name">' + p.firstName + ' ' + p.lastName + '</div>'
      + '<div class="patient-item-info">' + (p.pathology || 'Non renseigne') + '</div></div>';
    item.addEventListener('click', () => selectPatient(p.id));
    list.appendChild(item);
  });
}

function loadPatientFile(id) {
  const p = patients.find(x => x.id === id);
  if (!p) return;

  document.getElementById('patient-file-section').style.display = '';
  document.getElementById('patient-file-name').textContent = p.firstName + ' ' + p.lastName;
  document.getElementById('patient-id-text').textContent = 'ID: ' + id + ' | Cree le: ' + new Date(p.createdAt).toLocaleDateString('fr-FR');

  document.querySelectorAll('.patient-field').forEach(f => {
    const key = f.dataset.field;
    if (f.tagName === 'SELECT' && f.multiple) {
      // Multi-select
      const vals = (p[key] || '').split(',').filter(Boolean);
      Array.from(f.options).forEach(o => { o.selected = vals.indexOf(o.value) !== -1; });
    } else {
      f.value = p[key] || '';
    }
  });

  renderPatientVisits(p.visits);
}

function renderPatientVisits(visits) {
  const listEl = document.getElementById('patient-visits-list');
  const emptyEl = document.getElementById('patient-visits-empty');
  const contentEl = document.getElementById('patient-visits-content');

  if (!visits || visits.length === 0) {
    if (listEl) listEl.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  if (listEl) listEl.style.display = 'block';
  if (emptyEl) emptyEl.style.display = 'none';
  if (!contentEl) return;
  contentEl.innerHTML = '';
  visits.forEach(v => {
    const el = document.createElement('div');
    el.className = 'visit-item-mini';
    el.innerHTML = '<strong>' + formatDateShort(new Date(v.date)) + '</strong>AV: ' + (v.av || '-') + ' | CRT: ' + (v.crt || '-') + ' um';
    contentEl.appendChild(el);
  });
}

function saveCurrentPatient() {
  if (!currentPatientId) return;
  const p = patients.find(x => x.id === currentPatientId);
  if (!p) return;

  document.querySelectorAll('.patient-field').forEach(f => {
    const key = f.dataset.field;
    if (f.tagName === 'SELECT' && f.multiple) {
      p[key] = Array.from(f.selectedOptions).map(o => o.value).join(',');
    } else {
      p[key] = f.value;
    }
  });
  savePatients();
}

function deleteCurrentPatient() {
  if (!currentPatientId || !confirm('Supprimer ce patient ?')) return;
  patients = patients.filter(p => p.id !== currentPatientId);
  currentPatientId = null;
  savePatients();
  renderPatientsList();
  document.getElementById('patient-file-section').style.display = 'none';
}

function savePatients() {
  try { localStorage.setItem('easivt_patients', JSON.stringify(patients)); } catch (e) { /* ignore */ }
}

function loadPatients() {
  try {
    const s = localStorage.getItem('easivt_patients');
    if (s) { patients = JSON.parse(s); renderPatientsList(); }
  } catch (e) { patients = []; }
}

function exportPatients() {
  const data = { patients: patients, oct_visits: octVisits, exportDate: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'easivt_backup_' + new Date().toISOString().split('T')[0] + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

function importPatients(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.patients) { patients = data.patients; savePatients(); renderPatientsList(); }
      if (data.oct_visits) { octVisits = data.oct_visits; saveOCTVisits(); }
      alert('Donnees importees avec succes');
    } catch (err) { alert('Erreur import'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// =================== EXAM CLINIQUE ===================
function setupExamTab() {
  const saveBtn = document.getElementById('save-exam-btn');
  const histBtn = document.getElementById('exam-history-btn');

  if (saveBtn) saveBtn.addEventListener('click', saveExam);
  if (histBtn) histBtn.addEventListener('click', showExamHistory);
}

function refreshExamPatientList() {
  const select = document.getElementById('exam-patient');
  if (!select) return;
  select.innerHTML = '<option value="">-- Selectionner un patient --</option>';
  patients.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.firstName + ' ' + p.lastName;
    if (p.id === currentPatientId) opt.selected = true;
    select.appendChild(opt);
  });
}

function saveExam() {
  const patientId = document.getElementById('exam-patient').value;
  const eye = document.getElementById('exam-eye').value;
  const date = document.getElementById('exam-date').value;

  if (!patientId) { alert('Veuillez selectionner un patient.'); return; }
  if (!date) { alert('Veuillez saisir une date.'); return; }

  const exam = { id: Date.now().toString(), date: date, eye: eye };

  document.querySelectorAll('.exam-field').forEach(f => {
    exam[f.dataset.field] = f.value;
  });

  const patient = patients.find(p => p.id === patientId);
  if (!patient) { alert('Patient introuvable.'); return; }

  if (!patient.exams) patient.exams = [];
  patient.exams.push(exam);
  savePatients();

  alert('Examen sauvegarde avec succes pour ' + patient.firstName + ' ' + patient.lastName);
}

function showExamHistory() {
  const patientId = document.getElementById('exam-patient').value;
  if (!patientId) { alert('Veuillez selectionner un patient.'); return; }

  const patient = patients.find(p => p.id === patientId);
  if (!patient || !patient.exams || patient.exams.length === 0) {
    alert('Aucun examen enregistre pour ce patient.');
    return;
  }

  let text = 'Historique examens - ' + patient.firstName + ' ' + patient.lastName + '\n\n';
  patient.exams.forEach((ex, i) => {
    text += '--- Examen ' + (i + 1) + ' (' + ex.date + ' - ' + ex.eye + ') ---\n';
    Object.keys(ex).forEach(k => {
      if (k !== 'id' && k !== 'date' && k !== 'eye' && ex[k]) {
        text += '  ' + k + ': ' + ex[k] + '\n';
      }
    });
    text += '\n';
  });

  alert(text);
}

// =================== HELPERS ===================
function formatDate(date) {
  return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(date) {
  return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
