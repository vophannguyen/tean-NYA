import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectToken } from "../features/auth/authSlice";
import profile from "./profile.jpg";
import FlyoutMenu from "./FlyoutMenu";
import "./Navbar.less";

export default function Navbar() {
  // const cartItem = useSelector((state) => state.cart.cart);
  const token = useSelector(selectToken);

  return (
    <nav>
      <NavLink to="/">
        <h1>Last Chance</h1>
      </NavLink>
      <menu>
        {token ? (
          <>
            <li>
              <NavLink to="/upload">List Event</NavLink>
            </li>
            <li>
              <NavLink to="/user/profile">
                <img src={profile} width="35" height="35" alt="user profile" />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">List Event</NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <img src={profile} width="35" height="35" alt="user profile" />
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/cart">
            🛒
            {/* <span>{cartItem.length}</span> */}
          </NavLink>
        </li>
        <li>
          <FlyoutMenu token={token} />
        </li>
      </menu>
    </nav>
  );
}
