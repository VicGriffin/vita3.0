import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import joblib
import re
from difflib import get_close_matches

class FirstAidDetectionModel:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.severity_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.emergency_model = RandomForestClassifier(n_estimators=100, random_state=42)
        
        self.severity_levels = ['Mild', 'Moderate', 'Severe']
        self.emergency_levels = ['Non-Emergency', 'Urgent Care', 'Emergency']
        
        self.symptoms_data = None
        self.responses = None
        self.severity_data = None
        self.emergency_data = None
        self.equipment_data = None
        
        # Define severity keywords
        self.severity_keywords = {
            'severe': ['severe', 'extreme', 'intense', 'emergency', 'critical', 'unbearable', 
                      'chest pain', 'difficulty breathing', 'unconscious', 'head injury', 
                      'heavy bleeding', 'broken', 'fracture', 'seizure', 'stroke'],
            'moderate': ['moderate', 'significant', 'sprain', 'strain', 'cut', 'burn', 
                        'swollen', 'twisted', 'fever', 'infection'],
            'mild': ['mild', 'minor', 'small', 'slight', 'light', 'scratch', 'bruise', 
                    'paper cut', 'scrape']
        }
    
    def _determine_severity(self, text):
        text = text.lower()
        
        # Check for severe conditions first
        for keyword in self.severity_keywords['severe']:
            if keyword in text:
                return 2  # severe
        
        # Then check for mild conditions
        for keyword in self.severity_keywords['mild']:
            if keyword in text:
                return 0  # mild
        
        # Default to moderate
        return 1  # moderate
    
    def prepare_data(self, data_path):
        # Load and preprocess the data
        df = pd.read_csv(data_path)
        self.symptoms_data = df['Symptom'].values
        self.responses = df['First Aid Response'].values
        self.severity_data = [self.severity_levels.index(s) for s in df['Severity']]
        self.emergency_data = [self.emergency_levels.index(e) for e in df['Emergency Level']]
        self.equipment_data = df['Required Equipment'].values
        
        # Convert text to features
        X = self.vectorizer.fit_transform(self.symptoms_data)
        
        return X, np.array(self.severity_data), np.array(self.emergency_data)
    
    def train(self, data_path):
        print("Preparing data...")
        X, y_severity, y_emergency = self.prepare_data(data_path)
        
        # Split the data
        X_train, X_val, y_severity_train, y_severity_val, y_emergency_train, y_emergency_val = train_test_split(
            X, y_severity, y_emergency, test_size=0.2, random_state=42
        )
        
        print("Training models...")
        # Train severity model
        self.severity_model.fit(X_train, y_severity_train)
        severity_score = self.severity_model.score(X_val, y_severity_val)
        
        # Train emergency model
        self.emergency_model.fit(X_train, y_emergency_train)
        emergency_score = self.emergency_model.score(X_val, y_emergency_val)
        
        print(f"Severity model accuracy: {severity_score:.4f}")
        print(f"Emergency level accuracy: {emergency_score:.4f}")
    
    def analyze_medical_issue(self, text):
        if self.severity_model is None or self.emergency_model is None:
            return {"error": "Models not trained yet"}
        
        # Convert text to features
        text_features = self.vectorizer.transform([text])
        
        # Get model predictions
        severity_idx = self.severity_model.predict(text_features)[0]
        emergency_idx = self.emergency_model.predict(text_features)[0]
        
        # Get confidence scores
        severity_confidence = max(self.severity_model.predict_proba(text_features)[0])
        emergency_confidence = max(self.emergency_model.predict_proba(text_features)[0])
        
        # Get recommendations and required equipment
        recommendations, equipment = self.get_recommendations(text, severity_idx, emergency_idx)
        
        return {
            'severity': self.severity_levels[severity_idx],
            'severity_confidence': float(severity_confidence),
            'emergency_level': self.emergency_levels[emergency_idx],
            'emergency_confidence': float(emergency_confidence),
            'recommendations': recommendations,
            'required_equipment': equipment
        }
    
    def get_recommendations(self, text, severity_idx, emergency_idx):
        if self.symptoms_data is None:
            return "Please train the model first with data", []
        
        text = text.lower()
        best_match = None
        highest_similarity = 0
        
        # Try to find the best matching symptom
        for symptom in self.symptoms_data:
            # Calculate similarity based on common words
            words1 = set(re.findall(r'\w+', text.lower()))
            words2 = set(re.findall(r'\w+', symptom.lower()))
            similarity = len(words1.intersection(words2)) / len(words1.union(words2))
            
            if similarity > highest_similarity:
                highest_similarity = similarity
                best_match = symptom
        
        if best_match and highest_similarity > 0.3:  # Threshold for acceptable match
            idx = list(self.symptoms_data).index(best_match)
            recommendation = self.responses[idx]
            equipment = self.equipment_data[idx]
            
            # Add severity and emergency-specific additional advice
            if emergency_idx == 2:  # Emergency
                recommendation += "\n\nEMERGENCY: CALL EMERGENCY SERVICES IMMEDIATELY!"
            elif emergency_idx == 1:  # Urgent Care
                recommendation += "\n\nSeek urgent medical care if condition worsens."
            
            return recommendation, equipment.split(", ")
        
        # Default recommendations based on severity and emergency level
        if emergency_idx == 2:
            return "EMERGENCY: Seek immediate medical attention! Call emergency services immediately.", ["Phone", "Emergency contact information"]
        elif severity_idx == 2:
            return "Severe condition: Seek immediate medical attention.", ["First aid kit", "Phone"]
        elif severity_idx == 1:
            return "Moderate condition: Apply appropriate first aid and monitor. Seek medical attention if condition worsens.", ["Basic first aid supplies"]
        else:
            return "Mild condition: Apply basic first aid and monitor for any changes.", ["Basic first aid supplies"]
    
    def save_model(self, path):
        joblib.dump({
            'severity_model': self.severity_model,
            'emergency_model': self.emergency_model,
            'vectorizer': self.vectorizer,
            'symptoms_data': self.symptoms_data,
            'responses': self.responses,
            'severity_data': self.severity_data,
            'emergency_data': self.emergency_data,
            'equipment_data': self.equipment_data
        }, path)
    
    def load_model(self, path):
        data = joblib.load(path)
        self.severity_model = data['severity_model']
        self.emergency_model = data['emergency_model']
        self.vectorizer = data['vectorizer']
        self.symptoms_data = data['symptoms_data']
        self.responses = data['responses']
        self.severity_data = data['severity_data']
        self.emergency_data = data['emergency_data']
        self.equipment_data = data['equipment_data']
