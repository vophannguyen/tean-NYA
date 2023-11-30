import { useState } from "react";
import OrderSummary from "./OrderSummary";
import {
  resetCart,
  useAddOrderMutation,
  useDeleteCartMutation,
  useDeleteTicketMutation,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Receipt from "./Receipt";

export default function ProcessCheckout() {
  const [method, setMethod] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [experiedDay, setExperiedDay] = useState("");
  const [addOrder] = useAddOrderMutation();
  const [deleteTicket] = useDeleteTicketMutation();
  const [deleteIteminCart] = useDeleteCartMutation();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handlePurchase(e) {
    e.preventDefault();
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
        };
        const respon = await addOrder(data);
        console.log("process", respon);
        ///delete
        const deleteT = await deleteTicket(element.data.id);
        console.log("dele", deleteT);
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
        <input type="checkbox" name="credit" id="credit" />
        <label htmlFor="credit">Credit Card</label>
        <input type="text" placeholder="Name on card" required />
        <input type="text" placeholder="💳 Card Number" required />
        <input type="text" placeholder="🔐 CVC" />
        <input type="text" name="" id="" maxLength={7} placeholder="MM/YY" />
        <button>Complete Purchase</button>
      </form>
      <OrderSummary />
    </div>
  );
}
