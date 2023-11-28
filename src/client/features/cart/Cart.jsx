import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { addPrice, resetPrice, useGetCartQuery } from "./cartSlice";
import ProcessCheckout from "./ProcessCheckout";

export default function Cart() {
  const dispatch = useDispatch();
  // dispatch(addPrice(10));
  const { isloading, isError, data } = useGetCartQuery();
  if (isloading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  return (
    <div>
      {data?.message && <h1>Cart empty</h1>}
      {data?.data &&
        data.data.map((item) => {
          return <CartItem reservation={item} key={item.id} />;
        })}
      <ProcessCheckout />
    </div>
  );
}
