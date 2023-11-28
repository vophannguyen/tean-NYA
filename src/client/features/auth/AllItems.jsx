import { useFetchAllUserItemsQuery } from "./authSlice";

export default function AllItems() {
    const { data: allItems, isLoading, error } = useFetchAllUserItemsQuery();

    if (error) {
        return <p>Error Fetching Your Reservations</p>;
    }

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <h1>Your Posted Reservations</h1>
            {allItems && allItems.length > 0 ? (
                <ul>
                    {allItems.map((reservation) => (
                        <li key={reservation.id}>
                            {reservation.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Reservations Posted </p>
            )}
        </div>
    );
}