import { useState } from "react";
import { formatDate } from "../../utils/helpers";
import { useFetchAllUserItemsQuery, useDeleteItemMutation } from "../userSlice";
// import HorizontalScroll from "react-horizontal-scroll"
import styles from "./activelisting.less"

/** Show sell item of User */
export default function ActiveListings() {
  const { data: allItems, isLoading, isError } = useFetchAllUserItemsQuery();
  const [selectedItem, setSelectedItem]  = useState(null);
  // const [deleteItem] = useDeleteItemMutation();

  // const handleDelete = async (itemId) => {
  //   try {
  //     await deleteItem(itemId);
  //   } catch (error) {
  //     console.error("Failed to delete item:", error.message);
  //   }
  // };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <p>Error Fetching Your Reservations</p>;
  }

  const handleViewMoreInfo = (itemId) =>{
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
             <li
             key={reservation.id}
             className="reservationCard"
           >
              {reservation.title}
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
              <span>Time: {formatDate(reservation.time)}</span>
              {/* <button onClick={() => handleDelete(reservation.id)}>Delete</button> */}
              <button onClick={() => handleViewMoreInfo(reservation.id)}>
                {selectedItem === reservation.id ? 'Back' : 'View Ticket'}
              </button>
              {selectedItem === reservation.id && (
                <div>
                      <embed
                      src={`http://localhost:3000/${reservation.upload}`}
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    />
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
