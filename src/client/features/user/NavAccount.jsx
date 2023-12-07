import { NavLink } from "react-router-dom";
import "./accountnav.less";
import { useFetchUserAccountQuery } from "./userSlice";
export default function NavAccount() {
  const { data: user, isLoading, isError } = useFetchUserAccountQuery();

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  return (
    <section className="account-container">
      <article>
        <h1>
          Welcome {user.data.firstName} {user.data.lastName}
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
// { path: "profile", element: <Profile /> },
//           { path: "solditem", element: <SoldListings /> },
//           { path: "upcoming", element: <UpcomingRes /> },
//           { path: "past", element: <PastRes /> },
//           { path: "sellitem", element: <ActiveListings /> },
