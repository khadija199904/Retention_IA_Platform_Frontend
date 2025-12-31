import React,{ useState }  from 'react';
import './EmployeeForm.css';


const sections = [
  "Informations Personnelles",
  "Parcours Professionnel & Éducation",
  "Rôle & Satisfaction",
  "Rémunération & Temps de Travail",
  "Historique & Performance"
];

const EmployeeForm = ({ formData, onChange, onSubmit, loading }) => {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const renderSection = () => {
    switch (activeSection) {
      case "Informations Personnelles":
        return (
          <div className="form-section">
            <div className="form-row triple">
              
              <div className="form-field">
                <label>Âge</label>
                <input
                  type="number"
                  name="Age"
                  min="18"
                  max="70"
                  value={formData.Age}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>État Civil</label>
                <select
                  name="MaritalStatus"
                  value={formData.MaritalStatus}
                  onChange={onChange}
                >
                  <option value="Single">Célibataire</option>
                  <option value="Married">Marié</option>
                  <option value="Divorced">Divorcé</option>
                </select>
              </div>
              <div className="form-field">
                <label>Distance Maison-Travail (km)</label>
                <input
                  type="number"
                  name="DistanceFromHome"
                  min="1"
                  value={formData.DistanceFromHome}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
        );

      case "Parcours Professionnel & Éducation":
        return (
          <div className="form-section">
            <div className="form-row">
              <div className="form-field">
                <label>Département</label>
                <input
                  type="text"
                  name="Department"
                  value={formData.Department}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Domaine Éducation</label>
                <input
                  type="text"
                  name="EducationField"
                  value={formData.EducationField}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Business Travel</label>
                <select
                  name="BusinessTravel"
                  value={formData.BusinessTravel}
                  onChange={onChange}
                >
                  <option value="Non-Travel">Non-Travel</option>
                  <option value="Travel_Rarely">Travel Rarely</option>
                  <option value="Travel_Frequently">Travel Frequently</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "Rôle & Satisfaction":
        return (
          <div className="form-section">
            <div className="form-row">
              <div className="form-field">
                <label>Rôle</label>
                <input
                  type="text"
                  name="JobRole"
                  value={formData.JobRole}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Niveau de poste (1-5)</label>
                <input
                  type="number"
                  name="JobLevel"
                  min="1"
                  max="5"
                  value={formData.JobLevel}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Satisfaction Job (1-4)</label>
                <input
                  type="number"
                  name="JobSatisfaction"
                  min="1"
                  max="4"
                  value={formData.JobSatisfaction}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Satisfaction Environnement (1-4)</label>
                <input
                  type="number"
                  name="EnvironmentSatisfaction"
                  min="1"
                  max="4"
                  value={formData.EnvironmentSatisfaction}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Implication (1-4)</label>
                <input
                  type="number"
                  name="JobInvolvement"
                  min="1"
                  max="4"
                  value={formData.JobInvolvement}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Work-Life Balance (1-4)</label>
                <input
                  type="number"
                  name="WorkLifeBalance"
                  min="1"
                  max="4"
                  value={formData.WorkLifeBalance}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        );

      case "Rémunération & Temps de Travail":
        return (
          <div className="form-section">
            <div className="form-row">
              <div className="form-field">
                <label>Revenu Mensuel</label>
                <input
                  type="number"
                  name="MonthlyIncome"
                  value={formData.MonthlyIncome}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Taux Journalier</label>
                <input
                  type="number"
                  name="DailyRate"
                  value={formData.DailyRate}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Temps Supplémentaire</label>
                <select
                  name="OverTime"
                  value={formData.OverTime}
                  onChange={onChange}
                >
                  <option value="Yes">Oui</option>
                  <option value="No">Non</option>
                </select>
              </div>
              <div className="form-field">
                <label>Stock Option Level (0-3)</label>
                <input
                  type="number"
                  name="StockOptionLevel"
                  min="0"
                  max="3"
                  value={formData.StockOptionLevel}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        );

      case "Historique & Performance":
        return (
          <div className="form-section">
            <div className="form-row">
              <div className="form-field">
                <label>Total Working Years</label>
                <input
                  type="number"
                  name="TotalWorkingYears"
                  value={formData.TotalWorkingYears}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Training Times Last Year</label>
                <input
                  type="number"
                  name="TrainingTimesLastYear"
                  value={formData.TrainingTimesLastYear}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Years at Company</label>
                <input
                  type="number"
                  name="YearsAtCompany"
                  value={formData.YearsAtCompany}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Years in Current Role</label>
                <input
                  type="number"
                  name="YearsInCurrentRole"
                  value={formData.YearsInCurrentRole}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <label>Years with Current Manager</label>
                <input
                  type="number"
                  name="YearsWithCurrManager"
                  value={formData.YearsWithCurrManager}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <section className="form-card">
      {/* Barre verticale des onglets */}
      <div className="form-tabs-vertical">
        {sections.map(section => (
          <button
            type="button"
            key={section}
            className={activeSection === section ? "active-tab" : ""}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Contenu du formulaire */}
      <div className="form-content">
        <form onSubmit={onSubmit} className="professional-form">
          {renderSection()}

          <button type="submit" className="analyze-btn" disabled={loading}>
            {loading ? "Analyse en cours..." : "Générer Plan de Rétention"}
          </button>
        </form>
      </div>
    </section>
  );
};


export default EmployeeForm;