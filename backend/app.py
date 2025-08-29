# Flask app serving prediction page and API

import json
import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
from main_simple import predict_price, get_locations


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'dev-secret-change-me')
CORS(
    app,
    resources={r"/api/*": {"origins": ["*"]}},
    supports_credentials=True,
)


@app.route('/', methods=['GET'])
def root():
    return redirect(url_for('form'))


# No separate home page in backend; use frontend for homepage


@app.route('/predict', methods=['GET', 'POST'])
def form():
    if request.method == 'GET':
        locations = get_locations()
        return render_template('app.html', predicted_price='', locations=locations)
    else:
        try:
            location = str(request.form['location']).strip()
            square_feet = float(request.form['square_feet'])
            bedrooms = float(request.form['bedrooms'])
            bathrooms = float(request.form['bathrooms'])
        except Exception:
            locations = get_locations()
            return render_template('app.html', predicted_price='Invalid input values. Please check and try again.', locations=locations)

        price = predict_price(location, square_feet, bathrooms, bedrooms)
        locations = get_locations()
        return render_template('app.html', predicted_price=f'Predicted Price in Lakhs: {price :.2f}', locations=locations)


@app.route('/api/predict', methods=['POST'])
def api_predict():
    data = request.get_json(force=True, silent=True) or {}
    try:
        location = str(data.get('location', '')).strip()
        square_feet = float(data.get('square_feet'))
        bedrooms = float(data.get('bedrooms'))
        bathrooms = float(data.get('bathrooms'))
        if not location:
            raise ValueError('location required')
    except Exception as e:
        return jsonify({'error': 'Invalid input', 'details': str(e)}), 400

    price = predict_price(location, square_feet, bathrooms, bedrooms)
    return jsonify({'predicted_price_lakhs': round(float(price), 2)})


if __name__ == "__main__":
    app.run(debug=True)
    