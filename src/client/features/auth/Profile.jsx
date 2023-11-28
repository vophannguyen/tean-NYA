import { useFetchUserAccountQuery } from "./authSlice"

export default function Account() {
    const { data: me, isLoading, error } = useFetchUserAccountQuery();

  console.log("me", me); // Log the user data
  console.log("isLoading", isLoading); // Log the loading state
  console.log("error", error); // Log any error

  const token = sessionStorage.getItem("token");
console.log("token", token);

    if (error) return <p> Please log in to see your account details.</p>

    return isLoading ? ( 
        <p>Loading ...</p>
    ) : (
        <main className="account-page">
            <h1 className="account-header">Account</h1>
            <p className="account-greeting"> Hi {me?.data.firstName}!</p>
            <li className="reservations">
            </li>
        </main>
    );
}