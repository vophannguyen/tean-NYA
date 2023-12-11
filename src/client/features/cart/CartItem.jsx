import Countdown from "react-countdown";
import { cartTimeCountDownt, formatDate } from "../utils/helpers";
import { useDeleteCartMutation } from "./cartSlice";
import ClearIcon from "@mui/icons-material/Clear";

/** View single item, allows user check out */
export default function CartItem({ data }) {
  //used RTK to fectch data
  const [deleteIteminCart] = useDeleteCartMutation();

  // get time when user added to cart and convert to parse()
  const currentTime = Date.parse(new Date(data.createAt));

  // handle when user clicked on deleteItem
  async function handleDeleteItem() {
    await deleteIteminCart(data.id);
  }

  // convert 2024-01-01T02:56:17.000Z to ex:Dec 31, 09:56 PM
  const time = formatDate(data.item.time);

  //Count down time
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  /** show all item in cart and countdown...
   * item will be delete when countdown completed */
  return (
    data && (
      <tbody>
        <tr>
          <td className="cart-countdown">
            <Countdown
              date={cartTimeCountDownt(20, currentTime)}
              renderer={renderer}
              onComplete={async () => {
                await handleDeleteItem();
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <h1>{data.item.title}</h1>

            {/* <p>{data.data.description}</p> */}
          </td>
          <td>
            <p>{time}</p>
          </td>
          <td>
            <p>{data.item.price}</p>
          </td>
          <td>{data.item.quantity}</td>
          <td>10$</td>
          <td>
            <button onClick={handleDeleteItem}>
              <ClearIcon />
            </button>
          </td>
        </tr>
      </tbody>
    )
  );
}
