import { formatDate } from "../../utils/helpers";
import { useFetchAllUserItemsQuery, useDeleteItemMutation } from "../userSlice";

/** Show sell item of User */
export default function ActiveListings() {
  const { data: allItems, isLoading, isError } = useFetchAllUserItemsQuery();
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

  return (
    <section>
      <h2>Active</h2>
      {allItems && allItems.data.length > 0 ? (
        <ul>
          {allItems.data.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}
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
              <span>Time: {formatDate(reservation.time)}</span>
              {/* <button onClick={() => handleDelete(reservation.id)}>Delete</button> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Active Listings</p>
      )}
    </section>
  );
}
