import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import "./flyoutMenu.less";

export default function FlyMenu({ token, setIsOpen, isOpen, me }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  //handle Link Click to close flyout
  const handleLink = () => {
    setIsOpen(false);
  };

  const onLogout = async () => {
    await dispatch(logout());
    setIsOpen(false);
    navigate("/");
  };
  //close flyout menu if clicked outside and if navlink is clicked
  useEffect(() => {
    const checkClickAway = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkClickAway);
    document.addEventListener("touchstart", checkClickAway);
    return () => {
      document.removeEventListener("mousedown", checkClickAway);
      document.removeEventListener("touchstart", checkClickAway);
    };
  }), [isOpen];

  return (
    <section className="flyout" ref={ref}>
      <CloseIcon onClick={() => setIsOpen(!isOpen)} />
      <ul className="account">
        {token ? (
          <>
            <li className="welcome">Welcome, {me?.data?.firstName}</li>
            <li>
              <Link to="/user/profile" onClick={handleLink}>
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/upload">List an event</Link>
            </li>
            <li>
              <button className="menu-logout" onClick={onLogout}>
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <p>Account</p>
            </li>
            <li>
              <Link to="/login" onClick={handleLink}>
                List an event
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLink}>
                Sign in
              </Link>
            </li>
          </>
        )}
      </ul>
      <ul className="explore">
        <li>
          <p>Explore</p>
        </li>
        <li>
          <Link to="/tickets" onClick={handleLink}>
            Events
          </Link>
        </li>
        <li>
          <Link to="/movies" onClick={handleLink}>
            Movies
          </Link>
        </li>
        <li>
          <Link to="/concerts" onClick={handleLink}>
            Concerts
          </Link>
        </li>
        <li>
          <Link to="/reservations" onClick={handleLink}>
            Restaurants
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <p>Support</p>
        </li>
        <li>
          <Link to="/about" onClick={handleLink}>
            About
          </Link>
        </li>
        <li>
          <Link to="/faq" onClick={handleLink}>
            FAQs
          </Link>
        </li>
        <li>
          <Link to="/faq" onClick={handleLink}>
            Contact
          </Link>
        </li>
      </ul>
    </section>
  );
}
