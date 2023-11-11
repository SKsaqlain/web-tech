import "./SimilarProductItem.css";
const SimilarProductItem = (props) => {
  // console.log("rendering similar product item");
  if (props.item) {
    return (
      <div class='card row similarProductItemDetailsRow' key={props.item.itemId + "_similarItem"}>
        <div class='col-md-4'>
          {" "}
          <img src={props.item.imageURL} alt='Image Not Found' style={{ width: "8rem", height: "8rem" }} />{" "}
        </div>
        <div class='col-md-8 align-self-start' style={{ fontSize: "small" }}>
          <div class='pb-1 productName'>
            <a href={props.item.viewItemURL} target='_blank' className='similarProductItemUrl'>
              {props.item.productName}
            </a>
          </div>
          <div class='pb-1 price'>Price:${props.item.price}</div>
          <div class='pb-1 shippingCost'>Shipping Cost: ${props.item.shippingCost}</div>
          <div class='pb-1 daysLeft'>Days Left: {props.item.daysLeft}</div>
        </div>
      </div>
    );
  }
};
export default SimilarProductItem;
