import React, { useState } from 'react';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import './generate.css';

const Generate = () => {
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
    YearsWithCurrManager: 2
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleAnalysis = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://127.0.0.1:8000/generate-retention-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'token': token },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) setResult(data);
      else setError(data.detail || "Erreur serveur");
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict-container">
      <header className="predict-header">
        <h1>RH <span>AI-Advisor</span></h1>
      </header>

      <main className="predict-content">
        {/* APPEL DU COMPOSANT SEPARÉ */}
        <EmployeeForm 
          formData={formData} 
          onChange={handleChange} 
          onSubmit={handleAnalysis} 
          loading={loading} 
        />

        {/* AFFICHAGE DES RÉSULTATS */}
        <section className="result-card">
          {error && <div className="error-msg">{error}</div>}
          {result ? (
            <div className="results-view">
              <div className={`score-badge ${result.churn_probability > 50 ? 'danger' : 'success'}`}>
                {result.churn_probability.toFixed(1)}% Risque
              </div>
              {result.plan_retention && (
                <div className="plan-box">
                  <h3>Plan d'Action IA :</h3>
                  <p>{result.retention_plan}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="placeholder">En attente d'analyse...</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Generate;