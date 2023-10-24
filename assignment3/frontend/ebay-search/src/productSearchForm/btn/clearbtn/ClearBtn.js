import React from 'react';
import clear from '../../../assets/clear.svg'

function ClearButton({ onClick }) {
  return (
    <button type="button" className="btn btn-light clear-btn" onClick={onClick}>
      <img src={clear} alt="" />
      Clear
    </button>
  );
}

export default ClearButton;
