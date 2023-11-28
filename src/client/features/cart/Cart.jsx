import CartItem from "./CartItem";
import { useGetCartQuery } from "./cartSlice";

export default function Cart() {
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
    </div>
  );
}
