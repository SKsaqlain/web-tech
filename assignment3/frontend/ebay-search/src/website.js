import React, { useState } from "react";
import ProductSearchForm from "./productSearchForm/ProductSearchForm";
import AllItems from "./allitems/AllItems";

function WebSite() {
    const [allItems, setAllItems] = useState([]); //state to store all items

    function handleOnFormSubmit(items){
        console.log("Adding all items to page "+items.length);
        setAllItems(items);
    }

    const viewAllItems= allItems.length>0?<AllItems allItems={allItems}/>:<div></div>;

  return (
    <div>
      <ProductSearchForm onFormSubmit={handleOnFormSubmit}/>
      {viewAllItems}
    </div>
  );
}

export default WebSite;