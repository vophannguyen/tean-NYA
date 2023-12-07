import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectToken } from "../features/auth/authSlice";
import FlyoutMenu from "./FlyoutMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileIcon from "./ProfileIcon.jsx";
import "./barnav.less";

export default function Navbar() {
  // const cartItem = useSelector((state) => state.cart.cart);
  const token = useSelector(selectToken);

  return (
    <nav className="main-nav">
      <NavLink to="/">Last Chance</NavLink>
      <menu>
        {token ? (
          <>
            <li>
              <NavLink to="/upload">
                <button>List an event</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/profile">
                <ProfileIcon />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">
                <button className="nav-login">Log In</button>
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/cart">
            <ShoppingCartIcon />
            {/* <span>{cartItem.length}</span> */}
          </NavLink>
        </li>
        <li className="flyout-menu">
          <FlyoutMenu token={token} />
        </li>
      </menu>
    </nav>
  );
}
