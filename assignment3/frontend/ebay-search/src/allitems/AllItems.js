import React, { useState } from "react";

import Title from "./Title";

function AllItems({allItems}) {
    console.log("Displaying all items ")
    console.log(allItems)
    
    const [items, setItems] = useState(allItems) //state to store all items
    // if(allItems && allItems.length>0){
    //     console.log("AllItems "+items.length);
    //     setItems(allItems);
    // }
    
    const titleBar= items.length>0?<Title/>:"";

  return (
    <div>
      {titleBar}
    </div>
  );
}

export default AllItems;