import React from "react";

function RadioOption({ name, id, value, checked, label, onChange }) {
  // <div className="custom-control custom-radio">
  //     <input
  //       type="radio"
  //       name={name}
  //       id={id}
  //       value={value}
  //       checked={checked}
  //       onChange={onChange}
  //     />{" "}
  //     <label> {label}</label>
  //   </div>  
  return (
    <div class="form-check">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        class="form-check-input"
      />
      <label class="form-check-label" style={{width: "12rem"}} for={name}>
        {label}
      </label>
    </div>
  );
}

export default RadioOption;
