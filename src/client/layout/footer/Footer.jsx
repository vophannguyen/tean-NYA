import { NavLink } from "react-router-dom";
import "./footer.less";

export default function Footer() {
  return (
    <>
      <section className="flex">
        <ul className="about">
          <li>
            <NavLink to="/faqs">About</NavLink>
          </li>
          <li>
            <NavLink to="/faqs">FAQs</NavLink>
          </li>
          <li>
            <NavLink to="/faqs">Contact</NavLink>
          </li>
        </ul>
      </section>
      <section className="flex">
        <ul className="terms">
          <li className="mobile-hide">
            <NavLink to="/faqs">Terms & Conditions</NavLink>
          </li>
          <li className="mobile-hide">
            <NavLink to="/faqs">Privacy Policy</NavLink>
          </li>
          <li>Last Chance @ 2024</li>
        </ul>
      </section>
    </>
  );
}
