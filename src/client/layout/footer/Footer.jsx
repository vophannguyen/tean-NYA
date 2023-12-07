import { NavLink } from "react-router-dom";
import "./footer.less";

export default function Footer() {
  return (
    <footer>
      <section className="flex">
        <ul className="about">
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/faq">FAQ</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </section>
      <hr />
      <section className="flex">
        <ul className="terms">
          <li>
            <NavLink to="/">Terms & Conditions</NavLink>
          </li>
          <li>
            <NavLink to="/">Privacy Policy</NavLink>
          </li>
          <li>Last Chance @ 2024</li>
        </ul>
      </section>
    </footer>
  );
}
