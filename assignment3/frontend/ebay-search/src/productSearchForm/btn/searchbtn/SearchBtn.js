import React from 'react';
import search from '../../../assets/search.svg'

function SearchButton(props) {
  let onClick=props.onClick;
  let type=props.type;
  return (
    <button type={type} className="btn btn-secondary" onClick={onClick}>
      <img src={search} alt="" />
      Search
    </button>
  );
}

export default SearchButton;
