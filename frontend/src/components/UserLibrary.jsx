import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LibraryBookCard from './LibraryBookCard';
import SearchBar from './SearchBar';
import AuthModal from './AuthModal';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

function UserLibrary() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const { count, updateLibrary, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated && setError(null);
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        setError('Errore durante il recupero dei libri.');
        console.error(error);
      }
    };

    fetchBooks();
  }, [count]);

  const removeBookFromLibrary = (id_book) => {
    setBooks(books.filter(book => book._id !== id_book));
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">La mia Libreria</h1>
      {error && (
        <>
          <p className="text-red-500 text-center m-10">{error}</p>
          <AuthModal />
        </>
      )}
      <SearchBar updateLibrary={updateLibrary} />
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <LibraryBookCard
              key={book._id}
              book={book}
              onRemove={removeBookFromLibrary}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserLibrary;
