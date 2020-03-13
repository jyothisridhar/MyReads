import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Book extends Component{
  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  /**
  * @description send a callback to parent component to update book shelf
  * @param {string} newShelf
  */
  updateBookShelf = (newshelf) => {
    const {book, onShelfChange} = this.props;
    onShelfChange(book, newshelf);
  }

  render(){
    const {book} = this.props;
    const backgroundImage = book.imageLinks ? book.imageLinks.thumbnail : '';
    const authors = book.authors ? book.authors.join(',') : '';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+backgroundImage+'")' }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => this.updateBookShelf(event.target.value)} value={book.shelf ? book.shelf: 'none'}>
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
