import { formatDate } from "../../utils/helpers";
import { useGetSoldItemQuery } from "../userSlice";

export default function SoldListings() {
  const { data: sold, isLoading, isError } = useGetSoldItemQuery();
  if (isLoading) {
    return <p>Loading.....</p>;
  }
  if (isError) {
    return;
  }
  console.log(sold);
  return (
    <section>
      <h2>Sold</h2>
      {sold && sold.length > 0 ? (
        <ul>
          {sold.map((i) => (
            <li key={i.id}>
              {i.title} <span> Sold:{formatDate(i.createAt)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Active Listings</p>
      )}
    </section>
  );
}
