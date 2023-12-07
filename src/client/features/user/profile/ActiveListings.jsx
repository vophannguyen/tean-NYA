import { formatDate } from "../../utils/helpers";
import { useFetchAllUserItemsQuery } from "../userSlice";
/**Show sell item of User */
export default function ActiveListings() {
  const { data: allItems, isLoading, isError } = useFetchAllUserItemsQuery();
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <p>Error Fetching Your Reservations</p>;
  }
  // const file = new File(allItems.data[0].upload);
  return (
    <section>
      <h2>Active</h2>
      {allItems && allItems.data.length > 0 ? (
        <ul>
          {allItems.data.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}
              {reservation.upload}
              <span>Time: {formatDate(reservation.time)}</span>
              <img
                src={`http://localhost:3000/` + `${reservation.upload}`}
                alt="wrong"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No Active Listings</p>
      )}
    </section>
  );
}
