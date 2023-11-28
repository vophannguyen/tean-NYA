import { useDispatch, useSelector } from "react-redux";

export default function OrderSummary({ data }) {
  const cartPrice = useSelector((state) => state.cart);

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Original Price: {cartPrice.originPrice}</p>
      <p>Sale Tax :{cartPrice.saleTax}</p>
      <p>Total: {cartPrice.total}</p>
      <button>Check Out</button>
    </div>
  );
}
