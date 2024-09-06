import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import UserLibrary from './components/UserLibrary';
import { AuthProvider } from './AuthContext'; // Importa il provider




function App() {
  return (
    
      <Router>
      
      <AuthProvider>
      <Navbar/>
      <div className="flex justify-center items-center ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthModal />} />
          <Route path="/libreria" element={<UserLibrary />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer/>

      </AuthProvider>
    
    </Router>


    
  );
}

export default App;
