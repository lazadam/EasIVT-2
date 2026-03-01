// ============================================================
// EasIVT - Calculateur IVT & Analyseur OCT Spectralis
// ============================================================

// =================== DONNÉES ===================
const medicationData = {
  anti_vegf: [
    {
      name: "Lucentis",
      molecule: "Ranibizumab",
      dose: "0.5mg",
      intervals: "4-12 semaines",
      amm: true,
      indications: ["DMLA", "Diabétique", "OVCR/OBVR"],
      minWeeks: 4,
      maxWeeks: 12,
      loadingDose: 3
    },
    {
      name: "Eylea",
      molecule: "Aflibercept",
      dose: "2mg",
      intervals: "4-16 semaines",
      amm: true,
      indications: ["DMLA", "Diabétique", "OVCR/OBVR"],
      minWeeks: 4,
      maxWeeks: 16,
      loadingDose: 3
    },
    {
      name: "Eylea HD",
      molecule: "Aflibercept",
      dose: "8mg",
      intervals: "8-16 semaines",
      amm: true,
      indications: ["DMLA", "Diabétique"],
      minWeeks: 8,
      maxWeeks: 16,
      loadingDose: 3
    },
    {
      name: "Vabysmo",
      molecule: "Faricimab",
      dose: "6mg",
      intervals: "8-16 semaines",
      amm: true,
      indications: ["DMLA", "Diabétique"],
      minWeeks: 8,
      maxWeeks: 16,
      loadingDose: 4
    },
    {
      name: "Beovu",
      molecule: "Brolucizumab",
      dose: "6mg",
      intervals: "8-12 semaines",
      amm: true,
      indications: ["DMLA"],
      minWeeks: 8,
      maxWeeks: 12,
      loadingDose: 3
    },
    {
      name: "Avastin",
      molecule: "Bevacizumab",
      dose: "1.25mg",
      intervals: "4-8 semaines",
      amm: false,
      indications: ["DMLA", "Diabétique", "OVCR/OBVR"],
      minWeeks: 4,
      maxWeeks: 8,
      loadingDose: 3
    }
  ],
  corticoids: [
    {
      name: "Ozurdex",
      molecule: "Dexaméthasone",
      dose: "0.7mg",
      type: "implant",
      duration: "4-6 mois",
      amm: true,
      indications: ["Diabétique", "OVCR/OBVR", "Uvéites"],
      minWeeks: 16,
      maxWeeks: 26
    },
    {
      name: "Kénacort",
      molecule: "Triamcinolone",
      dose: "4mg",
      type: "injection",
      duration: "3-4 mois",
      amm: false,
      indications: ["Diabétique", "OVCR/OBVR", "Uvéites", "Irvine-Gass"],
      minWeeks: 12,
      maxWeeks: 16
    }
  ]
};

const pathologyData = {
  dmla: {
    name: "DMLA humide",
    nameEn: "Wet AMD",
    first_line: ["Lucentis", "Eylea", "Eylea HD", "Vabysmo", "Beovu"],
    protocol: "3 injections mensuelles puis Treat & Extend"
  },
  diabetic: {
    name: "Maculopathie diabétique",
    nameEn: "Diabetic maculopathy",
    first_line: ["Lucentis", "Eylea", "Eylea HD", "Vabysmo"],
    alternatives: ["Ozurdex"],
    protocol: "Injections mensuelles puis extension"
  },
  rvo: {
    name: "Occlusions veineuses",
    nameEn: "Retinal vein occlusions",
    first_line: ["Lucentis", "Eylea", "Eylea HD", "Vabysmo", "Beovu", "Avastin"],
    alternatives: ["Ozurdex"],
    protocol: "Tous anti-VEGF autorisés - Selon réponse thérapeutique"
  },
  irvine_gass: {
    name: "Syndrome d'Irvine-Gass",
    nameEn: "Irvine-Gass syndrome",
    first_line: ["AINS topiques", "Acétazolamide"],
    second_line: ["Ozurdex"],
    protocol: "Escalade thérapeutique"
  },
  uveitis: {
    name: "Uvéites",
    nameEn: "Uveitis",
    first_line: ["Ozurdex"],
    protocol: "Selon sévérité et réponse"
  }
};

// =================== TRADUCTIONS ===================
const translations = {
  fr: {
    "nav.calculator": "Calculateur IVT",
    "nav.scheduler": "Planificateur",
    "nav.oct": "Analyseur OCT",
    "nav.medications": "Médicaments",
    "hero.title": "Calculateur d'Injections Intravitréennes",
    "hero.subtitle": "Outil professionnel pour le calcul et la planification des IVT",
    "calculator.title": "Calculateur de prochaine injection",
    "calculator.pathology": "Pathologie :",
    "calculator.medication": "Médicament :",
    "calculator.last_injection": "Date de dernière injection :",
    "calculator.protocol": "Protocole :",
    "calculator.interval": "Intervalle (semaines) :",
    "calculator.calculate": "Calculer prochaine injection",
    "calculator.result": "Résultat :",
    "delay.title": "Calculateur de délai entre injections",
    "delay.first_injection": "Date première injection :",
    "delay.second_injection": "Date deuxième injection :",
    "delay.calculate": "Calculer le délai",
    "delay.result": "Délai :",
    "scheduler.title": "Planificateur d'injections",
    "scheduler.subtitle": "Générez un schéma complet d'injections selon le protocole choisi",
    "scheduler.form_title": "Paramètres du schéma thérapeutique",
    "scheduler.medication": "Médicament :",
    "scheduler.start_date": "Date de départ :",
    "scheduler.protocol": "Schéma thérapeutique :",
    "scheduler.initial_interval": "Intervalle initial (semaines) :",
    "scheduler.extension_step": "Palier d'extension (semaines) :",
    "scheduler.max_interval": "Intervalle maximum (semaines) :",
    "scheduler.num_injections": "Nombre d'injections :",
    "scheduler.generate": "Générer les dates",
    "scheduler.planned_dates": "Dates prévues :",
    "medications.hero_title": "Base de données des médicaments IVT",
    "medications.hero_subtitle": "Référence complète des molécules disponibles pour les injections intravitréennes",
    "medications.anti_vegf": "Anti-VEGF",
    "medications.corticoids": "Corticoïdes",
    "recommendations.title": "Recommandations thérapeutiques",
    "oct.title": "Analyseur OCT - Suivi Spectralis",
    "oct.subtitle": "Suivi d'évolution des images OCT Spectralis Heidelberg",
    "oct.patient_params": "Paramètres du suivi",
    "oct.eye": "Oeil :",
    "oct.pathology": "Pathologie :",
    "oct.medication": "Traitement en cours :",
    "oct.new_visit": "Nouvelle visite",
    "oct.visit_date": "Date de la visite :",
    "oct.image_upload": "Image OCT (B-scan Spectralis) :",
    "oct.drop_image": "Glisser ou cliquer pour importer une image OCT",
    "oct.crt": "Épaisseur Rétinienne Centrale (CRT) :",
    "oct.va": "Acuité visuelle (optionnel) :",
    "oct.findings": "Findings OCT",
    "oct.current_interval": "Intervalle actuel (semaines) :",
    "oct.notes": "Notes cliniques :",
    "oct.add_visit": "Ajouter cette visite",
    "oct.decision": "Aide à la décision",
    "oct.crt_chart": "Évolution CRT",
    "oct.fluid_timeline": "Timeline des fluides",
    "oct.history": "Historique des visites",
    "oct.clear": "Réinitialiser",
    "oct.no_visits": "Aucune visite enregistrée. Ajoutez une première visite pour commencer le suivi.",
    "oct.compare": "Comparaison côte à côte",
    "disclaimer.title": "Avertissement légal",
    "disclaimer.content1": "Ce site ne remplace pas le jugement clinique du médecin. Les recommandations présentées sont indicatives et doivent être adaptées à chaque patient.",
    "disclaimer.content2": "L'utilisation de médicaments hors AMM (Autorisation de Mise sur le Marché) relève de la responsabilité du prescripteur selon l'article L.5121-12-1 du CSP.",
    "disclaimer.content3": "Les intervalles d'injection doivent être ajustés selon la réponse thérapeutique et l'état clinique du patient."
  },
  en: {
    "nav.calculator": "IVT Calculator",
    "nav.scheduler": "Scheduler",
    "nav.oct": "OCT Analyzer",
    "nav.medications": "Medications",
    "hero.title": "Intravitreal Injection Calculator",
    "hero.subtitle": "Professional tool for IVT calculation and planning",
    "calculator.title": "Next injection calculator",
    "calculator.pathology": "Pathology:",
    "calculator.medication": "Medication:",
    "calculator.last_injection": "Last injection date:",
    "calculator.protocol": "Protocol:",
    "calculator.interval": "Interval (weeks):",
    "calculator.calculate": "Calculate next injection",
    "calculator.result": "Result:",
    "delay.title": "Delay calculator between injections",
    "delay.first_injection": "First injection date:",
    "delay.second_injection": "Second injection date:",
    "delay.calculate": "Calculate delay",
    "delay.result": "Delay:",
    "scheduler.title": "Injection Scheduler",
    "scheduler.subtitle": "Generate a complete injection schedule based on your chosen protocol",
    "scheduler.form_title": "Treatment schedule parameters",
    "scheduler.medication": "Medication:",
    "scheduler.start_date": "Start date:",
    "scheduler.protocol": "Treatment protocol:",
    "scheduler.initial_interval": "Initial interval (weeks):",
    "scheduler.extension_step": "Extension step (weeks):",
    "scheduler.max_interval": "Maximum interval (weeks):",
    "scheduler.num_injections": "Number of injections:",
    "scheduler.generate": "Generate dates",
    "scheduler.planned_dates": "Planned dates:",
    "medications.hero_title": "IVT Medications Database",
    "medications.hero_subtitle": "Complete reference of available molecules for intravitreal injections",
    "medications.anti_vegf": "Anti-VEGF",
    "medications.corticoids": "Corticosteroids",
    "recommendations.title": "Therapeutic recommendations",
    "oct.title": "OCT Analyzer - Spectralis Follow-up",
    "oct.subtitle": "Follow-up evolution tracking for Spectralis Heidelberg OCT images",
    "oct.patient_params": "Follow-up parameters",
    "oct.eye": "Eye:",
    "oct.pathology": "Pathology:",
    "oct.medication": "Current treatment:",
    "oct.new_visit": "New visit",
    "oct.visit_date": "Visit date:",
    "oct.image_upload": "OCT image (Spectralis B-scan):",
    "oct.drop_image": "Drag or click to import an OCT image",
    "oct.crt": "Central Retinal Thickness (CRT):",
    "oct.va": "Visual acuity (optional):",
    "oct.findings": "OCT Findings",
    "oct.current_interval": "Current interval (weeks):",
    "oct.notes": "Clinical notes:",
    "oct.add_visit": "Add this visit",
    "oct.decision": "Decision support",
    "oct.crt_chart": "CRT Evolution",
    "oct.fluid_timeline": "Fluid Timeline",
    "oct.history": "Visit History",
    "oct.clear": "Reset",
    "oct.no_visits": "No visits recorded. Add a first visit to start follow-up tracking.",
    "oct.compare": "Side-by-side comparison",
    "disclaimer.title": "Legal disclaimer",
    "disclaimer.content1": "This site does not replace the doctor's clinical judgment. The recommendations presented are indicative and must be adapted to each patient.",
    "disclaimer.content2": "The use of off-label medications is the responsibility of the prescriber according to applicable regulations.",
    "disclaimer.content3": "Injection intervals should be adjusted according to therapeutic response and patient clinical condition."
  }
};

