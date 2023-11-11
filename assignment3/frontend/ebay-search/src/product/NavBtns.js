const NavBtns = (props) => {
  return (
    <ul class="nav justify-content-end nav-tabs" style={{paddingTop:'1rem'}}>
      <li class="nav-item">
        <a
          class={
            "nav-link " + (props.productState.isDetailPage ? "active" : "")
          }
          href="#"
          onClick={(e) => {
            e.preventDefault();
            props.setProductState((prevState) => {
              return {
                ...prevState,
                isDetailPage: true,
                isPhotosPage: false,
                isShippingPage: false,
                isSellerPage: false,
                isSimilarProducts: false,
              };
            });
          }}
        >
          Product
        </a>
      </li>
      <li class="nav-item">
        <a
          class={
            "nav-link " + (props.productState.isPhotosPage ? "active" : "")
          }
          href="#"
          onClick={(e) => {
            e.preventDefault();
            props.setProductState((prevState) => {
              return {
                ...prevState,
                isDetailPage: false,
                isPhotosPage: true,
                isShippingPage: false,
                isSellerPage: false,
                isSimilarProducts: false,
              };
            });
          }}
        >
          Photos
        </a>
      </li>
      <li class="nav-item">
        <a
          class={
            "nav-link " + (props.productState.isShippingPage ? "active" : "")
          }
          href="#"
          onClick={(e) => {
            e.preventDefault();
            props.setProductState((prevState) => {
              return {
                ...prevState,
                isDetailPage: false,
                isPhotosPage: false,
                isShippingPage: true,
                isSellerPage: false,
                isSimilarProducts: false,
              };
            });
          }}
        >
          Shipping
        </a>
      </li>
      <li class="nav-item">
        <a
          class={
            "nav-link " + (props.productState.isSellerPage ? "active" : "")
          }
          href="#"
          onClick={(e) => {
            e.preventDefault();
            props.setProductState((prevState) => {
              return {
                ...prevState,
                isDetailPage: false,
                isPhotosPage: false,
                isShippingPage: false,
                isSellerPage: true,
                isSimilarProducts: false,
              };
            });
          }}
        >
          Seller
        </a>
      </li>
      <li class="nav-item">
        <a
          class={
            "nav-link " + (props.productState.isSimilarProducts ? "active" : "")
          }
          href="#"
          onClick={(e) => {
            e.preventDefault();
            props.setProductState((prevState) => {
              return {
                ...prevState,
                isDetailPage: false,
                isPhotosPage: false,
                isShippingPage: false,
                isSellerPage: false,
                isSimilarProducts: true,
              };
            });
          }}
        >
          Similar Products
        </a>
      </li>
    </ul>
  );
};

export default NavBtns;
