import Countdown from "react-countdown";
import { useGetByIdQuery } from "../tickets/ticketSlice";
import { cartTimeCountDownt, formatDate } from "../utils/helpers";
import { useDeleteCartMutation } from "./cartSlice";

export default function CartItem({ reservation }) {
  const [deleteItem] = useDeleteCartMutation();
  // console.log(reservation.itemId);
  // const timeClock = run_clock(10);
  // console.log(timeClock);
  const { data, isLoading, isError } = useGetByIdQuery(reservation.itemId);
  async function handleDeleteItem() {
    const respon = await deleteItem(reservation.id);
    // console.log(respon);
  }
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  //Count down time
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      handleDeleteItem();
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  const time = formatDate(data.time);
  let date = Date.now() + 10000;
  return (
    <>
      <Countdown date={cartTimeCountDownt(1)} renderer={renderer} />
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>{time}</p>
          <p>{data.description}</p>
          <p>{data.price}</p>
          <button onClick={handleDeleteItem}>deleteItem</button>
        </div>
      )}
    </>
  );
}
