import React, {Component} from 'react';
import Book from './Book';
import {Link} from 'react-router-dom';
import '../App.css';

class Shelves extends Component {
  updateBookShelf = (updatedBook, shelf) =>{
    this.props.handleShelf(updatedBook, shelf);
    console.log(updatedBook, shelf);
  }
  render(){
    const {shelfTitle, booksOnShelf, bookList} = this.props;

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  booksOnShelf.map((book, index) => (
                    <li key={index}>
                      <Book book={book} onShelfChange={this.updateBookShelf} bookList={bookList}/>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add Book</Link>
        </div>
      </div>
    )
  }
}

export default Shelves;
