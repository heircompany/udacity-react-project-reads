import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, onUpdateShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Them Reads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter(book => book.shelf === 'currentlyReading')
                    .map(book =>
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${!book.imageLinks
                                  .thumbnail
                                  ? book.imageLinks
                                  : book.imageLinks.thumbnail})`
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                onChange={event => {
                                  onUpdateShelf(book, event.target.value);
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
                    )}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want To Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === 'wantToRead').map(book =>
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${!book.imageLinks.thumbnail
                                ? book.imageLinks
                                : book.imageLinks.thumbnail})`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              onChange={event => {
                                onUpdateShelf(book, event.target.value);
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
                  )}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === 'read').map(book =>
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${!book.imageLinks.thumbnail
                                ? book.imageLinks
                                : book.imageLinks.thumbnail})`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              onChange={event => {
                                onUpdateShelf(book, event.target.value);
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
                  )}
                </ol>
              </div>
            </div>
          </div>

          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
