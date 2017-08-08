import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      // new state merges with existing state
      this.setState({ books });
    });
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
    return (
      <div>
        <Route
          exact
          path="/"
          render={({ history }) =>
            <BookShelf
              onUpdateShelf={(book, shelf) => {
                this.updateShelf(book, shelf);
              }}
              books={this.state.books}
            />}
        />
        <Route
          path="/search"
          render={({ history }) =>
            <SearchBooks
              onUpdateShelf={(book, shelf) => {
                this.updateShelf(book, shelf);
              }}
              books={this.state.books}
            />}
        />
      </div>
    );
  }
}

export default App;
