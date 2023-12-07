import { formatDate } from "../../utils/helpers";
import { useFetchUserReservationHistoryQuery } from "../userSlice";

export default function UpcomingRes() {
  // use RTK to fetch data
  const { data, isLoading, isError } = useFetchUserReservationHistoryQuery();
  //use hook
  ///waiting data
  if (isLoading) {
    return;
  }
  if (isError) {
    return (
      <p>Error fetching your upcoming reservations. Please try again later.</p>
    );
  }
  // end waiting
  /**
   * hanlde up coming reservation or ticket
   * compare time of ticket with current time
   * @returns []
   */
  const upcoming = data.itemOrder.filter((item) => {
    return Date.parse(new Date(item.time)) > Date.now() ? true : false;
  });

  // render
  return (
    <div>
      <h2>Upcoming</h2>
      {upcoming && upcoming.length > 0 ? (
        <ul>
          {upcoming.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}
              <span> Time: {formatDate(reservation.time)}</span>
              {reservation.upload.endsWith(".pdf") ? (
                <embed
                  src={`http://localhost:3000/${reservation.upload}`}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              ) : (
                <img
                  src={`http://localhost:3000/${reservation.upload}`}
                  alt="wrong"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming reservations found.</p>
      )}
    </div>
  );
}
