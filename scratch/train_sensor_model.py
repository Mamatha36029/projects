import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

def generate_synthetic_data(n_samples=1200):
    np.random.seed(42)
    
    # Generate features based on notebook stats
    data = {
        'Soil_Moisture': np.random.uniform(10, 40, n_samples),
        'Ambient_Temperature': np.random.uniform(18, 30, n_samples),
        'Soil_Temperature': np.random.uniform(15, 25, n_samples),
        'Humidity': np.random.uniform(40, 70, n_samples),
        'Light_Intensity': np.random.uniform(200, 1000, n_samples),
        'Soil_pH': np.random.uniform(5.5, 7.5, n_samples),
        'Nitrogen_Level': np.random.uniform(10, 50, n_samples),
        'Phosphorus_Level': np.random.uniform(10, 50, n_samples),
        'Potassium_Level': np.random.uniform(10, 50, n_samples),
        'Chlorophyll_Content': np.random.uniform(20, 50, n_samples),
        'Electrochemical_Signal': np.random.uniform(0, 2, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Synthetic target logic (simplified version of what's likely in the data)
    # Healthy: Low stress signal, High chlorophyll, good pH
    # Stress: Extreme values
    def get_status(row):
        score = 0
        if row['Electrochemical_Signal'] > 1.4: score += 2 # High stress signal
        if row['Chlorophyll_Content'] < 25: score += 2     # Low chlorophyll
        if row['Soil_Moisture'] < 15 or row['Soil_Moisture'] > 35: score += 1
        if row['Nitrogen_Level'] < 15: score += 1
        if row['Soil_pH'] < 6.0 or row['Soil_pH'] > 7.0: score += 0.5
        
        if score >= 3: return 2   # High Stress
        if score >= 1: return 1   # Moderate Stress
        return 0                  # Healthy

    df['Plant_Health_Status_Encoded'] = df.apply(get_status, axis=1)
    return df

def train_sensor_model():
    print("Generating synthetic sensor data...")
    df = generate_synthetic_data()
    
    X = df.drop(columns=['Plant_Health_Status_Encoded'])
    y = df['Plant_Health_Status_Encoded']
    
    print("Scaling and training Random Forest model...")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_scaled, y)
    
    # Save model and scaler
    model_path = os.path.join('backend', 'sensor_health_model.joblib')
    scaler_path = os.path.join('backend', 'sensor_scaler.joblib')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"Model saved to {model_path}")
    print(f"Scaler saved to {scaler_path}")

if __name__ == "__main__":
    train_sensor_model()
