import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Crea il contesto
export const AuthContext = createContext();

// Crea il provider del contesto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Verifica se il token esiste nel localStorage per impostare l'autenticazione
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Puoi anche ottenere e salvare qui i dettagli dell'utente se li memorizzi
      // esempio: const user = JSON.parse(localStorage.getItem('user'));
      // setUser(user);
    }
  }, []);

  // Funzione per il login
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // Salva anche i dati utente
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Funzione per il logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/'); // Reindirizza alla homepage o altra pagina
  };

  const updateLibrary = () =>{ 
    setCount(count + 1 );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateLibrary, count }}>
      {children}
    </AuthContext.Provider>
  );
};
