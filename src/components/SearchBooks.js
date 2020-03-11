import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
import '../App.css';

class SearchBooks extends Component {
  state = {
    query: ''
  }

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    response: PropTypes.array.isRequired,
    handleShelf: PropTypes.func.isRequired
  }

  onSearch = (query) => {
    this.setState({
      query: query
    });
    if(this.state.query){
      this.props.onSearch(query);
    }
  }

  updateBookShelf = (updatedBook, shelf) =>{
    this.props.handleShelf(updatedBook, shelf);
  }

  render(){
    const response = this.props.response;
    console.log(response);
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close Search</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                     placeholder="Search by title or author"
                     value={this.state.query}
                     onChange={(e) => this.onSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {
              response.length === 0 ? (
                <div>No books found</div>
              ) :
              (
                response.map((book, index) => (
                  <li key={index}>
                    <Book book={book} onShelfChange={this.updateBookShelf}/>
                  </li>
                ))
              )
            }
            </ol>
          </div>
        </div>
    )
  }
}

export default SearchBooks;
