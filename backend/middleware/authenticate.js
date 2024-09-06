const jwt = require('jsonwebtoken');

// Middleware per autenticare l'utente
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Accesso negato. Nessun token fornito.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // aggiungiamo l'ID utente al request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token non valido' });
  }
};

module.exports = authenticate;
