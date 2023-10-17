
import React from 'react';

function ShippingCheckbox({ name, value, label, checked,onChange }) {
  return (
    <div className="col">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e)=>onChange(e)}
      />
      <label>{label}</label>
    </div>
  );
}

export default ShippingCheckbox;
