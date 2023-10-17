import React from 'react';

function RadioOption({ name, id, value, label, onChange }) {
  return (
    <div className="custom-control custom-radio">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />{" "}
      <label> {label}</label>
    </div>
  );
}

export default RadioOption;
