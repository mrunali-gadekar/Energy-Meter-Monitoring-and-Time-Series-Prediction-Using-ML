# import numpy as np
# from flask import Flask, request, jsonify, render_template
# import pickle
# from datetime import datetime, timedelta
# from statsmodels.tsa.arima.model import ARIMAResults

# app = Flask(__name__)
# model = pickle.load(open('model.pkl', 'rb'))

# @app.route('/')
# def home():
#     return render_template('prediction.html')

# @app.route('/predict', methods=['POST'])
# def predict():
#     '''
#     For rendering results on HTML GUI
#     '''
#     # Load the ARIMA model
#     model_fit = pickle.load(open('model.pkl', 'rb'))

#     # Get user input
#     user_input = request.form['date']

#     # Convert user input to datetime object
#     user_date = datetime.strptime(user_input, '%Y-%m-%d')

#     # Calculate the end date for the forecast (7 days ahead)
#     forecast_end_date = user_date + timedelta(days=7)

#     # Generate out-of-sample predictions for the future without exogenous variables
#     prediction = model_fit.predict(start=user_date, end=forecast_end_date)

#     # Format the prediction as a list of values
#     prediction_list = prediction.values.tolist()

#     return render_template('prediction.html', prediction_text='Global Active Power for the next 7 days: {}'.format(prediction_list))

# if __name__ == "__main__":
#     app.run(debug=True)



import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from datetime import datetime, timedelta
from statsmodels.tsa.arima.model import ARIMAResults

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('prediction.html')

@app.route('/predict', methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    # Load the ARIMA model
    model_fit = pickle.load(open('model.pkl', 'rb'))

    # Get user input
    user_input = request.form['date']

    # Convert user input to datetime object
    user_date = datetime.strptime(user_input, '%Y-%m-%d')

    # Calculate the end date for the forecast (7 days ahead)
    forecast_end_date = user_date + timedelta(days=7)

    # Generate out-of-sample predictions for the future without exogenous variables
    prediction = model_fit.predict(start=user_date, end=forecast_end_date)

    # Format the prediction as a list of dictionaries containing dates and corresponding predictions
    prediction_data = []
    for i, pred in enumerate(prediction):
        date_str = (user_date + timedelta(days=i)).strftime('%Y-%m-%d')
        prediction_data.append({'date': date_str, 'prediction': pred})

    return render_template('prediction.html', prediction_data=prediction_data)

if __name__ == "__main__":
    app.run(debug=True)






