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
    function responseHandler(data) {
      console.log("Received wishlist data items " + data.length);
      setWishListItems(data);
      console.log("should rerender wishlist items after setting state " + wishListItems.length  );
      return;
    }
    GetWishlistItems(responseHandler);
  }

  function renderBtns() {
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
  }

  function renderAllItems() {
    if (allItems.length > 0 && resultsBtn) {
      return <AllItems allItems={allItems} itemType="results"/>;
    }
  }

  function renderWishListItems() {
    if (wishListItems.length > 0 && wishlistBtn) {
      return <AllItems allItems={wishListItems} itemType="wishList" removeFromParentWishlistState={setWishListItems}/>;
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
