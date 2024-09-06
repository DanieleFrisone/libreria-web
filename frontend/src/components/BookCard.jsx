import React from 'react';
import axios from 'axios';

function BookCard({ book, user, token, closeSearch }) {
  const { title, authors, imageLinks, description} = book.volumeInfo;

  // Funzione per aggiungere libro alla libreria o alla wishlist
  const handleAddBook = async (type) => {

    console.log(user);
    console.log(token);

    if (!user || !token) {
      alert('Per favore, accedi prima di aggiungere un libro');
      closeSearch();
      return;
    }

    try {
  
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL +'/api/user/books',
        {
          id_book: book.id,
          name_book: title,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert(`Libro aggiunto con successo alla tua ${type === 'owned' ? 'libreria' : 'wishlist'}`);
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del libro:', error);
      alert('Si è verificato un errore durante l\'aggiunta del libro');
    }

    closeSearch();
  };

  return (
    <div className="flex border rounded-lg shadow-md overflow-hidden mb-4">
      <img
        src={imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
        alt={title}
        className="w-32 h-auto object-cover"
      />
      <div className="p-4 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">
            {authors ? authors.join(', ') : 'Autore sconosciuto'}
          </p>
          <p className="text-gray-700 mt-2 line-clamp-3">
            {description || 'Nessuna descrizione disponibile.'}
          </p>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => handleAddBook('owned')}
          >
            Aggiungi alla Libreria
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            onClick={() => handleAddBook('wishlist')}
          >
            Aggiungi alla Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
