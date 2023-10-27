import './SimilarProductItem.css';
const SimilarProductItem = (props) => {
    // console.log("rendering similar product item");
  if (props.item) {
    return (
      <div class="row similarProductItemDetailsRow" key={props.item.itemId+"_similarItem"}>
        <div class="col-md-4"> <img src={props.item.imageURL} alt="Image Not Found" /> </div>
        <div class="col-md-8">
          <div class="pb-3">{props.item.productName}</div>
          <div class="pb-3">Price:${props.item.price}</div>
          <div class="pb-3">Shipping Cost: ${props.item.shippingCost}</div>
          <div class="pb-3">Days Left: ${props.item.daysLeft}</div>
        </div>
      </div>
    );
  }
};
export default SimilarProductItem;
