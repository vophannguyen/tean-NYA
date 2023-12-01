import { useState } from "react";
import OrderSummary from "./OrderSummary";
import {
  resetCart,
  useAddOrderMutation,
  useAddPaymentMutation,
  useDeleteCartMutation,
  useDeleteTicketMutation,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Receipt from "./Receipt";
import { useAddSoldItemMutation } from "../user/userSlice";

export default function ProcessCheckout() {
  const [method, setMethod] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [experiedDay, setExperiedDay] = useState("");
  const [addOrder] = useAddOrderMutation();
  const [deleteTicket] = useDeleteTicketMutation();
  const [deleteIteminCart] = useDeleteCartMutation();
  const [addPayment] = useAddPaymentMutation();
  const [addSold] = useAddSoldItemMutation();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handlePurchase(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataPayment = {
      method: formData.get("method"),
      nameOnCard: formData.get("nameOnCard"),
      cardNumber: formData.get("cardNumber"),
      securityCode: formData.get("securityCode"),
      experiedDay: formData.get("experiedDay"),
    };
    // {
    //   title,
    //   category,
    //   description,
    //   price,
    //   upload,
    //   time,
    //   address1,
    //   address2,
    //   city,
    //   state,
    //   zip,
    //   country,
    //   },
    console.log(cart);
    console.log(formData.get("method"));
    cart.forEach(async (element) => {
      try {
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
        await addOrder(data).unwrap();
        await addSold(data);
        // console.log("process", respon);
        ///delete
        await deleteTicket(element.data.id).unwrap();
        const respon = await addPayment(dataPayment);
        console.log("payment", respon);
      } catch (err) {
        console.error(err);
      }
    });
    dispatch(resetCart());
    // const receipt = useSelector((state) => state.cart.receipt);
    // console.log(receipt);
    navigate("/cart/checkout/receipt");
  }
  return (
    <div>
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
    </div>
  );
}
