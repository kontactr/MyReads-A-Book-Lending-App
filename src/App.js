import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import BookRender from "./BookRender";
import { Link, Route } from "react-router-dom";
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksJson => {
      /*let values = booksJson.map(function(book) {
        return new Book(
          book.imageLinks,
          book.title,
          book.authors,
          book.id,
          book.shelf
        );
      });*/
      

      this.setState({
        books: booksJson
      });
    });
  }

  changeBookShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(res => {
      this.setState(state => ({}));
    });
  };

  updateOnBack = () =>
     { BooksAPI.getAll().then((booksJson) => {
      this.setState({
        books: booksJson
      });
    });
  }

  render() {
    let displayMapObject = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    };

    this.state.books.forEach(function(book) {
      displayMapObject[book.shelf || "none"].push(book);
    });

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <BookRender
                      books={displayMapObject.currentlyReading}
                      changeBookShelf={this.changeBookShelf}
                    />
                  </div>

                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <BookRender
                      books={displayMapObject.wantToRead}
                      changeBookShelf={this.changeBookShelf}
                    />
                  </div>

                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <BookRender
                      books={displayMapObject.read}
                      changeBookShelf={this.changeBookShelf}
                    />
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>}
        />

        <Route
          path="/search"
          render={() =>
            <div className="search-books">
              <Search changeBookShelf={this.changeBookShelf} updateOnBack = {this.updateOnBack} stateSyncData = { this.state.books } />
              <div className="search-books-results">
                <ol className="books-grid" />
              </div>
            </div>
            }
        />


      </div>
    );
  }
}

export default BooksApp;
