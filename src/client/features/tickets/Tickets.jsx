import {
  useGetTicketsQuery,
  useGetMoviesQuery,
  useGetConcertsQuery,
  useGetResQuery,
  useGetCityQuery,
} from "./ticketSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { convertTimeTo, formatDate, mapLocation } from "../utils/helpers.js";
import "./tickets.less";
import Map from "./Map";
import { formatDay, formatTime } from "../utils/helpers";
import Spinner from "../utils/Spinner.jsx";

//Basic functionality setup
const TicketCard = ({ ticket }) => {
  const day = formatDay(ticket.time);
  const time = formatTime(ticket.time);

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <li key={ticket.id} className="ticket-card">
        <h2>{ticket.title}</h2>
        <section>
          <p>
            {day} {time}
          </p>
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
  const { data } = useGetCityQuery();

  const [isSorted, setIsSorted] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [newTicket, setNewTicket] = useState(tickets);
  const [isSearch, setIsSearch] = useState(false);
  const [city, setCity] = useState("US");
  let searchTicket = null;

  if (isError) {
    return;
  }
  if (isLoading) {
    return (
      <span>
        <Spinner /> Loading...
      </span>
    );
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
  const handleCity = (e) => {
    setCity(() => e.target.value);
    if (e.target.value === "NewYork") {
      setFiltered(() => data.NewYork);
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
          <span>
            <select
              className="category-filter dropdown"
              name="categoryfilter"
              type="text"
              onChange={handleCity}
            >
              <option value="US">US</option>
              <option value="NewYork">NewYork</option>
            </select>
          </span>
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
            <Map tickets={searchTicket} single={false} city={city} />
          ) : (
            <Map tickets={filtered} single={false} city={city} />
          )}
        </aside>
      </section>
    </section>
  );
}
