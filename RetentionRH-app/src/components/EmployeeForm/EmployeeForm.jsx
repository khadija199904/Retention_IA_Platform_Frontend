import React from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ formData, onChange, onSubmit, loading }) => {
  return (
    <section className="form-card">
      <div className="card-header">
        <h2>Profil de l'employé</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group-grid">
          {/* --- Identité & Démographie --- */}
          <div className="input-box">
            <label>ID Employé</label>
            <input type="number" name="employeeid" value={formData.employeeid} onChange={onChange} required />
          </div>
          <div className="input-box">
            <label>Âge</label>
            <input type="number" name="Age" value={formData.Age} onChange={onChange} required />
          </div>

          {/* --- Rôle & Poste --- */}
          <div className="input-box">
            <label>Rôle</label>
            <select name="JobRole" value={formData.JobRole} onChange={onChange}>
              <option value="Sales Executive">Sales Executive</option>
              <option value="Research Scientist">Research Scientist</option>
              <option value="Laboratory Technician">Laboratory Technician</option>
              <option value="Manufacturing Director">Manufacturing Director</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="input-box">
            <label>Niveau de poste (1-5)</label>
            <input type="number" name="JobLevel" min="1" max="5" value={formData.JobLevel} onChange={onChange} />
          </div>

          {/* --- Satisfaction (Échelles de 1 à 4) --- */}
          <div className="input-box">
            <label>Satisfaction Environnement</label>
            <input type="number" name="EnvironmentSatisfaction" min="1" max="4" value={formData.EnvironmentSatisfaction} onChange={onChange} />
          </div>
          <div className="input-box">
            <label>Satisfaction Job</label>
            <input type="number" name="JobSatisfaction" min="1" max="4" value={formData.JobSatisfaction} onChange={onChange} />
          </div>

          {/* --- Financier & Temps --- */}
          <div className="input-box">
            <label>Revenu Mensuel ($)</label>
            <input type="number" name="MonthlyIncome" value={formData.MonthlyIncome} onChange={onChange} />
          </div>
          <div className="input-box">
            <label>Heures Sup.</label>
            <select name="OverTime" value={formData.OverTime} onChange={onChange}>
              <option value="No">Non</option>
              <option value="Yes">Oui</option>
            </select>
          </div>

          {/* --- Ancienneté --- */}
          <div className="input-box">
            <label>Années dans l'entreprise</label>
            <input type="number" name="YearsAtCompany" value={formData.YearsAtCompany} onChange={onChange} />
          </div>
          <div className="input-box">
            <label>Années avec Manager actuel</label>
            <input type="number" name="YearsWithCurrManager" value={formData.YearsWithCurrManager} onChange={onChange} />
          </div>
        </div>

        <button type="submit" className="analyze-btn" disabled={loading}>
          {loading ? "Analyse IA en cours..." : "Générer Plan de Rétention"}
        </button>
      </form>
    </section>
  );
};

export default EmployeeForm;