import React from "react";
import "./Category.css";
function CategorySelect({ value, onChange }) {
  return (
    <div class="mb-3 row">
      <label for="category" class="col-sm-3 col-form-label">
        Category
      </label>
      <div class="col-sm-8">
        <select
          id="category"
          name="category"
          value={value}
          style={{ width: "100%" }}
          onChange={(e) => onChange(e)}
          class='form-select category-select'
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
