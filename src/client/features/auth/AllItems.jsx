import { useFetchAllUserItemsQuery } from "./authSlice";

export default function AllItems() {
  const { data: allItems, isLoading, error } = useFetchAllUserItemsQuery();

  if (error) {
    return <p>Error Fetching Your Reservations</p>;
  }
  //   console.log(allItems?.data);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Your Posted Reservations</h1>
      {allItems && allItems.data.length > 0 ? (
        <ul>
          {allItems.data.map((reservation) => (
            <li key={reservation.id}>{JSON.stringify(reservation)}</li>
          ))}
        </ul>
      ) : (
        <p>No Reservations Posted </p>
      )}
    </div>
  );
}
