import pandas as pd
import numpy as np
import os
import json
import pickle
from sklearn.linear_model import LinearRegression

# Function to check if a value can be converted to a float
def is_float(x):
    try:
        float(x)
    except:
        return False
    return True

# Resolve paths relative to this file for portability
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_COLUMNS_JSON = os.path.join(BASE_DIR, 'static', 'columns.json')

# Global variables for model and data
model = None
X_columns = None
location_mapping = None

def load_model():
    """Load the pre-trained model and data"""
    global model, X_columns, location_mapping
    
    try:
        # Try to load pre-trained model
        model_path = os.path.join(BASE_DIR, 'static', 'model.pkl')
        columns_path = os.path.join(BASE_DIR, 'static', 'columns.pkl')
        
        if os.path.exists(model_path) and os.path.exists(columns_path):
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            with open(columns_path, 'rb') as f:
                data = pickle.load(f)
                X_columns = data['columns']
                location_mapping = data['locations']
        else:
            # Fallback: load and train model (this will be slow but works)
            train_model()
    except Exception as e:
        print(f"Error loading model: {e}")
        train_model()

def train_model():
    """Train the model if pre-trained version not available"""
    global model, X_columns, location_mapping
    
    try:
        # Load dataset (try sample first, then original)
        dataset_path = os.path.join(BASE_DIR, 'Bengaluru_House_Data_Sample.csv')
        if not os.path.exists(dataset_path):
            dataset_path = os.path.join(BASE_DIR, 'Bengaluru_House_Data.csv')
        df = pd.read_csv(dataset_path)
        
        # Data preprocessing (simplified)
        df = df.dropna()
        df['bhk'] = df['size'].apply(lambda x: int(x.split(' ')[0]) if isinstance(x, str) else 0)
        df['total_sqft'] = pd.to_numeric(df['total_sqft'], errors='coerce')
        df = df.dropna()
        
        # Feature engineering
        df['price_per_sqft'] = df['price'] * 100000 / df['total_sqft']
        df['location'] = df['location'].apply(lambda x: x.strip())
        
        # Reduce location dimensionality
        location_counts = df['location'].value_counts()
        df['location'] = df['location'].apply(lambda x: x if location_counts[x] > 10 else 'Other')
        
        # Prepare features
        df_final = df[['total_sqft', 'bath', 'bhk', 'location', 'price']].dropna()
        
        # One-hot encoding
        dummies = pd.get_dummies(df_final['location'])
        df_encoded = pd.concat([df_final.drop('location', axis=1), dummies], axis=1)
        
        # Remove 'Other' column if exists
        if 'Other' in df_encoded.columns:
            df_encoded = df_encoded.drop('Other', axis=1)
        
        X = df_encoded.drop('price', axis=1)
        y = df_encoded['price']
        
        # Train model
        model = LinearRegression()
        model.fit(X, y)
        
        # Save model and columns
        X_columns = list(X.columns)
        location_mapping = list(df_final['location'].unique())
        
        # Save for future use
        os.makedirs(os.path.join(BASE_DIR, 'static'), exist_ok=True)
        with open(os.path.join(BASE_DIR, 'static', 'model.pkl'), 'wb') as f:
            pickle.dump(model, f)
        with open(os.path.join(BASE_DIR, 'static', 'columns.pkl'), 'wb') as f:
            pickle.dump({'columns': X_columns, 'locations': location_mapping}, f)
            
    except Exception as e:
        print(f"Error training model: {e}")
        # Create dummy model
        model = LinearRegression()
        X_columns = ['total_sqft', 'bath', 'bhk']
        location_mapping = ['Other']

def get_locations():
    """Get available locations"""
    try:
        with open(STATIC_COLUMNS_JSON, 'r') as f:
            data = json.load(f)
            return data.get('locations', [])
    except Exception:
        # Fallback to locations from the model
        if location_mapping is None:
            load_model()
        return location_mapping or ['Other']

def predict_price(location, sqft, bath, bhk):
    """Predict house price"""
    global model, X_columns
    
    if model is None:
        load_model()
    
    try:
        # Create input vector
        input_data = np.zeros(len(X_columns))
        input_data[0] = float(sqft)  # total_sqft
        input_data[1] = float(bath)  # bath
        input_data[2] = float(bhk)   # bhk
        
        # One-hot encode location
        if location in X_columns:
            input_data[X_columns.index(location)] = 1.0
        
        prediction = model.predict([input_data])[0]
        return max(0, float(prediction))  # Ensure non-negative price
        
    except Exception as e:
        print(f"Prediction error: {e}")
        # Fallback calculation
        return float(sqft) * 1000  # Simple fallback

# Initialize model when module is imported
if __name__ != "__main__":
    load_model()
