import PostedReservations from "./PostedReservations";
import { useFetchUserAccountQuery } from "./userSlice";

export default function Account() {
  const { data: me, isLoading, error } = useFetchUserAccountQuery();

  console.log("me", me);
  console.log("isLoading", isLoading);
  console.log("error", error);

  const token = sessionStorage.getItem("token");
  console.log("token", token);

  if (error) return <p> Please log in to see your account details.</p>;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="account-page">
      <h1 className="account-header">Account</h1>
      <h2 className="account-greeting"> Hi {me?.data.firstName}!</h2>
      <h3>Upcoming Reservations</h3>
      <h3>Past Reservations</h3>
      <h3>Your Uploaded Listings</h3>
    </main>
  );
}
