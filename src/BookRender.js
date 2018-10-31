import React from "react";

export default function BookRender(props){

    return (<div className="bookshelf-books">
    <ol className="books-grid">

    {
    props.books.map((book) => (

      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193,  "background-position": "center" , backgroundImage: `url(${((book.imageLinks && book.imageLinks.thumbnail) || "https://static.thenounproject.com/png/75231-200.png")})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf || "none"} onChange={ (e) => { props.changeBookShelf(book , e.target.value) } }>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{((book.authors && book.authors[0]) || "")}</div>
        </div>
      </li>
     
       ))
    }


    </ol>
  </div>)



}