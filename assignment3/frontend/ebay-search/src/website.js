import React, { useEffect, useState } from "react";
import ProductSearchForm from "./productSearchForm/ProductSearchForm";
import AllItems from "./allitems/AllItems";
import ResultsWishlistBtn from "./rstwshbtn/ResultWishlistBtn";
import { v4 as uuidv4 } from "uuid";

import {
  GetWishlistItems,
  FindAllWishlistItemsById,
} from "./services/MongoDbApi";

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
    setWishListItems([]);
  }

  //todo: once all items have been fetched , use useEffect method and call the db apis tp update the wishlist state of all the items
  // and then re-render the entire page. this will ensure that the wishlist icon is displayed correctly for all the items
  //

  function handleAddtoWishList(item) {
    console.log("Adding item to wishlist " + item.itemId);
    const trackingId = uuidv4();
    //todo: add item to wish list here and update the states for just allItem
  }

  function handleRemoveFromWishList(item) {
    console.log("Removing item from wishlist " + item.itemId);
    const trackingId = uuidv4();
    //todo: make db api call remove item from wishlist , if it is allItems just call the db and update the attribute for all items
    //if it is wishlist items then call the db and update the attribute for wishlist items and if the item is present in the
  }

  function handleOnWishlistBtnClick() {
    console.log("Wishlist button clicked");
    setResultsBtn(false);
    setWishlistBtn(true);
    function responseHandler(data) {
      console.log("Received wishlist data items " + data.length);
      setWishListItems((prevState) => {
        return data;
      });
      console.log(
        "should rerender wishlist items after setting state " +
          wishListItems.length
      );
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
      return <AllItems allItems={allItems} itemType="results" />;
    }
  }

  function renderWishListItems() {
    if (wishListItems.length > 0 && wishlistBtn) {
      return (
        <AllItems
          allItems={wishListItems}
          itemType="wishList"
          removeFromParentWishlistState={setWishListItems}
        />
      );
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
