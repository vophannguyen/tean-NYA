import { NavLink } from "react-router-dom";
import "./accountnav.less";
import { useFetchUserAccountQuery } from "./userSlice";
/** Show Nav , and User Name */
export default function NavAccount() {
  //fetch user info
  const { data: user, isLoading, isError } = useFetchUserAccountQuery();

  //waiting data
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  // and waiting
  return (
    <section className="account-container">
      <article>
        <h1 className="welcome-prompt">
        {user.data.firstName} {user.data.lastName}
        </h1>
      </article>
      <nav className="account-nav">
        <NavLink to="profile">Personal</NavLink>
        <NavLink to="upcoming">Upcoming Event</NavLink>
        <NavLink to="past">Past Event</NavLink>
        <NavLink to="sellitem">Active Listing</NavLink>
        <NavLink to="solditem">Sold Event</NavLink>
      </nav>
    </section>
  );
}
