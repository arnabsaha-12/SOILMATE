from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the model you just exported
with open('crop_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features sent from Node.js
        # Order: N, P, K, temp, humidity, ph, rainfall
        features = [
            data['N'], data['P'], data['K'], 
            data['temp'], data['humidity'], 
            data['ph'], data['rainfall']
        ]
        
        # Convert to 2D array for the model
        final_features = [np.array(features)]
        prediction = model.predict(final_features)
        
        return jsonify({'recommendation': prediction[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # Running on port 5001 to not conflict with your Node.js server
    app.run(port=5001, debug=True)