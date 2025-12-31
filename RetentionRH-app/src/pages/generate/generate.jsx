import React, { useState } from 'react';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import './generate.css';
import LogoutButton from '../../components/LogoutButton/Logout';

const Generate = () => {
  // 1. Définition de tous les états au début
  const [activeSection, setActiveSection] = useState("Profil");
  const [formData, setFormData] = useState({
    Age: 41,
    MaritalStatus: "Single",
    DistanceFromHome: 1,
    Department: "Sales",
    EducationField: "Life Sciences",
    BusinessTravel: "Travel_Rarely",
    JobRole: "Sales Executive",
    JobLevel: 2,
    EnvironmentSatisfaction: 2,
    JobInvolvement: 3,
    JobSatisfaction: 4,
    WorkLifeBalance: 1,
    DailyRate: 1102,
    MonthlyIncome: 5993,
    OverTime: "Yes",
    StockOptionLevel: 0,
    TotalWorkingYears: 8,
    TrainingTimesLastYear: 0,
    YearsAtCompany: 6,
    YearsInCurrentRole: 4,
    YearsWithCurrManager: 5,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // 2. Gestion des changements d'input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Fonction principale d'analyse (utilisée par le formulaire et l'onglet)
  const handleAnalysis = async (e) => {
    if (e) e.preventDefault(); // Empêche le rechargement de la page
    
    setLoading(true);
    setActiveSection("Résultats"); // Basculer vers l'onglet résultats dès le clic

    const token = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": token },
      body: JSON.stringify(formData),
    };

    try {
      const [resPredict, resPlan] = await Promise.all([
        fetch("http://127.0.0.1:8000/predict", options),
        fetch("http://127.0.0.1:8000/generate-retention-plan", options),
      ]);

      if (resPredict.ok && resPlan.ok) {
        const resultPredict = await resPredict.json();
        const resultPlan = await resPlan.json();

        setResult({
          score: resultPredict.churn_probability * 100,
          plan: resultPlan.retention_plan,
        });
      } else {
        setResult(null);
        alert("Erreur du serveur lors de l'analyse.");
      }
    } catch (error) {
      console.error("Erreur lors des appels simultanés", error);
      setResult(null);
      alert("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-page">
      <header className="top-navbar">
        <div className="logo">
          Retention Plan RH <span className="highlight">AI-Advisor</span>
          <p>Analyse prédictive de rétention des talents</p>
        </div>
        <div className="logout-button">
          <LogoutButton />
        </div>
      </header>

      <div className="generate-layout">
        <div className="top-section-tabs">
          <button
            className={`tab-btn ${activeSection === "Profil" ? "active" : ""}`}
            onClick={() => setActiveSection("Profil")}
          >
            Profil Employé
          </button>

          <button
            className={`tab-btn ${activeSection === "Résultats" ? "active" : ""}`}
            onClick={() => setActiveSection("Résultats")} 
          >
            Génération & Prédiction
          </button>
        </div>

        <main className="main-content">
          {activeSection === "Profil" && (
            <EmployeeForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleAnalysis}
            />
          )}

          {activeSection === "Résultats" && (
            <div className="result-section">
              {loading ? (
                <div className="loading-container">
                  <p>Analyse IA en cours...</p>
                  
                </div>
              ) : result ? (
                <div className="analysis-content">
                  <div className="score-summary-card">
                    <h3>Probabilité de désengagement</h3>
                    <div className="score-viz">
                      <div className={`score-circle ${
                        result.score > 70 ? 'danger' : result.score > 35 ? 'warning' : 'safe'
                      }`}>
                        <span className="percent">{result.score?.toFixed(1)}%</span>
                      </div>
                      <div className="score-text">
                        <h4>{result.score > 50 ? "Risque Critique" : "Risque Modéré"}</h4>
                        <p>Basé sur les tendances actuelles du marché et le profil saisi.</p>
                      </div>
                    </div>
                  </div>

                  <div className="action-plan-container">
                    <h3 className="plan-title">Plan de Rétention Préconisé</h3>
                    <div className="actions-grid">
                      {Array.isArray(result.plan) ? (
                        result.plan.slice(0, 3).map((action, index) => (
                          <div key={index} className="action-card">
                            <div className="card-number">0{index + 1}</div>
                            <h4>Action Stratégique</h4>
                            <p>{action}</p>
                          </div>
                        ))
                      ) : (
                        <p>{result.plan}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-placeholder">
                  <div className="placeholder-icon">🔍</div>
                  <h2>Prêt pour l'analyse</h2>
                  <p>Soumettez le profil pour générer le score et le plan d'action.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Generate;