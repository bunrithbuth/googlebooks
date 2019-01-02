import axios from "axios";

export default {
  // Gets all books
  getBooks: function(query) {
    return axios.get("/api/books", { params: { q: query } });
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/saved/" + id);
  },
  saveBooks: function(id) {
    return axios.get("/api/books/saved/");
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
