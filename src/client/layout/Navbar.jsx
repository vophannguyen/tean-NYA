import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectToken } from "../features/auth/authSlice";
import FlyoutMenu from "./FlyoutMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileIcon from "./ProfileIcon.jsx";
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
              <NavLink to="/login">List Event</NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <ProfileIcon />
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
        <li>
          <FlyoutMenu token={token} />
        </li>
      </menu>
    </nav>
  );
}
