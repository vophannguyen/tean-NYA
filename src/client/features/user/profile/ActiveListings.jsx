import { formatDate } from "../../utils/helpers";
import { useFetchAllUserItemsQuery } from "../userSlice";
export default function ActiveListings() {
  const { data: allItems, isLoading, error } = useFetchAllUserItemsQuery();
  console.log("allItems", allItems);
  if (error) {
    return <p>Error Fetching Your Reservations</p>;
  }
  return (
    <section>
      <h2>Active</h2>
      {allItems && allItems.data.length > 0 ? (
        <ul>
          {allItems.data.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}
              <span>Time: {formatDate(reservation.time)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Active Listings</p>
      )}
    </section>
  );
}
