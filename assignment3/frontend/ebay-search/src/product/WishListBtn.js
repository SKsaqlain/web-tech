import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const WishListBtn = (props) => {
  const renderWishlistIcon = () => {
    if (props.item.isWishListed) {
      return <RemoveShoppingCartIcon style={{ color: "burlywood" }} />;
    } else {
      return <AddShoppingCartIcon style={{ color: "black" }} />;
    }
  };


  const onIconClick=()=>{
    console.log("Handling wishlist click for results for item " + props.item.itemId);
    props.onWishListBtnClick(props.item);
  }

  return (
    <button
      type='button'
      className='btn btn-secondary d-flex align-item-right'
      style={{ backgroundColor: "white" }}
      onClick={() => onIconClick()}>
      {renderWishlistIcon()}
    </button>
  );
};

export default WishListBtn;
