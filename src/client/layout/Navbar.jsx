import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectToken } from "../features/auth/authSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileIcon from "./ProfileIcon.jsx";
import "./barnav.less";
import { useGetCartQuery } from "../features/cart/cartSlice.js";
import FlyoutMenu from "./FlyoutMenu.jsx";

export default function Navbar() {
  const token = useSelector(selectToken);
  const { data, isLoading, isError } = useGetCartQuery();

  //Waiting data
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return;
  }
  ////end

  return (
    <section className="navbar">
      <nav className="main-nav">
        <NavLink to="/">
          <h5>Last Chance</h5>
        </NavLink>
        <menu>
          {token ? (
            <>
              <li className="hide">
                <NavLink to="/upload">
                  <button>List An Event</button>
                </NavLink>
              </li>
              <li className="mobile-hide">
                <NavLink to="/user/profile">
                  <ProfileIcon />
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">
                  <button className="nav-login">Sign In</button>
                </NavLink>
              </li>
            </>
          )}
          <li className="icon">
            <NavLink to="/cart">
              <ShoppingCartIcon />
              {data.data?.length > 0 && (
                <p className="icon-number">{data.data.length}</p>
              )}
            </NavLink>
          </li>
          <li className="flyout-menu">
            <FlyoutMenu token={token} />
          </li>
        </menu>
      </nav>
    </section>
  );
}
