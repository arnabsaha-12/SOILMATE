const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios'); // FIX: Moved to top

const app = express();
const PORT = 3000;

// === MIDDLEWARE ===
app.use(express.json()); // FIX: Added for JSON support
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// === PAGE ROUTES ===

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@gmail.com' && password === '12345') {
    res.redirect('/agriculture');
  } else {
    res.status(401).send('<h2 style="color:red;text-align:center;">Invalid email or password</h2>');
  }
});

// Serve main agriculture dashboard
app.get('/agriculture', (req, res) => {
  res.sendFile(path.join(__dirname, 'Agriculture.html'));
});

// Serve detailed soil condition report (df.html)
app.get('/df', (req, res) => {
  res.sendFile(path.join(__dirname, 'df.html'));
});

// Serve crop recommendation page
app.get('/crop-recommendation', (req, res) => {
  res.sendFile(path.join(__dirname, 'crop_recommendation.html'));
});

// Myprofile
app.get('/Profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'Profile.html'));
});

// settings
app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'settings.html'));
});

// pest & disease
app.get('/pest-disease', (req, res) => {
  res.sendFile(path.join(__dirname, 'pest_disease.html'));
});

// my-farms
app.get('/my-farms', (req, res) => {
  res.sendFile(path.join(__dirname, 'My Farms.html'));
});

// === UPDATED AI LOGIC ROUTE ===
app.post('/get-crop-recommendation', async (req, res) => {
    try {
        const blynkToken = "nfglh3NwoG505OpHYtUUVJGq2DPPeonY";
        
        // 1. Fetch real-time data from Blynk (Moisture from V1, pH from V2)
        const [moistureRes, phRes] = await Promise.all([
            axios.get(`https://blynk.cloud/external/api/get?token=${blynkToken}&V1`),
            axios.get(`https://blynk.cloud/external/api/get?token=${blynkToken}&V2`)
        ]);

        const moisture = parseFloat(moistureRes.data) || 0;
        const ph = parseFloat(phRes.data) || 7.0; // Default 7 if no data
        
        // HTML se aane wala State catch karo
        const userState = req.body.state; 

        // 2. Prepare the data payload for Python (Added state and real pH)
        const payload = {
            N: 90, P: 42, K: 43, // Inhe aap static rakh sakte hain ya state-wise average
            temp: 28,            // Aap OpenWeather API se real temp le sakte hain
            humidity: moisture,  
            ph: ph,              // REAL pH from Arduino
            rainfall: 200,       // Estimated
            state: userState     // NEW: Sending State to ML Model
        };

        // 3. Request prediction from Python API (Port 5001)
        const mlResponse = await axios.post('http://localhost:5001/predict', payload);
        
        res.json({ 
            success: true, 
            crop: mlResponse.data.crop, 
            moisture: moisture,
            ph: ph // Send back to HTML for UI update
        });

    } catch (error) {
        console.error("ML Connection Error:", error.message);
        res.status(500).json({ success: false, message: "Connection to AI Model Failed" });
    }
});
// === SERVER START ===
app.listen(PORT, () => {
  console.log(`🚀 SoilMate Server running at http://localhost:${PORT}`);
});