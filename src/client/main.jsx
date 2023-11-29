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
import Profile from "./features/auth/Profile.jsx"
import Root from "./layout/Root.jsx";
import AllItems from "./features/auth/AllItems";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./features/cart/Cart.jsx";
import ProcessCheckout from "./features/cart/ProcessCheckout.jsx";
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
      { path: "/user/profile", element: <Profile />},
      { path: "/user/sellitem", element: <AllItems />},
      { path: "/cart", element: <Cart /> },
      {
        path: "/cart/checkout",
        element: <ProcessCheckout />,
      },
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
