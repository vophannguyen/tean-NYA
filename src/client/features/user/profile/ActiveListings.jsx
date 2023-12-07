import { useState } from "react";
import { formatDate } from "../../utils/helpers";
import { useFetchAllUserItemsQuery } from "../userSlice";
/**Show sell item of User */
export default function ActiveListings() {
  const { data: allItems, isLoading, error } = useFetchAllUserItemsQuery();
  const [selectedItemPdf, setSelectedItemPdf] = useState(null);
  if (error) {
    return <p>Error Fetching Your Reservations</p>;
  }
  console.log("data", allItems)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedItemPdf(file);
  };
  return (
    <section>
      <h2>Active</h2>
      {allItems && allItems.data.length > 0 ? (
        <ul>
          {allItems.data.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}
              <span>Time: {formatDate(reservation.time)}</span>
              <input type="file" onChange={handleFileChange} />
              {selectedItemPdf && (
                <embed src={URL.createObjectURL(selectedItemPdf)} type ="application/pdf" width="100%" height= "600px" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Active Listings</p>
      )}
    </section>
  );
}
