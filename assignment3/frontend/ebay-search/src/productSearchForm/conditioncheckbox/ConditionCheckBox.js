import React from 'react';

function ConditionCheckbox({ name, label, checked, onChange }) {
  return (

    <div class="form-check form-check-inline" >
  <input
        type="checkbox"
        name={name}
        value={name}
        checked={checked}
        class='form-check-input'
        onChange={(e) => onChange(e)}
      />
  <label class="form-check-label" for={name}>{label}</label>
</div>
  );
}

export default ConditionCheckbox;
