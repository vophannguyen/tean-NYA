import { Link, Outlet } from "react-router-dom";
import NavAccount from "./NavAccount";
import "./accountRoot.less";
/** Account root */
export default function Account() {
  return (
    <section className="account-root">
      <NavAccount />
      <section className="account-child">
        <Outlet />
      </section>
    </section>
  );
}
