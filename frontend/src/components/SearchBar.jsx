import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

function SearchBar({updateLibrary}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null); // Stato per l'utente
  const [token, setToken] = useState(null); // Stato per il token
  const inputRef = useRef(null);

  useEffect(() => {
    // Simula l'utente loggato e il token (in un'app reale, prenderesti questi dati dal contesto globale o dal login)
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const openSearch = () => {
    setIsOpen(true);
  };

  const closeSearch = () => {
    if(updateLibrary){
      updateLibrary();
      console.log("qua sto contando")
    }
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    if (query.length > 0) {
      fetchBooks(query);
    } else {
      setResults([]);
    }
  }, [isOpen, query]);

  const fetchBooks = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      setResults(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="w-full ">
      {!isOpen && (
        <div className="flex justify-center mt-10 mb-10 ">
          <input
            onClick={openSearch}
            className="min-w-96 w-4/5 md:w-3/5 lg:w-2/5 p-4 border border-gray-300 rounded-full shadow-lg hover:shadow-blue-400 focus:shadow-blue-600 transition-shadow duration-300"
            placeholder="Cerca un libro..."
          />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="p-4 border-b bg-gray-100 shadow-sm">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Cerca un libro..."
            />
          </div>
          <button
            onClick={closeSearch}
            className="p-4 text-xl text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
          >
            Chiudi Ricerca
          </button>
          <div className="flex-grow overflow-y-auto p-6 bg-gray-50">
            {results.length > 0 ? (
              results.map((book, index) => (
                <BookCard key={index} book={book} user={user} token={token} closeSearch={closeSearch}/>
              ))
            ) : (
              <p className="text-center text-gray-500">Nessun risultato</p>
            )}
          </div>
          {/* <button
            onClick={closeSearch}
            className="p-4 text-xl text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
          >
            Chiudi Ricerca
          </button> */}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
