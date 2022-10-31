/* eslint-disable max-classes-per-file */

import Store from './modules/StoreClass.js';
import Book from './modules/BookClass.js';
import { DateTime } from './modules/luxon.js';

// Variables for Single Page
const list = document.querySelector('#list');
const addNew = document.querySelector('#add-new');
const contact = document.querySelector('#contact');
const tableContainer = document.querySelector('.books-table-container');
const booksForm = document.querySelector('.book-form');
const contactInfo = document.querySelector('.contact-info');

// Book Class: represents a book object

// Store Class: Handles Storage

// Creating new Store instance
const store = new Store();

// UI Class : Handles UI tasks
class UI {
  // Static so I don't have to instantiate

  static displayBooks() {
    const books = store.getBooks();
    books.forEach((book) => UI.addBookList(book));
  }

  static addBookList(book) {
    const bookList = document.getElementById('book-list');

    const content = document.createElement('div');
    content.innerHTML = `
    <div>"${book.title}" By ${book.author}</div>
    <button id="book-num-${book.id}"class="delete">Remove</button>
    `;
    bookList.appendChild(content);
    content.classList.add('book-row-content');
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Event listener for UI
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event listener for submit
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = store.count;

  // New book instance when you submit
  const book = new Book(title, author, id);

  // Sending book object submision to UI and storage
  UI.addBookList(book);

  store.addBook(book);

  UI.clearFields();
});

// Event listener for removing a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  const btnID = e.target.id;
  const arrValues = btnID.split('-');
  const idString = arrValues[arrValues.length - 1];
  const id = parseInt(idString, 10);
  // Remove book from store depending on id
  store.removeBook(id);
});

// Get Date Luxon
document.getElementById('date').innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

// Single Page Hiding event listeners
list.addEventListener('click', () => {
  tableContainer.classList.remove('hide');
  booksForm.classList.add('hide');
  contactInfo.classList.add('hide');
});
addNew.addEventListener('click', () => {
  booksForm.classList.remove('hide');
  contactInfo.classList.add('hide');
  tableContainer.classList.add('hide');
});
contact.addEventListener('click', () => {
  contactInfo.classList.remove('hide');
  booksForm.classList.add('hide');
  tableContainer.classList.add('hide');
});
