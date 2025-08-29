import json
import os

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

# Simple location-based pricing model (no heavy ML libraries)
LOCATION_MULTIPLIERS = {
    'Whitefield': 1.8,
    'Electronic City': 1.2,
    'JP Nagar': 1.6,
    'Indiranagar': 2.1,
    'Koramangala': 1.9,
    'Marathahalli': 1.1,
    'Bellandur': 1.7,
    'HSR Layout': 1.5,
    'Sarjapur Road': 1.4,
    'Bannerghatta Road': 1.3,
    'Other': 1.0
}

def get_locations():
    """Get available locations"""
    try:
        with open(STATIC_COLUMNS_JSON, 'r') as f:
            data = json.load(f)
            return data.get('locations', list(LOCATION_MULTIPLIERS.keys()))
    except Exception:
        # Fallback to predefined locations
        return list(LOCATION_MULTIPLIERS.keys())

def predict_price(location, sqft, bath, bhk):
    """Predict house price using simple mathematical model"""
    try:
        # Base price per sqft (in lakhs)
        base_price_per_sqft = 0.08  # 8 lakhs per 1000 sqft
        
        # Location multiplier
        location_mult = LOCATION_MULTIPLIERS.get(location, 1.0)
        
        # Bathroom bonus (more bathrooms = higher value)
        bath_bonus = min(bath * 0.05, 0.2)  # Max 20% bonus
        
        # BHK bonus (more bedrooms = higher value)
        bhk_bonus = min(bhk * 0.03, 0.15)  # Max 15% bonus
        
        # Size bonus (larger properties have premium)
        size_bonus = 0
        if sqft > 2000:
            size_bonus = 0.1  # 10% bonus for large properties
        elif sqft > 1500:
            size_bonus = 0.05  # 5% bonus for medium properties
        
        # Calculate final price
        base_price = sqft * base_price_per_sqft
        total_multiplier = location_mult * (1 + bath_bonus + bhk_bonus + size_bonus)
        final_price = base_price * total_multiplier
        
        # Ensure reasonable price range
        final_price = max(20, min(final_price, 500))  # Between 20-500 lakhs
        
        return round(final_price, 2)
        
    except Exception as e:
        print(f"Prediction error: {e}")
        # Simple fallback calculation
        return round(sqft * 0.1, 2)  # 10 lakhs per 1000 sqft
