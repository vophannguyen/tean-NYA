import { NavLink } from "react-router-dom";
import "./Footer.less";

export default function Footer() {
  return (
    <footer>
      <section className="flex">
      <ul>
        <li>About</li>
        <li>
          <NavLink to="/tickets">Events</NavLink>
        </li>
        <li>
          <NavLink to="/upload">List an event</NavLink>
        </li>
        <li>
            <NavLink to="/about">About Us</NavLink>
        </li>
        <li>
            <NavLink to="/faq">FAQ</NavLink>
        </li>
      </ul>
      <ul>
        <li>Categories</li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
            <NavLink to="/concerts">Concerts</NavLink>
        </li>
        <li>
          <NavLink to="/reservations">Restaurants</NavLink>
        </li>
        <li>
            <NavLink to="/">All Events</NavLink>
        </li>
      </ul>
      </section>
      <hr />
      <section className="payment">
        <p>Payment Methods</p>
        <ul className="flex">
          <li>Paypal icon, apple icon, credit cards icon</li>
        </ul>
      </section>
      <hr />
      <section className="policy">
        <ul className="flex">
          <li><NavLink to="/">Terms & Conditions</NavLink></li>
          <li>|</li>
          <li><NavLink to="/">Privacy Policy</NavLink></li>
          <li>|</li>
          <li>Last Chance @ 2024</li>
        </ul>
      </section>
    </footer>
  );
}
