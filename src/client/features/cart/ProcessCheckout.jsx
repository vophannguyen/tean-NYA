import OrderSummary from "./OrderSummary";

export default function ProcessCheckout() {
  return (
    <div>
      <h1>Check out</h1>
      <form action="">
        <h2>Payment Method</h2>
        <input type="checkbox" name="credit" id="credit" />
        <label htmlFor="credit">Credit Card</label>
        <input type="text" placeholder="Name on card" required />
        <input type="email" placeholder="💳 Card Number" required />
        <input type="email" placeholder="🔐 CVC" />
        <input
          type="email"
          name=""
          id=""
          pattern="\d{2}/\d{2}"
          placeholder="MM/YY"
        />
        <button>Complete Purchase</button>
      </form>
      <OrderSummary />
    </div>
  );
}
