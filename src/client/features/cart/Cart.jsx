import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { useGetCartQuery } from "./cartSlice";
import ProcessCheckout from "./ProcessCheckout";
import { useNavigate } from "react-router";
import OrderSummary from "./OrderSummary";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      {/* <ProcessCheckout /> */}
      <OrderSummary />
    </div>
  );
}
