import { formatDate } from "../../utils/helpers";
import { useGetSoldItemQuery } from "../userSlice";

export default function SoldListings() {
  const { data: sold, isLoading, isError } = useGetSoldItemQuery();
  if (isLoading) {
    return <p>Loading.....</p>;
  }
  if (isError) {
    return <p>Error fetching sold items. Please try again later.</p>;
  }

  return (
    <section>
      <h2>Sold</h2>
      {sold && sold.length > 0 ? (
        <ul>
          {sold.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}{" "}
              <span> Sold:{formatDate(reservation.createAt)}</span>
              {reservation.upload.endsWith(".pdf") ? (
                <embed
                  src={`http://localhost:3000/src/server/images/${reservation.upload}`}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              ) : (
                <img
                  src={`http://localhost:3000/src/server/images/${reservation.upload}`}
                  alt="wrong"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sold items found.</p>
      )}
    </section>
  );
}
