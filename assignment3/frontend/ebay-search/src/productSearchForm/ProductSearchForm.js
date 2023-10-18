import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";

import "./ProductSearchForm.css";
import ConditionCheckbox from "./conditioncheckbox/ConditionCheckBox";
import ShippingCheckbox from "./shippingcheckbox/ShippingCheckBox";
import PosalcodeRadioBtn from "./postalcoderadiobtn/PostalcodeRadioBtn";
import Category from "./category/Category";
import Autocomplete from "./autocomplete/Autocomplete";
import SearchBtn from "./btn/searchbtn/SearchBtn";
import ClearBtn from "./btn/clearbtn/ClearBtn";

import { getZipCode,getCurretZipCode } from "../services/zipCodeApi";
import { fetchAllResults } from "../services/EbaySearchApi";

function ProductSearchForm() {
  //state to manage autocomplete feature
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
  const [postalCodeRadio, setPostalCodeRadio] = useState({
    currentLocation: false,
    other: false,
  });

  //handle change functions.
  const handleConditionChange = (e) => {
    const { value, name } = e.target;
    setCondition({ ...condition, [name]: e.target.checked });
  };

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.value]: e.target.checked });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const handlePostalcodeChange = (e) => {
    console.log(e.target.checked);
    const value = e.target.value;
    if (value == "currentLocation") {
      setPostalCodeRadio({ currentLocation: true, other: false });
      getCurretZipCode().then((data) => {
        console.log(data);
        setPostalCode(data)});
    } else {
      setPostalCodeRadio({ currentLocation: false, other: true });
    }
  };

  //functions for autocomplete features will be passed to the Autocomplete child component
  const handleZipCode = (e) => {
    if (postalCodeRadio.other == true) {
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
    }
  };

  const onCodeClick = (e) => {
    console.log("zipCode clicked " + e.target.innerHTML);
    setInputValues({ ...inputValues, zipCode: e.target.innerHTML });
    setPostalCode(e.target.innerHTML);
    setShowAutoComplete(false);
  };

  const productSearch = (e) => {
    e.preventDefault();
    console.log("productSearch");
    const trackingId = uuid4();
    console.log('fetching All results for trackingId '+trackingId);
    const data=fetchAllResults(
    trackingId,
    keyword,
    category,
    condition,
    shipping,
    distance,
    postalCode
  );
  data.then((data)=>{
    console.log(data);
  });
  
  };

  const clearSearch = () => {
    console.log("clearSearch");
    setPostalCode("");
    setKeyword("");
    setCategory("1");
    setCondition({
      new: false,
      used: false,
      unspecified: false,
    });
    setShipping({
      localPickup: false,
      freeShipping: false,
    });
    setDistance("10");
    setPostalCodeRadio({
      currentLocation: false,
      other: false,
    });
    
    setZipCode([]);
    setInputValues([]);
    setShowAutoComplete(false);
  };

  return (
    <div className="card-container">
      <div className="inner-container">
        <div className="heading">Product Search</div>
        <form name="prodcu">
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
          <Category value={category} onChange={handleCategoryChange} />
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
                <ShippingCheckbox
                  name="shipping"
                  value="localPickup"
                  label="Local Pickup"
                  checked={shipping.localPickup}
                  onChange={handleShippingChange}
                />
                <ShippingCheckbox
                  name="shipping"
                  value="freeShipping"
                  label="Free Shipping"
                  checked={shipping.freeShipping}
                  onChange={handleShippingChange}
                />
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
                value={distance}
                onChange={handleDistanceChange}
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
              <PosalcodeRadioBtn
                name="postalCode"
                id="currentLocation"
                value="currentLocation"
                label="'Current Location'"
                checked={postalCodeRadio.currentLocation}
                onChange={handlePostalcodeChange}
              />
              <PosalcodeRadioBtn
                name="postalCode"
                id="other"
                value="other"
                checked={postalCodeRadio.other}
                label="'Other. Please specify zip code:'"
                onChange={handlePostalcodeChange}
              />

              <div class="row mb-3 location-container">
                <label class="col-sm-3 col-form-label">
                  {" "}
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail3"
                    name="zipCode"
                    onChange={(e) => handleZipCode(e)}
                    value={postalCode}
                    autoComplete="off"
                  />
                  <Autocomplete
                    showAutoComplete={showAutoComplete}
                    zipCode={zipCode}
                    onCodeClick={onCodeClick}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="button-grp">
            <SearchBtn onClick={productSearch} />
            <ClearBtn onClick={clearSearch} />
          </div>
        </form>
      </div>
    </div>
  );
}
export default ProductSearchForm;
