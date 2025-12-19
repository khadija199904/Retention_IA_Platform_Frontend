import React from 'react'
import { useState } from 'react'
import Login from './Login'
import Register from './Register'
import './auth.css'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handleSwitch = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className='auth-page'>
      <div className="auth-content">
        <div className="title-container">
          <h1>
            WELCOME TO <span className="app-name">Retentaion Plan Generation IA</span>
          </h1>
        </div>

        <div className="auth-box">
          {isLogin ? (
            <Login onSwitch={handleSwitch} className='box-login' />
          ) : (
            <Register onSwitch={handleSwitch} className = 'box-register'/>
          )}
        </div>

        <div className="matrix-footer">
          Powered by <span className="dev-name">Khadija ELAbbioui</span>
          <span className="cursor"></span>
        </div>
      </div>
    </div>
  )
}

export default Auth