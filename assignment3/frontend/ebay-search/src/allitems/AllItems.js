import React, { useState } from "react";

import Title from "./Title";
import Item from "./Item";

function AllItems({ allItems }) {
  console.log("Displaying all items ");
  const [items, setItems] = useState(allItems);
  const [itemsToDisplay, setItemsToDisplay] = useState(items.slice(0, 10)); //items to be displayed on the page
  const [itemRange, setItemsRange] = useState([0, 10]); //range of items to be displayed [start,end
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const titleBar = itemsToDisplay.length > 0 ? <Title /> : "";
  const itemList = itemsToDisplay.map((eachItem) => (
    <Item item={eachItem} key={eachItem.itemId} />
  ));
  const navButton = () => {
    const prevButton =
      items.length > 0 ? (
        <button onClick={handlePrevClick}>Previous</button>
      ) : (
        ""
      );
    const nextButton =
      items.length > 0 ? <button onClick={handleNextClick}>Next</button> : "";

    const numBtns = [];
    for (let i = 0; i < n; i++) {
      numBtns.push(
        <button
          onClick={() => {
            setCurrentIndex(i);
            setItemsToDisplay(items.slice(i * 10, i * 10 + 10));
            setItemsRange([i * 10, i * 10 + 10]);
          }}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div>
        {prevButton}
        {numBtns}
        {nextButton}
      </div>
    );
  };

  return (
    <div>
      {titleBar}
      {itemList}
      {navButton()}
    </div>
  );
}

export default AllItems;
