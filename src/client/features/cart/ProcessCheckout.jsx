import OrderSummary from "./OrderSummary";
import {
  useAddOrderMutation,
  useAddPaymentMutation,
  useDeleteTicketMutation,
  useGetCartQuery,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAddSoldItemMutation } from "../user/userSlice";
import "./process.less";
/** show payment form
 * when user click purchase :
 * - delete all item in cart
 * - push all in order table (backend)
 * - push to solditem table
 */
export default function ProcessCheckout() {
  // used RTK to fetch ticket it added to cart
  const { isLoading, isError, data } = useGetCartQuery();
  //use RTK to fectch and store data
  const [addOrder] = useAddOrderMutation();
  const [deleteTicket] = useDeleteTicketMutation();
  const [addPayment] = useAddPaymentMutation();
  const [addSold] = useAddSoldItemMutation();

  // use Hook
  const navigate = useNavigate();

  /** click purchase function will do:
   * - add paymnet method to payment table
   * - add order history to order table
   * - add to solditem table
   * - delete all item in item table
   */
  async function handlePurchase(e) {
    e.preventDefault();
    let cart = [];
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
    // await addPayment(dataPayment).unwrap();

    /// for each item add to : order table - solditem table - delete in item table
    console.log(data.data);
    data.data.forEach(async (element) => {
      try {
        cart.push(element.item);
        //get all data need it
        const data = {
          title: element.item.title,
          category: element.item.category,
          description: element.item.description,
          price: element.item.price,
          upload: element.item.upload,
          time: element.item.time,
          quantity: element.item.quantity,
          address1: element.item.address1,
          address2: element.item.address2,
          city: element.item.city,
          state: element.item.state,
          zip: element.item.zip,
          country: element.item.country,
          userId: element.item.userId,
        };
        // //add to order table
        // await addOrder(data).unwrap();
        //add to sold item table
        await addSold(data).unwrap();
        // delete item of item table
        await deleteTicket(element.item.id).unwrap();
      } catch (err) {
        console.error(err);
      }
    });
    const cartData = {
      cart,
      receipt: data.orderSummary,
    };
    const respon = await addOrder(cartData).unwrap();
    // direct to receipt component
    navigate(`/cart/checkout/receipt/${respon.data.id}`);
  }
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  return (
    <section className="process-container">
      <form onSubmit={handlePurchase} className="process-payment">
        <h1>Payment Method</h1>
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
        <button className="process-botton">Complete Purchase</button>
      </form>
      <article>
        <OrderSummary show={false} />
      </article>
    </section>
  );
}
