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
            <NavLink to="/about"> About Us </NavLink>
        </li>
        <li>
            <NavLink to="/FAQ"> FAQ </NavLink>
        </li>
      </ul>
      <p>© 2023</p>
    </footer>
  );
}
