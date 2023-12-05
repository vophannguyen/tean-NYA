import "./Navbar.less";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

export default function FlyoutMenu({ token }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleMenu = () => setIsOpen(!isOpen);
  
  const onLogout = async () => {
    await dispatch(logout());
    setIsOpen(!isOpen);
    navigate("/");
  };

  const Flyout = (
      <section className="flyout">
        <ul>
          <li>
            <p>Home</p>
          </li>
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
            <Link to="/">Theatre</Link>
          </li>
          <li>
            <Link to="/reservations">Restaurants</Link>
          </li>
          <li>
            <Link to="/">Activites</Link>
          </li>
        </ul>
        <ul>
          <li>
            <p>Account</p>
          </li>
          {token ? (
            <>
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
          )
          : (
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
        <ul>
          <li>
            <p>Help & Support</p>
          </li>
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
      <input type="checkbox" id="checkbox" name="checkbox" />
      <label htmlFor="checkbox" className="toggle" onClick={handleMenu}>
        {!isOpen ? <MenuIcon /> : <ClearIcon />}
      </label>
      {isOpen && Flyout}
    </>
  );
}
