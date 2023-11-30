import Countdown from "react-countdown";
import { useGetByIdQuery } from "../tickets/ticketSlice";
import { cartTimeCountDownt, formatDate } from "../utils/helpers";
import { deleteItem, resetCart, useDeleteCartMutation } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "./OrderSummary";

export default function CartItem({ reservation }) {
  const [deleteIteminCart] = useDeleteCartMutation();
  const dispatch = useDispatch();
  console.log(reservation);
  const currentTime = Date.parse(new Date(reservation.createAt));
  console.log("dsd", currentTime);
  // console.log(reservation.itemId);
  // const timeClock = run_clock(10);
  // console.log(timeClock);
  const { data, isLoading, isError } = useGetByIdQuery(reservation.itemId);
  async function handleDeleteItem() {
    const respon = await deleteIteminCart(reservation.id);
    // console.log(respon.data.data.itemId);
    dispatch(deleteItem(respon?.data?.data.itemId));
    // dispatch(resetCart());
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
      // handleDeleteItem();
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  // console.log(data);
  const time = formatDate(data?.data.time);
  //update order summary
  // dispatch(addPrice(data.price));
  // const originalPrice = useSelector((state) => state.cart);
  // console, log(originalPrice);
  return (
    <>
      <Countdown
        date={cartTimeCountDownt(1, currentTime)}
        renderer={renderer}
        onComplete={async () => {
          await handleDeleteItem();
        }}
      />
      {data && (
        <div>
          <h1>{data.data.title}</h1>
          <p>{time}</p>
          <p>{data.data.description}</p>
          <p>{data.data.price}</p>
          <button onClick={handleDeleteItem}>deleteItem</button>
        </div>
      )}
      {/* <OrderSummary data={data} /> */}
    </>
  );
}
