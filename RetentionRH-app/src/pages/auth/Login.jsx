import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = ({ onSwitch }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const payload = { username, password };
        const API_URL = `http://127.0.0.1:8000/auth/login`;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            console.log(result)

            if (response.ok) {
                setSuccess("Connexion réussie ! Redirection...");
                localStorage.setItem('token', result.accesstoken);
                // Petit délai pour laisser l'animation de succès se jouer
                setTimeout(() => {
                    navigate('/generate');
                }, 1000);
            } else {
                setError(result.detail || "Identifiants incorrects");
            }
        } catch (err) {
            setError(err.message || "Erreur de connexion serveur");
        }
    };

    return (
        <div className="login-form">
            <h2 className="form-title">Se Connecter</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        id="username"  
                        className="form-input"
                        placeholder='Entrez votre username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </div>
            
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-input"
                        placeholder='••••••••'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>

                <button className='submit-btn' type='submit'>
                    Connexion
                </button>
            </form>

            <p className='toggle-text'>Pas encore de compte ?
                <span className='toggle-link' onClick={onSwitch} style={{ marginLeft: "5px" }}> 
                    S'inscrire
                </span>
            </p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
        </div>
    )
}

export default Login;