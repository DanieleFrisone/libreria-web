import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Scopri la Magia della Lettura con la Nostra Biblioteca Digitale
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            La nostra applicazione è progettata per gli amanti dei libri, per chi desidera esplorare, condividere e gestire la propria
            biblioteca personale con facilità. Unisciti a noi e scopri come i libri possono trasformare il tuo mondo!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group">
              <img
                src="https://bottegadinarrazione.com/wp-content/uploads/2021/01/yemen_steve-vc-curry.jpg?w=1000"
                alt="Importanza dei libri"
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xl font-semibold text-center px-4">L'Importanza dei Libri</p>
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-eSnWRv3MA8axVZcQX9qohReI4-q1p_MTTg&s"
                alt="Condivisione delle letture"
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xl font-semibold text-center px-4">Condividi le Tue Letture</p>
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://www.scontomaggio.com/wp-content/uploads/2020/03/libri-amazon.jpg"
                alt="Acquista con un clic"
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xl font-semibold text-center px-4">Compra con un Clic</p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Perché Scegliere la Nostra Biblioteca Digitale?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Organizzazione Semplice:</strong> Gestisci la tua collezione di libri in modo intuitivo e ordinato.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Condivisione Facile:</strong> Condividi le tue letture preferite e scopri nuove raccomandazioni dai tuoi amici.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Acquisto Rapido:</strong> Trova e acquista i tuoi libri preferiti con un semplice clic.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Scopri di Più
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
