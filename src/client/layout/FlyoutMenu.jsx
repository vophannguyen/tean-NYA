import "./Navbar.less";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFetchUserAccountQuery } from "../features/user/userSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function FlyoutMenu({ token }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { data: me, isLoading, error } = useFetchUserAccountQuery();
  
  const handleMenu = () => setIsOpen(!isOpen);
  
  const onLogout = async () => {
    await dispatch(logout());
    setIsOpen(!isOpen);
    navigate("/");
    
  };

  const Flyout = (
      <section className="flyout mobile">
        <ul>
          <li>Listings</li>
          <li>
            <NavLink to="/tickets">All Events</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/concerts">Concerts</NavLink>
          </li>
          <li>
            <NavLink to="/">Theatre</NavLink>
          </li>
          <li>
            <NavLink to="/reservations">Restaurants</NavLink>
          </li>
          <li>
            <NavLink to="/">Activites</NavLink>
          </li>
        </ul>
        <ul>
          <li>Account</li>
          {token ? (
            <>
              <li>
              <NavLink to="/user/profile">My Profile</NavLink>
              </li>
              <li>
              <NavLink to="/upload">List an event</NavLink>
              </li>
              <li>
                <a onClick={onLogout}>Log out</a>
              </li>
            </>
          )
          : (
            <>
              <li>
                <NavLink to="/login">List an event</NavLink>
              </li>
              <li>
                <NavLink to="/login">Log in</NavLink>
              </li>
            </>
          )}
          
        </ul>
        <ul>
          <li>
            <NavLink to="/">Help & Support</NavLink>
          </li>
          <li>
            <NavLink to="/about">About us</NavLink>
          </li>
          <li>
            <NavLink to="/faq">FAQs</NavLink>
          </li>
        </ul>
      </section>
  );

  return (
    <>
      <input type="checkbox" id="checkbox" name="checkbox" />
      <label htmlFor="checkbox" className="toggle" onClick={handleMenu}>
        <div className="bars" id="bar1"></div>
        <div className="bars" id="bar2"></div>
        <div className="bars" id="bar3"></div>
      </label>
      {isOpen && Flyout}
    </>
  );
}
