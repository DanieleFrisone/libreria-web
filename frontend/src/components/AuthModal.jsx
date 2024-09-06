import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../AuthContext'; // Importa il contesto


function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Stato per alternare tra login e sign-up
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Stato per gestire errori

  const { login } = useContext(AuthContext); // Usa il contesto di autenticazione
  const navigate = useNavigate(); // Usa useNavigate per il reindirizzamento

  const { count, updateLibrary } = useContext(AuthContext); // Usa il contesto di autenticazione

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setErrorMessage(''); // Resetta eventuali errori all'apertura/chiusura del modal
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setName(''); // Resetta il nome solo nella registrazione
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Effettua il login
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', {
          email,
          password,
        });
        const { token, user } = response.data;

        // Usa la funzione di login dal contesto
        login(token, user);

        console.log('Login effettuato:', response.data);
        toggleModal(); // Chiudi il modal in caso di successo
        updateLibrary()
        navigate("/libreria"); // Reindirizza alla libreria
      } else {
        // Effettua la registrazione
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/register', {
          name,
          email,
          password,
        });

        console.log('Registrazione effettuata:', response.data);

        // Effettua il login immediatamente dopo la registrazione
        const loginResponse = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', {
          email,
          password,
        });
        const { token, user } = loginResponse.data;

        // Usa la funzione di login dal contesto
        login(token, user);

        toggleModal(); // Chiudi il modal in caso di successo
        updateLibrary()
        navigate("/libreria"); // Reindirizza alla libreria
      }
    } catch (error) {
      console.error('Errore durante l\'autenticazione:', error.response?.data?.message || error.message);
      setErrorMessage('Errore durante l\'autenticazione. Verifica le tue credenziali.');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button 
        className="bg-blue-700 text-white px-12 py-6 text-xl font-bold rounded-full hover:bg-blue-700 transition" 
        onClick={toggleModal}
      >
        {isLogin ? 'Accedi' : 'Registrati'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
            <h2 className="text-2xl font-semibold text-center mb-6">
              {isLogin ? 'Login' : 'Registrazione'}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!isLogin} // Nome richiesto solo per la registrazione
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
              )}

              <button 
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {isLogin ? 'Accedi' : 'Registrati'}
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={toggleAuthMode}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
              </button>
            </div>

            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthModal;
