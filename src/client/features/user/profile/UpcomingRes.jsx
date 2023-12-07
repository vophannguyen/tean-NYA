import { formatDate } from "../../utils/helpers";
import { useFetchUserReservationHistoryQuery } from "../userSlice";

export default function UpcomingRes() {
  // use RTK to fetch data
  const { data, isLoading, error } = useFetchUserReservationHistoryQuery();
  //use hook
  ///waiting data
  if (isLoading) {
    return;
  }
  if (error) {
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming reservations found.</p>
      )}
    </div>
  );
}
