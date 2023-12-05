import { useNavigate } from "react-router";
import { useGetCartQuery } from "./cartSlice";

/** Show how much user should pay */
export default function OrderSummary({ show }) {
  const navigate = useNavigate();
  // used RTK to fetch ticket it added to cart
  const { isLoading, isError, data } = useGetCartQuery();
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  // used Hook to get data from cartSlice, to navigate
  //click checkout will direct to process check out
  function handleCheckout() {
    navigate("/cart/checkout");
  }
  return (
    data && (
      <>
        <h1>Order Summary</h1>
        <p>Original Price: {data.orderSummary.subTotal}</p>
        <p>Sale Tax :{data.orderSummary.saleTax}</p>
        <p>Total: {data.orderSummary.total}</p>
        {show && <button onClick={handleCheckout}>Check Out</button>}
      </>
    )
  );
}
