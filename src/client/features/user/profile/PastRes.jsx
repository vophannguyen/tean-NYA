import { formatDate } from "../../utils/helpers";
import { useFetchUserReservationHistoryQuery } from "../userSlice";

export default function PastRes() {
  //use RTK to fetch data
  const {
    data: upcomingReservations,
    isLoading,
    error,
  } = useFetchUserReservationHistoryQuery();
  if (isLoading) {
    return <p>Loading... </p>;
  }
  if (error) {
    return (
      <p>Error fetching your upcoming reservations. Please try again later.</p>
    );
  }
  /**
   * hanlde pass reservation or ticket
   * compare time of ticket with current time
   * @returns []
   */
  const pastReservations = upcomingReservations.itemOrder.filter((item) => {
    return Date.parse(new Date(item.time)) < Date.now() ? true : false;
  });

  //render
  return (
    <div>
      <h2>Past Reservations</h2>
      {pastReservations && pastReservations.length > 0 ? (
        <ul>
          {pastReservations.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}{" "}
              <span> Time: {formatDate(reservation.time)}</span>
              {reservation.upload.endsWith(".pdf") ? (
                <embed
                  src={`http://localhost:10000${reservation.upload}`}
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No past reservations found.</p>
      )}
    </div>
  );
}
