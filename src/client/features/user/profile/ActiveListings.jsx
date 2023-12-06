import { formatDate } from "../../utils/helpers";
import { useFetchAllUserItemsQuery } from "../userSlice";
/**Show sell item of User */
export default function ActiveListings() {
  const { data: allItems, isLoading, error } = useFetchAllUserItemsQuery();
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
