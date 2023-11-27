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

  //todo: reformat listing date on front end
  //details needed for single view listing = category of the listing (movie, concert, reservation)
  return (
    <div>
      {ticket ? (
        <section>
          <article>
            <h1>{ticket.title}</h1>
            <p>Need to add the date of event</p>
            <p>{ticket.time}</p>
            <p>{ticket.description}</p>
            <button>
              Like
            </button>
            <button>
              Add to Cart
            </button>
          </article>
          <figure>
            <h1>geolocational map here?</h1>
          </figure>
        </section>
      ) : (
        <p>Loading...(insert a spinner)</p>
      )}
    </div>
  );
}
