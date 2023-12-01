import React from "react";
import Reservations from "./profile/Reservations";
import Listings from "./profile/Listings";
import { useFetchUserAccountQuery } from "./userSlice";

export default function Profile() {
  const { data: me, isLoading, error } = useFetchUserAccountQuery();

  const token = sessionStorage.getItem("token");

  if (error) return <p> Please log in to see your account details.</p>;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="account-page">
      <h1 className="account-header">Account</h1>
      <h2 className="account-greeting"> Hi {me?.data.firstName}!</h2>
      <Reservations />
      <Listings />
    </main>
  );
}
