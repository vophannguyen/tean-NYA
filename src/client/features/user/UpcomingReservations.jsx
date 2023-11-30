import { useFetchUpcomingReservationsQuery } from "./userSlice";

export default function UpcomingReservations() {
  const {
    data: upcomingReservations,
    isLoading,
    error,
  } = useFetchUpcomingReservationsQuery();

  if (error) {
    return (
      <p>Error fetching your upcoming reservations. Please try again later.</p>
    );
  }
  console.log(upcomingReservations.data);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Upcoming Reservations</h1>
      {upcomingReservations && upcomingReservations.data.length > 0 ? (
        <ul>
          {UpcomingReservations.data.map((reservation) => (
            <li key={reservation.id}>{reservation.title}</li>
          ))}
        </ul>
      ) : (
        <p>No upcoming reservations found.</p>
      )}
    </div>
  );
}
