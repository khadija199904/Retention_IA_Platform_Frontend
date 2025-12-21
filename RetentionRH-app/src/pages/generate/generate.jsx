import React, { useState } from 'react';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import './generate.css';
import LogoutButton from '../../components/LogoutButton/Logout';

const Generate = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const [formData, setFormData] = useState({
    employeeid: 0,
    Age: 30,
    DailyRate: 800,
    DistanceFromHome: 5,
    EnvironmentSatisfaction: 3,
    JobInvolvement: 3,
    JobLevel: 1,
    JobRole: "Sales Executive",
    JobSatisfaction: 3,
    MaritalStatus: "Single",
    MonthlyIncome: 5000,
    OverTime: "No",
    StockOptionLevel: 0,
    TotalWorkingYears: 5,
    YearsAtCompany: 3,
    YearsInCurrentRole: 2,
    YearsWithCurrManager: 2,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const handleAnalysis = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
   
    

    const token = localStorage.getItem("token");
    console.log("Valeur du token  :", token);

    
    const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'token': token },
    body: JSON.stringify(formData)
         };

    try {

      const [resPredict ,resPlan ] = await Promise.all (
        [fetch('http://127.0.0.1:8000/predict', options),
        fetch(`http://127.0.0.1:8000/generate-retention-plan`,options)]
      )


     const resultPredict = await resPredict.json();
     const resultPlan = await resPlan.json();
    
   
      
      if (resPredict.ok && resPlan.ok ) {
        setResult({
         score: resultPredict.churn_probability * 100,
         plan: resultPlan.retention_plan

       });
       console.log("Success")
      } 

      else {
        
       console.log("Détails de l'erreur (predict) :", resultPredict.detail);
       console.log("Détails de l'erreur (predict) :", resultPlan.detail);
       
      setResult(null); 
      alert("Erreur du serveur lors de l'analyse.")}

    } catch (error) {
    console.error("Erreur lors des appels simultanés", error);
  
     
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="predict-container">
      <header className="top-navbar">
        <div className="logo">
          Retention Plan RH <span className="highlight"> AI-Advisor</span>
          <p>Analyse prédictive de rétention des talents</p>
        </div>
        
          <div className="logout-button">
           <LogoutButton />
         </div>
          
      </header>

      <div className="main-layout">
        {/* SECTION 1 : FORMULAIRE (GAUCHE) */}
        <aside className="profile-section">
          <div className="section-header">
            <h2>Profil Employé</h2>
            <p>Saisissez les données pour l'analyse</p>
          </div>
          <div className="form-wrapper">
            <EmployeeForm 
              formData={formData} 
              onChange={handleChange} 
              onSubmit={handleAnalysis} 
              loading={loading} 
            />
          </div>
        </aside>

        {/* SECTION 2 : RÉSULTATS (DROITE) */}
        <main className="results-section">
          {loading && (
            <div className="overlay-loading">
              <div className="spinner"></div>
              <p>Analyse IA en cours...</p>
            </div>
          )}

          {result ? (
            <div className="analysis-content">
              {/* ZONE SCORE PROPORTIONNELLE */}
              <div className="score-summary-card">
                <h3>Probabilité de désengagement</h3>
                <div className="score-viz">
                  <div className={`score-circle ${result.score > 70 ? 'danger' : result.score > 35 ? 'warning' : 'safe'}`}>
                    <span className="percent">{result.score?.toFixed(1)}%</span>
                  </div>
                  <div className="score-text">
                    <h4>{result.score > 50 ? "Risque Critique" : "Risque Modéré"}</h4>
                    <p>Basé sur les tendances actuelles du marché et le profil saisi.</p>
                  </div>
                </div>
              </div>

              {/* ZONE PLAN D'ACTION (3 BLOCS) */}
              <div className="action-plan-container">
                <h3 className="plan-title">Plan de Rétention Préconisé</h3>
                <div className="actions-grid">
                  {Array.isArray(result.plan) && result.plan.slice(0, 3).map((action, index) => (
                    <div key={index} className="action-card">
                      <div className="card-number">0{index + 1}</div>
                      <h4>Action Stratégique</h4>
                      <p>{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-placeholder">
              <div className="placeholder-icon">🔍</div>
              <h2>Prêt pour l'analyse</h2>
              <p>Soumettez le profil à gauche pour générer le score et le plan d'action.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default Generate;