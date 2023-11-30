import { useSelector } from "react-redux";
import { useGetTicketsQuery } from "./ticketSlice";
import { Link } from "react-router-dom";
import { selectToken } from "../auth/authSlice";
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
  const [newTicket, setNewTicket] = useState(tickets);
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
  // console.log(newTicket);
  return (
    <section>
      {tickets && (
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search.." name="search" />
          <button>🔎</button>
          <h1>Tickets</h1>
          {isLoading && <span>insert a spinner...</span>}
          <ul>
            {newTicket?.map((ticket) => (
              <TicketCard ticket={ticket} key={ticket.id} />
            ))}
          </ul>
        </form>
      )}
    </section>
  );
}
