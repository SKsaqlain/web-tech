import "./WishListTitle.css";

function WishListTitle({ itemType }) {
  console.log("Rendering Wishlist Title");
  return (
    <div className="item-card-container-wishlist title-container-wishlist">
      <div>#</div>
      <div>Images</div>
      <div>Title</div>
      <div>Price</div>
      <div>Shipping</div>
      <div>Wishlist</div>
    </div>
  );
}

export default WishListTitle;
