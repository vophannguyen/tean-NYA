import {
  useGetTicketsQuery,
  useGetMoviesQuery,
  useGetConcertsQuery,
  useGetResQuery,
} from "./ticketSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatDate, mapLocation } from "../utils/helpers.js";
import "./tickets.less";
import Map from "./Map";
import { formatDay, formatTime } from "../utils/helpers";

//Basic functionality setup
const TicketCard = ({ ticket }) => {
  const day = formatDay(ticket.time);
  const time = formatTime(ticket.time);

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <li key={ticket.id} className="ticket-card">
        <h2>{ticket.title}</h2>
        <section>
          <p>{day} {time}</p>
          <p>{ticket.address1}</p>
          <p>{ticket.quantity}</p>
        </section>
      </li>
    </Link>
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
    return;
  }
  if (isLoading) {
    return <span>insert a spinner...</span>;
  }
  //search bar
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearch(() => true);
    const formData = new FormData(e.target);
    const search = formData.get("search");
    const searchTicket = tickets.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    setNewTicket(searchTicket);
  };

  searchTicket = tickets;
  if (isSearch) {
    searchTicket = newTicket;
  }

  //need to fix rerendering for every click on the same filter
  //(click movies once filter, click movies again make sure does not refilter)
  const handleCategory = (e) => {
    if (e.target.value === "movies") {
      setFiltered([...movies]);
      setIsSorted(true);
    } else if (e.target.value === "concerts") {
      setFiltered(concerts);
      setIsSorted(true);
    } else if (e.target.value === "restaurants") {
      setFiltered(res);
      setIsSorted(true);
    } else {
      setIsSorted(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSearch} className="search-bar">
        <input type="text" placeholder="Search Event" name="search" />
      </form>
      <section className="heading">
        <h1>
          New York City{" "}
          <span>
            <select
              className="category-filter dropdown"
              name="categoryfilter"
              type="text"
              onChange={handleCategory}
            >
              <option value="events">Events</option>
              <option value="movies">Movies</option>
              <option value="concerts">Concerts</option>
              <option value="restaurants">Restaurants</option>
            </select>
          </span>
        </h1>
      </section>
      <section className="content">
        <section className="left">
          <section className="sort">
            <button>Today</button>
            <button>Tomorrow</button>
            <button>This Week</button>
          </section>
          <ul className="tickets">
            {!isSorted
              ? searchTicket?.map((ticket) => (
                  <TicketCard ticket={ticket} key={ticket.id} />
                ))
              : filtered?.map((ticket) => (
                  <TicketCard ticket={ticket} key={ticket.id} />
                ))}
          </ul>
        </section>
        <aside className="right">
          {!isSorted ? (
            <Map tickets={searchTicket} single={false} />
          ) : (
            <Map tickets={filtered} single={false} />
          )}
        </aside>
      </section>
    </section>
  );
}
