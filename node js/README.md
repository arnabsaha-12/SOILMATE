# Smart Soil Quality Monitoring & Crop Recommendation System 🌾

An intelligent, full-stack web application designed to help farmers and agricultural enthusiasts optimize crop yields. The system analyzes essential soil parameters (such as Nitrogen, Phosphorus, Potassium levels, and pH) to recommend the most suitable crop for a given region using a trained machine learning model.

---

## 🚀 Features
* **Real-time Crop Recommendation**: Input soil data and instantly receive machine learning-backed crop suggestions.
* **Full-Stack Architecture**: Built with a robust Node.js/Express backend paired with an interactive frontend user interface.
* **Machine Learning Engine**: Integrated Python ML API driven by a highly accurate predictive model trained on regional agricultural datasets.
* **Comprehensive Agricultural Hub**: Separate standalone portals for viewing specific dataset insights, monitoring state-wise crop trends, and diagnosing pest/disease control management.

---

## 🛠️ Tech Stack

### Frontend & Web Interface
* **Languages**: HTML5, CSS3, JavaScript (ES6+)
* **UX/UI Frameworks**: Modular CSS grids and modern Visual Workflows

### Backend (Web Server)
* **Runtime Environment**: Node.js
* **Framework**: Express.js
* **Database Driver**: MySQL2 (for structured agricultural/farm tracking data)

### Data Science & Machine Learning
* **Language**: Python 3
* **Libraries**: Scikit-Learn, Pandas, NumPy, Flask / FastAPI (via `ml_api.py`)
* **Serialization**: Pickle (`.pkl`) for saving/loading trained models

---

## 📁 Repository Structure Overview

```text
├── node js/
│   ├── Advance/                        # Route controllers & public web templates (home, about, index)
│   ├── Database project/               # Database schemas and ER layout logic
│   ├── Crop_recommendation.csv         # Core crop requirement dataset (N, P, K, pH metrics)
│   ├── crop_model.pkl                  # Trained Machine Learning classifier
│   ├── ml_api.py / ml_server.py        # Python Flask/FastAPI microservices exposing the ML model
│   ├── server1.js                      # Core Node.js backend web server entry point
│   ├── package.json                    # Node.js project dependencies
│   ├── Agriculture.html                # Main crop recommendation dashboard
│   ├── India_State_Crop_Recommendation # Regional crop tracking metrics
│   ├── pest_disease.html               # Pest identification and control management page
│   └── settings.html                   # User profile and account configuration dashboard


## 📺 Project Demo
See the complete full-stack application walkthrough in action below:

<video src="node js/demo.mp4" controls width="100%"></video>