import { useSelector } from "react-redux";
import { formatDate } from "../utils/helpers";

export default function Receipt() {
  const receipt = useSelector((state) => state.cart.receipt);
  console.log(receipt.cart[0]);
  const date = Date.parse(new Date());
  return (
    receipt.cart.length > 0 && (
      <div>
        <h1>Receipt of Payment</h1>
        <ul>
          <li>{formatDate(date)}</li>
          {receipt.cart[0].map((item) => {
            return (
              <li key={item.data.id}>
                {item.data.title} <span> : {item.data.price}$</span>
              </li>
            );
          })}
          <li>SubTotal: {receipt.originPrice}$</li>
          <li>SaleTax:{receipt.saleTax}$</li>
          <li>Total: {receipt.total}$</li>
        </ul>
      </div>
    )
  );
}
