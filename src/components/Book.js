import React, {Component} from 'react';
import '../App.css';

class Book extends Component{
  // state = {
  //   book: {}
  // }

  updateBookShelf = (newshelf) => {
    const {book, onShelfChange} = this.props;
    //book.shelf = newshelf;
    console.log(book);
    onShelfChange(book, newshelf);
  }
  render(){
    const {book} = this.props;
    const backgroundImage = book.imageLinks.thumbnail;
    // const backgroundImage = bookList.filter(b => b.id === bookID).map(bObj => bObj.imageLinks.thumbnail)
    //                         .map(bT => bT.title);
    const authors = book.authors.length > 1 ? (book.authors.map(a => {return a+', '})) : book.authors[0];

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+backgroundImage+'")' }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => this.updateBookShelf(event.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book;
