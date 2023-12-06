import React, { useState } from "react";
import Reservations from "./profile/Reservations";
import Listings from "./profile/Listings";
import { useFetchUserAccountQuery } from "./userSlice";
import "./profile.less"
import PastRes from "./profile/PastRes";

export default function Profile() {
  const { data: me, isLoading, error } = useFetchUserAccountQuery();
  const [activeTab, setActiveTab] = useState("user");

  if (error) return <p> Please log in to see your account details.</p>;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="account-page">
      <h2 className="account-header">Welcome, {me?.data.firstName}</h2>
      <section className="tab-buttons">
        <button onClick={() => setActiveTab("user")}>User Info</button>
        <button onClick={()=> setActiveTab("reservations")}>Upcoming</button>
        <button onClick={() => setActiveTab("listings")}>Your Listings</button>
        <button onClick={() => setActiveTab("history")}>Reservation History</button>
      </section>
      <section className="profile-content">
     {activeTab === "user" && (
      <div>
        <p>Username: {me?.data.username}</p>
        <p>Email: {me?.data.email}</p>
      </div>
     )} 
     {activeTab === "reservations" && <Reservations />}
    {activeTab === "listings" && <Listings />}
    {activeTab === "history" && <PastRes />}
      </section>
    </main>
  );
}
