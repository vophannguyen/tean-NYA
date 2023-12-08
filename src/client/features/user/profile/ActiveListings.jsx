import { useState } from "react";
import { formatDate } from "../../utils/helpers";
import { useFetchAllUserItemsQuery, useDeleteItemMutation } from "../userSlice";

import styles from "./activelisting.less";

/** Show sell item of User */
export default function ActiveListings() {
  const { data: allItems, isLoading, isError } = useFetchAllUserItemsQuery();
  const [selectedItem, setSelectedItem] = useState(null);

  //waiting data
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <p>Error Fetching Your Reservations</p>;
  }
  ////end

  //handle view pickture when click
  const handleViewMoreInfo = (itemId) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === itemId ? null : itemId
    );
  };

  return (
    <section className="active-card">
      <h2>Active</h2>
      {allItems && allItems.data.length > 0 ? (
        <ul className={styles.horizontalScrollContainer}>
          {/* <HorizontalScroll> */}
          {allItems.data.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}{" "}
              <span> Time: {formatDate(reservation.time)}</span>
              <button onClick={() => handleViewMoreInfo(reservation.id)}>
                {selectedItem === reservation ? "Back" : "View Ticket"}
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
          {/* </HorizontalScroll> */}
        </ul>
      ) : (
        <p>No Active Listings</p>
      )}
    </section>
  );
}
