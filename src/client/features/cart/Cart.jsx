import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { useGetCartQuery } from "./cartSlice";
import OrderSummary from "./OrderSummary";

/** Show all events add to cart and check out  */
export default function Cart() {
  // used RTK to fetch ticket it added to cart
  const { isloading, isError, data } = useGetCartQuery();
  if (isloading) {
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
    <section>
      {data?.message && <h1>Cart empty</h1>}
      {data?.data &&
        data.data.map((item) => {
          return <CartItem reservation={item} key={item.id} />;
        })}
      {data?.data && <OrderSummary data={true} />}
    </section>
  );
}
