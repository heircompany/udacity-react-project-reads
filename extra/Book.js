import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';

export default class Book extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, onUpdateShelf } = this.props;

    return (
      <div>
        {books.map(book => {
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
                  <option value="currentlyReading">Currently Reading</option>
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
          </div>;
        })}
      </div>
    );
  }
}
