import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function OrderSummary({ data }) {
  const cartPrice = useSelector((state) => state.cart);
  const navigate = useNavigate();
  function handleCheckout() {
    navigate("/cart/checkout");
  }
  return (
    <div>
      <h1>Order Summary</h1>
      <p>Original Price: {cartPrice.originPrice}</p>
      <p>Sale Tax :{cartPrice.saleTax}</p>
      <p>Total: {cartPrice.total}</p>
      <button onClick={handleCheckout}>Check Out</button>
    </div>
  );
}
