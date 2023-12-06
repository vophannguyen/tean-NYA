import "./Navbar.less";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { useFetchUserAccountQuery } from "../features/user/userSlice";
import "./flyoutMenu.less";
export default function FlyoutMenu({ token }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: me } = useFetchUserAccountQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const onLogout = async () => {
    await dispatch(logout());
    setIsOpen(!isOpen);
    navigate("/");
  };

  const Flyout = (
    <section className="flyout" onMouseLeave={handleMouseLeave}>
      <h3 className="title">Explore</h3>
      <ul>
        <li>
          <Link to="/tickets">All Events</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/concerts">Concerts</Link>
        </li>
        <li>
          <Link to="/reservations">Restaurants</Link>
        </li>
        <li>
          <Link to="/">Activites</Link>
        </li>
      </ul>
      <hr />
      <h3 className="title">Account</h3>
      <ul>
        {token ? (
          <>
            <li>
            Welcome, {me?.data.firstName}
            </li>
            <li>
              <Link to="/user/profile">My Profile</Link>
            </li>
            <li>
              <Link to="/upload">List an event</Link>
            </li>
            <li>
              <a onClick={onLogout}>Log out</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">List an event</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </>
        )}
      </ul>
      <hr />
      <h3 className="title">Support</h3>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/faq">FAQs</Link>
        </li>
        <li>
          <Link to="/faq">Contact</Link>
        </li>
      </ul>
    </section>
  );

  return (
    <>
    <div className="menu" onMouseMove={handleMenu}>
    <input type="checkbox" id="checkbox" name="checkbox" />
      <label htmlFor="checkbox">
        <MenuIcon />
      </label>
    </div>
      {isOpen && Flyout}
    </>
  );
}
