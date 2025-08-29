import pandas as pd
import numpy as np

# Create a smaller sample dataset
np.random.seed(42)

# Generate sample data
n_samples = 1000
locations = ['Whitefield', 'Electronic City', 'JP Nagar', 'Indiranagar', 'Koramangala', 'Other']
area_types = ['Built-up', 'Super built-up', 'Plot']

data = {
    'location': np.random.choice(locations, n_samples),
    'total_sqft': np.random.uniform(500, 3000, n_samples),
    'bath': np.random.randint(1, 5, n_samples),
    'bhk': np.random.randint(1, 6, n_samples),
    'price': np.random.uniform(20, 200, n_samples)
}

# Create correlations
data['price'] = data['total_sqft'] * 0.05 + data['bath'] * 5 + data['bhk'] * 8 + np.random.normal(0, 10, n_samples)
data['price'] = np.maximum(data['price'], 20)  # Ensure minimum price

# Create DataFrame
df = pd.DataFrame(data)

# Save smaller dataset
df.to_csv('Bengaluru_House_Data_Sample.csv', index=False)
print(f"Created sample dataset with {len(df)} rows")
print(f"File size: {df.memory_usage(deep=True).sum() / 1024:.2f} KB")
