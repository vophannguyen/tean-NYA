import { useSelector } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useFetchUserReservationHistoryQuery } from "../user/userSlice";
import { useParams } from "react-router";
import { useGetRecieptQuery } from "./cartSlice";
/** Show receipt */
export default function Receipt() {
  //use hook
  const { id } = useParams();
  const { data, isLoading, error } = useGetRecieptQuery(id);
  ///waiting data
  if (isLoading) {
    return;
  }
  if (error) {
    return (
      <p>Error fetching your upcoming reservations. Please try again later.</p>
    );
  }
  //end waiting

  //create date time of receipt
  const date = Date.parse(new Date());

  return (
    data.receipt && (
      <>
        <h1>Receipt of Payment</h1>
        <ul>
          <li>{formatDate(date)}</li>
          <li>SubTotal: {data.receipt.subTotal}$</li>
          <li>SaleTax:{data.receipt.saleTax}$</li>
          <li>Total: {data.receipt.total}$</li>
        </ul>
      </>
    )
  );
}
