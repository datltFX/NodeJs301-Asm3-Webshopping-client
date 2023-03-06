import { NavLink, useNavigate } from "react-router-dom";
import axiosClient from "../../axios/axios";

function LoginLink(props) {
  const navigate = useNavigate();
  const onLogout = () => {
    axiosClient
      .post(`/logout`, { content: "bye" })
      .then((res) => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <li className="nav-item" onClick={onLogout}>
      <NavLink className="nav-link">( Logout )</NavLink>
    </li>
  );
}

export default LoginLink;
