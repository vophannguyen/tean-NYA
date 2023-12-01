import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function OrderSummary({ data }) {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  console.log(cart);
  function handleCheckout() {
    navigate("/cart/checkout");
  }
  return (
    <div>
      <h1>Order Summary</h1>
      <p>Original Price: {cart.originPrice}</p>
      <p>Sale Tax :{cart.saleTax}</p>
      <p>Total: {cart.total}</p>
      {data && <button onClick={handleCheckout}>Check Out</button>}
    </div>
  );
}
