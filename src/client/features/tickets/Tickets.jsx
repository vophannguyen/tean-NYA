import { useGetTicketsQuery } from "./ticketSlice";

//Basic functionality setup
const TicketCard = ({ ticket }) => {
  return (
    <li>
        <Link to={`/${id}`}>{ticket.title}</Link>
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
    console.log(err);
  };

  return (
    <section>
      <h1>Tickets</h1>
      {isLoading && <span>insert a spinner...</span>}
      <ul>
        {tickets?.map((ticket) => (
          <TicketCard
            ticket={ticket}
            key={ticket.id}
          />
        ))}
      </ul>
    </section>
  );
}
