import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <hr />
      <p>Footer Section</p>
      <ul>
        <li>
          <NavLink to="/tickets">Tickets</NavLink>
        </li>
        <li>
          <NavLink to="/upload">Upload</NavLink>
        </li>
        <li>
            About Us
        </li>
        <li>
            FAQs
        </li>
      </ul>
      <p>© 2023</p>
    </footer>
  );
}