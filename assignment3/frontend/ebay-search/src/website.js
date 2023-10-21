import React, { useState } from "react";
import ProductSearchForm from "./productSearchForm/ProductSearchForm";
import AllItems from "./allitems/AllItems";
import ResultsWishlistBtn from "./rstwshbtn/ResultWishlistBtn";
import { v4 as uuidv4 } from "uuid";

import {GetWishlistItems} from "./services/MongoDbApi";


function WebSite() {
  const [allItems, setAllItems] = useState([]); //state to store all items
  const [resultsBtn, setResultsBtn] = useState(true); //state to store results button
  const [wishlistBtn, setWishlistBtn] = useState(false); //state to store wishlist button
  const [wishListItems, setWishListItems] = useState([]); //state to store wishlist items

  function handleOnFormSubmit(items) {
    console.log("Adding all items to page " + items.length);
    setAllItems(items);
  }

  function handleOnFormClear() {
    console.log("Clearing all items from page");
    setAllItems([]);
  }

  function handleOnResultsBtnClick() {
    console.log("Results button clicked");
    setResultsBtn(true);
    setWishlistBtn(false);
  }


  function handleOnWishlistBtnClick() {
    console.log("Wishlist button clicked");
    setResultsBtn(false);
    setWishlistBtn(true);
    function setWishListItemsHandler(data) {
      console.log("Received wishlist items " + data.length);
      setWishListItems(data);
    }
    GetWishlistItems(setWishListItemsHandler);
  }

  function renderBtns() {
    if (allItems.length > 0) {
      return (
        <div class="d-flex justify-content-center mt-3">
            <ResultsWishlistBtn
              btnName="Results"
              isActive={resultsBtn}
              onClick={handleOnResultsBtnClick}
            />
            <ResultsWishlistBtn
              btnName="WishList"
              isActive={wishlistBtn}
              onClick={handleOnWishlistBtnClick}
            />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function renderAllItems() {
    if (allItems.length > 0 && resultsBtn) {
      return <AllItems allItems={allItems} />;
    }
  }

  function renderWishListItems() {
    if (wishListItems.length > 0 && wishlistBtn) {
      return <AllItems allItems={wishListItems} />;
    }
  }


  return (
    <div>
      <ProductSearchForm
        onFormSubmit={handleOnFormSubmit}
        onFormClear={handleOnFormClear}
      />
      {renderBtns()}
      {renderAllItems()}
      {renderWishListItems()}
    </div>
  );
}

export default WebSite;
