import './SimilarProductItem.css';
const SimilarProductItem = (props) => {
    // console.log("rendering similar product item");
  if (props.item) {
    return (
      <div class="card row similarProductItemDetailsRow" key={props.item.itemId+"_similarItem"}>
        <div class="col-md-4"> <img src={props.item.imageURL} alt="Image Not Found" /> </div>
        <div class="col-md-8">
          <div class="pb-3 productName"><a href={props.item.viewItemURL} target='_blank' className="similarProductItemUrl">{props.item.productName}</a></div>
          <div class="pb-3 price">Price:${props.item.price}</div>
          <div class="pb-3 shippingCost">Shipping Cost: ${props.item.shippingCost}</div>
          <div class="pb-3 daysLeft">Days Left: {props.item.daysLeft}</div>
        </div>
      </div>
    );
  }
};
export default SimilarProductItem;
