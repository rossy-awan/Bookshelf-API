const Hapi = require('@hapi/hapi'); // Mengimpor modul Hapi
const {addBook, getAllBooks, getBook, editBook, deleteBook,} = require('./routes'); // Mengimpor fungsi dari 'routes'

// Inisialisasi server Hapi
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  // Route setiap endpoint API
  server.route([
    {method: 'POST', path: '/books', handler: addBook,},
    {method: 'GET', path: '/books', handler: getAllBooks,},
    {method: 'GET', path: '/books/{bookId}', handler: getBook,},
    {method: 'PUT', path: '/books/{bookId}', handler: editBook,},
    {method: 'DELETE', path: '/books/{bookId}', handler: deleteBook,},
  ]);

  await server.start(); // Memulai server
  console.log(`Server running on ${server.info.uri}`); // Menampilkan informasi URI server
};

// Menangani error dan menghentikan proses
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init(); // Memanggil fungsi inisialisasi