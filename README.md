# Bookshelf API

This project is a simple RESTful API built using the [Hapi.js](https://hapi.dev) framework. The API allows you to perform CRUD (Create, Read, Update, Delete) operations on a collection of books. It is designed for testing and experimentation, and can be easily tested using [Postman](https://www.postman.com).

## Requirements

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org) (version 12.x or later)
- [npm](https://www.npmjs.com) (comes with Node.js)

## Running the Server

To start the server, run the following command:

```bash
npm start
```

or

```bash
npm run start
```

## API Endpoints

The following endpoints are available:

- `POST /books` - Add a new book
- `GET /books` - Retrieve all books
- `GET /books/{bookId}` - Retrieve a specific book by its ID
- `PUT /books/{bookId}` - Update a book by its ID
- `DELETE /books/{bookId}` - Delete a book by its ID

## Testing with Postman

For ease of testing, you can use Postman along with the provided Postman Collection and Environment. Download the collection and environment from the following link:

[Bookshelf API Postman Collection & Environment](https://github.com/dicodingacademy/a261-backend-pemula-labs/raw/099-shared-files/BookshelfAPITestCollectionAndEnvironment.zip)

To test the API:

1. Download the Postman collection and environment.
2. Import them into your Postman application.
3. Make sure the server is running.
4. Use the provided collection to test the different API endpoints.

## Dependencies

The project uses the following Node.js packages:

- [Hapi.js](https://hapi.dev/) - A rich framework for building applications and services
- [nanoid](https://www.npmjs.com/package/nanoid) - A small, secure, URL-friendly unique string ID generator