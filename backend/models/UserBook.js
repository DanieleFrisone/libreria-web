const mongoose = require('mongoose');
const { Schema } = mongoose;

const userBookSchema = new Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id_book: { type: String, required: true }, // ID del libro (può essere l'ID di Google Books)
  name_book: { type: String, required: true },
  type: { type: String, enum: ['wishlist', 'owned'], required: true } // 'wishlist' o 'owned'
});

const UserBook = mongoose.model('UserBook', userBookSchema);
module.exports = UserBook;
