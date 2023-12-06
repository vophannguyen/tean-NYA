import { useDispatch } from "react-redux";
import { useAddCartMutation } from "../../cart/cartSlice";
import { useGetByIdQuery } from "../ticketSlice";
import { useParams, useNavigate } from "react-router-dom";
import "./listing.less";
import { useState } from "react";

/** Allows user to read, update, and delete a task */
export default function Listing() {
  const navigate = useNavigate();
  const [addCart] = useAddCartMutation();
  const { id } = useParams();
  const { data: ticket, isLoading, isError } = useGetByIdQuery(id);
  const dispatch = useDispatch();
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  //waiting data
  if (isLoading) {
    return;
  }
  if (isError) {
    navigate("/*");
  }
  //end waiting

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

  const handleLike = () => {};

  //todo: reformat listing date on front end
  //details needed for single view listing = category of the listing (movie, concert, reservation)
  return (
    <div className="single-ticket">
    <section className={`ticket ${showMoreInfo ? "show-more-info" : ""}`}>
      <article className="ticket-info">
        <div>
          <h1 className="listing-title">{ticket.data.title}</h1>
          <p>{ticket.data.time}</p>
          <p>{ticket.data.quantity}</p>
          <button
            className="view-more-button"
            onClick={() => setShowMoreInfo(!showMoreInfo)}
          >
            {showMoreInfo ? "Back" : "View More Info"}
          </button>
          <button className="listing-button" onClick={handleCart}>
            Add to Cart
          </button>
        </div>
      </article>
      {showMoreInfo && (
        <div className="additional-info">
          <img src="image.png" alt="Ticket Preview" />
         <p>{ticket.data.description}</p>
            </div>
      )}
    </section>
  </div>
)};