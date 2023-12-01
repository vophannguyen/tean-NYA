import { formatDate } from "../../utils/helpers";
import { useFetchUserReservationHistoryQuery } from "../userSlice";

export default function UpcomingRes() {
  const {
    data: upcomingReservations,
    isLoading,
    error,
  } = useFetchUserReservationHistoryQuery();
  if (isLoading) {
    return;
  }
  if (error) {
    return (
      <p>Error fetching your upcoming reservations. Please try again later.</p>
    );
  }
  const upcoming = upcomingReservations.data.filter((item) => {
    console.log(Date.parse(new Date(item.time)));
    console.log("now", Date.now());
    return Date.parse(new Date(item.time)) > Date.now() ? true : false;
  });
  console.log("upcoming", upcoming);
  return (
    <div>
      <h2>Upcoming</h2>
      {upcoming && upcoming.length > 0 ? (
        <ul>
          {upcoming.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}{" "}
              <span>Time: {formatDate(reservation.time)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming reservations found.</p>
      )}
    </div>
  );
}
