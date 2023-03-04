import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../components/axios/axios";
import PreviewImages from "../../components/PreviewImages/PreviewImages";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import { getTolocalStorage, saveToLocalStorage } from "../../data/localstorage";
import { stateFormatPrice } from "../../redux/selector";
import "./DetailPage.css";

const DetailPage = () => {
  const navigate = useNavigate();

  //lay formatPrice
  const formatPrice = useSelector(stateFormatPrice);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const para = useParams().id;
  // user đã đăng nhập
  const user = getTolocalStorage("currentUserActive");

  //lay data detail
  useEffect(() => {
    axiosClient
      .get(`/products/${para}`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }, [para]);

  //tang giam
  const minusHandler = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      } else {
        return prev - 1;
      }
    });
  };
  const plusHandler = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  //addCart
  const addCartHandler = () => {
    if (user) {
      const cart = {
        productId: para,
        quantity: quantity,
      };
      console.log(cart);
      axiosClient
        .post("/cart/addcart", cart)
        .then((res) => {
          user.cart = res.data;
          saveToLocalStorage("currentUserActive", user);
          alert("them vao gio hang thanh cong!");
          navigate("/cart");
        })
        .catch((err) => console.log(err.response.data));
    } else {
      alert("'Bạn Cần Đăng Nhập Để Thêm Sản Phẩm Vào Giỏ Hàng!");
    }
  };

  return (
    <div>
      {product && product.length !== 0 && (
        <div className="containerDetail row">
          <div className="itemDetail">
            <div className="col-md-6">
              <PreviewImages product={product} />
            </div>
            <div className="col-md-6">
              <div className="productDetail">
                <p className="productDetail_p1">{product.name}</p>
                <p className="productDetail_p2">
                  {formatPrice(product.price)} VND
                </p>
                <p className="productDetail_p3">{product.short_desc}</p>
                <p>
                  <span className="productDetail_p4_span1">
                    CATEGORY:{"  "}
                    <span className="productDetail_p4_span2">
                      {product.category}
                    </span>
                  </span>
                </p>

                <p>
                  <span className="productDetail_p4_span1">
                    STATUS:{"  "}
                    <span className="productDetail_p5_span2">
                      {product.stock} pieces available
                    </span>
                  </span>
                </p>

                <div className="containerQuantityDetail">
                  <div className="quantityDetail">
                    <button className="quantityDetail_button">QUANTITY</button>
                    <div
                      className="quantityDetail_span_plus_minus"
                      onClick={minusHandler}
                    >
                      <FontAwesomeIcon icon={faCaretLeft} />
                    </div>
                    <span className="quantityDetail_span">{quantity}</span>
                    <div
                      className="quantityDetail_span_plus_minus "
                      onClick={plusHandler}
                    >
                      <FontAwesomeIcon icon={faCaretRight} />
                    </div>
                  </div>

                  <button className="addButtonDetail" onClick={addCartHandler}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Description  */}
          <div className="descriptionDetail">
            <button className="descriptionDetail_button">DESCRIPTION</button>
            <p className="descriptionDetail_p1">PRODUCCT DESCRIPTION</p>
            <p className="descriptionDetail_p2">{product.long_desc} </p>
          </div>
          <RelatedProduct products={product} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
