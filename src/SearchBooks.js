import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      showingBooks: []
    };
  }

  clearQuery = () => {
    this.setState({ query: '', showingBooks: [] });
  };

  updateQuery = async query => {
    const userBooks = this.props.books;
    this.setState({ query: query.trim() });
    await BooksAPI.search(query, 20).then(books => {
      books.map(book => {
        let onShelf = userBooks.find(b => b.id === book.id);

        if (onShelf) {
          return (book.shelf = onShelf.shelf);
        } else {
          return book.shelf;
        }
      });
      // replace the showingBooks to render again the view with the last result books
      this.setState(state => ({
        showingBooks: books
      }));
    });
  };

  render() {
    const { onUpdateShelf } = this.props;
    const { query, showingBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="search-books-results">
            <span>
              Found {showingBooks.length} books.
            </span>
            <button onClick={this.clearQuery}>Clear</button>
          </div>

          <ol className="books-grid">
            {showingBooks.map(book =>
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks
                          ? book.imageLinks.thumbnail
                          : 'http://dvepublishing.com/images/cover_not_available.jpg'})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf || 'empty'}
                        onChange={event => {
                          onUpdateShelf(book, event.target.value);
                        }}
                      >
                        <option value="empty" disabled>
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
    );
  }
}

export default SearchBooks;
