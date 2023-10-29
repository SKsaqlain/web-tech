import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ProductSearchForm from "./productSearchForm/ProductSearchForm";
import AllItems from "./allitems/AllItems";
import ResultsWishlistBtn from "./rstwshbtn/ResultWishlistBtn";
import Product from "./product/Product";
import ProgressBar from "./progressbar/ProgressBar";

import {
  GetWishlistItems,
  GetAllWishlistItems,
  FindAllWishlistItemsById,
  AddItemToWishlist,
  RemoveItemFromWishlist,
} from "./services/MongoDbApi";

function WebSite() {
  const [itemsAndWishlist, setItemsAndWishlist] = useState({
    allItems: [],
    wishListItems: [],
    resultsBtn: true,
    wishlistBtn: false,
    itemComponent: {},
    showProductComponent: false,
  }); //state to store all items and wishlist items

  // const [itemDetail, setItemDetail] = useState({
  //   product: {},
  //   photos: [],
  //   shipping: {},
  //   seller: {},
  //   similarProducts: [],
  // });

  function UpdateItemsWishListState(item, data) {
    console.log("Updating items wishlist state");
    const wishListMap = new Map();
    data.forEach((item) => {
      wishListMap.set(item.itemId, item);
    });
    item.forEach((i) => {
      if (wishListMap.has(i.itemId)) {
        console.log("Item is present in wishlist " + i.itemId);
        i.isWishListed = true;
      } else {
        i.isWishListed = false;
      }
    });
    console.log("Updated items with wishlist state " + item.length);
    return item;
  }

  function handleOnFormSubmit(items) {
    console.log("Received All items after search, updating items with wishlist state " + items.length);
    handleOnFormClear();
    const wishListData = GetAllWishlistItems();
    wishListData.then((wlistdata) => {
      if (wlistdata != null && wlistdata.length > 0) {
        console.log("Received wishlist data items " + wlistdata.length);
        const itemsWithWList = UpdateItemsWishListState(items, wlistdata);
        console.log("Updated items with wishlist state itemsWithWList:");
        console.dir(itemsWithWList);
        setItemsAndWishlist((prevState) => {
          return {
            ...prevState,
            allItems: itemsWithWList,
            wishListItems: wlistdata,
            resultsBtn: true,
            wishlistBtn: false,
            showProductComponent: false,
          };
        });
      } else {
        setItemsAndWishlist((prevState) => {
          return {
            ...prevState,
            allItems: items,
            wishListItems: [],
            resultsBtn: true,
            wishlistBtn: false,
            showProductComponent: false,
          };
        });
      }
    });
  }

  function handleOnFormClear() {
    console.log("Clearing all items from page");
    setItemsAndWishlist({
      allItems: [],
      wishListItems: [],
      resultsBtn: true,
      wishlistBtn: false,
      itemComponent: {},
      showProductComponent: false,
    });
  }

  function handleOnResultsBtnClick() {
    console.log("Results button clicked");
    setItemsAndWishlist((prevState) => {
      return {
        ...prevState,
        resultsBtn: true,
        wishlistBtn: false,
      };
    });
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

    const wishListData = GetAllWishlistItems();
    wishListData.then((wlistdata) => {
      console.log("Received wishlist data items " + wlistdata.length);
      setItemsAndWishlist((prevState) => {
        return {
          ...prevState,
          wishListItems: wlistdata,
          resultsBtn: false,
          wishlistBtn: true,
        };
      });
    });
  }

  const handleWishListClickforResulst = (item) => {
    console.log("Handling wishlist click for results for item " + item.itemId);
    const newItems = [...itemsAndWishlist.allItems];
    const index = newItems.indexOf(item);
    newItems[index].isWishListed = !newItems[index].isWishListed;
    if (newItems[index].isWishListed) {
      console.log("Adding item to DB");
      AddItemToWishlist(newItems[index]);
    } else {
      console.log("Removing item from DB");
      RemoveItemFromWishlist(newItems[index]);
    }
    console.log("newItems[index].isWishListed is " + newItems[index].isWishListed);
    setItemsAndWishlist((prevState) => {
      return {
        ...prevState,
        wishListItems: itemsAndWishlist.wishListItems,
        allItems: newItems,
      };
    });
  };

  const handleWishListClickForWishList = (item) => {
    const updatedItems = [...itemsAndWishlist.allItems];
    console.log("Finding item in all items to update wishlist state");
    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].itemId == item.itemId) {
        console.log("Found item in all items, updating wishlist state");
        updatedItems[i].isWishListed = !updatedItems[i].isWishListed;
      }
    }
    console.log("Removing item from DB");
    RemoveItemFromWishlist(item);
    console.log("Removing item from wishlist items state");

    const updatedWithlistItems = itemsAndWishlist.wishListItems.filter((i) => i.itemId != item.itemId);
    setItemsAndWishlist((prevState) => {
      return {
        ...prevState,
        wishListItems: updatedWithlistItems,
        allItems: updatedItems,
      };
    });
  };

  const handleOnWishlistClick = (item) => {
    console.log("Wishlist button clicked for item " + item.isWishListed);
    console.log("Wishlist button clicked for item " + item.itemId + "itemNumber " + item.number);
    if (itemsAndWishlist.resultsBtn) {
      handleWishListClickforResulst(item);
    } else if (itemsAndWishlist.wishlistBtn) {
      handleWishListClickForWishList(item);
    }
  };

  function renderBtns() {
    return (
      <div class='d-flex justify-content-center mt-3'>
        <ResultsWishlistBtn
          btnName='Results'
          isActive={itemsAndWishlist.resultsBtn}
          onClick={handleOnResultsBtnClick}
        />
        <ResultsWishlistBtn
          btnName='WishList'
          isActive={itemsAndWishlist.wishlistBtn}
          onClick={handleOnWishlistBtnClick}
        />
      </div>
    );
  }

  function renderAllItems() {
    if (
      itemsAndWishlist.showProductComponent == false &&
      itemsAndWishlist.allItems.length > 0 &&
      itemsAndWishlist.resultsBtn
    ) {
      return (
        <AllItems
          allItemsAndWList={itemsAndWishlist}
          itemType='results'
          handleOnWishlistClick={handleOnWishlistClick}
          onItemLinkClick={handleOnItemLinkClick}
        />
      );
    }
  }

  function renderWishListItems() {
    if (
      itemsAndWishlist.showProductComponent == false &&
      itemsAndWishlist.wishListItems.length > 0 &&
      itemsAndWishlist.wishlistBtn
    ) {
      return (
        <AllItems
          allItemsAndWList={itemsAndWishlist}
          itemType='wishList'
          handleOnWishlistClick={handleOnWishlistClick}
          onItemLinkClick={handleOnItemLinkClick}
        />
      );
    }
  }

  function handleOnItemLinkClick(item) {
    console.log("Item link clicked for item " + item.itemId);
    // console.dir(item);
    setItemsAndWishlist((prevState) => {
      return {
        ...prevState,
        itemComponent: item,
        showProductComponent: true,
      };
    });
  }

  function handleGoBackToListClick() {
    console.log("Go back to list clicked");
    setItemsAndWishlist((prevState) => {
      return {
        ...prevState,
        itemComponent: {},
        showProductComponent: false,
      };
    });
  }

  function renderItemPage() {
    if (itemsAndWishlist.showProductComponent) {
      console.log("About to Rendering item page from website componenet");
      console.dir(itemsAndWishlist.itemComponent);
      return <Product item={itemsAndWishlist.itemComponent} onGoBackToBtnClick={handleGoBackToListClick} />;
    }
  }


  return (
    <div>
      <ProductSearchForm onFormSubmit={handleOnFormSubmit} onFormClear={handleOnFormClear} />
      {renderBtns()}
      <ProgressBar />
      {renderAllItems()}
      {renderWishListItems()}
      {renderItemPage()}
    </div>
  );
}

export default WebSite;
