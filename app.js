// Données médicaments et pathologies
const medicationData = {
  "anti_vegf": [
    {
      "name": "Lucentis",
      "molecule": "Ranibizumab", 
      "dose": "0.5mg",
      "intervals": "4-12 semaines",
      "amm": true,
      "indications": ["DMLA", "Diabétique", "OVCR/OBVR"]
    },
    {
      "name": "Eylea",
      "molecule": "Aflibercept",
      "dose": "2mg", 
      "intervals": "4-16 semaines",
      "amm": true,
      "indications": ["DMLA", "Diabétique", "OVCR/OBVR"]
    },
    {
      "name": "Eylea HD",
      "molecule": "Aflibercept",
      "dose": "8mg",
      "intervals": "8-16 semaines après 3 injections mensuelles",
      "amm": true,
      "indications": ["DMLA", "Diabétique"]
    },
    {
      "name": "Vabysmo", 
      "molecule": "Faricimab",
      "dose": "6mg",
      "intervals": "8-16 semaines après 4 injections mensuelles",
      "amm": true,
      "indications": ["DMLA", "Diabétique"]
    },
    {
      "name": "Beovu",
      "molecule": "Brolucizumab", 
      "dose": "6mg",
      "intervals": "8-12 semaines",
      "amm": true,
      "indications": ["DMLA"]
    },
    {
      "name": "Avastin",
      "molecule": "Bevacizumab",
      "dose": "1.25mg", 
      "intervals": "4-8 semaines",
      "amm": false,
      "indications": ["DMLA", "Diabétique", "OVCR/OBVR"]
    }
  ],
  "corticoids": [
    {
      "name": "Ozurdex",
      "molecule": "Dexaméthasone",
      "dose": "0.7mg",
      "type": "implant",
      "duration": "4-6 mois",
      "amm": true,
      "indications": ["Diabétique", "OVCR/OBVR", "Uvéites"]
    },
    {
      "name": "Kénacort", 
      "molecule": "Triamcinolone",
      "dose": "4mg",
      "type": "injection",
      "duration": "3-4 mois", 
      "amm": false,
      "indications": ["Diabétique", "OVCR/OBVR", "Uvéites", "Irvine-Gass"]
    }
  ]
};

const pathologyData = {
  "dmla": {
    "name": "DMLA humide",
    "first_line": ["Lucentis", "Eylea", "Eylea HD", "Vabysmo", "Beovu"],
    "protocol": "3 injections mensuelles puis Treat & Extend"
  },
  "diabetic": {
    "name": "Maculopathie diabétique", 
    "first_line": ["Lucentis", "Eylea", "Eylea HD", "Vabysmo"],
    "alternatives": ["Ozurdex", "Kénacort"],
    "protocol": "Injections mensuelles puis extension"
  },
  "rvo": {
    "name": "Occlusions veineuses",
    "first_line": ["Lucentis", "Eylea", "Vabysmo"],
    "alternatives": ["Ozurdex", "Kénacort"], 
    "protocol": "Selon réponse thérapeutique"
  },
  "irvine_gass": {
    "name": "Syndrome d'Irvine-Gass",
    "first_line": ["AINS topiques", "Acétazolamide"],
    "second_line": ["Kénacort", "Ozurdex"],
    "protocol": "Escalade thérapeutique"
  },
  "uveitis": {
    "name": "Uvéites",
    "first_line": ["Ozurdex", "Kénacort"],
    "protocol": "Selon sévérité et réponse"
  }
};

// Traductions
const translations = {
  fr: {
    "hero.title": "Calculateur d'Injections Intravitréennes",
    "hero.subtitle": "Outil professionnel pour le calcul et la planification des IVT",
    "calculator.title": "Calculateur IVT",
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
    "medications.title": "Base de données des médicaments",
    "medications.anti_vegf": "Anti-VEGF",
    "medications.corticoids": "Corticoïdes",
    "recommendations.title": "Recommandations thérapeutiques",
    "disclaimer.title": "Avertissement légal",
    "disclaimer.content1": "Ce site ne remplace pas le jugement clinique du médecin. Les recommandations présentées sont indicatives et doivent être adaptées à chaque patient.",
    "disclaimer.content2": "L'utilisation de médicaments hors AMM (Autorisation de Mise sur le Marché) relève de la responsabilité du prescripteur selon l'article L.5121-12-1 du CSP.",
    "disclaimer.content3": "Les intervalles d'injection doivent être ajustés selon la réponse thérapeutique et l'état clinique du patient."
  },
  en: {
    "hero.title": "Intravitreal Injection Calculator",
    "hero.subtitle": "Professional tool for IVT calculation and planning",
    "calculator.title": "IVT Calculator",
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
    "medications.title": "Medications database",
    "medications.anti_vegf": "Anti-VEGF",
    "medications.corticoids": "Corticosteroids",
    "recommendations.title": "Therapeutic recommendations",
    "disclaimer.title": "Legal disclaimer",
    "disclaimer.content1": "This site does not replace the doctor's clinical judgment. The recommendations presented are indicative and must be adapted to each patient.",
    "disclaimer.content2": "The use of off-label medications is the responsibility of the prescriber according to applicable regulations.",
    "disclaimer.content3": "Injection intervals should be adjusted according to therapeutic response and patient clinical condition."
  }
};