let currentLanguage = 'fr';

// =================== OCT DATA STORE ===================
let octVisits = [];

// =================== INITIALISATION ===================
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  // Pop-up professionnel
  const professionalWarning = document.getElementById('professional-warning');
  const mainContent = document.getElementById('main-content');

  if (professionalWarning) professionalWarning.style.display = 'flex';
  if (mainContent) mainContent.classList.add('hidden');

  const confirmBtn = document.getElementById('confirm-professional');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function () {
      if (professionalWarning) professionalWarning.style.display = 'none';
      if (mainContent) mainContent.classList.remove('hidden');
    });
  }

  // Langue
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    languageSelector.addEventListener('change', function () {
      currentLanguage = this.value;
      updateLanguage();
    });
  }

  // Tabs
  setupTabs();

  // Calculateur
  setupCalculator();
  setupDelayCalculator();
  renderPathologyRecommendations();
  renderMedicationDatabase();
  updateLanguage();

  // Planificateur
  setupScheduler();

  // OCT Analyzer
  setupOCTAnalyzer();

  // Charger les visites OCT depuis localStorage
  loadOCTVisits();
}

// =================== TABS ===================
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      // Mettre à jour les boutons
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Mettre à jour les panneaux
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      const targetPanel = document.getElementById('tab-' + targetTab);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

// =================== CALCULATEUR IVT ===================
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

  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateNextInjection);
  }

  if (calculateRdvBtn) {
    calculateRdvBtn.addEventListener('click', calculateNextRDV);
  }

  // Ozurdex info button
  const ozurdexInfoBtn = document.getElementById('ozurdex-info-btn');
  if (ozurdexInfoBtn) {
    ozurdexInfoBtn.addEventListener('click', function () {
      alert(currentLanguage === 'en'
        ? 'Ozurdex recommendations:\n\n- Check contraindications before injection\n- Monitor IOP at 7-15 days\n- Evaluate efficacy at M1-M2\n- Wait at least M3-M4 before re-injection\n- After 2 effective Ozurdex: consider Iluvien passage (same day or +15 days)\n\nClick on a pathology in recommendations to see more details.'
        : 'Recommandations Ozurdex:\n\n- Vérifier les contre-indications avant injection\n- Surveillance PIO à 7-15 jours\n- Évaluation efficacité à M1-M2\n- Attendre au moins M3-M4 avant réinjection\n- Après 2 Ozurdex efficaces: envisager passage à Iluvien (même jour ou +15j)\n\nCliquez sur une pathologie dans les recommandations pour plus de détails.');
    });
  }
}

function updateMedicationOptions(pathology, selectId) {
  const medicationSelect = document.getElementById(selectId || 'medication');
  if (!medicationSelect) return;

  const defaultText = currentLanguage === 'en' ? 'Select a medication' : 'Sélectionner un médicament';
  medicationSelect.innerHTML = '<option value="">' + defaultText + '</option>';

  if (!pathology) return;

  const allMedications = [...medicationData.anti_vegf, ...medicationData.corticoids];

  allMedications.forEach(med => {
    let shouldInclude = false;
    switch (pathology) {
      case 'dmla': shouldInclude = med.indications.includes('DMLA'); break;
      case 'diabetic': shouldInclude = med.indications.includes('Diabétique'); break;
      case 'rvo': shouldInclude = med.indications.includes('OVCR/OBVR'); break;
      case 'irvine_gass': shouldInclude = med.indications.includes('Irvine-Gass'); break;
      case 'uveitis': shouldInclude = med.indications.includes('Uvéites'); break;
    }

    if (shouldInclude) {
      const option = document.createElement('option');
      option.value = med.name;
      option.textContent = med.name + ' (' + med.molecule + ') ' + med.dose;
      if (!med.amm) option.textContent += ' - Hors AMM';
      medicationSelect.appendChild(option);
    }
  });
}

function calculateNextInjection() {
  const lastInjectionDate = document.getElementById('last-injection-date').value;
  const interval = parseInt(document.getElementById('interval').value);
  const medication = document.getElementById('medication').value;
  const pathology = document.getElementById('pathology').value;

  // Pathologie et médicament ne sont plus obligatoires
  if (!lastInjectionDate || !interval) {
    const msg = currentLanguage === 'en'
      ? 'Please enter the last injection date and interval.'
      : 'Veuillez saisir la date de dernière injection et l\'intervalle.';
    alert(msg);
    return;
  }

  const lastDate = new Date(lastInjectionDate);
  const nextDate = new Date(lastDate);
  nextDate.setDate(lastDate.getDate() + (interval * 7));

  const resultDiv = document.getElementById('result');
  const resultContent = document.getElementById('result-content');

  const allMeds = [...medicationData.anti_vegf, ...medicationData.corticoids];
  const medInfo = allMeds.find(med => med.name === medication);

  let resultHTML = '<div class="next-injection-date">';
  resultHTML += (currentLanguage === 'en' ? 'Next injection planned: ' : 'Prochaine injection prévue : ');
  resultHTML += formatDate(nextDate) + '</div>';
  resultHTML += '<div class="medication-details" style="margin-top:8px;">';
  resultHTML += '<strong>' + (currentLanguage === 'en' ? 'Medication: ' : 'Médicament : ') + '</strong>' + medication;

  if (medInfo) {
    resultHTML += '<br><strong>' + (currentLanguage === 'en' ? 'Molecule: ' : 'Molécule : ') + '</strong>' + medInfo.molecule;
    resultHTML += '<br><strong>' + (currentLanguage === 'en' ? 'Dose: ' : 'Dose : ') + '</strong>' + medInfo.dose;
    resultHTML += '<br><strong>' + (currentLanguage === 'en' ? 'Recommended intervals: ' : 'Intervalles recommandés : ') + '</strong>' + (medInfo.intervals || medInfo.duration);

    if (!medInfo.amm) {
      resultHTML += '</div><div class="off-label-warning">';
      resultHTML += currentLanguage === 'en'
        ? 'Off-label medication - Prescription under physician responsibility'
        : 'Médicament hors AMM - Prescription sous la responsabilité du médecin';
    }
  }
  resultHTML += '</div>';

  if (resultContent) resultContent.innerHTML = resultHTML;
  if (resultDiv) resultDiv.classList.remove('hidden');
}

