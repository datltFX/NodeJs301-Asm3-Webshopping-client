import {
  faArrowLeftLong,
  faArrowRightLong,
  faCaretLeft,
  faCaretRight,
  faGift,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../components/axios/axios";
import { saveToLocalStorage, getTolocalStorage } from "../../data/localstorage";
import { stateFormatPrice } from "../../redux/selector";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const formatPrice = useSelector(stateFormatPrice);
  const [productCart, setProductCart] = useState([]);
  const [total, setTotal] = useState(0);
  //State dùng để Load dữ liệu từ API
  const [loadData, setLoadData] = useState(false);
  // user đã đăng nhập
  const user = getTolocalStorage("currentUserActive");

  //get data cart
  useEffect(() => {
    if (user) {
      axiosClient
        .get("/cart")
        .then((res) => {
          // console.log(res.data);
          setProductCart(res.data);
        })
        .catch((err) => console.log(err.response.data));
    }
    setLoadData(false);
  }, [loadData]);
  // console.log(productCart);

  // tinh total
  useEffect(() => {
    const totalCart = productCart.reduce((total, val) => {
      return total + val.priceProduct * val.quantity;
    }, 0);
    setTotal(totalCart);
  }, [productCart]);

  //update quantity
  const onUpdateCount = async (productId, quantity) => {
    if (user) {
      axiosClient
        .put("/cart/updateCart", { productId, quantity })
        .then((res) => {
          user.cart = res.data;
          saveToLocalStorage("currentUserActive", user);
          setLoadData(true);
          // alert("Bạn Đã Sửa Hàng Thành Công!");
        })
        .catch((err) => console.log(err.response.data));
    }
  };
  //update tang giam
  const minusHandler = (productId, quantity) => {
    // console.log(i);
    const updateQuantity = parseInt(quantity) - 1;
    onUpdateCount(productId, updateQuantity);
  };
  const plusHandler = (productId, quantity) => {
    const updateQuantity = parseInt(quantity) + 1;
    onUpdateCount(productId, updateQuantity);
  };

  //xoa product
  const removeHandler = (i) => {
    //  console.log(i);
    if (user) {
      axiosClient
        .delete(`/cart/deleteProductCart/${i}`)
        .then((res) => {
          user.cart = res.data;
          saveToLocalStorage("currentUserActive", user);
          setLoadData(true);
          alert("Bạn Đã Xóa Hàng Thành Công!");
        })
        .catch((err) => console.log(err.response.data));
    }
  };
  //go to check out
  const checkoutHandler = () => {
    if (!user) {
      alert("Vui Lòng Đăng Nhập!");
      return;
    } else if (productCart.length === 0) {
      alert("Vui Lòng Kiểm Tra Lại Giỏ Hàng!");
      return;
    } else {
      navigate("/checkout");
    }
  };

  //render
  return (
    <div className="containerCartPage">
      <div className="banerCartPage">
        <div className="banerCartPage_bigCart">
          <h2>CART</h2>
        </div>
        <div className="banerCartPage_smallCart">
          <span>CART</span>
        </div>
      </div>
      {/* -----------------------------Shopping Cart--------------------------------- */}
      <h4 className="cartPage_h4">SHOPPING CART</h4>
      <div className="cartPage_table1">
        <div className="cartPage_table2">
          <div>
            <table className="cartPage_table">
              <thead className="cartPage_table_thead">
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {productCart
                  ? productCart.map((e, index) => (
                      <tr key={index} className="cartPage_table_tbody_tr">
                        <td>
                          <img
                            src={e.img}
                            className="cartPage_table_tbody_img"
                            alt=""
                          />
                        </td>
                        <td>
                          <h6 className="cartPage_table_tbody_h6">
                            {e.nameProduct}
                          </h6>
                        </td>
                        <td>{formatPrice(e.priceProduct)} VND</td>
                        <td>
                          <button
                            className="cartPage_table_tbody_button"
                            disabled={e.quantity === 1}
                            onClick={() => {
                              minusHandler(e.productId, e.quantity);
                            }}
                          >
                            <FontAwesomeIcon icon={faCaretLeft} />
                          </button>
                          {e.quantity}{" "}
                          <button
                            className="cartPage_table_tbody_button"
                            onClick={() => {
                              plusHandler(e.productId, e.quantity);
                            }}
                          >
                            <FontAwesomeIcon icon={faCaretRight} />
                          </button>
                        </td>
                        <td>{formatPrice(e.priceProduct * e.quantity)} VND</td>
                        <td onClick={() => removeHandler(e.productId)}>
                          <FontAwesomeIcon
                            className="faTrashCan_Cart"
                            icon={faTrashCan}
                          />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          {/* -------------------- */}
          <div className="btnContinue_div">
            <div style={{ width: "50%" }}>
              <button className="btnContinue" onClick={() => navigate("/shop")}>
                <FontAwesomeIcon icon={faArrowLeftLong} /> Continue Shopping
              </button>
            </div>
            <div className="btnProceed_div">
              <button className="btnProceed" onClick={checkoutHandler}>
                Proceed to checkout <FontAwesomeIcon icon={faArrowRightLong} />
              </button>
            </div>
          </div>
        </div>
        {/* -----------------cartTotal-------------------------*/}
        <div className="cartTotal_container">
          <h5 className="cartTotal_h5 ">CART TOTAL</h5>
          <div className="cartTotal_div1">
            <div className="cartTotal_div2">SUBTOTAL</div>
            <div className="cartTotal_div3">{formatPrice(total)} VND</div>
          </div>
          <div className="cartTotal_div4">
            <div className="cartTotal_div5">TOTAL</div>
            <div className="cartTotal_div6">{formatPrice(total)} VND</div>
          </div>
          <input
            className="inputCoupon"
            type="text"
            placeholder="Enter your coupon"
          />
          <button className="btnCoupon">
            <FontAwesomeIcon icon={faGift} /> Apply coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
