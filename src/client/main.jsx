import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import LoginForm from "./features/auth/LoginForm";
import RegisterForm from "./features/auth/RegisterForm";
import Tickets from "./features/tickets/Tickets";
import Upload from "./features/tickets/Upload";
import Listing from "./features/tickets/Listing";
import NotFound from "./features/404/NotFound";
import Root from "./layout/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Tickets /> },
      { path: "/tickets", element: <Tickets /> },
      { path: "/ticket/:id", element: <Listing /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm />},
      { path: "/upload", element: <Upload />},
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
