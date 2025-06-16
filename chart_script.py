import plotly.express as px
import pandas as pd

# Create the dataset based on the provided JSON data
data = [
    {"medicament": "Avastin (Bevacizumab)", "intervalle_max": 8, "type": "Anti-VEGF", "statut": "Hors AMM"},
    {"medicament": "Lucentis (Ranibizumab)", "intervalle_max": 12, "type": "Anti-VEGF", "statut": "AMM"},
    {"medicament": "Beovu (Brolucizumab)", "intervalle_max": 12, "type": "Anti-VEGF", "statut": "AMM"},
    {"medicament": "Eylea standard (Aflibercept 2mg)", "intervalle_max": 16, "type": "Anti-VEGF", "statut": "AMM"},
    {"medicament": "Eylea HD (Aflibercept 8mg)", "intervalle_max": 16, "type": "Anti-VEGF", "statut": "AMM"},
    {"medicament": "Vabysmo (Faricimab)", "intervalle_max": 16, "type": "Anti-VEGF", "statut": "AMM"},
    {"medicament": "Kénacort (Triamcinolone)", "intervalle_max": 16, "type": "Corticoïde", "statut": "Hors AMM"},
    {"medicament": "Ozurdex (Dexaméthasone)", "intervalle_max": 24, "type": "Corticoïde", "statut": "AMM"}
]

df = pd.DataFrame(data)

# Abbreviate medication names to fit 15 character limit
df['med_abbrev'] = [
    "Avastin",
    "Lucentis", 
    "Beovu",
    "Eylea std",
    "Eylea HD",
    "Vabysmo",
    "Kénacort",
    "Ozurdex"
]

# Sort by interval for better visualization
df = df.sort_values('intervalle_max')

# Create horizontal bar chart
fig = px.bar(df, 
             x='intervalle_max', 
             y='med_abbrev',
             color='type',
             orientation='h',
             color_discrete_map={
                 'Anti-VEGF': '#1FB8CD',
                 'Corticoïde': '#FFC185'
             },
             hover_data={'statut': True, 'intervalle_max': True},
             title="Injection Intervals: Intravitreal Drugs")

# Update layout with proper legend positioning (2 legend items)
fig.update_layout(
    xaxis_title="Weeks",
    yaxis_title="Medication",
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Save the chart
fig.write_image("injection_intervals_chart.png")