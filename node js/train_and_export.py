import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 1. Load the dataset you provided
df = pd.read_csv('Crop_recommendation.csv')

# 2. Define Features (X) and Target (y)
# These 7 columns are the inputs the model needs to make a decision
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

# 3. Split into training (80%) and testing (20%) sets
# This helps us verify the model works on data it hasn't seen before
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Initialize the Random Forest Classifier
# We use 100 decision trees to ensure high accuracy (around 99%)
model = RandomForestClassifier(n_estimators=100, random_state=42)

# 5. Train the model
print("Training in progress...")
model.fit(X_train, y_train)

# 6. Verify Accuracy
y_pred = model.predict(X_test)
score = accuracy_score(y_test, y_pred)
print(f"Model Training Complete. Accuracy: {score * 100:.2f}%")

# 7. EXPORT: Save the model as a .pkl file
# This file will be used by your Node.js server to give real-time advice
with open('crop_model.pkl', 'wb') as file:
    pickle.dump(model, file)

print("File 'crop_model.pkl' has been exported successfully!")