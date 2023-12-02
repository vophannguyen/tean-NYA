import { useState } from "react";
import OrderSummary from "./OrderSummary";
import {
  resetCart,
  useAddOrderMutation,
  useAddPaymentMutation,
  useDeleteTicketMutation,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAddSoldItemMutation } from "../user/userSlice";

/** show payment form
 * when user click purchase :
 * - delete all item in cart
 * - push all in order table (backend)
 * - push to solditem table
 */
export default function ProcessCheckout() {
  //use RTK to fectch and store data
  const [addOrder] = useAddOrderMutation();
  const [deleteTicket] = useDeleteTicketMutation();
  const [addPayment] = useAddPaymentMutation();
  const [addSold] = useAddSoldItemMutation();

  // use Hook
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** click purchase function will do:
   * - add paymnet method to payment table
   * - add order history to order table
   * - add to solditem table
   * - delete all item in item table
   */
  async function handlePurchase(e) {
    e.preventDefault();
    //user formadata
    const formData = new FormData(e.target);
    const dataPayment = {
      method: formData.get("method"),
      nameOnCard: formData.get("nameOnCard"),
      cardNumber: formData.get("cardNumber"),
      securityCode: formData.get("securityCode"),
      experiedDay: formData.get("experiedDay"),
    };

    ///add paymnet method to payment table
    await addPayment(dataPayment).unwrap();

    /// for each item add to : order table - solditem table - delete in item table
    cart.forEach(async (element) => {
      try {
        //get all data need it
        const data = {
          title: element.data.title,
          category: element.data.category,
          description: element.data.description,
          price: element.data.price,
          upload: element.data.upload,
          time: element.data.time,
          address1: element.location.address1,
          address2: element.location.address2,
          city: element.location.city,
          state: element.location.state,
          zip: element.location.zip,
          country: element.location.country,
          userId: element.data.userId,
        };
        //add to order table
        await addOrder(data).unwrap();

        //add to sold item table
        await addSold(data).unwrap();

        // delete item of item table
        await deleteTicket(element.data.id).unwrap();
      } catch (err) {
        console.error(err);
      }
    });

    /// reset cart to empty
    dispatch(resetCart());
    // direct to receipt component
    navigate("/cart/checkout/receipt");
  }
  return (
    <>
      <h1>Check out</h1>
      <form onSubmit={handlePurchase}>
        <h2>Payment Method</h2>
        <select name="method" id="cars">
          <option value="credit card">Credit Card</option>

          <option value="paypal">Paypal</option>
        </select>
        <input
          type="text"
          name="nameOnCard"
          placeholder="Name on card"
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="💳 Card Number"
          required
        />
        <input type="text" name="securityCode" placeholder="🔐 CVC" />
        <input
          type="text"
          name="experiedDay"
          id=""
          maxLength={7}
          placeholder="MM/YY"
        />
        <button>Complete Purchase</button>
      </form>
      <OrderSummary data={false} />
    </>
  );
}
