import {
  useGetTicketsQuery,
  useGetMoviesQuery,
  useGetConcertsQuery,
  useGetResQuery,
} from "./ticketSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import Map from "./Map";

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
  const [isSearch, setIsSearch] = useState(false);
  let searchTicket = null;

  if (isError) {
    console.log("error");
  };
  if (isLoading) {
    <span>insert a spinner...</span>;
  };
  

  //search bar
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearch(() => true);
    const formData = new FormData(e.target);
    const search = formData.get("search");
    const searchTicket = tickets.filter((item) => {
      return item.title.includes(search);
    });
    setNewTicket(searchTicket);
  };

  searchTicket = tickets;
  if (isSearch) {
    searchTicket = newTicket;
  };
  //need to fix rerendering for every click on the same filter
  //(click movies once filter, click movies again make sure does not refilter)
  const onSortByMovie = () => {
    setFiltered(movies);
    setIsSorted(true);
  };
  const onSortByConcert = () => {
    setFiltered(concerts);
    setIsSorted(true);
  };

  const onSortByRes = () => {
    setFiltered(res);
    setIsSorted(true);
  };

  const onUndoSort = () => {
    setIsSorted(false);
  };

  const onFilterLocation = () => {};

  return (
    <section>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search.." name="search" />
      </form>
      <h1>
        Events in New York City
        <span>
          <select
            className="location-filter"
            onChange={onFilterLocation}
            name="locationfilter"
            type="text"
          >
            <option value="New York City">New York City</option>
            <option value="Manhattan">Manhattan</option>
            <option value="Brooklyn">Brooklyn</option>
            <option value="Queens">Queens</option>
            <option value="Bronx">Bronx</option>
            <option value="Staten Island">Staten Island</option>
          </select>
        </span>
      </h1>
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
      <ul>
        {!isSorted
          ? searchTicket?.map((ticket) => (
              <TicketCard ticket={ticket} key={ticket.id} />
            ))
          : filtered?.map((ticket) => (
              <TicketCard ticket={ticket} key={ticket.id} />
            ))}
      </ul>
      <aside>
        <Map />
      </aside>
    </section>
  );
}
