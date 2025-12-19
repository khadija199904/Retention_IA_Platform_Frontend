import React from 'react'

const Predict = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handelanalysis = async (e) => {
    e.preventDefault();
    setError(null);

    if (!text.trim()) {
      setError("Le texte est vide");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      setError("Non connecté.");
      setLoading(false);
      return;
    }
    const API_URL = `http://127.0.0.1:8000/predict`;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ "text": text })
      });

      const result = await response.json();
      if (response.ok) {
        setAnalysis(result);
        setError("");
      } else {
        setError(result.detail || "Erreur requête");
      }
    } catch (error) {
      setError("Erreur : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      
      {/* --- BARRE DU HAUT --- */}
      <header className="dashboard-header">
        <div className="header-left">
          <h2>DASHBOARD</h2>
        </div>
        
      </header>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="dashboard-main">
        
        {/* ZONE GAUCHE : INPUT */}
        <section className="panel left-panel">
          <div className="panel-header">
            <h3>Entrée de texte</h3>
            <span className="badge">Predicteur IA</span>
          </div>
          
         
          
        </section>

        {/* ZONE DROITE : RÉSULTATS */}
        <section className="panel right-panel">
          
           
        </section>
      </main>

      {/* BOUTON DECONNEXION (FIXE EN BAS À DROITE) */}
      <div className="fixed-logout">
        <LogoutButton />
      </div>

     

    </div>
  );
};


export default Predict