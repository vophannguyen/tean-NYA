import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserAccountQuery } from "./userSlice";
import Reservations from "./profile/Reservations";
import Listings from "./profile/Listings";
import PastRes from "./profile/PastRes";
import "./profile.less";

export default function Profile() {
  const { data: user, isLoading, isError } = useFetchUserAccountQuery();
  const [activeTab, setActiveTab] = useState("user");
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  return (
    <section className="profile-container">
      <h1>My Profile Information</h1>
      <table>
        <tbody>
          <tr>
            <td>Invoice</td>
            <td>{user.data.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              {user.data.firstName} {user.data.lastName}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.data.email}</td>
          </tr>
          <tr>
            <td>UserName</td>
            <td>{user.data.username}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>*********</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
  // return isLoading ? (
  //   <p>Loading ...</p>
  // ) : (
  //   <main className="account-page">
  //     <h2 className="account-header">Welcome, {me?.data.firstName}</h2>
  //     <section className="tab-buttons">
  //       <button onClick={() => setActiveTab("user")}>User Info</button>
  //       <button onClick={() => setActiveTab("reservations")}>Upcoming</button>
  //       <button onClick={() => setActiveTab("listings")}>Your Listings</button>
  //       <button onClick={() => setActiveTab("history")}>
  //         Reservation History
  //       </button>
  //     </section>
  //     <section className="profile-content">
  //       {activeTab === "user" && (
  //         <div>
  //           <p>Username: {me?.data.username}</p>
  //           <p>Email: {me?.data.email}</p>
  //         </div>
  //       )}
  //       {activeTab === "reservations" && <Reservations />}
  //       {activeTab === "listings" && <Listings />}
  //       {activeTab === "history" && <PastRes />}
  //     </section>
  //   </main>
  // );
}
