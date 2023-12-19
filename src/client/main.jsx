import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import Tickets from "./features/tickets/Tickets";
import Upload from "./features/tickets/uploadForm/Upload.jsx";
import Listing from "./features/tickets/singleView/Listing.jsx";
import NotFound from "./features/404/NotFound";
import Profile from "./features/user/Profile.jsx";
import Root from "./layout/Root.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./features/cart/Cart.jsx";
import ProcessCheckout from "./features/cart/ProcessCheckout.jsx";
import Receipt from "./features/cart/Receipt.jsx";
import Account from "./features/user/Account.jsx";
import AboutUs from "./layout/AboutUs";
import Support from "./features/support/Support.jsx";
import FormLogin from "./features/auth/FormLogin.jsx";
import FormRegister from "./features/auth/FormRegister.jsx";
import SoldListings from "./features/user/profile/SoldListings.jsx";
import { Upcoming } from "@mui/icons-material";
import UpcomingRes from "./features/user/profile/UpcomingRes.jsx";
import PastRes from "./features/user/profile/PastRes.jsx";
import ActiveListings from "./features/user/profile/ActiveListings.jsx";
import Concerts from "./features/tickets/Concerts.jsx";
import Restaurants from "./features/tickets/Restaurants.jsx";
import Movies from "./features/tickets/Movies.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Tickets /> },
      { path: "/tickets", element: <Tickets /> },
      { path: "/tickets/:id", element: <Listing /> },
      { path: "/login", element: <FormLogin /> },
      { path: "/register", element: <FormRegister /> },
      { path: "/upload", element: <Upload /> },
      { path: "/cart", element: <Cart /> },
      { path: "/concerts", element: <Concerts /> },
      { path: "/reservations", element: <Restaurants /> },
      { path: "/movies", element: <Movies /> },
      {
        path: "/user/",
        element: <Account />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "solditem", element: <SoldListings /> },
          { path: "upcoming", element: <UpcomingRes /> },
          { path: "past", element: <PastRes /> },
          { path: "sellitem", element: <ActiveListings /> },
        ],
      },
      { path: "/user/profile", element: <Profile /> },
      { path: "user/payment", element: <h1>Payment</h1> },
      { path: "/cart/checkout", element: <ProcessCheckout /> },
      { path: "/cart/checkout/receipt/:id", element: <Receipt /> },
      { path: "/faqs", element: <Support /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
