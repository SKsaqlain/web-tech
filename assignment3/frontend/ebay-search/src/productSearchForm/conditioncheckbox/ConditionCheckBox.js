import React from 'react';

function ConditionCheckbox({ name, label, checked, onChange }) {
  return (
    <div className="col">
      <input
        type="checkbox"
        name={name}
        value={name}
        checked={checked}
        onChange={(e) => onChange(e)}
      />
      <label>{label}</label>
    </div>
  );
}

export default ConditionCheckbox;
