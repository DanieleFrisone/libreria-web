const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const UserBook = require('./models/UserBook'); // Importiamo il modello UserBook
const authenticate = require('./middleware/authenticate'); // Importiamo il middleware per autenticazione

const app = express();
app.use(cors());
app.use(express.json());

// Connessione a MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mern.oxnqd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=mern`)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

// Endpoint di registrazione
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email già esistente' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Utente registrato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});

// Endpoint di login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("sono dentro login");
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email o password non validi' });
    }

    console.log("ho trovato la mail");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email o password non validi' });
    }
    console.log("le password combaciano")
    console.log(user);
    console.log("il problema è qui, credo sia legato all' _id. al tipo")
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log("token " + token);
    console.log("user: ");
    console.log(user);
    console.log("fine user");
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il login' });
  }
});

// =====================
// Gestione dei libri dell'utente
// =====================

// Aggiungi un libro
app.post('/api/user/books', authenticate, async (req, res) => {
  const { id_book, name_book, type } = req.body;

  try {
    const userBook = new UserBook({
      id_user: req.user.id, // Otteniamo l'ID dell'utente dal token
      id_book,
      name_book,
      type,
    });

    await userBook.save();
    res.status(201).json({ message: 'Libro aggiunto con successo', userBook });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'aggiunta del libro', error });
  }
});

// Ottieni i libri dell'utente
app.get('/api/user/books', authenticate, async (req, res) => {
 
  try {
    const userBooks = await UserBook.find({ id_user: req.user.id });
    res.json(userBooks);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero dei libri', error });
  }
});

// Modifica un libro (ad esempio cambia da wishlist a posseduto)
app.put('/api/user/books/:id', authenticate, async (req, res) => {
  const { type } = req.body;

  try {
    const book = await UserBook.findOne({ _id: req.params.id, id_user: req.user.id });
    if (!book) {
      return res.status(404).json({ message: 'Libro non trovato o non appartiene all\'utente' });
    }

    book.type = type;
    await book.save();
    res.json({ message: 'Libro aggiornato con successo', book });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'aggiornamento del libro', error });
  }
});

// Elimina un libro
app.delete('/api/user/books/:id', authenticate, async (req, res) => {
  try {
    const book = await UserBook.findOneAndDelete({ _id: req.params.id, id_user: req.user.id });
    if (!book) {
      return res.status(404).json({ message: 'Libro non trovato o non appartiene all\'utente' });
    }

    res.json({ message: 'Libro eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'eliminazione del libro', error });
  }
});

// Avvia il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
