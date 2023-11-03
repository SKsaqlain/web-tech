import React, { useState, useEffect } from "react";
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
  const [productSearchState, setProductSearchState] = useState({
    isKeywordValid: true,
    isZipCodeValid: true,

    zipCode: [],
    inputValues: [],
    showAutoComplete: false,

    postalCode: "",
    keyword: "",
    category: "1",
    condition: {
      new: false,
      used: false,
      unspecified: false,
    },
    shipping: {
      localPickup: false,
      freeShipping: false,
    },
    distance: "10",
    postalCodeRadio: {
      currentLocation: true,
      other: false,
    },
    currentZip: "",
  });
  /*
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
  */

  //handle change functions.
  const handleConditionChange = (e) => {
    const { value, name } = e.target;
    setProductSearchState((prevState) => {
      return { ...prevState, condition: { ...prevState.condition, [name]: e.target.checked } };
    });
    // setCondition({ ...condition, [name]: e.target.checked });
  };

  const handleShippingChange = (e) => {
    setProductSearchState((prevState) => {
      return { ...prevState, shipping: { ...prevState.shipping, [e.target.value]: e.target.checked } };
    });
    // setShipping({ ...shipping, [e.target.value]: e.target.checked });
  };

  const handleCategoryChange = (e) => {
    setProductSearchState((prevState) => {
      return { ...prevState, category: e.target.value };
    });
    // setCategory(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setProductSearchState((prevState) => {
      return { ...prevState, distance: e.target.value };
    });
    // setDistance(e.target.value);
  };

  useEffect(() => {
    getCurrentPostalcode();
  }, []);

  const getCurrentPostalcode = () => {
    console.log("getCurrentPostalcode");
    // setPostalCodeRadio({ currentLocation: true, other: false });
    getCurretZipCode().then((data) => {
      console.log(data);
      // setPostalCode((prevState)=>{return "";});
      // setCurrentZip((prevState)=>{return data});
      setProductSearchState((prevState) => {
        return {
          ...prevState,
          postalCodeRadio: { currentLocation: true, other: false },
          postalCode: "",
          currentZip: data,
        };
      });
      // setPostalCode("");
      // setCurrentZip(data);
    });
  };

  const handlePostalcodeChange = (e) => {
    console.log(e.target.checked);
    const value = e.target.value;
    console.log(value);
    if (value == "currentLocation") {
      getCurrentPostalcode();
    } else {
      // setPostalCodeRadio({ currentLocation: false, other: true });
      setProductSearchState((prevState) => {
        return { ...prevState, postalCodeRadio: { currentLocation: false, other: true }};
      });
    }
  };

  //functions for autocomplete features will be passed to the Autocomplete child component
  const handleZipCode = (e) => {
    if (productSearchState.postalCodeRadio.other == true) {
      const { value } = e.target;
      // setPostalCode(value);
      // setCurrentZip("");
      setProductSearchState((prevState) => {
        return { ...prevState, postalCode: value, currentZip: "" }});
      const regex = /\d+$/;
      console.log(value);
      if (value !== "" && regex.test(value)) {
        console.log("valid zipcode entered");
        if (value.length >= 4) {
          // setShowAutoComplete(true);
          setProductSearchState((prevState)=>{
            return {...prevState, showAutoComplete:true}
          })
          getZipCode(value, uuid4()).then((data) => {
            console.dir(data);
            // setZipCode(data);
            // setShowAutoComplete(true);
            setProductSearchState((prevState) => {
              return { ...prevState, zipCode: data };
            });
          });
        }
      }
    }
  };

  const onCodeClick = (e) => {
    console.log("zipCode clicked " + e.target.innerHTML);
    // setInputValues({ ...inputValues, zipCode: e.target.innerHTML });
    // setPostalCode(e.target.innerHTML);
    // setShowAutoComplete(false);
    setProductSearchState((prevState) => {
      return {
        ...prevState,
        inputValues: { ...prevState.inputValues, zipCode: e.target.innerHTML },
        postalCode: e.target.innerHTML,
        showAutoComplete: false,
      };
    });
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
    if (/^\s*$/.test(productSearchState.keyword)) {
      validKeyword = false;
    }
    if (productSearchState.postalCodeRadio.other && /^\s*$/.test(productSearchState.postalCode)) {
      validZipCode = false;
    }
    // if(validKeyword && postalCodeRadio.currentLocation){
    //   getCurrentPostalcode();
    // }

    if (validKeyword && validZipCode) {
      console.log("fetching All results for trackingId " + trackingId);
      console.log(productSearchState.postalCodeRadio.other ?productSearchState. postalCode : productSearchState.currentZip);
      const data = fetchAllResults(
        trackingId,
        productSearchState.keyword,
        productSearchState.category,
        productSearchState.condition,
        productSearchState.shipping,
        productSearchState.distance,
        productSearchState.postalCodeRadio.other ? productSearchState.postalCode : productSearchState.currentZip
      );
      data.then((data) => {
        console.log("sending data to parent component " + " for trackingId " + trackingId);
        onFormSubmit(data);
      });
    }
    // setIsKeywordValid((prevState) => {
    //   return validKeyword;
    // });
    // setIsZipCodeValid((prevState) => {
    //   return validZipCode;
    // });

    setProductSearchState((prevState) => {
      return { ...prevState, isKeywordValid: validKeyword, isZipCodeValid: validZipCode };
    });
  };

  const clearSearch = () => {
    console.log("clearSearch");

    setProductSearchState((prevState) => {
      return {
        ...prevState,
        isKeywordValid: true,
        isZipCodeValid: true,

        zipCode: [],
        inputValues: [],
        showAutoComplete: false,

        postalCode: "",
        keyword: "",
        category: "1",
        condition: {
          new: false,
          used: false,
          unspecified: false,
        },
        shipping: {
          localPickup: false,
          freeShipping: false,
        },
        distance: "10",
        postalCodeRadio: {
          currentLocation: true,
          other: false,
        },
        currentZip: "",
      };
    });

    // //removing error messages
    // setIsKeywordValid(true);
    // setIsZipCodeValid(true);
    // //clearing all form states
    // setPostalCode("");
    // setKeyword("");
    // setCategory("1");
    // setCondition({
    //   new: false,
    //   used: false,
    //   unspecified: false,
    // });
    // setShipping({
    //   localPickup: false,
    //   freeShipping: false,
    // });
    // setDistance("10");
    // setPostalCodeRadio({
    //   currentLocation: true,
    //   other: false,
    // });
    // setCurrentZip("");

    // setZipCode([]);
    // setInputValues([]);
    // setShowAutoComplete(false);

    // console.log("clearing all items from page");
    onFormClear();
  };

  return (
    <div className='card-container'>
      <div className='inner-container'>
        <div className='heading'>Product Search</div>
        <form name='prodcu'>
          {/* keyword-section */}
          <div class='mb-3 row'>
            <label for='keyword' class='col-sm-3 col-form-label'>
              Keyword<span class='mandatory'>*</span>
            </label>
            <div class='col-sm-8'>
              <input
                type='text'
                name='keyword'
                id='keyword'
                style={{
                  width: "100%",
                  border: productSearchState.isKeywordValid ? "" : "2px solid red",
                }}
                class={"form-control " + (productSearchState.isKeywordValid ? "" : "is-invalid")}
                value={productSearchState.keyword}
                onChange={(e) =>setProductSearchState((prevState)=>{return {...prevState,keyword:e.target.value}})}
                // onChange={(e) => setKeyword(e.target.value)}
                placeholder='Enter Product Name(eg iPhone 8)'
                required
              />
              <div class='invalid-feedback'>Please provide a valid keyword.</div>
            </div>
          </div>

          {/* category-section */}
          <Category value={productSearchState.category} onChange={handleCategoryChange} />
          <div class='row mb-3 condition-container'>
            <label class='col-sm-3 col-form-label'>Condition</label>
            <div class='col-sm-8 offset'>
              <ConditionCheckbox name='new' label='New' checked={productSearchState.condition.new} onChange={handleConditionChange} />
              <ConditionCheckbox name='used' label='Used' checked={productSearchState.condition.used} onChange={handleConditionChange} />
              <ConditionCheckbox
                name='unspecified'
                label='Unspecified'
                checked={productSearchState.condition.unspecified}
                onChange={handleConditionChange}
              />
            </div>
          </div>
          {/* shipping-section */}
          <div class='row my-3 shipping-container'>
            <label class='col-sm-3 col-form-label'>Shipping Options</label>
            <div class='col-sm-8 offset'>
              <ShippingCheckbox
                name='shipping'
                value='localPickup'
                label='Local Pickup'
                checked={productSearchState.shipping.localPickup}
                onChange={handleShippingChange}
              />
              <ShippingCheckbox
                name='shipping'
                value='freeShipping'
                label='Free Shipping'
                checked={productSearchState.shipping.freeShipping}
                onChange={handleShippingChange}
              />
            </div>
          </div>
          {/* distance-section */}
          <div class='row my-3 distance-container'>
            <label for='distance' class='col-sm-3 col-form-label'>
              Distance (Miles)
            </label>
            <div class='col-sm-8'>
              <input
                type='number'
                name='distance'
                id='distance'
                placeholder='10'
                value={productSearchState.distance}
                class='form-control'
                style={{ width: "7rem" }}
                onChange={handleDistanceChange}
                min='10'
              />
            </div>
          </div>
          {/* zipcode-section */}
          <div class='mb-3 row zipcode-container'>
            <label for='postalCode' class='col-sm-3 col-form-label'>
              From<span class='mandatory'>*</span>
            </label>
            <div class='col-sm-8'>
              <PosalcodeRadioBtn
                name='postalCode'
                id='currentLocation'
                value='currentLocation'
                label="'Current Location'"
                checked={productSearchState.postalCodeRadio.currentLocation}
                onChange={handlePostalcodeChange}
              />
              <PosalcodeRadioBtn
                name='postalCode'
                id='other'
                value='other'
                checked={productSearchState.postalCodeRadio.other}
                label='Other. Please specify zip code:'
                onChange={handlePostalcodeChange}
              />
              <input
                type='text'
                id='inputEmail3'
                name='zipCode'
                onChange={(e) => handleZipCode(e)}
                value={productSearchState.postalCode}
                style={{
                  width: "100%",
                  border: productSearchState.isZipCodeValid ? "" : "2px solid red",
                }}
                class={"form-control " + (productSearchState.isZipCodeValid ? "" : "is-invalid")}
                autoComplete='off'
              />
              <div class='invalid-feedback'>Please provide a valid zip code.</div>
              <Autocomplete showAutoComplete={productSearchState.showAutoComplete} zipCode={productSearchState.zipCode} onCodeClick={onCodeClick} />
            </div>
          </div>
          <div className='button-grp m-3'>
            <SearchBtn onClick={productSearch} type='submit' />
            <ClearBtn onClick={clearSearch} type='button' />
          </div>
        </form>
      </div>
    </div>
  );
}
export default ProductSearchForm;
