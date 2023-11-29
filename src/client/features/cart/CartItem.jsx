import Countdown from "react-countdown";
import { useGetByIdQuery } from "../tickets/ticketSlice";
import { cartTimeCountDownt, formatDate } from "../utils/helpers";
import { deleteItem, resetCart, useDeleteCartMutation } from "./cartSlice";
import { useDispatch } from "react-redux";
import OrderSummary from "./OrderSummary";

export default function CartItem({ reservation }) {
  const [deleteIteminCart] = useDeleteCartMutation();
  const dispatch = useDispatch();
  // console.log(reservation.itemId);
  // const timeClock = run_clock(10);
  // console.log(timeClock);
  const { data, isLoading, isError } = useGetByIdQuery(reservation.itemId);
  async function handleDeleteItem() {
    const respon = await deleteIteminCart(reservation.id);
    // console.log(respon.data.data.itemId);
    dispatch(deleteItem(respon.data.data.itemId));
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
  //update order summary
  // dispatch(addPrice(data.price));
  // const originalPrice = useSelector((state) => state.cart);
  // console, log(originalPrice);
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
          <OrderSummary data={data} />
        </div>
      )}
    </>
  );
}
