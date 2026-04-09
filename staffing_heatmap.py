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

# Bin the axes for heatmap cells
heatmap = alt.Chart(df_clean).mark_rect().encode(
    x=alt.X('Number of Beds:Q',
            bin=alt.Bin(maxbins=40),
            title='Number of Beds (Hospital Size)'),
    y=alt.Y('FTE - Employees on payroll:Q',
            bin=alt.Bin(maxbins=40),
            title='FTE - Employees on payroll'),
    color=alt.Color('count():Q',
                    scale=alt.Scale(scheme='blues'),
                    title='Number of Hospitals'),
    tooltip=[
        alt.Tooltip('Number of Beds:Q', bin=True, title='Beds Range'),
        alt.Tooltip('FTE - Employees on payroll:Q', bin=True, title='FTE - Employees on payroll'),
        alt.Tooltip('count():Q', title='Number of Hospitals')
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
    width=600,
    height=400
).configure_axis(
    labelFontSize=11,
    titleFontSize=12
)

output_path = "/Users/elizabethc/ds4200/Group Project - ds4200/staffing_heatmap.html"
chart.save(output_path)