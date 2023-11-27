import { useGetByIdQuery } from "./ticketSlice";
import { useParams, useNavigate } from "react-router-dom";

/** Allows user to read, update, and delete a task */
export default function Listing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: ticket, isLoading, isError } = useGetByIdQuery(id);
  
  //handle errors
  if (isLoading) {
    return;
  };
  if (isError) {
    navigate("/*");
  };

  return (
    <div>
      {ticket ? (
        <section>
          <article>
            <h1>{ticket.title}</h1>
            {/* <img src={data.imageUrl} alt={data.firstName} />
            <h2>First Name: {data.firstName}</h2>
            <h2>Last Name: {data.lastName}</h2>
            <h3>GPA: {data.gpa}</h3>
            <h3>Contact: {ticket.email}</h3> */}
          </article>
          <aside>
            <button>
              Like
            </button>
            <button>
              Add to Cart
            </button>
          </aside>
        </section>
      ) : (
        <p>Loading...(spinner)</p>
      )}
    </div>
  );
}
