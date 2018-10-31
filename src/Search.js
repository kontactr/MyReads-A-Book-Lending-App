import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookRender from './BookRender';


export default class Search extends React.Component {
  
    state = {
    query: "",
    booksArray: [],
    flagToUpdateData: true,
    booksArrayUserChange: this.props.stateSyncData
  };


  changeUpdateSelf = (book , shelf) => {

    this.props.changeBookShelf(book , shelf);
    this.setState({
        flagToUpdateData: true
    });

  }


  changeHandler = query => {

    this.setState({
        query: query
    }); 

    if (query.length >= 1) {
      
      BooksAPI.search(query.trim()).then((booksJson) => {
            
        let temp = booksJson.items || booksJson;

        
        if(this.state.flagToUpdateData) {

        BooksAPI.getAll().then((booksJsonUser) => {

            

            for(let index=0; index < temp.length ; index++){
                for(let index1=0; index1 < booksJsonUser.length ; index1++){
                    if(temp[index].id === booksJsonUser[index1].id){
                        temp[index].shelf = booksJsonUser[index1].shelf;
                        break;
                    }
                }
            }
            
        
            this.setState({
     
            booksArray: temp,
            booksArrayUserChange: booksJsonUser,
            flagToUpdateData: false
            
                });
          

        });
 
    }else{
        
        for(let index=0; index < temp.length ; index++){
            for(let index1=0; index1 < this.state.booksArrayUserChange.length ; index1++){
                if(temp[index].id === this.state.booksArrayUserChange[index1].id){
                temp[index].shelf = this.state.booksArrayUserChange[index1].shelf;
                    break;
                }
            }
            }

            this.setState({
                booksArray: temp
            });


        }
        
      });

    
    }else{
        this.setState({
            
            booksArray: []
        })
    }



  };

  render() {


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link onClick={this.props.updateOnBack} to="./" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
            <input
              type="text"
              onChange={e => {
                this.changeHandler(e.target.value);
              }}
              value={this.state.query}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          
            <BookRender books={this.state.booksArray} changeBookShelf={this.changeUpdateSelf} />
        </div>
      </div>
    );
  }
}
