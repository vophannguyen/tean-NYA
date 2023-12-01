import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div>
      <li>
        <Link to="/user/profile">My Profile</Link>
      </li>
      <li>
        <Link to="/user/order">Order History</Link>
      </li>
      <li>
        <Link to="/user/sellitem">Sell Tickets</Link>
      </li>
      <li>
        <Link to="/user/solditem">Sold Tickets</Link>
      </li>
      <li>
        <Link to="/user/payment">Payment</Link>
      </li>
    </div>
  );
}