let currentLanguage = 'fr';

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app');
    
    // S'assurer que le pop-up est visible au démarrage
    const professionalWarning = document.getElementById('professional-warning');
    const mainContent = document.getElementById('main-content');
    
    if (professionalWarning) {
        professionalWarning.style.display = 'flex';
        console.log('Professional warning shown');
    }
    
    if (mainContent) {
        mainContent.classList.add('hidden');
        console.log('Main content hidden');
    }

    // Gestion du pop-up d'avertissement
    const confirmBtn = document.getElementById('confirm-professional');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            console.log('Professional confirmation clicked');
            if (professionalWarning) {
                professionalWarning.style.display = 'none';
            }
            if (mainContent) {
                mainContent.classList.remove('hidden');
            }
        });
    }

    // Gestion du sélecteur de langue
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            currentLanguage = this.value;
            console.log('Language changed to:', currentLanguage);
            updateLanguage();
        });
    }

    // Initialisation des composants
    setupCalculator();
    setupDelayCalculator();
    setupPathologySelector();
    renderMedicationDatabase();
    renderPathologyRecommendations();
    initializePathologyOptions();
    updateLanguage();
}

function initializePathologyOptions() {
    const pathologySelect = document.getElementById('pathology');
    if (pathologySelect) {
        // S'assurer que les options sont présentes
        if (pathologySelect.children.length <= 1) {
            pathologySelect.innerHTML = `
                <option value="">Sélectionner une pathologie</option>
                <option value="dmla">DMLA humide</option>
                <option value="diabetic">Maculopathie diabétique</option>
                <option value="rvo">Occlusions veineuses</option>
                <option value="irvine_gass">Syndrome d'Irvine-Gass</option>
                <option value="uveitis">Uvéites</option>
            `;
        }
    }
}

function setupCalculator() {
    const pathologySelect = document.getElementById('pathology');
    const medicationSelect = document.getElementById('medication');
    const calculateBtn = document.getElementById('calculate-btn');

    if (pathologySelect) {
        pathologySelect.addEventListener('change', function() {
            console.log('Pathology changed to:', this.value);
            updateMedicationOptions(this.value);
        });
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateNextInjection);
    }
}

function setupDelayCalculator() {
    const calculateDelayBtn = document.getElementById('calculate-delay-btn');
    if (calculateDelayBtn) {
        calculateDelayBtn.addEventListener('click', calculateDelay);
    }
}

function setupPathologySelector() {
    const pathologySelect = document.getElementById('pathology');
    if (pathologySelect) {
        pathologySelect.addEventListener('change', function() {
            highlightActivePathology(this.value);
        });
    }
}

function updateMedicationOptions(pathology) {
    const medicationSelect = document.getElementById('medication');
    if (!medicationSelect) return;
    
    medicationSelect.innerHTML = '<option value="">Sélectionner un médicament</option>';

    if (!pathology) return;

    console.log('Updating medications for pathology:', pathology);

    // Ajouter les médicaments appropriés selon la pathologie
    const allMedications = [...medicationData.anti_vegf, ...medicationData.corticoids];
    
    allMedications.forEach(med => {
        let shouldInclude = false;
        
        // Logique d'inclusion basée sur la pathologie
        switch(pathology) {
            case 'dmla':
                shouldInclude = med.indications.includes('DMLA');
                break;
            case 'diabetic':
                shouldInclude = med.indications.includes('Diabétique');
                break;
            case 'rvo':
                shouldInclude = med.indications.includes('OVCR/OBVR');
                break;
            case 'irvine_gass':
                shouldInclude = med.indications.includes('Irvine-Gass');
                break;
            case 'uveitis':
                shouldInclude = med.indications.includes('Uvéites');
                break;
        }
        
        if (shouldInclude) {
            const option = document.createElement('option');
            option.value = med.name;
            option.textContent = `${med.name} (${med.molecule}) ${med.dose}`;
            if (!med.amm) {
                option.textContent += ' - Hors AMM';
            }
            medicationSelect.appendChild(option);
        }
    });
    
    console.log('Added', medicationSelect.children.length - 1, 'medication options');
}

