import { NavLink, Outlet } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { getTolocalStorage } from "../../../data/localstorage";
import LogoutLink from "./LogoutLink";
import LoginLink from "./LoginLink";
import Name from "./Name";

const NavBar = () => {
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const dataUser = getTolocalStorage("currentUserActive");
  useEffect(() => {
    if (dataUser) {
      setName(dataUser.fullName);
      setIsLogin(true);
    }
  }, [dataUser]);

  //render
  return (
    <div className="navBar">
      <div className="container px-0 px-lg-3">
        <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
          <NavLink className="navbar-brand  navbar-brand-centered" to={`/`}>
            <span className="font-weight-bold text-uppercase text-dark">
              Boutique
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to={`/`} end className="nav-link-left">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/shop`} className="nav-link-left">
                  Shop
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  to={dataUser ? "/cart" : "/login"}
                  className="nav-link-right"
                >
                  <i className="	fas fa-shopping-cart mr-1 text-gray"></i>
                  Cart
                </NavLink>
              </li>
              {name ? <Name nameUser={name} /> : ""}
              {isLogin ? <LoginLink /> : <LogoutLink />}
            </ul>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
