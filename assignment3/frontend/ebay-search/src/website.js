import React, { useState } from "react";
import ProductSearchForm from "./productSearchForm/ProductSearchForm";
import AllItems from "./allitems/AllItems";

function WebSite() {
    const [allItems, setAllItems] = useState([]); //state to store all items

    function handleOnFormSubmit(items){
        console.log("Adding all items to page "+items.length);
        setAllItems(items);
    }

    function handleOnFormClear(){
      console.log("Clearing all items from page");
      setAllItems([]);
    }

    const viewAllItems= allItems.length>0?<AllItems allItems={allItems}/>:<div></div>;

  return (
    <div>
      <ProductSearchForm onFormSubmit={handleOnFormSubmit} onFormClear={handleOnFormClear}/>
      {viewAllItems}
    </div>
  );
}

export default WebSite;