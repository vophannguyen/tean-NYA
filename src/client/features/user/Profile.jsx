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
      <h1>Account</h1>
      <table>
        <tbody>
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
        </tbody>
      </table>
    </section>
  );
  }