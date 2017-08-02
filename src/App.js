import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      // new state merges with existing state
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {
    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.filter(book => book).map(book => book)
    }));

    BooksAPI.update(book.id, shelf).then(
      console.log('Called updateShelf: ', book.title, shelf)
    );
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() =>
            <BookShelf
              onUpdateShelf={this.updateShelf}
              books={this.state.books}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks
              onUpdateShelf={this.updateShelf}
              books={this.state.books}
            />}
        />
      </div>
    );
  }
}

export default App;
