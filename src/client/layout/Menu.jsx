import "./Navbar.less";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Menu({ token, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => setIsOpen(!isOpen);
  const Flyout = (
    <ul className="flyout-menu" aria-hidden="true">
      <hr />
      <li>
        <NavLink to="/">Events</NavLink>
      </li>
      <li>
        <NavLink to="/upload">List an event</NavLink>
      </li>
      <li>
        <NavLink to="/about">About us</NavLink>
      </li>
      <li>
        <NavLink to="/faq">FAQs</NavLink>
      </li>
      <hr />
      {token ? <>
        <li>
        <NavLink to="/user/profile">Account</NavLink>
      </li>
      <li>
        <NavLink to="/payment">Payments</NavLink>
      </li>
      <li>
        <a onClick={onLogout}>Log out</a>
      </li>
      </> : <>
        <li><NavLink to="/login">Log In</NavLink></li>
      </>
      }
      
      <hr />
    </ul>
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
