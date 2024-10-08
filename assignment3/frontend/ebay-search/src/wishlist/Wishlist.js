import React, { useEffect, useState } from "react";

import WishListTitle from "./WishListTitle";
import WishListItem from "./WishListItem";
import NoRecords from "../norecords/NoRecords";

import "./Wishlist.css";
import { AddItemToWishlist, RemoveItemFromWishlist, GetAllWishlistItems } from "../services/MongoDbApi";
const WishList = (props) => {
  const { itemsAndWishlist, setItemsAndWishlist, onItemLinkClick } = props;

  const [wishListItems, setWishListItems] = useState({
    items: [],
  });

  useEffect(() => {
    const wishListData = GetAllWishlistItems();
    wishListData.then((wlistdata) => {
      if (wlistdata != null && wlistdata.length > 0) {
        setWishListItems((prevState) => {
          return { ...prevState, items: wlistdata };
        });
      }
    });
  }, itemsAndWishlist.allItems);

  const titleBar = () => (wishListItems.items.length > 0 ? <WishListTitle /> : "");

  const totalBar = () => {
    let total = 0;
    wishListItems.items.forEach((item) => {
      total += parseFloat(item.price);
    });
    return (
      <div key='total-shopping-component' class='item-card-container-wishlist total-container'>
        <div style={{ textAlign: "right" }}>Total Shopping:</div>
        <div>&nbsp;&nbsp;&nbsp;${total.toFixed(2)}</div>
      </div>
    );
  };

  const handleOnWishlistClick = (item) => {
    console.log("Received item to remove from wishlist " + item.itemId);
    console.dir(item);
    let searchedItems = itemsAndWishlist.allItems;
    let index = -1;
    for (let i = 0; i < searchedItems.length; i++) {
      if (searchedItems[i].itemId == item.itemId) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      searchedItems[index].isWishListed = false;
    }
    RemoveItemFromWishlist(item);
    setItemsAndWishlist((prevState) => {
      return { ...prevState, allItems: searchedItems };
    });
    let removedWishList= wishListItems.items.filter((eachItem) => eachItem.itemId != item.itemId);
    setWishListItems((prevState) => {
      return { ...prevState, items: removedWishList };
    });
  };
  const itemList = () =>
    wishListItems.items.map((eachItem,index) => (
      <WishListItem
        onIconClick={handleOnWishlistClick}
        item={eachItem}
        index={index}
        key={eachItem.itemId}
        onLinkClick={onItemLinkClick}
        selectedItemId={itemsAndWishlist.selectedItemId}
      />
    ));

    if(wishListItems.items.length==0){
      return (<NoRecords/>)
    }
  return (
    <div className='wishListItem-container' key='wishListItem-container'>
      <div className="wishlist-Items">
        {titleBar()}
        {itemList()}
        {totalBar()}
      </div>
    </div>
  );
};

export default WishList;
