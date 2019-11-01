import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="None" checked={props.sortBy === 'None'} onChange={(e)=> props.changeSort(e)}/>
        None
      </label>
      <label>
        <input type="radio" value="Alphabetically" checked={props.sortBy === 'Alphabetically'} onChange={(e)=> props.changeSort(e)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.sortBy === 'Price'} onChange={(e)=> props.changeSort(e)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(e)=> props.changeFilter(e)} value={props.filterBy} >
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
