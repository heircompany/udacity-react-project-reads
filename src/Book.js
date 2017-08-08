import React, { Component } from 'react';

import * as BooksAPI from './BooksAPI';
import './Book.css';

export default class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {}
    };
  }

  updateShelf = async (book, shelf) => {
    book.shelf = shelf;

    await BooksAPI.update(book, shelf).then(res => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
      console.log('Called updateShelf: ', book.title, shelf);
    });
  };

  render() {
    const { books } = this.props;
    const { book } = this.state;

    return (
      <div>
        {BooksAPI.get(book.id).then(book => {
          books.filter(b => b.id === book.id).map(book =>
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      backgroundImage: `url(${!book.imageLinks.thumbnail
                        ? book.imageLinks
                        : book.imageLinks.thumbnail})`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={event => {
                        this.updateShelf(book, event.target.value);
                      }}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                <div className="book-authors">
                  {book.author}
                </div>
              </div>
            </li>
          );
        })}
      </div>
    );
  }
}
