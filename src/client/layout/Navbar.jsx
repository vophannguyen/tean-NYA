import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";

import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
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
      <h1>Last Chance</h1>
      <menu>
        {token ? (
          <li>
            <a onClick={handleLogout}>Log Out</a>
          </li>
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
      </menu>
    </nav>
  );
}
