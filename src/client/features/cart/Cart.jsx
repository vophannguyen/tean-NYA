import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { useGetCartQuery } from "./cartSlice";
import OrderSummary from "./OrderSummary";
import "./cart.less";
/** Show all events  in cart and check out  */
export default function Cart() {
  // used RTK to fetch ticket in cart
  const { isLoading, isError, data } = useGetCartQuery();
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  /** check if there are data => render all events ,else Cart empty
   * CartItem will  single view item
   * OrderSummary will show subtotal ,sale tax and total
   */
  return (
    <section className="cart-container">
      {data?.message && <h1>Cart empty</h1>}
      <h1 className="cart-title">Your Cart</h1>
      <table className="cart-item">
        <thead>
          <tr>
            <th>Events</th>
            <th>Time</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        {data?.data &&
          data.data.map((item) => {
            return (
              <CartItem data={item} key={item.id} cartTime={item.createAt} />
            );
          })}
      </table>
      <article>{data?.data && <OrderSummary show={true} />}</article>
    </section>
  );
}
