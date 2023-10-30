import './DetailsBtn.css'

const DetailsBtn = (props) => {
  return (
    <div className='details-btn-container'>
      <button
        className='btn btn-light details-btn'
        onClick={(e) => {
          e.preventDefault();
          if (props.itemsAndWishlist.itemComponent.itemId) {
            props.setItemsAndWishlist((prevState) => {
              return {
                ...prevState,
                showProductComponent: true,
              };
            });
          }
        }}
      >
        Details {">"}
      </button>
    </div>
  );
};

export default DetailsBtn;
