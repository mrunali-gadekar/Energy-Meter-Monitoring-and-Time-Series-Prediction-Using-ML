import pandas as pd
from sklearn.impute import SimpleImputer
from pmdarima import auto_arima
import pickle
from statsmodels.tsa.arima.model import ARIMA
import numpy as np
# Load the dataset
df = pd.read_csv('household_power_consumption.txt', sep=";")

# Preprocessing
df['Date'] = pd.to_datetime(df['Date'])
df.replace(['?', 'nan', np.nan], -1, inplace=True)
num_vars = ['Global_active_power', 'Global_reactive_power', 'Voltage', 'Global_intensity', 'Sub_metering_1', 'Sub_metering_2', 'Sub_metering_3']
for i in num_vars:
    df[i] = pd.to_numeric(df[i])
imp = SimpleImputer(missing_values=-1, strategy='mean')
df[num_vars] = imp.fit_transform(df[num_vars])
df = df.groupby(pd.Grouper(key='Date', freq='D')).mean().reset_index()
df.set_index('Date', inplace=True)

# Handle NaN values in the target variable
df['Global_active_power'].fillna(method='ffill', inplace=True)  # Forward fill NaN values

# Model fitting
stepwise_fit = auto_arima(df['Global_active_power'], trace=True, suppress_warnings=True)
model = ARIMA(df['Global_active_power'], order=(3, 0, 2))
model_fit = model.fit()

# Saving model to disk
pickle.dump(model_fit, open('model.pkl', 'wb'))
