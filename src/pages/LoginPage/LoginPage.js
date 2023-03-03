import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../components/axios/axios";
import { saveToLocalStorage } from "../../data/localstorage";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  //luu tru thong tin khai bao
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");

  //xu ly lay cac gia tri nhap input
  const inputChangeHandler = (e) => {
    if (e.target.id === "email") {
      setIsEmail(e.target.value);
    } else if (e.target.id === "password") {
      setIsPassword(e.target.value);
    }
  };
  //submit
  const submitHandler = (e) => {
    // console.log(e);
    e.preventDefault();
    const user = {
      email: isEmail,
      password: isPassword,
    };

    axiosClient
      .post(`/login`, user)
      .then((res) => {
        saveToLocalStorage("currentUserActive", res.data);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div className="wapperLogin">
      <form onSubmit={submitHandler}>
        <div className="formLogin">
          <h4>Sign In</h4>
          <div>
            <input
              id="email"
              type="text"
              value={isEmail}
              onChange={inputChangeHandler}
              placeholder="Email"
            />
            <input
              style={{ borderTop: "none" }}
              id="password"
              type="text"
              value={isPassword}
              onChange={inputChangeHandler}
              placeholder="Password"
            />
          </div>
          <button type="submit">SIGN IN</button>
          <div className="formLoginClick">
            <span>Create an acount? </span>
            <Link className="formLoginLink" to={"/register"}>
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
