import React from 'react';
import AuthModal from './AuthModal';


const HeroSection = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center bg-white">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEzfHxib29rfGVufDB8fHx8MTY3MDAxMTYzNg&ixlib=rb-1.2.1&q=80&w=1920"
          alt="Libreria digitale"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          Registrati per <span className="text-blue-500">Creare</span> e <span className="text-blue-500">Condividere</span> la tua libreria digitale
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Organizza, scopri e condividi i tuoi libri preferiti con facilità e rapidità.
        </p>
        
        <AuthModal/>
      </div>
    </div>
  );
};

export default HeroSection;
