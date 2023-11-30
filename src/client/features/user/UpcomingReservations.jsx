import { useFetchUserReservationHistoryQuery } from "./userSlice";

export default function UpcomingReservations() {
  const {
    data: upcomingReservations,
    isLoading,
    error,
  } = useFetchUpcomingReservationsQuery();

  console.log("upcomingReservations", upcomingReservations);
  console.log("isLoading", isLoading);
  console.log("error", error);

  if (error) {
    return (
      <p>Error fetching your upcoming reservations. Please try again later.</p>
    );
  }
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Upcoming Reservations</h1>
      {upcoming && upcoming.length > 0 ? (
        <ul>
          {upcomingReservations.data.map((reservation) => (
            <li key={reservation.id}>{reservation.title}</li>
          ))}
        </ul>
      ) : (
        <p>No upcoming reservations found.</p>
      )}
    </div>
  );
}
