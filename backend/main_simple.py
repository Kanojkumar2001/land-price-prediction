import json
import os

def get_locations():
    """Get available locations"""
    locations = [
        "Whitefield", "Electronic City", "JP Nagar", "Indiranagar", 
        "Koramangala", "Marathahalli", "Bellandur", "HSR Layout", 
        "Sarjapur Road", "Bannerghatta Road", "Other"
    ]
    return locations

def predict_price(location, sqft, bath, bhk):
    """Simple price prediction using basic math"""
    # Base price per sqft (in lakhs)
    base_price = sqft * 0.08
    
    # Location multipliers
    multipliers = {
        'Whitefield': 1.8, 'Electronic City': 1.2, 'JP Nagar': 1.6,
        'Indiranagar': 2.1, 'Koramangala': 1.9, 'Marathahalli': 1.1,
        'Bellandur': 1.7, 'HSR Layout': 1.5, 'Sarjapur Road': 1.4,
        'Bannerghatta Road': 1.3, 'Other': 1.0
    }
    
    # Calculate price
    location_mult = multipliers.get(location, 1.0)
    bath_bonus = min(bath * 0.05, 0.2)
    bhk_bonus = min(bhk * 0.03, 0.15)
    
    final_price = base_price * location_mult * (1 + bath_bonus + bhk_bonus)
    return round(max(20, min(final_price, 500)), 2)
