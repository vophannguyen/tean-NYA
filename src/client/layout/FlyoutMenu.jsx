import "./barnav.less";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import { useFetchUserAccountQuery } from "../features/user/userSlice";
import "./flyoutMenu.less";
export default function FlyoutMenu({ token }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: me, isLoading, isError } = useFetchUserAccountQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (isLoading) {
    return;
  }
  if (isError) {
    return;
  };


  const onLogout = async () => {
    await dispatch(logout());
    setIsOpen(!isOpen);
    navigate("/");
  };

  const Flyout = (
    <section className="flyout">
      <CloseIcon onClick={() => setIsOpen(!isOpen)} />
      <ul className="account">
        {token ? (
          <>
            <li className="welcome">Welcome, {me?.data?.firstName}</li>
            <li>
              <Link to="/user/profile">My Profile</Link>
            </li>
            <li>
              <Link to="/upload">List An Event</Link>
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
              <Link to="/login">List an event</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="explore">
        <li>
          <p>Explore</p>
        </li>
        <li>
          <Link to="/tickets">Events</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/concerts">Concerts</Link>
        </li>
        <li>
          <Link to="/reservations">Restaurants</Link>
        </li>
      </ul>
      <ul>
        <li>
          <p>Support</p>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/faq">FAQs</Link>
        </li>
        <li>
          <Link to="/faq">Contact</Link>
        </li>
      </ul>
    </section>
  );

  return (
    <>
      <div className="menu" onClick ={() => setIsOpen(!isOpen)}>
          <MenuIcon />
      </div>
      {isOpen && Flyout}
    </>
  );
}
