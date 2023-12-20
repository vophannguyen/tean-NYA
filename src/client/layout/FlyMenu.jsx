import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import "./flyoutMenu.less";
import { useGetResQuery } from "../features/tickets/ticketSlice";
import {
  useDeleteCartMutation,
  useGetCartQuery,
} from "../features/cart/cartSlice";

export default function FlyMenu({ token, setIsOpen, isOpen, me }) {
  //use RTK fetch data
  const { data, isLoading, isError } = useGetCartQuery();
  const [deletCart] = useDeleteCartMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  //waiting data
  if (isLoading) {
    return;
  }
  if (isError) {
    return;
  }
  ///end
  //handle Link Click to close flyout
  const handleLink = () => {
    setIsOpen(false);
  };

  const onLogout = async () => {
    data?.data.forEach(async (item) => {
      await deletCart(item.id).unwrap();
    });
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
  }),
    [isOpen];

  return (
    <section className="flyout" ref={ref}>
      <div className="close">
        <CloseIcon onClick={() => setIsOpen(!isOpen)} />
      </div>
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
              <Link to="/upload">List An Event</Link>
            </li>
            <li>
              <button className="menu-logout" onClick={onLogout}>
                Sign Out
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
                List An Event
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLink}>
                Sign In
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
          <Link to="/faqs" onClick={handleLink}>
            About
          </Link>
        </li>
        <li>
          <Link to="/faqs" onClick={handleLink}>
            FAQs
          </Link>
        </li>
        <li>
          <Link to="/faqs" onClick={handleLink}>
            Contact
          </Link>
        </li>
      </ul>
    </section>
  );
}
