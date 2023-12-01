import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";
import profile from "./profile.jpg";
import Menu from "./Menu";
import { useState } from "react";
import { useFetchUserAccountQuery } from "../features/user/userSlice";

import "./Navbar.less";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cart.cart);
  const token = useSelector(selectToken);
  const { data: me, isLoading, error } = useFetchUserAccountQuery();

  const onLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  //drop down menu 
  console.log(me)
  //drop down account options

  return (
    <nav className="top">
      <Menu onLogout={onLogout} />
      <NavLink to="/tickets">
        <h1>Last Chance</h1>
      </NavLink>
      <menu>
        {token ? (
          <>
            <li>
              <NavLink to="/cart">
                🛒<span>{cartItem.length}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/upload">List Event</NavLink>
            </li>
            <li>
                <NavLink to="/user/profile"><img src={profile} width="35" height="35" alt="user profile" /></NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/login">List Event</NavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
