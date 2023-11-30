import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import LoginForm from "./features/auth/loginForm";
import RegisterForm from "./features/auth/registerForm.jsx";
import Tickets from "./features/tickets/Tickets";
import Upload from "./features/tickets/Upload";
import Listing from "./features/tickets/Listing";
import NotFound from "./features/404/NotFound";
import Profile from "./features/user/Profile.jsx";
import Root from "./layout/Root.jsx";
import AllItems from "./features/user/PostedReservations";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./features/cart/Cart.jsx";
import ProcessCheckout from "./features/cart/ProcessCheckout.jsx";
import Receipt from "./features/cart/Receipt.jsx";
import Account from "./features/user/Account.jsx";
import ReservationHistory from "./features/user/ReservationHistory";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Tickets /> },
      { path: "/tickets", element: <Tickets /> },
      { path: "/tickets/:id", element: <Listing /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/upload", element: <Upload /> },
      { path: "/cart", element: <Cart /> },
      { path: "/user", element: <Account /> },
      { path: "/user/profile", element: <Profile /> },
      { path: "user/order", element: <ReservationHistory /> },
      { path: "user/sellitem", element: <AllItems /> },
      { path: "user/solditem", element: <h1>Sold Item</h1> },
      { path: "user/payment", element: <h1>Payment</h1> },
      {
        path: "/cart/checkout",
        element: <ProcessCheckout />,
      },
      { path: "/cart/checkout/receipt", element: <Receipt /> },
      { path:"user/payment", element: <ReservationHistory />},
    ],
  },
  { path: "/*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