function calculateNextInjection() {
    const lastInjectionDate = document.getElementById('last-injection-date').value;
    const interval = parseInt(document.getElementById('interval').value);
    const medication = document.getElementById('medication').value;
    const pathology = document.getElementById('pathology').value;

    console.log('Calculating injection with:', {lastInjectionDate, interval, medication, pathology});

    if (!lastInjectionDate || !interval || !medication) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    const lastDate = new Date(lastInjectionDate);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + (interval * 7));

    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');

    // Trouver les informations du médicament
    const allMeds = [...medicationData.anti_vegf, ...medicationData.corticoids];
    const medInfo = allMeds.find(med => med.name === medication);

    let resultHTML = `
        <div class="next-injection-date">
            Prochaine injection prévue : ${formatDate(nextDate)}
        </div>
        <div class="medication-info">
            <strong>Médicament :</strong> ${medication}
        </div>
    `;

    if (medInfo) {
        resultHTML += `
            <div class="medication-details">
                <strong>Molécule :</strong> ${medInfo.molecule}<br>
                <strong>Dose :</strong> ${medInfo.dose}<br>
                <strong>Intervalles recommandés :</strong> ${medInfo.intervals || medInfo.duration}
            </div>
        `;

        if (!medInfo.amm) {
            resultHTML += `
                <div class="off-label-warning">
                    ⚠️ Médicament hors AMM - Prescription sous la responsabilité du médecin
                </div>
            `;
        }
    }

    if (resultContent) {
        resultContent.innerHTML = resultHTML;
    }
    if (resultDiv) {
        resultDiv.classList.remove('hidden');
    }
}

function calculateDelay() {
    const firstDate = document.getElementById('first-injection-date').value;
    const secondDate = document.getElementById('second-injection-date').value;

    if (!firstDate || !secondDate) {
        alert('Veuillez saisir les deux dates.');
        return;
    }

    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);

    if (date2 <= date1) {
        alert('La deuxième date doit être postérieure à la première.');
        return;
    }

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;

    const delayResult = document.getElementById('delay-result');
    const delayContent = document.getElementById('delay-content');

    let delayText = `<div class="delay-result-text">${diffDays} jours`;
    if (diffWeeks > 0) {
        delayText += ` (${diffWeeks} semaine${diffWeeks > 1 ? 's' : ''}`;
        if (remainingDays > 0) {
            delayText += ` et ${remainingDays} jour${remainingDays > 1 ? 's' : ''}`;
        }
        delayText += ')';
    }
    delayText += '</div>';

    if (delayContent) {
        delayContent.innerHTML = delayText;
    }
    if (delayResult) {
        delayResult.classList.remove('hidden');
    }
}

function renderMedicationDatabase() {
    const antiVegfList = document.getElementById('anti-vegf-list');
    const corticoidsList = document.getElementById('corticoids-list');

    if (antiVegfList) {
        // Rendu des Anti-VEGF
        medicationData.anti_vegf.forEach(med => {
            const medDiv = createMedicationItem(med);
            antiVegfList.appendChild(medDiv);
        });
    }

    if (corticoidsList) {
        // Rendu des Corticoïdes
        medicationData.corticoids.forEach(med => {
            const medDiv = createMedicationItem(med);
            corticoidsList.appendChild(medDiv);
        });
    }
}

