import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";

import "./Navbar.less";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav>
      <NavLink to="/tickets"><h1>Last Chance</h1></NavLink>
      <menu>
        {token ? (
          <>
            <li>
              <NavLink className="account" to="/user/profile">
                Account
              </NavLink>
            </li>
            <li>
              <a onClick={handleLogout}>Log Out</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign Up</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/upload">List It</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
      </menu>
    </nav>
  );
}
