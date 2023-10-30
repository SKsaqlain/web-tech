import React, { useEffect, useState } from "react";

import Title from "./Title";
import Item from "./Item";

import "./AllItems.css";
import { AddItemToWishlist, RemoveItemFromWishlist } from "../services/MongoDbApi";
import { right } from "@popperjs/core";

function AllItems(props) {
  let allItems = [];
  let itemType = props.itemType;
  if (itemType == "wishList") {
    allItems = props.allItemsAndWList.wishListItems;
  }
  if (itemType == "results") {
    allItems = props.allItemsAndWList.allItems;
  }

  console.log("Displaying all items for itemType " + itemType);
  const [items, setItems] = useState(allItems);
  const [itemsToDisplay, setItemsToDisplay] = useState(allItems.slice(0, 10)); //items to be displayed on the page
  const [itemRange, setItemsRange] = useState([0, 10]); //range of items to be displayed [start,end
  const [currentIndex, setCurrentIndex] = useState(0);
  const [removeWishListItemAndRender, setRemoveWishListItemAndRender] = useState(false);

  const n = parseInt(items.length / 10);
  console.log("n is " + n);
  const handlePrevClick = () => {
    console.log(
      "Previous button clicked " +
        currentIndex +
        " " +
        items.length +
        " " +
        itemsToDisplay.length +
        " " +
        itemRange[0] +
        " " +
        itemRange[1]
    );
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setItemsToDisplay(items.slice(itemRange[0] - 10, itemRange[1] - 10));
      setItemsRange([itemRange[0] - 10, itemRange[1] - 10]);
    }
  };
  const handleNextClick = () => {
    console.log(
      "Next button clicked " +
        currentIndex +
        " " +
        items.length +
        " " +
        itemsToDisplay.length +
        " " +
        itemRange[0] +
        " " +
        itemRange[1]
    );
    if (currentIndex < n - 1) {
      setCurrentIndex(currentIndex + 1);
      setItemsToDisplay(items.slice(itemRange[0] + 10, itemRange[1] + 10));
      setItemsRange([itemRange[0] + 10, itemRange[1] + 10]);
    }
  };

  const titleBar = itemsToDisplay.length > 0 ? <Title itemType={itemType} /> : "";
  const itemList = itemsToDisplay.map((eachItem) => (
    <Item
      item={eachItem}
      onIconClick={props.handleOnWishlistClick}
      key={eachItem.itemId}
      itemType={itemType}
      onLinkClick={props.onItemLinkClick}
    />
  ));

  const pagination=()=>{
    const paginationItems = [];
  
  for (let i = 0; i < n; i++) {
    paginationItems.push(
      <li key={i} className='page-item'>
        <a
          className='page-link nbr-nav-btn'
          href='#'
          onClick={(e) => {
            e.preventDefault();
            setCurrentIndex(i);
            setItemsToDisplay(items.slice(i * 10, i * 10 + 10));
            setItemsRange([i * 10, i * 10 + 10]);
          }}
        >
          {i + 1}
        </a>
      </li>
    );
  }
  return paginationItems;
}
  const navButton = () => {
    if (itemType == "wishList") {
      return "";
    }
    if (items.length == 0) {
      return "";
    }
    return (
      <nav aria-label='...' className="navBtn-contianer">
        <ul class='pagination'>
          <li class='page-item'>
            <a
              className={'page-link previous-nav-btn'+(currentIndex == 0 || items.length == 0 ? " disabled" : "")}
              href='#'
              tabindex='-1'
              onClick={(e) => {
                e.preventDefault();
                handlePrevClick();
              }}>
              &laquo;&nbsp;Previous
            </a>
          </li>
          {pagination()}
          <li class='page-item'>
            <a
              className={'page-link next-nav-btn'+(currentIndex == n - 1 || items.length == 0 ? " disabled" : "")}
              href='#'
              onClick={(e) => {
                e.preventDefault();
                handleNextClick();
              }}>
              Next&nbsp;&raquo;
            </a>
          </li>
        </ul>
      </nav>
    );
    // const prevButton = items.length > 0 ? <button onClick={handlePrevClick}>Previous</button> : "";
    // const nextButton = items.length > 0 ? <button onClick={handleNextClick}>Next</button> : "";

    // const numBtns = [];
    // for (let i = 0; i < n; i++) {
    //   numBtns.push(
    //     <button
    //       onClick={() => {
    //         setCurrentIndex(i);
    //         setItemsToDisplay(items.slice(i * 10, i * 10 + 10));
    //         setItemsRange([i * 10, i * 10 + 10]);
    //       }}>
    //       {i + 1}
    //     </button>
    //   );
    // }

    // return (
    //   <div key='navBtn'>
    //     {prevButton}
    //     {numBtns}
    //     {nextButton}
    //   </div>
    // );
  };

  const totalBar = () => {
    if (itemType == "wishList") {
      let total = 0;
      items.forEach((item) => {
        total += parseFloat(item.price);
      });
      return (
        <div key='total-shopping-component' class='total-container'>
          <div style={{ textAlign: right }}>Total Shopping:</div>
          <div>&nbsp;&nbsp;&nbsp;${total.toFixed(2)}</div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className='allItems-container' key='results-container'>
        {titleBar}
        {itemList}
        {totalBar()}
        </div>
    
        {navButton()}
      
    </div>
  );
}

export default AllItems;
