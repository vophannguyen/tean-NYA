import {
  useGetTicketsQuery,
  useGetMoviesQuery,
  useGetConcertsQuery,
  useGetResQuery,
} from "./ticketSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  const { data: movies } = useGetMoviesQuery();
  const { data: concerts } = useGetConcertsQuery();
  const { data: res } = useGetResQuery();
  const [isSorted, setIsSorted] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [newTicket, setNewTicket] = useState(tickets);
  //pagination to be added ?
  //sorting feature - to be added?
  console.log(tickets);
  if (isError) {
    console.log("error");
  }
  //search bar -
  function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    const searchTicket = tickets.filter((item) => {
      // console.log(item.title);
      // console.log(item.title.includes(search));
      return item.title.includes(search);
    });
    setNewTicket(searchTicket);
  }
  //need to fix rerendering for every click on the same filter
  //(click movies once filter, click movies again make sure does not refilter)
  function onSortByMovie() {
    setFiltered(movies);
    setIsSorted(true);
  }
  function onSortByConcert() {
    setFiltered(concerts);
    setIsSorted(true);
  }

  function onSortByRes() {
    setFiltered(res);
    setIsSorted(true);
  }

  function onUndoSort() {
    setIsSorted(false);
  }

  return (
    <section>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search.." name="search" />
        <button>🔎</button>
      </form>
      <h1>Tickets</h1>
      <ul>
        <li>
          <button onClick={onSortByMovie}>Movies</button>
        </li>
        <li>
          <button onClick={onSortByConcert}>Concerts</button>
        </li>
        <li>
          <button onClick={onSortByRes}>Reservations</button>
        </li>
        {isSorted && (
          <li>
            <button onClick={onUndoSort}>All Tickets</button>
          </li>
        )}
      </ul>
      {isLoading && <span>insert a spinner...</span>}
      <ul>
        {!isSorted
          ? newTicket?.map((ticket) => (
              <TicketCard ticket={ticket} key={ticket.id} />
            ))
          : filtered?.map((ticket) => (
              <TicketCard ticket={ticket} key={ticket.id} />
            ))}
      </ul>
    </section>
  );
}