// =================== NEXT RDV CALCULATOR ===================
function calculateNextRDV() {
  const lastDate = document.getElementById('next-rdv-last-date').value;
  const interval = parseInt(document.getElementById('next-rdv-interval').value);
  const protocol = document.getElementById('next-rdv-protocol').value;
  const count = parseInt(document.getElementById('next-rdv-count').value);

  if (!lastDate || !interval || !count) {
    alert(currentLanguage === 'en' ? 'Please fill in all fields.' : 'Veuillez remplir tous les champs.');
    return;
  }

  const startDate = new Date(lastDate);
  const rdvs = [];

  // Calcul des RDV en fonction du protocole
  let currentDate = new Date(startDate);
  let currentInterval = interval;

  for (let i = 0; i < count; i++) {
    // Injection
    rdvs.push({
      type: 'injection',
      date: new Date(currentDate),
      interval: currentInterval
    });

    // Consultations associées (selon type de RDV)
    if (protocol === 'monthly') {
      // Mensuel : consultation 1 semaine avant l'injection
      const consultDate = new Date(currentDate);
      consultDate.setDate(consultDate.getDate() - 7);
      rdvs.push({
        type: 'consultation',
        date: consultDate,
        reason: currentLanguage === 'en' ? 'Pre-injection visit' : 'Visite pré-injection'
      });
    } else if (protocol === 'te') {
      // T&E : consultation post-injection à 2-4 semaines pour évaluer
      const postConsultDate = new Date(currentDate);
      postConsultDate.setDate(postConsultDate.getDate() + 21); // 3 semaines après
      rdvs.push({
        type: 'consultation',
        date: postConsultDate,
        reason: currentLanguage === 'en' ? 'Efficacy evaluation' : 'Évaluation de l\'efficacité'
      });
      currentInterval = Math.min(currentInterval + 2, 16); // Extension de 2 semaines max 16
    } else if (protocol === 'prn') {
      // PRN : consultation avant chaque injection pour évaluer nécessité
      const preConsultDate = new Date(currentDate);
      preConsultDate.setDate(preConsultDate.getDate() - 7);
      rdvs.push({
        type: 'consultation',
        date: preConsultDate,
        reason: currentLanguage === 'en' ? 'Need evaluation (PRN)' : 'Évaluation du besoin (PRN)'
      });
    }

    // Prochaine injection
    currentDate.setDate(currentDate.getDate() + (currentInterval * 7));
  }

  // Tri par date
  rdvs.sort((a, b) => a.date - b.date);

  // Affichage
  const resultDiv = document.getElementById('rdv-result');
  const contentDiv = document.getElementById('rdv-content');

  let html = '<div class="rdv-timeline">';
  rdvs.forEach((rdv, idx) => {
    const dateStr = formatDate(rdv.date);
    if (rdv.type === 'injection') {
      html += '<div class="rdv-item rdv-injection">'
        + '<span class="rdv-icon">💉</span>'
        + '<div class="rdv-details">'
        + '<strong>' + (currentLanguage === 'en' ? 'Injection' : 'Injection') + '</strong><br>'
        + '<span class="rdv-date">' + dateStr + '</span>'
        + (rdv.interval ? '<br><span class="rdv-interval">Intervalle : ' + rdv.interval + 'S</span>' : '')
        + '</div></div>';
    } else {
      html += '<div class="rdv-item rdv-consultation">'
        + '<span class="rdv-icon">👁️</span>'
        + '<div class="rdv-details">'
        + '<strong>' + rdv.reason + '</strong><br>'
        + '<span class="rdv-date">' + dateStr + '</span>'
        + '</div></div>';
    }
  });
  html += '</div>';

  if (contentDiv) contentDiv.innerHTML = html;
  if (resultDiv) resultDiv.classList.remove('hidden');
}

// =================== DELAY CALCULATOR ===================
function setupDelayCalculator() {
  const calculateDelayBtn = document.getElementById('calculate-delay-btn');
  if (calculateDelayBtn) {
    calculateDelayBtn.addEventListener('click', calculateDelay);
  }
}

function calculateDelay() {
  const firstDate = document.getElementById('first-injection-date').value;
  const secondDate = document.getElementById('second-injection-date').value;

  if (!firstDate || !secondDate) {
    alert(currentLanguage === 'en' ? 'Please enter both dates.' : 'Veuillez saisir les deux dates.');
    return;
  }

  const date1 = new Date(firstDate);
  const date2 = new Date(secondDate);

  if (date2 <= date1) {
    alert(currentLanguage === 'en' ? 'The second date must be after the first.' : 'La deuxième date doit être postérieure à la première.');
    return;
  }

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const remainingDays = diffDays % 7;

  const delayResult = document.getElementById('delay-result');
  const delayContent = document.getElementById('delay-content');

  let delayText = '<div class="delay-result-text">' + diffDays + (currentLanguage === 'en' ? ' days' : ' jours');
  if (diffWeeks > 0) {
    delayText += ' (' + diffWeeks + (currentLanguage === 'en' ? ' week' : ' semaine') + (diffWeeks > 1 ? 's' : '');
    if (remainingDays > 0) {
      delayText += (currentLanguage === 'en' ? ' and ' : ' et ') + remainingDays + (currentLanguage === 'en' ? ' day' : ' jour') + (remainingDays > 1 ? 's' : '');
    }
    delayText += ')';
  }
  delayText += '</div>';

  if (delayContent) delayContent.innerHTML = delayText;
  if (delayResult) delayResult.classList.remove('hidden');
}

// =================== MEDICATION DATABASE ===================
function renderMedicationDatabase() {
  const antiVegfList = document.getElementById('anti-vegf-list');
  const corticoidsList = document.getElementById('corticoids-list');

  if (antiVegfList) {
    antiVegfList.innerHTML = '';
    medicationData.anti_vegf.forEach(med => {
      antiVegfList.appendChild(createMedicationItem(med));
    });
  }

  if (corticoidsList) {
    corticoidsList.innerHTML = '';
    medicationData.corticoids.forEach(med => {
      corticoidsList.appendChild(createMedicationItem(med));
    });
  }
}

function createMedicationItem(med) {
  const div = document.createElement('div');
  div.className = 'medication-item';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'medication-name';
  nameDiv.textContent = med.name + ' (' + med.molecule + ')';

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'medication-details';
  detailsDiv.innerHTML = '<strong>Dose :</strong> ' + med.dose + '<br>'
    + '<strong>' + (med.intervals ? 'Intervalles' : 'Durée') + ' :</strong> ' + (med.intervals || med.duration)
    + (med.type ? '<br><strong>Type :</strong> ' + med.type : '');

  const indicationsDiv = document.createElement('div');
  indicationsDiv.className = 'medication-indications';
  med.indications.forEach(indication => {
    const tag = document.createElement('span');
    tag.className = 'indication-tag';
    tag.textContent = indication;
    indicationsDiv.appendChild(tag);
  });

  const statusDiv = document.createElement('div');
  statusDiv.className = 'amm-status';
  const statusSpan = document.createElement('span');
  statusSpan.className = med.amm ? 'amm-approved' : 'amm-off-label';
  statusSpan.textContent = med.amm ? 'AMM' : 'Hors AMM';
  statusDiv.appendChild(statusSpan);

  div.appendChild(nameDiv);
  div.appendChild(detailsDiv);
  div.appendChild(indicationsDiv);
  div.appendChild(statusDiv);
  return div;
}

// =================== PATHOLOGY RECOMMENDATIONS ===================
function renderPathologyRecommendations() {
  const pathologyInfo = document.getElementById('pathology-info');
  if (!pathologyInfo) return;
  pathologyInfo.innerHTML = '';

  Object.keys(pathologyData).forEach(key => {
    const pathology = pathologyData[key];
    const div = document.createElement('div');
    div.className = 'pathology-card';
    div.setAttribute('data-pathology', key);

    let html = '<h4>' + pathology.name + '</h4>';
    html += '<p><strong>Protocole :</strong> ' + pathology.protocol + '</p>';

    if (pathology.first_line) {
      html += '<p><strong>Première ligne :</strong></p><ul class="treatment-list">';
      html += pathology.first_line.map(med => '<li>' + med + '</li>').join('');
      html += '</ul>';
    }

    if (pathology.alternatives) {
      html += '<p><strong>Alternatives :</strong></p><ul class="treatment-list">';
      html += pathology.alternatives.map(med => '<li>' + med + '</li>').join('');
      html += '</ul>';
    }

    if (pathology.second_line) {
      html += '<p><strong>Deuxième ligne :</strong></p><ul class="treatment-list">';
      html += pathology.second_line.map(med => '<li>' + med + '</li>').join('');
      html += '</ul>';
    }

    html += '<p style="font-size:11px; color:var(--color-text-secondary); margin-top:12px;"><em>'
      + (currentLanguage === 'en' ? 'Click for more details →' : 'Cliquez pour plus de détails →')
      + '</em></p>';

    div.innerHTML = html;
    div.addEventListener('click', function () {
      showPathologyDetails(key, pathology);
    });
    pathologyInfo.appendChild(div);
  });
}

