from flask import Flask, request, jsonify
from models.emergency.model import FirstAidDetectionModel
import os

app = Flask(__name__)
model = FirstAidDetectionModel()

# Load the pre-trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../models/trained_emergency_model.joblib')
if os.path.exists(MODEL_PATH):
    model.load_model(MODEL_PATH)
else:
    print("Warning: No pre-trained model found. Please train the model first.")

@app.route('/api/analyze-emergency', methods=['POST'])
def analyze_emergency():
    try:
        data = request.get_json()
        if not data or 'description' not in data:
            return jsonify({'error': 'Missing description in request'}), 400

        # Analyze the medical issue
        result = model.analyze_medical_issue(data['description'])
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
