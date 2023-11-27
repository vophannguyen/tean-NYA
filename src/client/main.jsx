import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import LoginForm from "./features/auth/LoginForm";
import RegisterForm from "./features/auth/RegisterForm";
import Tickets from "./features/tickets/Tickets";
import Root from "./layout/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Tickets /> },
      { path: "/tickets", element: <Tickets /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm />},
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
