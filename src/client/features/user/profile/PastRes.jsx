import { formatDate } from "../../utils/helpers";
import { useFetchUserReservationHistoryQuery } from "../userSlice";

export default function PastRes() {
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
  const upcoming = upcomingReservations.data.filter((item) => {
    console.log(Date.parse(new Date(item.time)));
    console.log("now", Date.now());
    return Date.parse(new Date(item.time)) < Date.now() ? true : false;
  });
  console.log(upcoming);
  return (
    <div>
      <h2>Past Reservations</h2>
      {upcoming && upcoming.length > 0 ? (
        <ul>
          {upcoming.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}{" "}
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
