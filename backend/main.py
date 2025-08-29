import pandas as pd
import numpy as np
import os
import json

# Function to check if a value can be converted to a float
def is_float(x):
    try:
        float(x)
    except:
        return False
    return True

# Resolve paths relative to this file for portability
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, 'Bengaluru_House_Data.csv')
STATIC_COLUMNS_JSON = os.path.join(BASE_DIR, 'static', 'columns.json')

# Load the dataset
df1 = pd.read_csv(DATASET_PATH)

df2 = df1.drop(['area_type', 'society', 'balcony', 'availability'], axis='columns')

# Data Cleaning
df3 = df2.dropna()
df3['bhk'] = df3['size'].apply(lambda bhk: int(bhk.split(' ')[0]))

# Data Transformation
def non_uniform_to_num(x):
    tokens = x.split('-')
    if len(tokens) == 2:
        return (float(tokens[0]) + float(tokens[1])) / 2
    try:
        return float(x)
    except:
        return None

df4 = df3.copy()
df4['total_sqft'] = df4['total_sqft'].apply(non_uniform_to_num)

# Outlier Cleaning and Feature Engineering
df5 = df4.copy()
df5['price_per_sqft'] = df5['price'] * 100000 / df5['total_sqft']
df5.location = df5.location.apply(lambda x: x.strip())
location_stats = df5.groupby('location')['location'].agg('count').sort_values(ascending=False)

# Reduce dimensionality of locations
loc_less_than_10 = location_stats[location_stats <= 10]
df5.location = df5.location.apply(lambda x: 'Other' if x in loc_less_than_10 else x)

df6 = df5[~(df5.total_sqft / df5.bhk < 300)]

# Function to remove extreme cases using standard deviation - price/sqft/location
def remove_outlier(df):
    df_out = pd.DataFrame()
    for key, subdf in df.groupby('location'):
        m = np.mean(subdf.price_per_sqft)
        sd = np.std(subdf.price_per_sqft)
        reduced_df = subdf[(subdf.price_per_sqft > (m - sd)) & (subdf.price_per_sqft <= (m + sd))]
        df_out = pd.concat([df_out, reduced_df], ignore_index=True)
    return df_out

df7 = remove_outlier(df6)

def get_locations():
    try:
        with open(STATIC_COLUMNS_JSON, 'r') as f:
            data = json.load(f)
            return data.get('locations', [])
    except Exception:
        # Fallback to locations from the processed dataframe
        return sorted([loc for loc in df5.location.unique() if isinstance(loc, str)])

# Function to remove outliers in case of bedrooms/price
def remove_bhk_outliers(df):
    exclude_indices = np.array([])
    for location, location_df in df.groupby('location'):
        bhk_stats = {}
        for bhk, bhk_df in location_df.groupby('bhk'):
            bhk_stats[bhk] = {
                'mean': np.mean(bhk_df.price_per_sqft),
                'std': np.std(bhk_df.price_per_sqft),
                'count': bhk_df.shape[0]
            }
        for bhk, bhk_df in location_df.groupby('bhk'):
            stats = bhk_stats.get(bhk - 1)
            if stats and stats['count'] > 5:
                exclude_indices = np.append(exclude_indices, bhk_df[bhk_df.price_per_sqft < (stats['mean'])].index.values)
    return df.drop(exclude_indices, axis='index')

df8 = remove_bhk_outliers(df7)

# Bathroom Outlier Removal
df9 = df8[df8.bath < df8.bhk + 2]

# Final Dataframe for Machine Learning Training
df10 = df9.drop(['size', 'price_per_sqft'], axis='columns')

# Machine Learning Training
dummies = pd.get_dummies(df10.location)
df11 = pd.concat([df10, dummies.drop('Other', axis='columns')], axis='columns')
df12 = df11.drop('location', axis='columns')

X = df12.drop('price', axis='columns')
Y = df12.price

from sklearn.model_selection import train_test_split
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=10)

from sklearn.linear_model import LinearRegression
lr_clf = LinearRegression()
lr_clf.fit(X_train, Y_train)

from sklearn.model_selection import ShuffleSplit

cv = ShuffleSplit(n_splits=5, test_size=0.2, random_state=0)

def predict_price(location, sqft, bath, bhk):
    # Build input vector with one-hot for location
    input_data = np.zeros(len(X.columns))
    # Assuming X has order: total_sqft, bath, bhk, <locations one-hot>
    input_data[0] = float(sqft)
    input_data[1] = float(bath)
    input_data[2] = float(bhk)
    # One-hot encode location if present in columns
    if location in X.columns:
        input_data[list(X.columns).index(location)] = 1.0
    return float(lr_clf.predict([input_data])[0])
