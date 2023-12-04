import { NavLink } from "react-router-dom";
import "./Footer.less";
export default function Footer() {
  return (
    <footer>
      <section className="flex nav">
      <ul>
        <li>About</li>
        <li>
          <NavLink to="/tickets">Tickets</NavLink>
        </li>
        <li>
          <NavLink to="/upload">Upload</NavLink>
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
            <NavLink to="/">Theatre</NavLink>
        </li>
        <li>
          <NavLink to="/reservations">Reservations</NavLink>
        </li>
        <li>
          <NavLink to="/">Activites</NavLink>
        </li>
        <li>
            <NavLink to="/">All Event Listings</NavLink>
        </li>
      </ul>
      <ul>
        <li>Contact</li>
        <p>By email: support@lastchancenyc.com</p>
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
