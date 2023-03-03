import { useDispatch } from "react-redux";
import ShowProductShop from "../../components/ShowProductShop/ShowProductShop";
import { ACTION_SHOWSHOP } from "../../redux/action";
import "./ShopPage.css";

const ShopPage = () => {
  const dispatch = useDispatch();

  const clickCategoryHandler = (e) => {
    // console.log(e.target);
    dispatch(ACTION_SHOWSHOP(e.target.innerHTML));
  };

  return (
    <div className="containerShop">
      <div className="banerShopPage">
        <div className="banerShopPage_bigShop">
          <h2>SHOP</h2>
        </div>
        <div className="banerShopPage_smallShop">
          <span>SHOP</span>
        </div>
      </div>
      <div className="row">
        <div className="categoryShop">
          <h4>categories</h4>
          <h5>Apple</h5>
          <ul>
            <li onClick={clickCategoryHandler}>
              <a href="#">All</a>
            </li>
          </ul>
          <h5>iphone & mac</h5>
          <ul>
            <li onClick={clickCategoryHandler}>
              <a href="#">iphone</a>
            </li>
            <li onClick={clickCategoryHandler}>
              <a href="#">ipad</a>
            </li>
            <li onClick={clickCategoryHandler}>
              <a href="#">macbook</a>
            </li>
          </ul>
          <h5>wireless</h5>
          <ul>
            <li onClick={clickCategoryHandler}>
              <a href="#">airpod</a>
            </li>
            <li onClick={clickCategoryHandler}>
              <a href="#">watch</a>
            </li>
          </ul>
          <h5>other</h5>
          <ul>
            <li onClick={clickCategoryHandler}>
              <a href="#">mouse</a>
            </li>
            <li onClick={clickCategoryHandler}>
              <a href="#">keyboard</a>
            </li>
            <li onClick={clickCategoryHandler}>
              <a href="#">other</a>
            </li>
          </ul>
        </div>
        <div className="productShop">
          <ShowProductShop />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
