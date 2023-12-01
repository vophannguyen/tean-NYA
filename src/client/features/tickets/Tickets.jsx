import { useGetTicketsQuery, useGetMoviesQuery, useGetConcertsQuery, useGetResQuery } from "./ticketSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

//Basic functionality setup
const TicketCard = ({ ticket }) => {
  return (
    <ul>
      <li>
        <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
      </li>
    </ul>
  );
};

/** Main interface for user to interact with their tickets */
export default function Tickets() {
  const { data: tickets, isLoading, isError } = useGetTicketsQuery();
  const { data: movies } = useGetMoviesQuery();
  const { data: concerts } = useGetConcertsQuery();
  const { data: res } = useGetResQuery();
  const [ isSorted, setIsSorted ] = useState(false);
  const [ filtered, setFiltered ] = useState(null);
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
  };
  function onSortByConcert() {
    setFiltered(concerts);
    setIsSorted(true);
  };

  function onSortByRes() {
    setFiltered(res);
    setIsSorted(true);
  };

  function onUndoSort() {
    setIsSorted(false);
  };

  function onFilterLocation() {

  };

  return (
    <section>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search.." name="search" />
      </form>
      <h1>EVENTS IN 
      <span>
        <select className="location-filter" onChange={onFilterLocation} name="locationfilter" type="text">
          <option value="1">NYC</option>
          <option value="2">MANHATTAN</option>
          <option value="3">BROOKLYN</option>
          <option value="4">QUEENS</option>
          <option value="5">BRONX</option>
          <option value="6">STATEN ISLAND</option>
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
        {isSorted && 
          <li>
            <button onClick={onUndoSort}>All Tickets</button>
          </li>}
      </ul>
      {isLoading && <span>insert a spinner...</span>}
      <ul>
        {!isSorted ? tickets?.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        )) : filtered?.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))
        }
      </ul>
      <aside>
        <iframe></iframe>
      </aside>
    </section>
  );
}
