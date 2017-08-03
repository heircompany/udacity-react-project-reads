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

    BooksAPI.update(book, shelf).then(res => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
      console.log('Called updateShelf: ', book.title, shelf);
    });
  };

  updateQuery = query => {
    BooksAPI.search(query).then(books => {
      this.setState({ books });
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={({ history }) =>
            <BookShelf
              onUpdateShelf={this.updateShelf}
              books={this.state.books}
            />}
        />
        <Route
          path="/search"
          render={({ history }) =>
            <SearchBooks
              onUpdateShelf={this.updateShelf}
              books={this.state.books}
              query={this.state.query}
              onUpdateQuery={this.updateQuery}
            />}
        />
      </div>
    );
  }
}

export default App;
