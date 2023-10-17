import React from 'react';

function CategorySelect({ value, onChange }) {
  return (
    <div className="row my-3 category-container">
      <div className="col">
        <label>Category</label>
      </div>
      <div className="col">
        <select
          id="category"
          name="category"
          value={value}
          onChange={(e) => onChange(e)}
        >
          <option value="1" defaultChecked>
            All Categories
          </option>
          <option value="2">Art</option>
          <option value="3">Baby</option>
          <option value="4">Books</option>
          <option value="5">Clothing,Shoes & Accessories</option>
          <option value="6">Health & Beauty</option>
          <option value="7">Music</option>
          <option value="8">Video Games & Console</option>
        </select>
      </div>
    </div>
  );
}

export default CategorySelect;
