import React, { useState,useEffect } from "react";
import { v4 as uuid4 } from "uuid";

import "./ProductSearchForm.css";
import ConditionCheckbox from "./conditioncheckbox/ConditionCheckBox";
import ShippingCheckbox from "./shippingcheckbox/ShippingCheckBox";
import PosalcodeRadioBtn from "./postalcoderadiobtn/PostalcodeRadioBtn";
import Category from "./category/Category";
import Autocomplete from "./autocomplete/Autocomplete";
import SearchBtn from "./btn/searchbtn/SearchBtn";
import ClearBtn from "./btn/clearbtn/ClearBtn";

import { getZipCode, getCurretZipCode } from "../services/zipCodeApi";
import { fetchAllResults } from "../services/EbaySearchApi";
import { on } from "events";
import { valid } from "semver";

function ProductSearchForm({ onFormSubmit, onFormClear }) {
  //states to check for validation
  const [isKeywordValid, setIsKeywordValid] = useState(true);
  const [isZipCodeValid, setIsZipCodeValid] = useState(true);
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
    currentLocation: true,
    other: false,
  });
  const [currentZip, setCurrentZip] = useState("");

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

  useEffect(() => {
    getCurrentPostalcode();
  },[currentZip]);

  const getCurrentPostalcode = () => {
    console.log("getCurrentPostalcode");
    setPostalCodeRadio({ currentLocation: true, other: false });
      getCurretZipCode().then((data) => {
        console.log(data);
        // setPostalCode((prevState)=>{return "";});
        // setCurrentZip((prevState)=>{return data});
        setPostalCode("");
        setCurrentZip(data);
      });
    }

  const handlePostalcodeChange = (e) => {
    console.log(e.target.checked);
    const value = e.target.value;
    if (value == "currentLocation") {
      getCurrentPostalcode();
    } else {
      setPostalCodeRadio({ currentLocation: false, other: true });
    }
  };

  //functions for autocomplete features will be passed to the Autocomplete child component
  const handleZipCode = (e) => {
    if (postalCodeRadio.other == true) {
      const { value } = e.target;
      setPostalCode(value);
      setCurrentZip("");
      const regex = /\d+$/;
      console.log(value);
      if (value !== "" && regex.test(value)) {
        console.log("valid zipcode entered");
        if (value.length >= 4) {
          setShowAutoComplete(true);
          getZipCode(value, uuid4()).then((data) => {
            console.log(data);
            setZipCode(data);
            setShowAutoComplete(true);
          });
        }
      }
    }
  };

  const onCodeClick = (e) => {
    console.log("zipCode clicked " + e.target.innerHTML);
    setInputValues({ ...inputValues, zipCode: e.target.innerHTML });
    setPostalCode(e.target.innerHTML);
    setShowAutoComplete(false);
  };

  //todo : remove the below code as I am adding the wishlist state in the website componenets only
  // const addWishListAttr = (data) => {
  //   if (data && data.length > 0) {
  //     const newItems = [...data];
  //     newItems.forEach((item) => {
  //       item.isWishListed = false;
  //     });
  //     return newItems;
  //   }
  //   return data;
  // };

  const productSearch = (e) => {
    e.preventDefault();
    console.log("productSearch");
    const trackingId = uuid4();
    console.log("Validating form fields");
  
    let validKeyword = true;
    let validZipCode = true;
    if (/^\s*$/.test(keyword)) {
      validKeyword = false;
    }
    if(postalCodeRadio.other && /^\s*$/.test(postalCode)){
      validZipCode = false;
    }
    // if(validKeyword && postalCodeRadio.currentLocation){
    //   getCurrentPostalcode();
    // }

    if (validKeyword && validZipCode) {
      console.log("fetching All results for trackingId " + trackingId);
      console.log(postalCodeRadio.other ? postalCode : currentZip);
    const data = fetchAllResults(
      trackingId,
      keyword,
      category,
      condition,
      shipping,
      distance,
      postalCodeRadio.other ? postalCode : currentZip
    );
      data.then((data) => {
        console.log(
          "sending data to parent component " + " for trackingId " + trackingId
        );
        onFormSubmit(data);
      });
    }
    setIsKeywordValid((prevState) => {
      return validKeyword;
    });
    setIsZipCodeValid((prevState) => {
      return validZipCode;
    });
  };

  const clearSearch = () => {
    console.log("clearSearch");

    //removing error messages
    setIsKeywordValid(true);
    setIsZipCodeValid(true);
    //clearing all form states
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
      currentLocation: true,
      other: false,
    });
    setCurrentZip("");

    setZipCode([]);
    setInputValues([]);
    setShowAutoComplete(false);

    console.log("clearing all items from page");
    onFormClear();
  };

  return (
    <div className="card-container">
      <div className="inner-container">
        <div className="heading">Product Search</div>
        <form name="prodcu">
          {/* keyword-section */}
          <div class="mb-3 row">
            <label for="keyword" class="col-sm-3 col-form-label">
              Keyword<span class="mandatory">*</span>
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                name="keyword"
                id="keyword"
                style={{
                  width: "100%",
                  border: isKeywordValid ? "" : "2px solid red",
                }}
                class={"form-control " + (isKeywordValid ? "" : "is-invalid")}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter Product Name(eg iPhone 8)"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid keyword.
              </div>
            </div>
          </div>

          {/* category-section */}
          <Category value={category} onChange={handleCategoryChange} />
          <div class="row mb-3 condition-container">
            <label class="col-sm-3 col-form-label">Condition</label>
            <div class="col-sm-8 offset">
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
          {/* shipping-section */}
          <div class="row my-3 shipping-container">
            <label class="col-sm-3 col-form-label">Shipping Options</label>
            <div class="col-sm-8 offset">
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
          {/* distance-section */}
          <div class="row my-3 distance-container">
            <label for="distance" class="col-sm-3 col-form-label">
              Distance (Miles)
            </label>
            <div class="col-sm-8">
              <input
                type="number"
                name="distance"
                id="distance"
                placeholder="10"
                value={distance}
                class="form-control"
                style={{ width: "7rem" }}
                onChange={handleDistanceChange}
                min="10"
              />
            </div>
          </div>
          {/* zipcode-section */}
          <div class="mb-3 row zipcode-container">
            <label for="postalCode" class="col-sm-3 col-form-label">
              From<span class="mandatory">*</span>
            </label>
            <div class="col-sm-8">
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
                label="Other. Please specify zip code:"
                onChange={handlePostalcodeChange}
              />
              <input
                type="text"
                id="inputEmail3"
                name="zipCode"
                onChange={(e) => handleZipCode(e)}
                value={postalCode}
                style={{
                  width: "100%",
                  border: isZipCodeValid ? "" : "2px solid red",
                }}
                class={"form-control " + (isZipCodeValid ? "" : "is-invalid")}
                autoComplete="off"
              />
              <div class="invalid-feedback">
                Please provide a valid zip code.
              </div>
              <Autocomplete
                showAutoComplete={showAutoComplete}
                zipCode={zipCode}
                onCodeClick={onCodeClick}
              />
            </div>
          </div>
          <div className="button-grp m-3">
            <SearchBtn onClick={productSearch} type="submit" />
            <ClearBtn onClick={clearSearch} type="button" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default ProductSearchForm;
