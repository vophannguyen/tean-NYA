import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer/Footer";
import "./root.less";
export default function Root() {
  return (
    <div className="root">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
