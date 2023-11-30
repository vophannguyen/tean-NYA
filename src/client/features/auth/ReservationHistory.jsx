import { useFetchUserReservationHistoryQuery } from "./authSlice";

export default function ReservationHistory() {
  const {
    data: reservationHistory,
    isLoading,
    error,
  } = useFetchUserReservationHistoryQuery();

  if (error) {
    return <p>Error fetching reservation history. Please try again later.</p>;
  }
  //   console.log(reservationHistory.data);
  return isLoading ? (
    <p> Loading... </p>
  ) : (
    <div>
      <h1>Past Reservations</h1>
      {reservationHistory && reservationHistory.data.length > 0 ? (
        <ul>
          {reservationHistory.data.map((reservation) => (
            <li key={reservation.id}>{reservation.title}</li>
          ))}
        </ul>
      ) : (
        <p>No reservation history found.</p>
      )}
    </div>
  );
}
