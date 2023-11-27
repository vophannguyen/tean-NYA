import { useGetByIdQuery } from "./ticketSlice";
import { useParams, useNavigate } from "react-router-dom";

/** Allows user to read, update, and delete a task */
export default function Listing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: ticket, isLoading, isError } = useGetByIdQuery(id);
  console.log(ticket);
  //handle errors
  if (isLoading) {
    return;
  };
  if (isError) {
    navigate("/*");
  };
  
  const handleCart = () => {
    
  };

  const handleLike = () => {
    
  };

  //todo: reformat listing date on front end
  //details needed for single view listing = category of the listing (movie, concert, reservation)
  return (
    <div>
      {ticket ? (
        <section>
          <img src="image.png"></img>
          <article>
            <h1>{ticket.title}</h1>
            <p>{ticket.time}</p>
            <p>{ticket.description}</p>
            <button onLike={handleLike}>
              Like GUI
            </button>
            <button onClick={handleCart}>
              Add to Cart
            </button>
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
