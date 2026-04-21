import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import altair as alt
import pandas as pd
import numpy as np

df = pd.read_csv("/Users/elizabethc/ds4200/Group Project - ds4200/Hospital_Provider_Cost_Report_2023_updated.csv")

df['FTE - Employees on payroll'] = df['FTE - Employees on Payroll']

df_clean = df[['Hospital Name', 'Number of Beds', 'FTE - Employees on payroll', 'Rural Versus Urban']].replace(
    [np.inf, -np.inf], np.nan).dropna()

df_clean = df_clean[
    (df_clean['Number of Beds'] > 0) &
    (df_clean['Number of Beds'] < 2000) &
    (df_clean['FTE - Employees on payroll'] > 0) &
    (df_clean['FTE - Employees on payroll'] < 30000)
]

df_clean['Location'] = df_clean['Rural Versus Urban'].map({'R': 'Rural', 'U': 'Urban'})

# Pre-bin in pandas so each rect cell has explicit start/end values for correct tooltips
beds_edges = np.arange(0, df_clean['Number of Beds'].max() + 50, 50)
fte_edges = np.arange(0, df_clean['FTE - Employees on payroll'].max() + 1000, 1000)
beds_cut = pd.cut(df_clean['Number of Beds'], bins=beds_edges, include_lowest=True)
fte_cut = pd.cut(df_clean['FTE - Employees on payroll'], bins=fte_edges, include_lowest=True)

df_binned = df_clean.copy()
df_binned['Beds Start'] = [iv.left for iv in beds_cut]
df_binned['Beds End'] = [iv.right for iv in beds_cut]
df_binned['FTE Start'] = [iv.left for iv in fte_cut]
df_binned['FTE End'] = [iv.right for iv in fte_cut]

df_agg = (
    df_binned
    .groupby(['Beds Start', 'Beds End', 'FTE Start', 'FTE End'], observed=True)
    .size()
    .reset_index(name='Count')
)

df_agg['Beds Range'] = df_agg['Beds Start'].apply(lambda x: f'{abs(x):.0f}') + ' - ' + df_agg['Beds End'].apply(lambda x: f'{abs(x):.0f}')
df_agg['FTE Range'] = df_agg['FTE Start'].apply(lambda x: f'{abs(x):.0f}') + ' - ' + df_agg['FTE End'].apply(lambda x: f'{abs(x):.0f}')

heatmap = alt.Chart(df_agg).mark_rect().encode(
    x=alt.X('Beds Start:Q', bin='binned', title='Number of Beds (Hospital Size)'),
    x2=alt.X2('Beds End:Q'),
    y=alt.Y('FTE Start:Q', bin='binned', title='FTE - Employees on payroll'),
    y2=alt.Y2('FTE End:Q'),
    color=alt.Color('Count:Q',
                    scale=alt.Scale(scheme='blues'),
                    title='Number of Hospitals'),
    tooltip=[
        alt.Tooltip('Beds Range:N', title='Beds Range'),
        alt.Tooltip('FTE Range:N', title='FTE Range'),
        alt.Tooltip('Count:Q', title='Number of Hospitals')
    ]
)

chart = heatmap.properties(
    title=alt.TitleParams(
        text='Staffing Density vs. Hospital Size',
        subtitle='Density of hospitals by FTE on Payroll and Number of Beds',
        fontSize=15,
        subtitleFontSize=12,
        anchor='middle'
    ),
    width=500,
    height=400
).configure_axis(
    labelFontSize=11,
    titleFontSize=12
)

output_path = "/Users/elizabethc/ds4200/Group Project - ds4200/staffing_heatmap.html"
chart.save(output_path)