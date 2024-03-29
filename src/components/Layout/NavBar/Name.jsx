import { NavLink } from "react-router-dom";

function Name({ nameUser }) {
  return (
    <li className=" dropdown">
      <a
        className="nav-link dropdown-toggle"
        style={{ cursor: "pointer" }}
        id="pagesDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user-alt mr-1 text-gray"></i>
        {nameUser}
      </a>
      <div className="dropdown-menu mt-3" aria-labelledby="pagesDropdown">
        {/* <Link
					className='dropdown-item border-0 transition-link'
					to={'/manage'}>
					Manage
				</Link> */}
        <NavLink
          className="dropdown-item border-0 transition-link"
          to={"/history"}
        >
          History
        </NavLink>
      </div>
    </li>
  );
}

export default Name;
