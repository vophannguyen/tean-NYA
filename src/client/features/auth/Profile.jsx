import { useFetchUserAccountQuery } from "./authSlice"

export default function Account() {
    const { data: me, isLoading, error } = useFetchUserAccountQuery();

    if (error) return <p> Please log in to see your account details.</p>

    return isLoading ? ( 
        <p>Loading ...</p>
    ) : (
        <main className="account-page">
            <h1 className="account-header">Account</h1>
            <p className="account-greeting"> Hi, {me?.firstName}!</p>
            <li className="reservations">
            </li>
        </main>
    );
}