import React from 'react';
import axios from 'axios';

function LibraryBookCard({ book, onRemove }) {
  const { _id, id_book, name_book, type } = book;

  // Funzione per eliminare il libro
  const handleRemove = async () => {
    try {
      const token = localStorage.getItem('token'); // Assumiamo che il token sia salvato nel localStorage
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/user/books/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onRemove(_id); // Rimuove il libro dalla visualizzazione
    } catch (error) {
      console.error('Errore durante la rimozione del libro:', error);
    }
  };

  // Funzione per cercare il libro su Amazon
  const handleBuy = () => {
    const amazonUrl = `https://www.amazon.it/s?k=${encodeURIComponent(name_book)}`;
    window.open(amazonUrl, '_blank'); // Apre la ricerca del libro su Amazon in una nuova scheda
  };

  return (
    <div className="relative border rounded-lg p-4 shadow-md bg-white">
      <button 
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        onClick={handleRemove}
        title="Rimuovi libro"
      >
        ✕
      </button>
      <div className="flex flex-col items-center">
        <img 
          src={`https://books.google.com/books/content?id=${id_book}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} 
          alt={name_book} 
          className="w-32 h-48 object-cover mb-4" 
        />
        <h3 className="text-lg font-bold text-center mb-2">{name_book}</h3>
        <p className={`text-sm mb-4 ${type === 'owned' ? 'text-green-500' : 'text-yellow-500'}`}>
          {type === 'owned' ? 'Nella libreria' : 'Nella wishlist'}
        </p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleBuy}
        >
          Compra su Amazon
        </button>
      </div>
    </div>
  );
}

export default LibraryBookCard;
