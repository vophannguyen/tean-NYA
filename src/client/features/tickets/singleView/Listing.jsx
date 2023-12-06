import { useAddCartMutation } from "../../cart/cartSlice";
import { useGetByIdQuery } from "../ticketSlice";
import { useParams, useNavigate } from "react-router-dom";
import "./listing.less";
import { formatDate } from "../../utils/helpers";
import { useState } from "react";

/** Allows user to read, update, and delete a task */
export default function Listing() {
  const navigate = useNavigate();
  const [addCart] = useAddCartMutation();
  const { id } = useParams();
  const { data: ticket, isLoading, isError } = useGetByIdQuery(id);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  //waiting data
  if (isLoading) {
    return;
  }
  if (isError) {
    navigate("/*");
  }
  //end waiting

 //format date and time for client side
  const date = formatDate(ticket.data.time);

  /*todo: add events to Cart and redirect to events**/
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
      <section className="single-ticket">
        <img src="image.png" />
        <article>
          <h1 className="listing-title">{ticket.data.title}</h1>
          <p>{date}</p>
          <p>{ticket.data.quantity}</p>
          <p>{ticket.data.price}</p>
          <button
            className="view-more-button"
            onClick={() => setShowMoreInfo(!showMoreInfo)}
          >
            {showMoreInfo ? "Back" : "View More Info"}
          </button>
          <button className="listing-button" onClick={handleCart}>
            Add to Cart
          </button>
        </article>
        <figure>
          <p>geolocational map here?</p>
        </figure>
      </section>
    </>
  );
}
