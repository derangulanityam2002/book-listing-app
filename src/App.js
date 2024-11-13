// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all books
  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Add a new book
  const addBook = () => {
    axios
      .post("http://localhost:5000/books", { title, author, description })
      .then((response) => {
        setBooks([...books, response.data]);
        setTitle("");
        setAuthor("");
        setDescription("");
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  // Delete a book
  // Delete a book
  // const deleteBook = (id) => {
  //   axios
  //     .delete(`http://localhost:5000/books/${id}`)
  //     .then(() => setBooks(books.filter((book) => book._id !== id)))
  //     .catch((error) => console.error("Error deleting book:", error));
  // };
  const deleteBook = (id) => {
    console.log("Attempting to delete book with ID:", id); // Debug line
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        console.log("Book deleted successfully");
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  return (
    <div className="container">
      <h1 className="header">Book Listing</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
        <button onClick={addBook} className="form-button">
          Add Book
        </button>
      </div>

      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-item">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-description">{book.description}</p>
            <button
              onClick={() => deleteBook(book._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
