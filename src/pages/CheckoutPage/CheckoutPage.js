import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stateFormatPrice } from "../../redux/selector";
import { getTolocalStorage } from "../../data/localstorage";
import "./CheckoutPage.css";
import axiosClient from "../../components/axios/axios";

const CheckoutPage = () => {
  // user đã đăng nhập
  const user = getTolocalStorage("currentUserActive");

  const formatPrice = useSelector(stateFormatPrice);
  const [dataCheckout, setDataCheckout] = useState([]);
  // console.log(dataCheckout);
  const [total, setTotal] = useState(0);
  //get data cart
  useEffect(() => {
    setDataCheckout(user.cart.items);
  }, []);

  //total
  useEffect(() => {
    const totalCheckout = dataCheckout.reduce((total, pro) => {
      return total + pro.priceProduct * pro.quantity;
    }, 0);
    setTotal(totalCheckout);
  }, [dataCheckout]);

  //
  const [success, setSuccess] = useState(false);
  const chechoutSubmitHandler = (e) => {
    e.preventDefault();
    const dataOrder = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phoneNumber.value,
      address: e.target.address.value,
      total: total,
    };
    axiosClient
      .post("/order", dataOrder)
      .then((res) => {
        // console.log(res.data);
        alert("hoan tat don hang");
        setSuccess(true);
      })
      .catch((err) => alert(err.response.data));
  };
  //render
  return (
    <div>
      <div className="bannerCheckout">
        <div className="bannerCheckout_bigCheckout">
          <h2>CHECKOUT</h2>
        </div>
        <div className="bannerCheckout_smallCheckout">
          <span>HOME /</span>
          <span> CART /</span>
          <span> CHECKOUT</span>
        </div>
      </div>
      {/* ---------------------------------------------Billing details----------------------------- */}
      {!success && (
        <div className="checkout_bill">
          <div className="checkout_bill1">
            <form onSubmit={chechoutSubmitHandler}>
              <h2 className="checkout_bill1_h2">BILLING DETAILS</h2>
              <label className="checkout_bill_label">FULL NAME:</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="checkout_bill_input"
                // placeholder="Enter Your Full Name Here!"
                defaultValue={user?.fullName}
                required
              />
              <label className="checkout_bill_label">EMAIL:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="checkout_bill_input"
                // placeholder="Enter Your Email Here!"
                defaultValue={user?.email}
                required
              />
              <label className="checkout_bill_label">PHONE NUMBER:</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="checkout_bill_input"
                defaultValue={user?.phoneNumber}
                required
                // placeholder="Enter Your Phone Number Here!"
              />
              <label className="checkout_bill_label">ADDRESS:</label>
              <input
                type="text"
                name="address"
                id="address"
                className="checkout_bill_input"
                placeholder="Enter Your Address Here!"
              />
              <button className="checkout_bill_button">Place Order</button>
            </form>
          </div>
          {/* --------------------------------your order---------------------------- */}
          <div className="checkout_order">
            <h5 className="checkout_order_h5">YOUR ORDER</h5>
            {dataCheckout.map((out) => (
              <div className="checkout_order_div1" key={out._id}>
                <div className="checkout_order_div2">{out.nameProduct}</div>
                <div className="checkout_order_div3">{`${formatPrice(
                  out.priceProduct
                )} VND x ${out.quantity} `}</div>
              </div>
            ))}
            <div className="checkout_order_total">
              <div className="checkout_order_total1">TOTAL</div>
              <div className="checkout_order_total2">
                {formatPrice(total)} VND
              </div>
            </div>
          </div>
        </div>
      )}
      {success && (
        <section className="py-5">
          <div className="p-5">
            <h1>You Have Successfully Ordered!</h1>
            <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default CheckoutPage;
