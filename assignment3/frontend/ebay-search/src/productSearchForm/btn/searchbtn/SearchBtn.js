import React from 'react';
import search from '../../../assets/search.svg'

function SearchButton(props) {
  let onClick=props.onClick;
  let type=props.type;
  return (
    <button type={type} className="btn btn-light" onClick={onClick} style={{marginRight: '1rem'}}>
      <img src={search} alt=""  style={{marginRight:'0.5rem'}}/>
      Search
    </button>
  );
}

export default SearchButton;
