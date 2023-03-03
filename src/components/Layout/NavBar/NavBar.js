import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { useEffect, useState } from "react";
import {
  getTolocalStorage,
  removeTolocalStorage,
} from "../../../data/localstorage";
import axiosClient from "../../axios/axios";

const NavBar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const dataUser = getTolocalStorage("currentUserActive");
    dataUser === null ? setName("") : setName(dataUser.fullName);
  }, []);

  const logoutHanler = () => {
    axiosClient
      .post("/logout", "", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        navigate("/login");
        removeTolocalStorage("currentUserActive");
        removeTolocalStorage("roomId");
      })
      .catch((err) => console.log(err));
  };

  //render
  return (
    <div className="navBar">
      <nav className="row">
        <div className="col-md-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "pageLink active" : "pagesLink"
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "pageLink active" : "pagesLink"
            }
          >
            Shop
          </NavLink>
        </div>
        <div className=" col-md-4 boutique">Boutique</div>
        <div className="col-md-4">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "pageLink active" : "pagesLink"
            }
          >
            <FontAwesomeIcon icon={faCartArrowDown} /> Cart
          </NavLink>
          {name === "" ? (
            <Link className="pagesLink" to="/login">
              <FontAwesomeIcon icon={faUser} /> Login
            </Link>
          ) : (
            <Link className="pagesLink" to="">
              <FontAwesomeIcon icon={faUser} />
              <span onClick={logoutHanler}>{" " + name + " (Logout)"}</span>
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
