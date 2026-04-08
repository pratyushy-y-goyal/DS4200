import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import altair as alt
import pandas as pd
import numpy as np

df = pd.read_csv("/Users/elizabethc/ds4200/Group Project - ds4200/Hospital_Provider_Cost_Report_2023_updated.csv")

df['FTE per Bed'] = df['FTE - Employees on Payroll'] / df['Number of Beds']

df_clean = df[['Hospital Name', 'Number of Beds', 'FTE per Bed', 'Rural Versus Urban']].replace(
    [np.inf, -np.inf], np.nan).dropna()

df_clean = df_clean[
    (df_clean['Number of Beds'] > 0) &
    (df_clean['Number of Beds'] < 2000) &
    (df_clean['FTE per Bed'] > 0) &
    (df_clean['FTE per Bed'] < 20)
]

df_clean['Location'] = df_clean['Rural Versus Urban'].map({'R': 'Rural', 'U': 'Urban'})

scatter = alt.Chart(df_clean).mark_circle(opacity=0.4, size=30, color='#4a90d9').encode(
    x=alt.X('Number of Beds:Q',
            title='Number of Beds (Hospital Size)',
            scale=alt.Scale(zero=False)),
    y=alt.Y('FTE per Bed:Q',
            title='FTE per Bed (Staffing Density)',
            scale=alt.Scale(zero=False)),
    tooltip=[
        alt.Tooltip('Hospital Name:N', title='Hospital'),
        alt.Tooltip('Number of Beds:Q', title='Beds'),
        alt.Tooltip('FTE per Bed:Q', title='FTE per Bed', format='.2f'),
        alt.Tooltip('Location:N', title='Location')
    ]
)

trend = alt.Chart(df_clean).mark_line(
    strokeWidth=2.5,
    strokeDash=[4, 2],
    color='#e07b39'
).transform_regression(
    'Number of Beds', 'FTE per Bed'
).encode(
    x='Number of Beds:Q',
    y='FTE per Bed:Q'
)

chart = (scatter + trend).properties(
    title=alt.TitleParams(
        text='Staffing Density vs. Hospital Size by Location',
        subtitle='FTE per Bed across Rural and Urban Hospitals',
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

output_path = "/Users/elizabethc/ds4200/Group Project - ds4200/staffing_scatter.html"
chart.save(output_path)