function showPathologyDetails(key, pathology) {
  const isFr = currentLanguage === 'fr';
  let details = '<h3>' + pathology.name + '</h3>';

  // Protocole détaillé selon la pathologie
  switch(key) {
    case 'dmla':
      details += '<h4>' + (isFr ? 'DMLA Humide' : 'Wet AMD') + '</h4>'
        + '<p>' + (isFr
          ? '<strong>Protocoles recommandés :</strong><br>'
            + '• <strong>Treat & Extend :</strong> 3 injections mensuelles, puis extension progressive<br>'
            + '• <strong>PRN :</strong> Selon réponse clinique et OCT<br><br>'
            + '<strong>Médicaments :</strong> Lucentis, Eylea, Eylea HD, Vabysmo, Beovu en première ligne<br><br>'
            + '<strong>Objectif :</strong> Rétine sèche, stabilisation de l\'AV'
          : '<strong>Recommended protocols:</strong><br>'
            + '• <strong>Treat & Extend:</strong> 3 monthly injections, then progressive extension<br>'
            + '• <strong>PRN:</strong> According to clinical response and OCT<br><br>'
            + '<strong>Medications:</strong> Lucentis, Eylea, Eylea HD, Vabysmo, Beovu first-line<br><br>'
            + '<strong>Goal:</strong> Dry retina, VA stabilization')
        + '</p>';
      break;
    case 'diabetic':
      details += '<h4>' + (isFr ? 'Maculopathie Diabétique' : 'Diabetic Macular Edema') + '</h4>'
        + '<p>' + (isFr
          ? '<strong>Protocoles :</strong><br>'
            + '• Anti-VEGF en première ligne (Eylea, Vabysmo, Lucentis)<br>'
            + '• Corticoïdes (Ozurdex, Triamcinolone) en alternatives ou association<br>'
            + '• Contrôle glycémique et tensionnel essentiel<br><br>'
            + '<strong>Suivi OCT :</strong> Mensuel initialement, puis selon réponse<br>'
            + '<strong>Objectif :</strong> Réduction de l\'épaisseur rétinienne centrale'
          : '<strong>Protocols:</strong><br>'
            + '• Anti-VEGF first-line (Eylea, Vabysmo, Lucentis)<br>'
            + '• Corticosteroids (Ozurdex, Triamcinolone) as alternatives or adjuvant<br>'
            + '• Glycemic and blood pressure control essential<br><br>'
            + '<strong>OCT Follow-up:</strong> Monthly initially, then per response<br>'
            + '<strong>Goal:</strong> CRT reduction')
        + '</p>';
      break;
    case 'rvo':
      details += '<h4>' + (isFr ? 'Occlusions Veineuses' : 'Retinal Vein Occlusions') + '</h4>'
        + '<p>' + (isFr
          ? '<strong>OVCR (occlusion branche) :</strong><br>'
            + '• Traitement : Anti-VEGF ou corticoïdes<br>'
            + '• Laser focal si exsudat menaçant la macula<br><br>'
            + '<strong>OBVR (occlusion centrale) :</strong><br>'
            + '• Anti-VEGF ou Ozurdex en première ligne<br>'
            + '• Suivi ophtalmo régulier<br><br>'
            + '<strong>Toutes molécules anti-VEGF autorisées pour OVR</strong>'
          : '<strong>Branch RVO:</strong><br>'
            + '• Treatment: Anti-VEGF or corticosteroids<br>'
            + '• Focal laser if exudates threaten macula<br><br>'
            + '<strong>Central RVO:</strong><br>'
            + '• Anti-VEGF or Ozurdex first-line<br>'
            + '• Regular ophthalmology follow-up<br><br>'
            + '<strong>All anti-VEGF molecules authorized for RVO</strong>')
        + '</p>';
      break;
    case 'irvine_gass':
      details += '<h4>' + (isFr ? 'Syndrome d\'Irvine-Gass' : 'Irvine-Gass Syndrome') + '</h4>'
        + '<p>' + (isFr
          ? '<strong>Définition :</strong> Œdème maculaire post-opératoire après chirurgie intra-oculaire<br><br>'
            + '<strong>Traitement :</strong><br>'
            + '• Niveau 1 : AINS topiques (indométacine) + acétazolamide per os<br>'
            + '• Niveau 2 : Triamcinolone intravitréenne (hors AMM)<br>'
            + '• Niveau 3 : Ozurdex (implant dexaméthasone)<br>'
            + '• Avis rétine si membrane épirétinienne tractionnelle<br><br>'
            + '<strong>Suivi OCT régulier</strong>'
          : '<strong>Definition:</strong> Post-operative macular edema after intraocular surgery<br><br>'
            + '<strong>Treatment:</strong><br>'
            + '• Level 1: Topical NSAIDs (indomethacin) + oral acetazolamide<br>'
            + '• Level 2: Intravitreal triamcinolone (off-label)<br>'
            + '• Level 3: Ozurdex (dexamethasone implant)<br>'
            + '• Retina specialist opinion if traction ERM<br><br>'
            + '<strong>Regular OCT follow-up</strong>')
        + '</p>';
      break;
    case 'uveitis':
      details += '<h4>' + (isFr ? 'Uvéites' : 'Uveitis') + '</h4>'
        + '<p>' + (isFr
          ? '<strong>Traitement de l\'œdème maculaire :</strong><br>'
            + '• Ozurdex ou Triamcinolone en première intention<br>'
            + '• Anti-VEGF si inflammation insuffisamment contrôlée<br>'
            + '• Contrôle de l\'inflammation systémique (immunosuppresseurs)<br><br>'
            + '<strong>Suivi :</strong> Clinique et OCT régulier<br>'
            + '<strong>Importante :</strong> Traiter la cause sous-jacente'
          : '<strong>Macular edema treatment:</strong><br>'
            + '• Ozurdex or Triamcinolone first-line<br>'
            + '• Anti-VEGF if inflammation not well controlled<br>'
            + '• Systemic inflammation control (immunosuppressants)<br><br>'
            + '<strong>Follow-up:</strong> Regular clinical exam and OCT<br>'
            + '<strong>Important:</strong> Treat underlying cause')
        + '</p>';
      break;
  }

  details += '<div style="margin-top:20px; text-align:center;">'
    + '<button onclick="closeModal()" class="btn btn--primary">'
    + (isFr ? 'Fermer' : 'Close')
    + '</button></div>';

  // Créer un modal simplifié (alert pour MVP, sinon utiliser une vraie modal)
  alert(details);
}

function highlightActivePathology(pathology) {
  document.querySelectorAll('.pathology-card').forEach(card => {
    card.classList.remove('active');
    if (card.getAttribute('data-pathology') === pathology) {
      card.classList.add('active');
    }
  });
}

// =================== PLANIFICATEUR ===================
function setupScheduler() {
  const protocolSelect = document.getElementById('ivt-protocol');
  const generateBtn = document.getElementById('generate-dates-btn');

  if (protocolSelect) {
    protocolSelect.addEventListener('change', function () {
      const teParams = document.getElementById('te-params');
      const ozurdexParams = document.getElementById('ozurdex-params');
      if (teParams) teParams.style.display = this.value === 'te' ? 'block' : 'none';
      if (ozurdexParams) ozurdexParams.style.display = this.value === 'ozurdex_initial' ? 'block' : 'none';
    });
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', generateIVTPlan);
  }

  // Remplir le sélecteur de médicaments du planificateur
  const schedulerMed = document.getElementById('scheduler-medication');
  if (schedulerMed) {
    const allMeds = [...medicationData.anti_vegf, ...medicationData.corticoids];
    allMeds.forEach(med => {
      const option = document.createElement('option');
      option.value = med.name;
      option.textContent = med.name + ' (' + med.molecule + ') ' + med.dose;
      if (!med.amm) option.textContent += ' - Hors AMM';
      schedulerMed.appendChild(option);
    });
  }
}

