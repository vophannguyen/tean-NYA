import React from "react";
import Reservations from "./profile/Reservations";
import Listings from "./profile/Listings";
import { useFetchUserAccountQuery } from "./userSlice";
import "./profile.css"

export default function Profile() {
  const { data: me, isLoading, error } = useFetchUserAccountQuery();

  if (error) return <p> Please log in to see your account details.</p>;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="account-page">
      <h1 className="account-header">Welcome, {me?.data.firstName}</h1>
      <section className="profile-reservations">
      <Reservations />
      <Listings />
      </section>
    </main>
  );
}
