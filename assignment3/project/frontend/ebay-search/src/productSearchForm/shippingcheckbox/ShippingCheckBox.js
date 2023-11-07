
import React from 'react';

function ShippingCheckbox({ name, value, label, checked,onChange }) {
  return (
    <div class="form-check form-check-inline">
        <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        class="form-check-input"
        onChange={(e)=>onChange(e)}
      />
      <label class="form-check-label" for={name}>
        {label}
      </label>
    </div>
    // <div className="col">
    //   <input
    //     type="checkbox"
    //     name={name}
    //     value={value}
    //     checked={checked}
    //     onChange={(e)=>onChange(e)}
    //   />
    //   <label>{label}</label>
    // </div>
  );
}

export default ShippingCheckbox;
