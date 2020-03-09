import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelves from './components/Shelves';
import SearchBooks from './components/SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bookList: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((bookList) => {
        this.setState(() => ({
          bookList
        }))
      });
  }

  updateShelf = (book, newShelf) => {
    console.log(book);
    BooksAPI.update(book, newShelf)
      .then(states => {
        const {currentlyReading, wantToRead, read} = states;
        this.setState((prevState) => ({
          bookList: prevState.bookList.map(b => b.id === book.id ? {...b, shelf: newShelf} : b)
        }))
      });
  }

  loadShelf = (cur, want, read) => {

  }

  render() {
    console.log(this.state.bookList);
    const currentlyReading = this.state.bookList.filter(book => {
      return book.shelf === 'currentlyReading';
    });

    const wantToRead = this.state.bookList.filter(book => {
      return book.shelf === 'wantToRead';
    });

    const readBooks = this.state.bookList.filter(book => {
      return book.shelf === 'read';
    });
    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <Shelves shelfTitle="Currently Reading" booksOnShelf={currentlyReading} handleShelf={this.updateShelf} bookList={this.state.bookList}/>
              <Shelves shelfTitle="Want to Read" booksOnShelf={wantToRead} handleShelf={this.updateShelf}/>
              <Shelves shelfTitle="Read" booksOnShelf={readBooks} handleShelf={this.updateShelf}/>
            </div>
          )} />
          <Route path="/search" render={() => (
            <SearchBooks />
          )} />
      </div>
    )
  }
}

export default BooksApp;
