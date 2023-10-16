// import React,{useState} from 'react';

function ProductSearchForm() {
  return (
    <div className="card-conatainer">
      <div className="heading">Product Search</div>
      <form>
        {/* keyword-section */}
        <div class="keyword-contianer">
          <label>
            Keyword<span id="mandatory">*</span>
          </label>
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Enter Product Name(eg iPhone 8)"
          />
        </div>
        {/* category-section */}
        <div class="category-container">
          <label>Category</label>
          <select id="category">
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
        {/* condition-section */}
        <div class="condition-container">
          <div>
            <label>Condition</label>
          </div>
          <div>
            <input type="checkbox" name="condition" value="New" />
            <label>New</label>
          </div>
          <div>
            <input type="checkbox" name="condition" value="Used" />
            <label>Used</label>
          </div>
          <div>
            <input type="checkbox" name="condition" value="Unspecified" />
            <label>Unspecified</label>
          </div>
        </div>
        {/* shipping-section */}
        <div class="shipping-container">
          <div>
            <label>Shipping Options</label>
          </div>
          <div>
            <input type="checkbox" name="shipping" value="Local Pickup" />
            <label>Local Pickup</label>
          </div>
          <div>
            <input type="checkbox" name="shipping" value="Free Shipping" />
            <label>Free Shipping</label>
          </div>
        </div>
        {/* distance-section */}
        <div class="distance-container">
          <div>
            <label>Distance (Miles)</label>
          </div>
          <div>
            <input
              type="number"
              name="distance"
              id="distance"
              placeholder="10"
            />
          </div>
        </div>
        {/* zipcode-section */}
        <div class="zipcode-container">
          <div>
            <label>
              From<span id="mandatory">*</span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="postalCode"
              id="postalCode"
              value="currentLocation"
            />
            <label> 'Current Location'</label>
          </div>
          <div>
            <input
              type="radio"
              name="postalCode"
              id="postalCode"
              value="other"
            />
            <label>Other. Please specify zip code:</label>
            <br />
            <input type="text" name="otherPostalCode" id="otherPostalCode" />
          </div>
        </div>
      </form>
    </div>
  );
}
export default ProductSearchForm;
