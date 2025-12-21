import React from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ formData, onChange, onSubmit, loading }) => {
  return (
    <section className="form-card">
      
      <form onSubmit={onSubmit} className="professional-form">
  
  {/* SECTION 1 : IDENTITÉ & PERSONNEL */}
  <div className="form-section">
    <div className="form-section-header">
      <h4>Identité & Personnel</h4>
    </div>
    <div className="form-row triple">
      <div className="form-field">
        <label>ID Employé</label>
        <input type="number" name="employeeid" value={formData.employeeid} onChange={onChange} required />
      </div>
      <div className="form-field">
        <label>Âge</label>
        <input type="number" name="Age" value={formData.Age} onChange={onChange} required />
      </div>
      <div className="form-field">
        <label>État Civil</label>
        <select name="MaritalStatus" value={formData.MaritalStatus} onChange={onChange}>
          <option value="Single">Célibataire</option>
          <option value="Married">Marié</option>
          <option value="Divorced">Divorcé</option>
        </select>
      </div>
    </div>
  </div>

  {/* SECTION 2 : POSTE & RÔLE */}
  <div className="form-section">
    <div className="form-section-header">
      <h4>Poste & Rôle</h4>
    </div>
    <div className="form-row">
      <div className="form-field">
        <label>Rôle</label>
        <select name="JobRole" value={formData.JobRole} onChange={onChange}>
          <option value="Sales Executive">Sales Executive</option>
          <option value="Research Scientist">Research Scientist</option>
          <option value="Laboratory Technician">Laboratory Technician</option>
          <option value="Manufacturing Director">Manufacturing Director</option>
          <option value="Manager">Manager</option>
          <option value="Sales Representative">Sales Representative</option>
          <option value="Healthcare Representative">Healthcare Representative</option>
          <option value="Healthcare Representative">Research Director</option>
          <option value="Healthcare Representative">Human Resources</option>
        </select>
      </div>
      <div className="form-field">
        <label>Niveau de poste (1-5)</label>
        <input type="number" name="JobLevel" min="1" max="5" value={formData.JobLevel} onChange={onChange} />
      </div>
    </div>
    <div className="form-row">
       <div className="form-field">
        <label>Niveau d’implication dans le poste (1-4)</label>
        <input type="number" name="JobInvolvement" min="1" max="4" value={formData.JobInvolvement} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Niveau Stock Options (0-3)</label>
        <input type="number" name="StockOptionLevel" min="0" max="3" value={formData.StockOptionLevel} onChange={onChange} />
      </div>
    </div>
  </div>

  {/* SECTION 3 : FINANCIER */}
  <div className="form-section">
    <div className="form-section-header">
      <h4>Financier</h4>
    </div>
    <div className="form-row">
      <div className="form-field">
        <label>Revenu Mensuel ($)</label>
        <input type="number" name="MonthlyIncome" value={formData.MonthlyIncome} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Taux Journalier (Daily Rate)</label>
        <input type="number" name="DailyRate" value={formData.DailyRate} onChange={onChange} />
      </div>
    </div>
  </div>

  {/* SECTION 4 : ENVIRONNEMENT & DISTANCE */}
  <div className="form-section">
    <div className="form-section-header">
      <h4>Environnement & Distance</h4>
    </div>
    <div className="form-row ">
      <div className="form-field">
        <label>Distance Maison-Travail (km)</label>
        <input type="number" name="DistanceFromHome" value={formData.DistanceFromHome} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Temps supplémentaire</label>
        <select name="OverTime" value={formData.OverTime} onChange={onChange}>
          <option value="No">Non</option>
          <option value="Yes">Oui</option>
        </select>
      </div>
      
    </div>
    <div className="form-row">
      <div className="form-field">
        <label>Satisfaction Job (1-4)</label>
        <input type="number" name="JobSatisfaction" min="1" max="4" value={formData.JobSatisfaction} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Satisfaction Environnement (1-4)</label>
        <input type="number" name="EnvironmentSatisfaction" min="1" max="4" value={formData.EnvironmentSatisfaction} onChange={onChange} />
      </div>
    </div>
  </div>

  {/* SECTION 5 : EXPÉRIENCE & ANCIENNETÉ */}
  <div className="form-section">
    <div className="form-section-header">
      <h4>Expérience & Ancienneté</h4>
    </div>
    <div className="form-row">
      <div className="form-field">
        <label>Total Années Expérience</label>
        <input type="number" name="TotalWorkingYears" value={formData.TotalWorkingYears} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Années dans l'entreprise</label>
        <input type="number" name="YearsAtCompany" value={formData.YearsAtCompany} onChange={onChange} />
      </div>
    </div>
    <div className="form-row">
      <div className="form-field">
        <label>Années poste actuel</label>
        <input type="number" name="YearsInCurrentRole" value={formData.YearsInCurrentRole} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Années avec Manager actuel</label>
        <input type="number" name="YearsWithCurrManager" value={formData.YearsWithCurrManager} onChange={onChange} />
      </div>
    </div>
  </div>

  <button type="submit" className="analyze-btn" disabled={loading}>
    {loading ? "Analyse en cours..." : "Générer Plan de Rétention"}
  </button>
</form>
    </section>
  );
};

export default EmployeeForm;