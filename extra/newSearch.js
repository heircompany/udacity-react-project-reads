import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  state = {
    query: '',
    results: []
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
    BooksAPI.search(query).then(books => {
      this.setState({ results: books });
    });
  };

  clearQuery = () => {
    this.setState({ query: '' });
  };

  render() {
    const { books, onUpdateShelf } = this.props;
    const { query, results } = this.state;

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
              Now showing {results.length} of {books.length} total
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>

          <ol className="books-grid">
            {results.map(book =>
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
    );
  }
}

export default SearchBooks;
