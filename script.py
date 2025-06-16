import pandas as pd

# Créer un tableau récapitulatif des médicaments IVT
medications_data = {
    'Médicament': [
        'Lucentis', 'Eylea', 'Eylea HD', 'Vabysmo', 'Beovu', 'Avastin',
        'Ozurdex', 'Kénacort'
    ],
    'Molécule': [
        'Ranibizumab', 'Aflibercept', 'Aflibercept', 'Faricimab', 
        'Brolucizumab', 'Bevacizumab', 'Dexaméthasone', 'Triamcinolone'
    ],
    'Dosage': [
        '0.5mg', '2mg', '8mg', '6mg', '6mg', '1.25mg', '0.7mg', '4mg'
    ],
    'Type': [
        'Anti-VEGF', 'Anti-VEGF', 'Anti-VEGF', 'Anti-VEGF', 
        'Anti-VEGF', 'Anti-VEGF', 'Corticoïde', 'Corticoïde'
    ],
    'Statut_AMM': [
        'AMM', 'AMM', 'AMM', 'AMM', 'AMM', 'Hors AMM', 'AMM', 'Hors AMM'
    ],
    'Intervalle_Maximum': [
        '12 semaines', '16 semaines', '16 semaines', '16 semaines', 
        '12 semaines', '8 semaines', '6 mois', '4 mois'
    ],
    'Protocole_Initial': [
        '3 mensuelles', '3 mensuelles', '3 mensuelles', '4 mensuelles',
        '3 mensuelles', '4-6 semaines', 'Unique', 'Unique'
    ],
    'Indications_Principales': [
        'DMLA, OMD, OVCR', 'DMLA, OMD, OVCR', 'DMLA, OMD', 'DMLA, OMD',
        'DMLA', 'DMLA, OMD, OVCR', 'OMD, OVCR, Uvéites', 'OMD, Uvéites, Irvine-Gass'
    ],
    'Année_Approbation': [
        '2007', '2012', '2023', '2022', '2019', 'Non AMM', '2010', 'Non AMM'
    ]
}

df_medications = pd.DataFrame(medications_data)

# Sauvegarder en CSV
df_medications.to_csv('tableau_medicaments_ivt.csv', index=False, encoding='utf-8')

print("Tableau récapitulatif des médicaments IVT créé avec succès")
print(df_medications.to_string(index=False))