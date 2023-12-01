import { formatDate } from "../../utils/helpers";
import { useGetSoldItemQuery } from "../userSlice";

export default function SoldListings() {
  const { data, isLoading, isError } = useGetSoldItemQuery();
  if (isLoading) {
    return <p>Loading.....</p>;
  }
  if (isError) {
    return;
  }
  console.log(data.data);
  return (
    <section>
      <h2>Sold</h2>
      {data && data.data.length > 0 ? (
        <ul>
          {data.data.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}{" "}
              <span> Sold:{formatDate(reservation.createAt)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Active Listings</p>
      )}
    </section>
  );
}
