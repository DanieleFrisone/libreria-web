import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sezione Contatti */}
        <div>
          <h4 className="font-bold text-lg mb-4">Contatti</h4>
          <p>Indirizzo: Via Roma, 123</p>
          <p>Telefono: +39 123 456 7890</p>
          <p>Email: info@azienda.com</p>
        </div>

        {/* Link Utili */}
        <div>
          <h4 className="font-bold text-lg mb-4">Link Utili</h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Termini e Condizioni
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Supporto
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-bold text-lg mb-4">Seguici</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>

        {/* Iscrizione alla Newsletter */}
        <div>
          <h4 className="font-bold text-lg mb-4">Iscriviti alla Newsletter</h4>
          <form>
            <input
              type="email"
              placeholder="Inserisci la tua email"
              className="w-full p-2 mb-4 text-gray-800 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 p-2 rounded text-white hover:bg-blue-700"
            >
              Iscriviti
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center">
        <p>&copy; 2024 MyCompany. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

export default Footer;
