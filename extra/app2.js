import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends Component {
  state = {
    books: [],
    query: ''
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

  updateQuery = async query => {
    this.setState({ query });

    await BooksAPI.search(query, 100).then(books => {
      this.setState({ books });
    });
  };

  clearQuery = () => {
    this.setState({ query: '' });
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
              onUpdateQuery={this.updateQuery}
              query={this.state.query}
              books={this.state.books}
            />}
        />
      </div>
    );
  }
}

export default App;
