from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model and encoder
model = joblib.load('improved_crop_model.pkl')
le_state = joblib.load('state_encoder.pkl')

# --- KNOWLEDGE BASE: State-wise Restricted Crops ---
# Ye wahi crops hain jo in states mein ugte hi hain
state_restrictions = {
    "West Bengal": ['rice', 'jute', 'mango', 'papaya', 'lentil', 'banana'],
    "Punjab": ['rice', 'maize', 'cotton', 'mungbean', 'muskmelon', 'orange'],
    "Maharashtra": ['cotton', 'grapes', 'orange', 'pomegranate', 'mungbean', 'banana'],
    "Rajasthan": ['maize', 'cotton', 'mungbean', 'mothbeans', 'muskmelon'],
    "Karnataka": ['coffee', 'coconut', 'maize', 'pigeonpeas', 'banana', 'papaya']
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    user_state = data.get('state', 'West Bengal')
    
    # 1. State Numbering
    try:
        state_num = le_state.transform([user_state])[0]
    except:
        state_num = 0

    # 2. Prepare Features
    features = [data['N'], data['P'], data['K'], data['temp'], 
                data['humidity'], data['ph'], data['rainfall'], state_num]
    
    # 3. GET PROBABILITIES (Sirf 1 result nahi, saare crops ke chances check karo)
    probabilities = model.predict_proba([features])[0]
    all_crops = model.classes_
    
    # Zip crops with their scores
    crop_scores = dict(zip(all_crops, probabilities))

    # 4. APPLY HARD FILTER (The Accuracy Secret)
    if user_state in state_restrictions:
        allowed = state_restrictions[user_state]
        # Sirf wahi crops rakho jo us state mein possible hain
        filtered_scores = {crop: score for crop, score in crop_scores.items() if crop in allowed}
        
        if filtered_scores:
            # Sabse zyada score wala crop pick karo filtered list se
            final_crop = max(filtered_scores, key=filtered_scores.get)
        else:
            final_crop = model.predict([features])[0] # Fallback
    else:
        final_crop = model.predict([features])[0]

    return jsonify({'crop': final_crop})

if __name__ == '__main__':
    app.run(port=5001)