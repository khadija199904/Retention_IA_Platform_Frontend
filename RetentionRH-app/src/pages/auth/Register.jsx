import React, { useState } from 'react';



const Register = ({ onSwitch }) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        const payload = { username, password };
        const API_URL = `http://127.0.0.1:8000/auth/register`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess("Compte créé avec succès ! Connectez-vous.");
                
                setUsername("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setError(result.detail || "Une erreur est survenue.");
            }
        } catch (err) {
            setError(err.detail || "Erreur de connexion au serveur.");
        }
    }

    return (
        <div className='register-form'>
            <h2 className="form-title">Créer un compte</h2>
        
            <form onSubmit={handleSubmit}>
                 
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="form-input"
                        placeholder='Votre username'
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

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        className="form-input"
                        placeholder='••••••••'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button className='submit-btn' type='submit'>
                    S'inscrire
                </button>
            </form>

            <p className='toggle-text'>
                Déjà un compte ?
                <span className='toggle-link' onClick={onSwitch} style={{ marginLeft: "5px" }}>
                    Se connecter
                </span>
            </p>

            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default Register;