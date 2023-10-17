import React from 'react';
import search from '../../../assets/search.svg'

function SearchButton({ onClick }) {
  return (
    <button type="button" className="btn btn-secondary" onClick={onClick}>
      <img src={search} alt="" />
      Search
    </button>
  );
}

export default SearchButton;
