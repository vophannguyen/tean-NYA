import { useSelector } from "react-redux";
import { useGetTicketsQuery } from "./ticketSlice";
import { Link } from "react-router-dom";
import { selectToken } from "../auth/authSlice";

//Basic functionality setup
const TicketCard = ({ ticket }) => {
  return (
    <li>
      <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
    </li>
  );
};

/** Main interface for user to interact with their tickets */
export default function Tickets() {
  const { data: tickets, isLoading, isError } = useGetTicketsQuery();
  //pagination to be added ?
  // const [page, setPage] = useState(1);
  // const perPage = 30;
  // const offset = perPage * (page - 1);
  // const totalPages = Math.ceil(students.length / perPage);
  // const paginatedTickets = tickets.slice(offset, perPage * page);

  // const handleNext = () => {
  //   setPage(page + 1);
  // };

  // const handlePrev = () => {
  //   setPage(page - 1);
  // };

  //sorting feature - to be added?

  if (isError) {
    console.log("error");
  }
  //search bar -
  function handleSearch(e) {
    e.preventDefult();
  }
  return (
    <section>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search.." name="search" />
      </form>
      <h1>Tickets</h1>
      {isLoading && <span>insert a spinner...</span>}
      <ul>
        {tickets?.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))}
      </ul>
    </section>
  );
}
