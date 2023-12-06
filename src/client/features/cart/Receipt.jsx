import { useSelector } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useFetchUserReservationHistoryQuery } from "../user/userSlice";
import { useParams } from "react-router";
import { useGetRecieptQuery } from "./cartSlice";
import "./receipt.less";
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
  console.log(data.receipt.receipt);
  //create date time of receipt
  const date = Date.parse(new Date());

  return (
    data.receipt && (
      <section className="reciept-container">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Receipt of Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Invoice: </td>
              <td>#{id}</td>
            </tr>
            <tr>
              <td>Date&Time :</td>
              <td>{formatDate(date)}</td>
            </tr>
            <tr>
              <td>Subtotal: </td>
              <td>{data.receipt.receipt[0].subTotal}</td>
            </tr>
            <tr>
              <td>SaleTax: </td>
              <td>{data.receipt.receipt[0].saleTax}</td>
            </tr>
            <tr>
              <td>Total: </td>
              <td>{data.receipt.receipt[0].total}</td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  );
}