function generateIVTPlan() {
  const startDateStr = document.getElementById('ivt-start-date').value;
  const protocol = document.getElementById('ivt-protocol').value;
  const selectedMed = document.getElementById('scheduler-medication').value;

  if (!startDateStr) {
    alert(currentLanguage === 'en' ? 'Please select a start date.' : 'Veuillez sélectionner une date de départ.');
    return;
  }

  const start = new Date(startDateStr);
  const dates = [];
  const intervals = [];
  const notes = [];

  switch (protocol) {
    case 'loading':
      for (let i = 0; i < 3; i++) {
        const next = new Date(start);
        next.setDate(start.getDate() + i * 30);
        dates.push(next);
        intervals.push(i === 0 ? 0 : 4);
        notes.push(i === 0 ? 'Début' : '1ère injection');
      }
      break;

    case 'loading4':
      for (let i = 0; i < 4; i++) {
        const next = new Date(start);
        next.setDate(start.getDate() + i * 28);
        dates.push(next);
        intervals.push(i === 0 ? 0 : 4);
        notes.push(i === 0 ? 'Début' : '1ère injection');
      }
      break;

    case 'te': {
      const initialInterval = parseInt(document.getElementById('te-initial-interval').value) || 6;
      const extensionStep = parseInt(document.getElementById('te-extension-step').value) || 2;
      const maxInterval = parseInt(document.getElementById('te-max-interval').value) || 12;

      // Loading dose (3 monthly)
      for (let i = 0; i < 3; i++) {
        const next = new Date(start);
        next.setDate(start.getDate() + i * 28);
        dates.push(next);
        intervals.push(i === 0 ? 0 : 4);
        notes.push(i === 0 ? 'Début (dose de charge)' : 'Dose de charge');
      }

      // Extension phase - afficher jusqu'à intervalle maximal
      let currentInterval = initialInterval;
      let lastDate = dates[dates.length - 1];
      let extensionCount = 0;
      while (currentInterval <= maxInterval && extensionCount < 8) {
        const next = new Date(lastDate);
        next.setDate(lastDate.getDate() + currentInterval * 7);
        dates.push(next);
        intervals.push(currentInterval);
        notes.push('T&E q' + currentInterval + 'S');
        lastDate = next;
        currentInterval = Math.min(currentInterval + extensionStep, maxInterval);
        extensionCount++;
      }
      break;
    }

    case 'ozurdex_initial': {
      // Ozurdex schéma spécial
      const firstInjection = new Date(start);
      dates.push(firstInjection);
      intervals.push(0);
      notes.push('Injection Ozurdex #1');

      // Contrôle PIO 10 jours après
      const pioCheck = new Date(start);
      pioCheck.setDate(start.getDate() + 10);
      dates.push(pioCheck);
      intervals.push(0);
      notes.push('Contrôle PIO');

      // Évaluation efficacité M1-M2
      const eval1 = new Date(start);
      eval1.setMonth(start.getMonth() + 1);
      dates.push(eval1);
      intervals.push(0);
      notes.push('Évaluation efficacité (M1)');

      // Possibilité réinjection M3
      const reinjection = new Date(start);
      reinjection.setMonth(start.getMonth() + 3);
      dates.push(reinjection);
      intervals.push(0);
      notes.push('Injection Ozurdex #2 (si efficace)');

      // Contrôle PIO après 2e injection
      const pioCheck2 = new Date(reinjection);
      pioCheck2.setDate(reinjection.getDate() + 10);
      dates.push(pioCheck2);
      intervals.push(0);
      notes.push('Contrôle PIO');

      // Considérer Iluvien 15j après 2e Ozurdex (optionnel)
      const iluvien = new Date(reinjection);
      iluvien.setDate(reinjection.getDate() + 15);
      dates.push(iluvien);
      intervals.push(0);
      notes.push('Possibilité Iluvien (si 2 Ozurdex efficaces)');

      break;
    }

    case 'fixed':
      for (let i = 0; i < 6; i++) {
        const next = new Date(start);
        next.setMonth(start.getMonth() + i);
        dates.push(next);
        intervals.push(i === 0 ? 0 : 4);
        notes.push(i === 0 ? 'Début' : 'Mensuel');
      }
      break;

    case 'bimonthly':
      for (let i = 0; i < 6; i++) {
        const next = new Date(start);
        next.setDate(start.getDate() + i * 56);
        dates.push(next);
        intervals.push(i === 0 ? 0 : 8);
        notes.push(i === 0 ? 'Début' : 'q8S');
      }
      break;
  }

  // Affichage
  const listDiv = document.getElementById('ivt-dates-list');
  const resultDiv = document.getElementById('ivt-dates-result');
  const summaryDiv = document.getElementById('schedule-summary');

  if (listDiv) {
    listDiv.innerHTML = '';
    dates.forEach((date, index) => {
      const item = document.createElement('div');
      item.className = 'schedule-item';
      const noteText = notes[index] || '';
      item.innerHTML = '<span class="schedule-item-number">' + (index + 1) + '</span>'
        + '<div style="flex:1;">'
        + '<span class="schedule-item-date">' + formatDateShort(date) + '</span>'
        + (noteText ? '<span class="schedule-item-note">' + noteText + '</span>' : '')
        + '</div>'
        + '<span class="schedule-item-info">'
        + (intervals[index] > 0 ? 'q' + intervals[index] + 'S' : '')
        + '</span>';
      listDiv.appendChild(item);
    });
  }

  if (summaryDiv && dates.length > 1) {
    const totalDays = Math.ceil((dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    let medText = selectedMed ? ' (' + selectedMed + ')' : '';
    let protocolText = '';
    switch(protocol) {
      case 'loading': protocolText = ' - Dose de charge (3)'; break;
      case 'loading4': protocolText = ' - Dose de charge (4)'; break;
      case 'te': protocolText = ' - Treat & Extend'; break;
      case 'ozurdex_initial': protocolText = ' - Ozurdex'; break;
      case 'fixed': protocolText = ' - Mensuel'; break;
      case 'bimonthly': protocolText = ' - Bimestriel'; break;
    }
    summaryDiv.innerHTML = '<strong>' + (currentLanguage === 'en' ? 'Summary: ' : 'Résumé : ') + '</strong>'
      + dates.length + (currentLanguage === 'en' ? ' appointments over ' : ' rendez-vous sur ')
      + totalWeeks + (currentLanguage === 'en' ? ' weeks' : ' semaines')
      + protocolText + medText;
  }

  if (resultDiv) resultDiv.classList.remove('hidden');
}

// =================== OCT ANALYZER ===================
function setupOCTAnalyzer() {
  // Upload zone
  const uploadZone = document.getElementById('oct-upload-zone');
  const fileInput = document.getElementById('oct-image-input');
  const previewDiv = document.getElementById('oct-image-preview');
  const previewImg = document.getElementById('oct-preview-img');
  const removeBtn = document.getElementById('oct-remove-image');

  if (uploadZone) {
    uploadZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      this.classList.add('dragover');
    });
    uploadZone.addEventListener('dragleave', function () {
      this.classList.remove('dragover');
    });
    uploadZone.addEventListener('drop', function (e) {
      e.preventDefault();
      this.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleOCTImageFile(e.dataTransfer.files[0]);
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      if (this.files.length > 0) {
        handleOCTImageFile(this.files[0]);
      }
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener('click', function () {
      if (previewDiv) previewDiv.classList.add('hidden');
      if (previewImg) previewImg.src = '';
      if (uploadZone) uploadZone.style.display = '';
      if (fileInput) fileInput.value = '';
      currentOCTImageData = null;
    });
  }

  // OCT pathology -> medication link
  const octPathology = document.getElementById('oct-pathology');
  if (octPathology) {
    octPathology.addEventListener('change', function () {
      updateMedicationOptions(this.value, 'oct-medication');
    });
    // Initial fill
    updateMedicationOptions(octPathology.value, 'oct-medication');
  }

  // Add visit button
  const addVisitBtn = document.getElementById('oct-add-visit-btn');
  if (addVisitBtn) {
    addVisitBtn.addEventListener('click', addOCTVisit);
  }

  // Clear button
  const clearBtn = document.getElementById('oct-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (confirm(currentLanguage === 'en' ? 'Reset all visit data?' : 'Réinitialiser toutes les données de visite ?')) {
        octVisits = [];
        saveOCTVisits();
        renderOCTVisits();
      }
    });
  }

  // Compare selectors
  const compareA = document.getElementById('oct-compare-a');
  const compareB = document.getElementById('oct-compare-b');
  if (compareA) compareA.addEventListener('change', renderOCTComparison);
  if (compareB) compareB.addEventListener('change', renderOCTComparison);

  // Set today's date as default
  const dateInput = document.getElementById('oct-visit-date');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
}

let currentOCTImageData = null;

