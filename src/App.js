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
      searchResults: []
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
    BooksAPI.update(book, newShelf)
      .then(response => {
        this.setState((prevState) => ({
          bookList: prevState.bookList.map(b => b.id === book.id ? {...b, shelf: newShelf} : b)
        }))
      });
  }

  addToShelf = (book, newShelf) => {
    book.shelf = newShelf;
    BooksAPI.update(book, newShelf)
      .then(response => {
        this.setState((prevState) => ({
          bookList: prevState.bookList.concat(book)
        }))
      });
  }

  handleSearch = (query) => {
    BooksAPI.search(query)
    .then((response) => {
      if(response){
        response.error ? this.setState({searchResults: []}) : this.updateSearchResults(response)
      }
    });
  }

  updateSearchResults = (response) => {
    for(let r of response){
      for(let b of this.state.bookList){
        if(r.id === b.id){
          r.shelf = b.shelf
        }
      }
    }
    this.setState({searchResults: response});
  }

  render() {
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
              <Shelves shelfTitle="Currently Reading" booksOnShelf={currentlyReading} handleShelf={this.updateShelf} />
              <Shelves shelfTitle="Want to Read" booksOnShelf={wantToRead} handleShelf={this.updateShelf}/>
              <Shelves shelfTitle="Read" booksOnShelf={readBooks} handleShelf={this.updateShelf}/>
            </div>
          )} />
          <Route path="/search" render={() => (
            <SearchBooks onSearch={this.handleSearch} response={this.state.searchResults} handleShelf={this.addToShelf}/>
          )} />
      </div>
    )
  }
}

export default BooksApp;
