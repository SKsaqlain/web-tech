import React from 'react';

function AutocompleteResults({ showAutoComplete, zipCode, onCodeClick }) {
  if (showAutoComplete && zipCode) {
    return (
      <div className="autocomplete">
        {
        zipCode.map((code, index) => (
          <div
            className="col-sm-8 bg-white text-dark"
            key={index}
            onClick={(e) => onCodeClick(e)} // Pass the clicked code to the callback
          >
            {code}
          </div>
        ))}
      </div>
    );
  }
}

export default AutocompleteResults;
