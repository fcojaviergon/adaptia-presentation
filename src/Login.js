import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Credenciales hardcodeadas para demo (en producción usar backend)
  const validCredentials = [
    { email: 'diego@adaptianow.com', password: 'adaptia2025' },
    { email: 'client@adaptianow.com', password: 'cliente123' },
    { email: 'investor@adaptianow.com', password: 'investor2025' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validCredentials.some(
      cred => cred.email === email && cred.password === password
    );

    if (isValid) {
      localStorage.setItem('adaptia_auth', 'true');
      localStorage.setItem('adaptia_user', email);
      onLogin(true);
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">🚀 Adaptia MVP</h1>
          <p className="login-subtitle">Presentación Confidencial</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Acceder a la Presentación
          </button>
        </form>
        
      
      </div>
    </div>
  );
};

export default Login;
