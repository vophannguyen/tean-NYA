import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
/** Show how much user should pay */
export default function OrderSummary({ data }) {
  // used Hook to get data from cartSlice, to navigate
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  //click checkout will direct to process check out
  function handleCheckout() {
    navigate("/cart/checkout");
  }
  return (
    <>
      <h1>Order Summary</h1>
      <p>Original Price: {cart.originPrice}</p>
      <p>Sale Tax :{cart.saleTax}</p>
      <p>Total: {cart.total}</p>
      {data && <button onClick={handleCheckout}>Check Out</button>}
    </>
  );
}
