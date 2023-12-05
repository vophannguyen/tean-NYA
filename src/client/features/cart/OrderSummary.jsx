import { useNavigate } from "react-router";
import { useGetCartQuery } from "./cartSlice";
import "./ordersummary.less";
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
      <table className="cart-order">
        <thead>
          <th colSpan={2}>Order Summary</th>
        </thead>
        <tbody>
          <tr>
            <td>Original Price:</td>
            <td> {data.orderSummary.subTotal}</td>
          </tr>
          <tr>
            <td>Sale Tax :</td>
            <td>{data.orderSummary.saleTax}</td>
          </tr>
          <tr>
            <td>Total: </td>
            <td> {data.orderSummary.total}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>
              {show && (
                <button onClick={handleCheckout} className="order-botton">
                  Check Out
                </button>
              )}
            </th>
          </tr>
        </tfoot>
      </table>
    )
  );
}
