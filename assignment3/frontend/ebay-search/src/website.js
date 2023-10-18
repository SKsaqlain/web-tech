import React, { useState } from "react";
import ProductSearchForm from "./productSearchForm/ProductSearchForm";
import AllItems from "./allitems/AllItems";

function WebSite() {
    const [allItems, setAllItems] = useState([]); //state to store all items

    function handleOnFormSubmit(items){
        console.log("Adding all items to page "+items.length);
        setAllItems(items);
        console.log("All items added to page "+allItems.length );
    }

  return (
    <div>
      <ProductSearchForm onFormSubmit={handleOnFormSubmit}/>
      <AllItems allItems={allItems}/>
    </div>
  );
}

export default WebSite;