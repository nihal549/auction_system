import React, { useState ,useEffect} from 'react';
import Card from './Card';
import {
    boardCardStyle,
  } from './css/boardStyle';
import './css/search.css'
import Nav from './Nav';
const Search = () => {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
  
  
    const handleSearch = (event) => {
        const key = event.target.value;
        console.log(key)
        fetch(`http://localhost:5000/ad/search/${key}`)
        .then(result=>result.json())
        .then(data=>{
          console.log(data)
          setSearchResults(data)
        })
      };
    return (
       <div>
        <Nav/>
        <div className="container">
        <input
          placeholder='search products'
          onChange={handleSearch}
        />
        <div className='pp__container'>
          {searchResults.length > 0 ? (
            searchResults.map(ad => (
              <div  key={ad._id}>
                <Card
                  ad={ad}
                  key={ad._id}
                  dashCard={false}
                  cardStyle={boardCardStyle}
                />
              </div>
            ))
          ) : (
            <p className="no-results">No search results</p>
          )}
        </div>
      </div>
       </div>
    );
};
export default Search;
