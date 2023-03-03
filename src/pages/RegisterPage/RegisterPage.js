import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../components/axios/axios";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  //luu tru thong tin khai bao
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [isPhone, setIsPhone] = useState("");

  //xu ly lay cac gia tri nhap input
  const inputChangeHandler = (e) => {
    if (e.target.id === "name") {
      setIsName(e.target.value);
    } else if (e.target.id === "email") {
      setIsEmail(e.target.value);
    } else if (e.target.id === "password") {
      setIsPassword(e.target.value);
    } else if (e.target.id === "phone") {
      setIsPhone(e.target.value);
    }
  };

  //submit
  const submitHandler = (e) => {
    //  console.log(e);
    e.preventDefault();
    const newUser = {
      name: isName,
      email: isEmail,
      password: isPassword,
      phone: isPhone,
    };
    console.log("dataUser:", newUser);
    axiosClient
      .post(`/register`, newUser)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data);
      });
    // setIsName("");
    // setIsEmail("");
    // setIsPassword("");
    // setIsPhone("");
  };

  return (
    <div className="wapperRegister">
      <form onSubmit={submitHandler}>
        <div className="formRegister">
          <h4>Sign Up</h4>
          <div>
            <input
              id="name"
              type="text"
              value={isName}
              onChange={inputChangeHandler}
              placeholder="Full Name"
            />
            <input
              style={{ borderTop: "none" }}
              id="email"
              type="text"
              value={isEmail}
              onChange={inputChangeHandler}
              placeholder="Email"
            />
            <input
              style={{ borderTop: "none" }}
              id="password"
              type="password"
              value={isPassword}
              onChange={inputChangeHandler}
              placeholder="Password"
            />
            <input
              style={{ borderTop: "none" }}
              id="phone"
              type="text"
              value={isPhone}
              onChange={inputChangeHandler}
              placeholder="Phone"
            />
          </div>
          <button type="submit">SIGN UP</button>
          <div className="formRegisterClick">
            <span>Login? </span>
            <Link className="formRegisterLink" to={"/login"}>
              Click
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
