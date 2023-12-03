import React from "react";
import Reservations from "./profile/Reservations";
import Listings from "./profile/Listings";
import { useFetchUserAccountQuery } from "./userSlice";

export default function Profile() {
  const { data: me, isLoading, error } = useFetchUserAccountQuery();

  if (error) return <p> Please log in to see your account details.</p>;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    // <main className="account-page">
    //   <h1 className="account-header">Welcome, *insertname*</h1>
    //   <Reservations />
    //   <Listings />
    // </main>
    <h1>issue seeding</h1>
  );
}
