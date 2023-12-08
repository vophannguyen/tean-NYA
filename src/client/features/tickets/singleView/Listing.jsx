import { useAddCartMutation } from "../../cart/cartSlice";
import { useGetByIdQuery } from "../ticketSlice";
import { useParams, useNavigate } from "react-router-dom";
import "./listing.less";
import { formatDay, formatTime } from "../../utils/helpers";
import Map from "../Map";

/** Allows user to view more information and add to cart */
export default function Listing() {
  //Hook
  const navigate = useNavigate();
  const { id } = useParams();

  //fetch data
  const [addCart] = useAddCartMutation();
  const { data: ticket, isLoading, isError } = useGetByIdQuery(id);

  //waiting data
  if (isLoading) {
    return;
  }
  if (isError) {
    navigate("/*");
  }
  //end waiting

  //format date and time for client side
  const day = formatDay(ticket.data.time);
  const time = formatTime(ticket.data.time)

  const handleReturn = () => {
    navigate("/");
  }

  /* Add events to Cart and redirect to events **/
  const handleCart = async () => {
    const token = sessionStorage.getItem("token");
    //need logged
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await addCart(id).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //todo: reformat listing date on front end
  //details needed for single view listing = category of the listing (movie, concert, reservation)
  return (
    <>
          <button onClick={handleReturn}>Back</button>
      <section className="single-view">
        <section className="map-left">
          <figure>
            <Map tickets={[ticket.data]}> </Map>
            <button>Get Directions</button>
          </figure>
        </section>
        <section className="info-right">
        <ul>
          <li>
              <h2>{day}</h2>
          </li>
          <li>
            <h1>{ticket.data.title}</h1>
          </li>
            <li>
              <h3>Start Time</h3>
              <p>{time}</p>
            </li>
            <li>
              <h3>Location</h3>
              <p>{ticket.data.address1}</p>
            </li>
            <li>
              <h3>Description</h3>
              <p>{ticket.data.description}</p>
            </li>
            <li>
              <h3>Quantity</h3>
              <p>{ticket.data.quantity}</p>
            </li>
            <li>
              <h3>Price</h3>
              { ticket.data.price === "0" ? <p>Free</p> : <p>$ {ticket.data.price}</p> }
            </li>
            <li>
              <h3>Location</h3>
              <p>{ticket.data.address1}</p>
            </li>
            <button className="listing-button" onClick={handleCart}>
            Get Tickets
            </button>
          </ul>
        </section>
      </section>
    </>
  );
}
