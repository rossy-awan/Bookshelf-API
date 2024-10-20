const { nanoid } = require('nanoid'); // Impor nanoid
const books = new Map(); // Map penyimpanan buku

// Fungsi menambahkan buku
const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  try {
    if (!name) throw new Error('Mohon isi nama buku');
    if (readPage > pageCount) throw new Error('readPage tidak boleh lebih besar dari pageCount');

    const id = nanoid(16); // Menghasilkan ID
    const timestamp = new Date().toISOString();
    const finished = pageCount === readPage;

    // Membuat objek buku baru
    const newBook = {id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt: timestamp, updatedAt: timestamp,};
    books.set(id, newBook);

    // Mengembalikan respons sukses
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    }).code(201);
  } catch (error) {
    // Mengembalikan respons kesalahan
    return h.response({
      status: 'fail',
      message: `Gagal menambahkan buku. ${error.message}`,
    }).code(400);
  }
};

// Fungsi mendapatkan semua buku dengan filter
const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = Array.from(books.values()); // Menggunakan array dari Map values

  // Chaining filter nama, reading, dan finished
  if (name) {
    filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(book => book.reading === (reading === '1'));
  }
  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(book => book.finished === (finished === '1'));
  }

  // Mengembalikan respons yang telah difilter
  return h.response({
    status: 'success',
    data: {books: filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher })),},
  }).code(200);
};

// Fungsi mendapatkan detail buku berdasarkan ID
const getBook = (request, h) => {
  const { bookId } = request.params;
  const book = books.get(bookId); // Menggunakan Map

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  // Mengembalikan detail buku
  return h.response({
    status: 'success',
    data: { book },
  }).code(200);
};

// Fungsi mengedit buku berdasarkan ID
const editBook = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  try {
    if (!name) throw new Error('Mohon isi nama buku');
    if (readPage > pageCount) throw new Error('readPage tidak boleh lebih besar dari pageCount');

    // Memeriksa eksistensi buku di Map
    if (!books.has(bookId)) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      }).code(404);
    }

    // Mengupdate buku dengan spread operator dan update timestamp
    const updatedAt = new Date().toISOString();
    const updatedBook = {
      ...books.get(bookId),
      name, year, author, summary, publisher, pageCount, readPage,
      reading, finished: pageCount === readPage, updatedAt,
    };
    books.set(bookId, updatedBook);

    // Mengembalikan respons sukses
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  } catch (error) {
    // Mengembalikan respons kesalahan
    return h.response({
      status: 'fail',
      message: `Gagal memperbarui buku. ${error.message}`,
    }).code(400);
  }
};

// Fungsi menghapus buku berdasarkan ID
const deleteBook = (request, h) => {
  const { bookId } = request.params;

  if (books.delete(bookId)) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  } else {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }
};

// Mengekspor semua fungsi
module.exports = { addBook, getAllBooks, getBook, editBook, deleteBook };