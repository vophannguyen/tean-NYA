import { Link, Outlet } from "react-router-dom";
import NavAccount from "./NavAccount";

export default function Account() {
  return (
    <>
      <NavAccount />
      <section>
        <Outlet />
      </section>
    </>
  );
}
