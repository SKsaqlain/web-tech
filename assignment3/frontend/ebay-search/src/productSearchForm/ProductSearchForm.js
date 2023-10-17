import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import search from "../assets/search.svg";
import clear from "../assets/clear.svg";

import "./ProductSearchForm.css";
import ConditionCheckbox from "./conditioncheckbox/ConditionCheckBox";
import ShippingCheckbox from "./shippingcheckbox/ShippingCheckBox";

import { getZipCode } from "../services/zipCodeApi";

function ProductSearchForm() {
  const [zipCode, setZipCode] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  //form states
  const [postalCode, setPostalCode] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("1");
  const [condition, setCondition] = useState({
    new: false,
    used: false,
    unspecified: false,
  });
  const [shipping, setShipping] = useState({
    localPickup: false,
    freeShipping: false,
  });
  const [distance, setDistance] = useState("10");

  console.log(condition);
  console.log(shipping);

  const handleConditionChange = (e) => {
    const {value,name}=e.target
    setCondition({...condition, [name]:e.target.checked});
  };

  const handleShippingChange=(e)=>{
    setShipping({...shipping, [e.target.value]:e.target.checked});
  }
  const handleOnchange = (event) => {
    console.log(event.target.value);
    const { value, name } = event.target;
    const userInput = { ...inputValues, [name]: value };
    console.log(userInput);
    setInputValues(userInput);
  };
  const handleZipCode = (e) => {
    const { value } = e.target;
    setPostalCode(value);
    const regex = /\d+$/;
    console.log(value);
    if (value !== "" && regex.test(value)) {
      console.log("valid zipcode entered");
      setShowAutoComplete(true);
      getZipCode(value, uuid4()).then((data) => {
        console.log(data);
        setZipCode(data);
        setShowAutoComplete(true);
      });
    }
  };

  const onKeyDown = (e) => {};

  const onCodeClick = (e) => {
    console.log("zipCode clicked " + e.target.innerHTML);
    setInputValues({ ...inputValues, zipCode: e.target.innerHTML });
    setPostalCode(e.target.innerHTML);
    setShowAutoComplete(false);
  };
  const renderAutocomplete = () => {
    if (showAutoComplete && zipCode) {
      console.log("rendering autocomplete");
      return (
        <div className="autocomplete">
          {zipCode.map((code, index) => {
            return (
              <div
                class="col-sm-8 bg-white text-dark "
                key={index}
                onClick={onCodeClick}
              >
                {code}{" "}
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="card-container">
      <div className="inner-container">
        <div className="heading">Product Search</div>
        <form>
          {/* keyword-section */}
          <div class="row my-3 keyword-container">
            <div class="col">
              <label>
                Keyword<span id="mandatory">*</span>
              </label>
            </div>
            <div class="col">
              <input
                type="text"
                name="keyword"
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter Product Name(eg iPhone 8)"
              />
            </div>
          </div>
          {/* category-section */}
          <div class="row my-3 category-container">
            <div class="col">
              <label>Category</label>
            </div>
            <div class="col">
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.selected)}
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
          {/* condition-section */}
          <div class="row my-3 condition-container">
            <div class="col">
              <label>Condition</label>
            </div>
            <div class="col">
              <div class="row">
                <ConditionCheckbox
                  name="new"
                  label="New"
                  checked={condition.new}
                  onChange={handleConditionChange}
                />
                <ConditionCheckbox
                  name="used"
                  label="Used"
                  checked={condition.used}
                  onChange={handleConditionChange}
                />
                <ConditionCheckbox
                  name="unspecified"
                  label="Unspecified"
                  checked={condition.unspecified}
                  onChange={handleConditionChange}
                />

                {/* <div class="col">
                  <input
                    type="checkbox"
                    name="condition"
                    value="New"
                    onChange={(e) =>
                      setCondition({ ...condition, ["new"]: e.target.checked })
                    }
                  />
                  <label>New</label>
                </div> */}
                {/* <div class="col">
                  <input
                    type="checkbox"
                    name="condition"
                    value="Used"
                    onChange={(e) =>
                      setCondition({ ...condition, ["used"]: e.target.checked })
                    }
                  />
                  <label>Used</label>
                </div>
                <div class="col">
                  <input
                    type="checkbox"
                    name="condition"
                    value="Unspecified"
                    onChange={(e) =>
                      setCondition({
                        ...condition,
                        ["unspecified"]: e.target.checked,
                      })
                    }
                  />
                  <label>Unspecified</label>
                </div> */}
              </div>
            </div>
          </div>
          {/* shipping-section */}
          <div class="row my-3 shipping-container">
            <div class="col">
              <label>Shipping Options</label>
            </div>
            <div class="col">
              <div class="row">
                  <ShippingCheckbox name="shipping" value='localPickup' label="Local Pickup" checked={shipping.localPickup} onChange={handleShippingChange}/>
                  <ShippingCheckbox name="shipping" value='freeShipping' label="Free Shipping" checked={shipping.freeShipping} onChange={handleShippingChange}/>
                {/* <div class="col">
                  <input type="checkbox" name="shipping" value="Local Pickup" />
                  <label>Local Pickup</label>
                </div>
                <div class="col">
                  <input
                    type="checkbox"
                    name="shipping"
                    value="Free Shipping"
                  />
                  <label>Free Shipping</label>
                </div> */}
              </div>
            </div>
          </div>
          {/* distance-section */}
          <div class="row my-3 distance-container">
            <div class="col">
              <label>Distance (Miles)</label>
            </div>
            <div class="col">
              <input
                type="number"
                name="distance"
                id="distance"
                placeholder="10"
              />
            </div>
          </div>
          {/* zipcode-section */}
          <div class="row zipcode-container">
            <div class="col">
              <label>
                From<span id="mandatory">*</span>
              </label>
            </div>
            <div class="col">
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  name="postalCode"
                  id="postalCode"
                  value="currentLocation"
                />{" "}
                <label> 'Current Location'</label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  name="postalCode"
                  id="postalCode"
                  value="other"
                />{" "}
                <label>Other. Please specify zip code:</label>
              </div>
              <div class="row mb-3 location-container">
                <label for="inputEmail3" class="col-sm-3 col-form-label">
                  {" "}
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail3"
                    name="zipCode"
                    onChange={(e) => handleZipCode(e)}
                    onKeyDown={onKeyDown}
                    value={postalCode}
                    autoComplete="off"
                  />
                  {renderAutocomplete()}
                </div>
              </div>
            </div>
          </div>
          <div className="button-grp">
            <button type="button" class="btn btn-secondary">
              <img src={search} alt="" />
              Search
            </button>
            <button type="button" class="btn btn-light clear-btn">
              <img src={clear} alt="" />
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ProductSearchForm;