function createMedicationItem(med) {
    const div = document.createElement('div');
    div.className = 'medication-item';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'medication-name';
    nameDiv.textContent = `${med.name} (${med.molecule})`;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'medication-details';
    detailsDiv.innerHTML = `
        <strong>Dose :</strong> ${med.dose}<br>
        <strong>${med.intervals ? 'Intervalles' : 'Durée'} :</strong> ${med.intervals || med.duration}
        ${med.type ? `<br><strong>Type :</strong> ${med.type}` : ''}
    `;

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

function renderPathologyRecommendations() {
    const pathologyInfo = document.getElementById('pathology-info');
    if (!pathologyInfo) return;

    Object.keys(pathologyData).forEach(key => {
        const pathology = pathologyData[key];
        const div = document.createElement('div');
        div.className = 'pathology-card';
        div.setAttribute('data-pathology', key);

        let html = `
            <h4>${pathology.name}</h4>
            <p><strong>Protocole :</strong> ${pathology.protocol}</p>
        `;

        if (pathology.first_line) {
            html += `
                <p><strong>Première ligne :</strong></p>
                <ul class="treatment-list">
                    ${pathology.first_line.map(med => `<li>${med}</li>`).join('')}
                </ul>
            `;
        }

        if (pathology.alternatives) {
            html += `
                <p><strong>Alternatives :</strong></p>
                <ul class="treatment-list">
                    ${pathology.alternatives.map(med => `<li>${med}</li>`).join('')}
                </ul>
            `;
        }

        if (pathology.second_line) {
            html += `
                <p><strong>Deuxième ligne :</strong></p>
                <ul class="treatment-list">
                    ${pathology.second_line.map(med => `<li>${med}</li>`).join('')}
                </ul>
            `;
        }

        div.innerHTML = html;
        pathologyInfo.appendChild(div);
    });
}

function highlightActivePathology(pathology) {
    const pathologyCards = document.querySelectorAll('.pathology-card');
    pathologyCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-pathology') === pathology) {
            card.classList.add('active');
        }
    });
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    // Mettre à jour les options de sélection
    updateSelectOptions();
}

function updateSelectOptions() {
    const pathologySelect = document.getElementById('pathology');
    if (!pathologySelect) return;
    
    const currentValue = pathologySelect.value;
    
    if (currentLanguage === 'en') {
        pathologySelect.innerHTML = `
            <option value="">Select a pathology</option>
            <option value="dmla">Wet AMD</option>
            <option value="diabetic">Diabetic maculopathy</option>
            <option value="rvo">Retinal vein occlusions</option>
            <option value="irvine_gass">Irvine-Gass syndrome</option>
            <option value="uveitis">Uveitis</option>
        `;
    } else {
        pathologySelect.innerHTML = `
            <option value="">Sélectionner une pathologie</option>
            <option value="dmla">DMLA humide</option>
            <option value="diabetic">Maculopathie diabétique</option>
            <option value="rvo">Occlusions veineuses</option>
            <option value="irvine_gass">Syndrome d'Irvine-Gass</option>
            <option value="uveitis">Uvéites</option>
        `;
    }
    
    pathologySelect.value = currentValue;
    
    // Mettre à jour les médicaments si une pathologie était sélectionnée
    if (currentValue) {
        updateMedicationOptions(currentValue);
    }
}

function formatDate(date) {
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
// 📆 Initialisation du générateur de schémas IVT
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('generate-dates-btn');
  if (btn) {
    btn.addEventListener('click', generateIVTPlan);
  }
});

function generateIVTPlan() {
  const startDateInput = document.getElementById('ivt-start-date');
  const protocolSelect = document.getElementById('ivt-protocol');
  const resultDiv = document.getElementById('ivt-dates-result');
  const list = document.getElementById('ivt-dates-list');

  const startDateStr = startDateInput.value;
  const protocol = protocolSelect.value;

  if (!startDateStr || !protocol) {
    alert("Veuillez sélectionner une date et un protocole.");
    return;
  }

  const start = new Date(startDateStr);
  const dates = [];

  if (protocol === "loading") {
    // 3 injections à 30 jours d’intervalle
    for (let i = 0; i < 3; i++) {
      const next = new Date(start);
      next.setDate(start.getDate() + i * 30);
      dates.push(next);
    }
  }

  if (protocol === "fixed") {
    // Injections mensuelles pendant 6 mois
    for (let i = 0; i < 6; i++) {
      const next = new Date(start);
      next.setMonth(start.getMonth() + i);
      dates.push(next);
    }
  }

  if (protocol === "te") {
    // Traitement Treat & Extend (ex : +30j, +38j, +46j…)
    for (let i = 0; i < 6; i++) {
      const next = new Date(start);
      next.setDate(start.getDate() + 30 + i * 8);
      dates.push(next);
    }
  }

  // Affichage
  list.innerHTML = "";
  dates.forEach(date => {
    const li = document.createElement("li");
    li.textContent = formatDate(date);
    list.appendChild(li);
  });

  resultDiv.classList.remove("hidden");
}
