import { formatDate } from "../../utils/helpers";
import { useState } from "react";
import { useGetSoldItemQuery } from "../userSlice";

export default function SoldListings() {
  const { data: sold, isLoading, isError } = useGetSoldItemQuery();
  const [selectedItem, setSelectedItem] = useState(null);

  if (isLoading) {
    return <p>Loading.....</p>;
  }
  if (isError) {
    return <p>Error fetching sold items. Please try again later.</p>;
  }

  const handleViewMoreInfo = (itemId) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === itemId ? null : itemId
    );
  };

  return (
    <section>
      <h2>Sold</h2>
      {sold && sold.length > 0 ? (
        <ul>
          {sold.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}{" "}
              <span> Sold:{formatDate(reservation.createAt)}</span>
              <button onClick={() => handleViewMoreInfo(reservation.id)}>
                {selectedItem === reservation.id ? "Back" : "View Ticket"}
              </button>
              {selectedItem === reservation.id && (
                <div>
                  {reservation.upload.endsWith(".pdf") ? (
                    <embed
                      src={`http://localhost:10000/${reservation.upload}`}
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    />
                  ) : (
                    <img
                      src={`http://localhost:10000/${reservation.upload}`}
                      alt="wrong"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
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
