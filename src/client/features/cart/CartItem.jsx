import Countdown from "react-countdown";
import { useGetByIdQuery } from "../tickets/ticketSlice";
import { cartTimeCountDownt, formatDate } from "../utils/helpers";
import { deleteItem, resetCart, useDeleteCartMutation } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "./OrderSummary";
/** Render single item  */
export default function CartItem({ reservation }) {
  //used RTK to fectch data
  const [deleteIteminCart] = useDeleteCartMutation();
  const { data, isLoading, isError } = useGetByIdQuery(reservation.itemId);

  // used Hook
  const dispatch = useDispatch();

  // get time when user added to cart and convert to parse()
  const currentTime = Date.parse(new Date(reservation.createAt));

  // handle when user click on deleteItem
  async function handleDeleteItem() {
    const respon = await deleteIteminCart(reservation.id);
    dispatch(deleteItem(respon?.data?.data.itemId));
  }

  /// waiting data
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  ///end waiting get data

  // convert 2024-01-01T02:56:17.000Z to ex:Dec 31, 09:56 PM
  const time = formatDate(data?.data.time);

  //Count down time
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  /** show all item in cart and countdown... item will be delete when countdown completed */
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
        <>
          <h1>{data.data.title}</h1>
          <p>{time}</p>
          <p>{data.data.description}</p>
          <p>{data.data.price}</p>
          <button onClick={handleDeleteItem}>deleteItem</button>
        </>
      )}
      <OrderSummary data={false} />
    </>
  );
}
