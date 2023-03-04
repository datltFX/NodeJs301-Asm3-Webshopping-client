import { NavLink, useNavigate } from "react-router-dom";

function LoginLink(props) {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <li className="nav-item" onClick={onLogout}>
      <NavLink className="nav-link">( Logout )</NavLink>
    </li>
  );
}

export default LoginLink;
