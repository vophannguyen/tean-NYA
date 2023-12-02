import { useDispatch } from "react-redux";
import {
  addCurrentTime,
  addTicket,
  useAddCartMutation,
} from "../../cart/cartSlice";
import { useGetByIdQuery } from "../ticketSlice";
import { useParams, useNavigate } from "react-router-dom";

/** Allows user to read, update, and delete a task */
export default function Listing() {
  const navigate = useNavigate();
  const [addCart] = useAddCartMutation();
  const { id } = useParams();
  const { data: ticket, isLoading, isError } = useGetByIdQuery(id);
  const dispatch = useDispatch();

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
      await dispatch(addTicket(ticket));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = () => {};

  //todo: reformat listing date on front end
  //details needed for single view listing = category of the listing (movie, concert, reservation)
  return (
    <div>
      {ticket ? (
        <section>
          <img src="image.png"></img>
          <article>
            <h1>{ticket.data.title}</h1>
            <p>{ticket.data.time}</p>
            <p>{ticket.data.description}</p>
            <button onClick={handleCart}>Add to Cart</button>
          </article>
          <figure>
            <p>geolocational map here?</p>
          </figure>
        </section>
      ) : (
        <p>Loading...(insert a spinner)</p>
      )}
    </div>
  );
}
