const express = require('express');
let books = require("./booksdb.js");
let public_users = express.Router();
const axios = require('axios');

// Получить список всех книг (async/await через Axios / локальный эндпоинт)
public_users.get('/', async function (req, res) {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Получить книгу по ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    let book = books[isbn];
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book" });
  }
});

// Получить книги по автору
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  let filteredBooks = [];
  try {
    let keys = Object.keys(books);
    keys.forEach((key) => {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        filteredBooks.push(books[key]);
      }
    });
    return res.status(200).json(filteredBooks);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// Получить книги по названию
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  let filteredBooks = [];
  try {
    let keys = Object.keys(books);
    keys.forEach((key) => {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        filteredBooks.push(books[key]);
      }
    });
    return res.status(200).json(filteredBooks);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by title" });
  }
});

module.exports.general = public_users;