function handleOCTImageFile(file) {
  if (!file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    currentOCTImageData = e.target.result;
    const previewImg = document.getElementById('oct-preview-img');
    const previewDiv = document.getElementById('oct-image-preview');
    const uploadZone = document.getElementById('oct-upload-zone');

    if (previewImg) previewImg.src = currentOCTImageData;
    if (previewDiv) previewDiv.classList.remove('hidden');
    if (uploadZone) uploadZone.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function addOCTVisit() {
  const visitDate = document.getElementById('oct-visit-date').value;
  const crt = parseInt(document.getElementById('oct-crt').value);
  const va = document.getElementById('oct-va').value;
  const interval = parseInt(document.getElementById('oct-current-interval').value);
  const notes = document.getElementById('oct-notes').value;

  if (!visitDate) {
    alert(currentLanguage === 'en' ? 'Please enter a visit date.' : 'Veuillez saisir une date de visite.');
    return;
  }

  if (!crt || crt < 100 || crt > 900) {
    alert(currentLanguage === 'en' ? 'Please enter a valid CRT (100-900 µm).' : 'Veuillez saisir un CRT valide (100-900 µm).');
    return;
  }

  // Collect findings
  const srf = document.querySelector('input[name="oct-srf"]:checked').value;
  const irf = document.querySelector('input[name="oct-irf"]:checked').value;
  const ped = document.querySelector('input[name="oct-ped"]:checked').value;
  const dril = document.querySelector('input[name="oct-dril"]:checked').value;
  const ez = document.querySelector('input[name="oct-ez"]:checked').value;
  const elm = document.querySelector('input[name="oct-elm"]:checked').value;
  const erm = document.querySelector('input[name="oct-erm"]:checked').value;

  const visit = {
    id: Date.now().toString(),
    date: visitDate,
    crt: crt,
    va: va || '',
    srf: srf,
    irf: irf,
    ped: ped,
    dril: dril,
    ez: ez,
    elm: elm,
    erm: erm,
    interval: interval || 4,
    notes: notes || '',
    imageData: currentOCTImageData || null,
    eye: document.getElementById('oct-eye').value,
    pathology: document.getElementById('oct-pathology').value,
    medication: document.getElementById('oct-medication').value
  };

  octVisits.push(visit);
  octVisits.sort((a, b) => new Date(a.date) - new Date(b.date));

  saveOCTVisits();
  renderOCTVisits();
  resetOCTForm();
}

function resetOCTForm() {
  document.getElementById('oct-crt').value = '';
  document.getElementById('oct-va').value = '';
  document.getElementById('oct-notes').value = '';
  currentOCTImageData = null;

  const previewDiv = document.getElementById('oct-image-preview');
  const previewImg = document.getElementById('oct-preview-img');
  const uploadZone = document.getElementById('oct-upload-zone');
  const fileInput = document.getElementById('oct-image-input');

  if (previewDiv) previewDiv.classList.add('hidden');
  if (previewImg) previewImg.src = '';
  if (uploadZone) uploadZone.style.display = '';
  if (fileInput) fileInput.value = '';

  // Reset radios to defaults
  const defaultRadios = ['oct-srf', 'oct-irf', 'oct-ped', 'oct-dril'];
  defaultRadios.forEach(name => {
    const radio = document.querySelector('input[name="' + name + '"][value="absent"]');
    if (radio) radio.checked = true;
  });
  const ezRadio = document.querySelector('input[name="oct-ez"][value="intact"]');
  if (ezRadio) ezRadio.checked = true;
  const elmRadio = document.querySelector('input[name="oct-elm"][value="intact"]');
  if (elmRadio) elmRadio.checked = true;

  // Set date to today
  const dateInput = document.getElementById('oct-visit-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
}

function saveOCTVisits() {
  try {
    // Save without images to avoid localStorage size limits
    const visitsWithoutImages = octVisits.map(v => {
      const copy = Object.assign({}, v);
      copy.imageData = null;
      return copy;
    });
    localStorage.setItem('easivt_oct_visits', JSON.stringify(visitsWithoutImages));
  } catch (e) {
    // localStorage might be full or unavailable
  }
}

function loadOCTVisits() {
  try {
    const saved = localStorage.getItem('easivt_oct_visits');
    if (saved) {
      octVisits = JSON.parse(saved);
      renderOCTVisits();
    }
  } catch (e) {
    octVisits = [];
  }
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
    listDiv.innerHTML = '<div class="oct-empty-state">'
      + (currentLanguage === 'en'
        ? 'No visits recorded. Add a first visit to start follow-up tracking.'
        : 'Aucune visite enregistrée. Ajoutez une première visite pour commencer le suivi.')
      + '</div>';
    if (clearBtn) clearBtn.style.display = 'none';
    if (chartCard) chartCard.style.display = 'none';
    if (fluidCard) fluidCard.style.display = 'none';
    if (decisionCard) decisionCard.style.display = 'none';
    if (compareCard) compareCard.style.display = 'none';
    return;
  }

  if (clearBtn) clearBtn.style.display = '';

  // Render visit items
  listDiv.innerHTML = '';
  octVisits.forEach(visit => {
    const item = document.createElement('div');
    item.className = 'oct-visit-item';

    // Thumbnail
    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'oct-visit-thumb';
    if (visit.imageData) {
      thumbDiv.innerHTML = '<img src="' + visit.imageData + '" alt="OCT">';
    } else {
      thumbDiv.innerHTML = '<span class="oct-visit-thumb-placeholder">OCT</span>';
    }

    // Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'oct-visit-info';

    const dateDiv = document.createElement('div');
    dateDiv.className = 'oct-visit-date';
    dateDiv.textContent = formatDateShort(new Date(visit.date));

    const metricsDiv = document.createElement('div');
    metricsDiv.className = 'oct-visit-metrics';
    metricsDiv.innerHTML = '<span class="oct-metric oct-metric--highlight">CRT: ' + visit.crt + ' µm</span>'
      + '<span class="oct-metric">q' + visit.interval + 'S</span>'
      + (visit.va ? '<span class="oct-metric">AV: ' + visit.va + '</span>' : '')
      + '<span class="oct-metric">' + visit.eye + '</span>';

    const fluidsDiv = document.createElement('div');
    fluidsDiv.className = 'oct-visit-fluids';
    fluidsDiv.innerHTML = getFluidTag('SRF', visit.srf) + getFluidTag('IRF', visit.irf) + getFluidTag('PED', visit.ped);

    infoDiv.appendChild(dateDiv);
    infoDiv.appendChild(metricsDiv);
    infoDiv.appendChild(fluidsDiv);

    // Actions
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'oct-visit-actions';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'oct-visit-delete';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.title = currentLanguage === 'en' ? 'Delete' : 'Supprimer';
    deleteBtn.addEventListener('click', function () {
      deleteOCTVisit(visit.id);
    });
    actionsDiv.appendChild(deleteBtn);

    item.appendChild(thumbDiv);
    item.appendChild(infoDiv);
    item.appendChild(actionsDiv);
    listDiv.appendChild(item);
  });

  // Render chart
  if (chartCard && octVisits.length >= 1) {
    chartCard.style.display = '';
    renderCRTChart();
  }

  // Render fluid timeline
  if (fluidCard && octVisits.length >= 2) {
    fluidCard.style.display = '';
    renderFluidTimeline();
  }

  // Decision support
  if (decisionCard && octVisits.length >= 1) {
    decisionCard.style.display = '';
    renderDecisionSupport();
  }

  // Comparison
  if (compareCard && octVisits.length >= 2) {
    compareCard.style.display = '';
    updateCompareSelectors();
  }
}

function getFluidTag(label, value) {
  let cls = 'oct-fluid-tag--good';
  if (value === 'present' || value === 'dome' || value === 'irregular') cls = 'oct-fluid-tag--bad';
  else if (value === 'trace' || value === 'flat') cls = 'oct-fluid-tag--warn';

  return '<span class="oct-fluid-tag ' + cls + '">' + label + ': '
    + getFluidLabel(value) + '</span>';
}

function getFluidLabel(value) {
  const labels = {
    absent: '-',
    trace: '~',
    present: '+',
    flat: 'P',
    dome: 'B',
    irregular: 'I',
    intact: 'OK',
    disrupted: 'Alt',
  };
  return labels[value] || value;
}

// =================== CRT CHART (SVG) ===================
function renderCRTChart() {
  const container = document.getElementById('oct-crt-chart');
  if (!container || octVisits.length === 0) return;

  const width = 500;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const crtValues = octVisits.map(v => v.crt);
  const minCRT = Math.max(100, Math.min(...crtValues) - 30);
  const maxCRT = Math.max(...crtValues) + 30;

  const normalMax = 300;

  let svg = '<svg viewBox="0 0 ' + width + ' ' + height + '" xmlns="http://www.w3.org/2000/svg">';

  // Normal range band
  if (normalMax > minCRT) {
    const bandY = padding.top + chartH * (1 - (normalMax - minCRT) / (maxCRT - minCRT));
    const bandH = chartH - (chartH * (1 - (normalMax - minCRT) / (maxCRT - minCRT)));
    svg += '<rect x="' + padding.left + '" y="' + Math.max(bandY, padding.top) + '" width="' + chartW + '" height="' + Math.min(bandH, chartH) + '" fill="rgba(33,128,141,0.06)" />';
    svg += '<line x1="' + padding.left + '" y1="' + bandY + '" x2="' + (width - padding.right) + '" y2="' + bandY + '" stroke="rgba(33,128,141,0.3)" stroke-dasharray="4,4" />';
    svg += '<text x="' + (width - padding.right - 2) + '" y="' + (bandY - 4) + '" font-size="9" fill="rgba(33,128,141,0.6)" text-anchor="end">300µm</text>';
  }

  // Y axis ticks
  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const val = Math.round(minCRT + (maxCRT - minCRT) * (i / yTicks));
    const y = padding.top + chartH * (1 - i / yTicks);
    svg += '<line x1="' + (padding.left - 4) + '" y1="' + y + '" x2="' + (width - padding.right) + '" y2="' + y + '" stroke="rgba(128,128,128,0.1)" />';
    svg += '<text x="' + (padding.left - 8) + '" y="' + (y + 3) + '" font-size="10" fill="rgba(128,128,128,0.6)" text-anchor="end">' + val + '</text>';
  }

  // Plot line & points
  if (octVisits.length > 1) {
    let pathD = '';
    octVisits.forEach((v, i) => {
      const x = padding.left + (i / (octVisits.length - 1)) * chartW;
      const y = padding.top + chartH * (1 - (v.crt - minCRT) / (maxCRT - minCRT));
      pathD += (i === 0 ? 'M' : 'L') + x + ',' + y;
    });
    svg += '<path d="' + pathD + '" fill="none" stroke="rgba(33,128,141,0.8)" stroke-width="2" stroke-linejoin="round" />';
  }

  // Points and labels
  octVisits.forEach((v, i) => {
    const x = octVisits.length === 1 ? padding.left + chartW / 2 : padding.left + (i / (octVisits.length - 1)) * chartW;
    const y = padding.top + chartH * (1 - (v.crt - minCRT) / (maxCRT - minCRT));

    const color = v.crt > 300 ? 'rgba(192,21,47,0.8)' : 'rgba(33,128,141,0.8)';
    svg += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="' + color + '" stroke="#fff" stroke-width="1.5" />';
    svg += '<text x="' + x + '" y="' + (y - 8) + '" font-size="9" fill="' + color + '" text-anchor="middle" font-weight="600">' + v.crt + '</text>';

    // Date label on X axis
    const dateLabel = new Date(v.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    svg += '<text x="' + x + '" y="' + (height - 8) + '" font-size="9" fill="rgba(128,128,128,0.6)" text-anchor="middle" transform="rotate(-30,' + x + ',' + (height - 8) + ')">' + dateLabel + '</text>';
  });

  // Axis labels
  svg += '<text x="' + (padding.left - 35) + '" y="' + (height / 2) + '" font-size="10" fill="rgba(128,128,128,0.6)" text-anchor="middle" transform="rotate(-90,' + (padding.left - 35) + ',' + (height / 2) + ')">CRT (µm)</text>';

  svg += '</svg>';
  container.innerHTML = svg;
}

// =================== FLUID TIMELINE ===================
function renderFluidTimeline() {
  const container = document.getElementById('oct-fluid-timeline');
  if (!container || octVisits.length < 2) return;

  const fluids = [
    { key: 'srf', label: 'SRF' },
    { key: 'irf', label: 'IRF' },
    { key: 'ped', label: 'PED' }
  ];

  let html = '';
  fluids.forEach(fluid => {
    html += '<div class="fluid-timeline-row">';
    html += '<span class="fluid-timeline-label">' + fluid.label + '</span>';
    html += '<div class="fluid-timeline-blocks">';
    octVisits.forEach(v => {
      const val = v[fluid.key];
      html += '<div class="fluid-block fluid-block--' + val + '" title="' + formatDateShort(new Date(v.date)) + ': ' + val + '">'
        + getFluidLabel(val) + '</div>';
    });
    html += '</div></div>';
  });

  // Interval row
  html += '<div class="fluid-timeline-row">';
  html += '<span class="fluid-timeline-label">Int.</span>';
  html += '<div class="fluid-timeline-blocks">';
  octVisits.forEach(v => {
    html += '<div class="fluid-block" style="background:rgba(var(--color-primary-rgb),0.15);color:var(--color-primary);" title="Intervalle: ' + v.interval + ' semaines">'
      + v.interval + 'S</div>';
  });
  html += '</div></div>';

  container.innerHTML = html;
}

// =================== DECISION SUPPORT ===================
function renderDecisionSupport() {
  const container = document.getElementById('oct-decision-content');
  if (!container || octVisits.length === 0) return;

  const latest = octVisits[octVisits.length - 1];
  const previous = octVisits.length >= 2 ? octVisits[octVisits.length - 2] : null;

  let recommendation = analyzeOCTData(latest, previous);

  let html = '<div class="decision-recommendation decision-recommendation--' + recommendation.level + '">';
  html += '<div class="decision-title">' + recommendation.title + '</div>';
  html += '<div class="decision-details">' + recommendation.details + '</div>';
  html += '</div>';

  // Add interval suggestion
  if (recommendation.suggestedInterval) {
    html += '<div style="margin-top:12px;font-size:12px;color:var(--color-text-secondary);">';
    html += '<strong>' + (currentLanguage === 'en' ? 'Suggested interval: ' : 'Intervalle suggéré : ') + '</strong>';
    html += recommendation.suggestedInterval + (currentLanguage === 'en' ? ' weeks' : ' semaines');
    html += '</div>';
  }

  container.innerHTML = html;
}

function analyzeOCTData(latest, previous) {
  const isFr = currentLanguage === 'fr';
  const hasActiveFluid = latest.srf === 'present' || latest.irf === 'present';
  const hasTraceFluid = latest.srf === 'trace' || latest.irf === 'trace';
  const hasPED = latest.ped !== 'absent';
  const crtElevated = latest.crt > 300;
  const hasErm = latest.erm && latest.erm !== 'absent';
  const hasTractonalErm = latest.erm === 'traction';

  let fluidImproved = false;
  let fluidWorsened = false;
  let crtDelta = 0;

  if (previous) {
    const prevActive = previous.srf === 'present' || previous.irf === 'present';
    const currActive = hasActiveFluid;
    fluidImproved = prevActive && !currActive;
    fluidWorsened = !prevActive && currActive;
    crtDelta = latest.crt - previous.crt;
  }

  // Attention immédiate si membrane tractionnelle
  if (hasTractonalErm) {
    return {
      level: 'urgent',
      title: isFr ? '⚠️ Membrane épirétinienne tractionnelle' : '⚠️ Tractional ERM',
      details: isFr
        ? '<ul><li>Avis spécialisé rétine vivement recommandé</li>'
          + '<li>Évaluation pour chirurgie vitréo-rétinienne si sympomatique</li>'
          + '<li>IVT peut compléter mais ne résout pas la traction mécanique</li></ul>'
        : '<ul><li>Retina specialist opinion strongly recommended</li>'
          + '<li>Evaluation for vitreoretinal surgery if symptomatic</li>'
          + '<li>IVT can complement but does not resolve mechanical traction</li></ul>',
      suggestedInterval: null
    };
  }

  // Decision logic
  if (hasActiveFluid && crtElevated) {
    return {
      level: 'reduce',
      title: isFr ? 'Raccourcir l\'intervalle' : 'Shorten interval',
      details: isFr
        ? '<ul><li>Fluide actif détecté (SRF/IRF)</li><li>CRT élevé (' + latest.crt + ' µm)</li>'
          + (previous ? '<li>Variation CRT : ' + (crtDelta > 0 ? '+' : '') + crtDelta + ' µm</li>' : '')
          + '<li>Considérer un raccourcissement de 2 semaines</li></ul>'
        : '<ul><li>Active fluid detected (SRF/IRF)</li><li>Elevated CRT (' + latest.crt + ' µm)</li>'
          + (previous ? '<li>CRT change: ' + (crtDelta > 0 ? '+' : '') + crtDelta + ' µm</li>' : '')
          + '<li>Consider shortening by 2 weeks</li></ul>',
      suggestedInterval: Math.max(4, latest.interval - 2)
    };
  }

  if (fluidWorsened) {
    return {
      level: 'urgent',
      title: isFr ? 'Réactivation - Raccourcir l\'intervalle' : 'Reactivation - Shorten interval',
      details: isFr
        ? '<ul><li>Réapparition de fluide par rapport à la visite précédente</li>'
          + '<li>CRT : ' + latest.crt + ' µm (variation : ' + (crtDelta > 0 ? '+' : '') + crtDelta + ' µm)</li>'
          + '<li>Reprendre un intervalle plus court</li></ul>'
        : '<ul><li>Fluid reappearance compared to previous visit</li>'
          + '<li>CRT: ' + latest.crt + ' µm (change: ' + (crtDelta > 0 ? '+' : '') + crtDelta + ' µm)</li>'
          + '<li>Resume shorter interval</li></ul>',
      suggestedInterval: Math.max(4, latest.interval - 2)
    };
  }

  if (hasTraceFluid && !crtElevated) {
    return {
      level: 'maintain',
      title: isFr ? 'Maintenir l\'intervalle' : 'Maintain interval',
      details: isFr
        ? '<ul><li>Traces de fluide résiduelles</li><li>CRT dans les limites (' + latest.crt + ' µm)</li>'
          + '<li>Maintenir l\'intervalle actuel de ' + latest.interval + ' semaines</li></ul>'
        : '<ul><li>Residual trace fluid</li><li>CRT within limits (' + latest.crt + ' µm)</li>'
          + '<li>Maintain current ' + latest.interval + '-week interval</li></ul>',
      suggestedInterval: latest.interval
    };
  }

  if (!hasActiveFluid && !hasTraceFluid && !crtElevated) {
    const canExtend = latest.interval < 16;
    if (fluidImproved || canExtend) {
      return {
        level: 'extend',
        title: isFr ? 'Étendre l\'intervalle' : 'Extend interval',
        details: isFr
          ? '<ul><li>Rétine sèche - Pas de fluide actif</li><li>CRT normal (' + latest.crt + ' µm)</li>'
            + (fluidImproved ? '<li>Amélioration par rapport à la visite précédente</li>' : '')
            + '<li>Considérer une extension de 2 semaines</li></ul>'
          : '<ul><li>Dry retina - No active fluid</li><li>Normal CRT (' + latest.crt + ' µm)</li>'
            + (fluidImproved ? '<li>Improvement compared to previous visit</li>' : '')
            + '<li>Consider extending by 2 weeks</li></ul>',
        suggestedInterval: Math.min(16, latest.interval + 2)
      };
    }

    return {
      level: 'maintain',
      title: isFr ? 'Maintenir l\'intervalle maximal' : 'Maintain maximum interval',
      details: isFr
        ? '<ul><li>Rétine sèche, intervalle déjà maximal</li><li>CRT stable (' + latest.crt + ' µm)</li></ul>'
        : '<ul><li>Dry retina, already at maximum interval</li><li>Stable CRT (' + latest.crt + ' µm)</li></ul>',
      suggestedInterval: latest.interval
    };
  }

  if (hasActiveFluid && !crtElevated) {
    return {
      level: 'reduce',
      title: isFr ? 'Raccourcir l\'intervalle' : 'Shorten interval',
      details: isFr
        ? '<ul><li>Fluide actif malgré CRT acceptable (' + latest.crt + ' µm)</li>'
          + '<li>Raccourcir de 2 semaines recommandé</li></ul>'
        : '<ul><li>Active fluid despite acceptable CRT (' + latest.crt + ' µm)</li>'
          + '<li>Shortening by 2 weeks recommended</li></ul>',
      suggestedInterval: Math.max(4, latest.interval - 2)
    };
  }

  return {
    level: 'maintain',
    title: isFr ? 'Évaluation clinique nécessaire' : 'Clinical evaluation needed',
    details: isFr
      ? '<ul><li>Données insuffisantes pour une recommandation automatique</li><li>CRT : ' + latest.crt + ' µm</li></ul>'
      : '<ul><li>Insufficient data for automatic recommendation</li><li>CRT: ' + latest.crt + ' µm</li></ul>',
    suggestedInterval: null
  };
}

// =================== OCT COMPARISON ===================
function updateCompareSelectors() {
  const selectA = document.getElementById('oct-compare-a');
  const selectB = document.getElementById('oct-compare-b');
  if (!selectA || !selectB) return;

  const buildOptions = (select, defaultIndex) => {
    select.innerHTML = '';
    octVisits.forEach((v, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = formatDateShort(new Date(v.date)) + ' (CRT: ' + v.crt + ')';
      if (i === defaultIndex) option.selected = true;
      select.appendChild(option);
    });
  };

  buildOptions(selectA, octVisits.length >= 2 ? octVisits.length - 2 : 0);
  buildOptions(selectB, octVisits.length - 1);

  renderOCTComparison();
}

function renderOCTComparison() {
  const container = document.getElementById('oct-comparison-view');
  const selectA = document.getElementById('oct-compare-a');
  const selectB = document.getElementById('oct-compare-b');
  if (!container || !selectA || !selectB) return;

  const indexA = parseInt(selectA.value);
  const indexB = parseInt(selectB.value);
  const visitA = octVisits[indexA];
  const visitB = octVisits[indexB];
  if (!visitA || !visitB) return;

  const isFr = currentLanguage === 'fr';

  let html = '';

  // Panel A
  html += '<div class="oct-compare-panel">';
  html += '<div class="oct-compare-panel-header">' + (isFr ? 'Visite A - ' : 'Visit A - ') + formatDateShort(new Date(visitA.date)) + '</div>';
  html += '<div class="oct-compare-panel-image">';
  if (visitA.imageData) {
    html += '<img src="' + visitA.imageData + '" alt="OCT A">';
  } else {
    html += '<span style="color:rgba(255,255,255,0.3);font-size:12px;">No image</span>';
  }
  html += '</div>';
  html += '<div class="oct-compare-panel-data">';
  html += '<strong>CRT:</strong> ' + visitA.crt + ' µm<br>';
  html += '<strong>SRF:</strong> ' + visitA.srf + ' | <strong>IRF:</strong> ' + visitA.irf + '<br>';
  html += '<strong>PED:</strong> ' + visitA.ped + ' | <strong>EZ:</strong> ' + visitA.ez;
  if (visitA.erm) html += '<br><strong>ERM:</strong> ' + visitA.erm;
  if (visitA.va) html += '<br><strong>AV:</strong> ' + visitA.va;
  html += '</div></div>';

  // Panel B
  html += '<div class="oct-compare-panel">';
  html += '<div class="oct-compare-panel-header">' + (isFr ? 'Visite B - ' : 'Visit B - ') + formatDateShort(new Date(visitB.date)) + '</div>';
  html += '<div class="oct-compare-panel-image">';
  if (visitB.imageData) {
    html += '<img src="' + visitB.imageData + '" alt="OCT B">';
  } else {
    html += '<span style="color:rgba(255,255,255,0.3);font-size:12px;">No image</span>';
  }
  html += '</div>';
  html += '<div class="oct-compare-panel-data">';
  html += '<strong>CRT:</strong> ' + visitB.crt + ' µm<br>';
  html += '<strong>SRF:</strong> ' + visitB.srf + ' | <strong>IRF:</strong> ' + visitB.irf + '<br>';
  html += '<strong>PED:</strong> ' + visitB.ped + ' | <strong>EZ:</strong> ' + visitB.ez;
  if (visitB.erm) html += '<br><strong>ERM:</strong> ' + visitB.erm;
  if (visitB.va) html += '<br><strong>AV:</strong> ' + visitB.va;
  html += '</div></div>';

  // Delta panel
  const crtDelta = visitB.crt - visitA.crt;
  const deltaClass = crtDelta > 0 ? 'delta-positive' : (crtDelta < 0 ? 'delta-negative' : 'delta-neutral');

  html += '<div class="oct-compare-delta">';
  html += '<div class="oct-compare-delta-title">' + (isFr ? 'Évolution' : 'Evolution') + '</div>';
  html += '<strong>CRT:</strong> <span class="' + deltaClass + '">' + (crtDelta > 0 ? '+' : '') + crtDelta + ' µm</span>';

  // Fluid changes
  const fluidChanges = [];
  ['srf', 'irf', 'ped'].forEach(key => {
    if (visitA[key] !== visitB[key]) {
      fluidChanges.push(key.toUpperCase() + ': ' + visitA[key] + ' → ' + visitB[key]);
    }
  });
  if (fluidChanges.length > 0) {
    html += '<br><strong>' + (isFr ? 'Changements : ' : 'Changes: ') + '</strong>' + fluidChanges.join(' | ');
  } else {
    html += '<br><em>' + (isFr ? 'Pas de changement de fluide' : 'No fluid changes') + '</em>';
  }

  // Days between
  const daysBetween = Math.ceil(Math.abs(new Date(visitB.date) - new Date(visitA.date)) / (1000 * 60 * 60 * 24));
  html += '<br><strong>' + (isFr ? 'Délai : ' : 'Delay: ') + '</strong>' + daysBetween + (isFr ? ' jours' : ' days');

  html += '</div>';

  container.innerHTML = html;
}

// =================== LANGUAGE ===================
function updateLanguage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });

  updatePathologySelectOptions();
  renderPathologyRecommendations();

  // Re-render OCT if visits exist
  if (octVisits.length > 0) {
    renderOCTVisits();
  }
}

function updatePathologySelectOptions() {
  const pathologySelect = document.getElementById('pathology');
  if (!pathologySelect) return;

  const currentValue = pathologySelect.value;

  if (currentLanguage === 'en') {
    pathologySelect.innerHTML = '<option value="">Select a pathology</option>'
      + '<option value="dmla">Wet AMD</option>'
      + '<option value="diabetic">Diabetic maculopathy</option>'
      + '<option value="rvo">Retinal vein occlusions</option>'
      + '<option value="irvine_gass">Irvine-Gass syndrome</option>'
      + '<option value="uveitis">Uveitis</option>';
  } else {
    pathologySelect.innerHTML = '<option value="">Sélectionner une pathologie</option>'
      + '<option value="dmla">DMLA humide</option>'
      + '<option value="diabetic">Maculopathie diabétique</option>'
      + '<option value="rvo">Occlusions veineuses</option>'
      + '<option value="irvine_gass">Syndrome d\'Irvine-Gass</option>'
      + '<option value="uveitis">Uvéites</option>';
  }

  pathologySelect.value = currentValue;
  if (currentValue) updateMedicationOptions(currentValue);
}

// =================== HELPERS ===================
function formatDate(date) {
  return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatDateShort(date) {
  return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
