import {
  useGetTicketsQuery,
  useGetMoviesQuery,
  useGetConcertsQuery,
  useGetResQuery,
  useGetCityQuery,
} from "./ticketSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { convertTimeTo } from "../utils/helpers.js";
import "./tickets.less";
import Map from "./Map";
import { formatDay, formatTime } from "../utils/helpers";
import Spinner from "../utils/Spinner.jsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../utils/Button.jsx";
import SearchIcon from "@mui/icons-material/Search";
import Arrow from "../utils/Arrow";

//Basic functionality setup
const TicketCard = ({ ticket }) => {
  const month = formatDay(ticket.time);
  const time = formatTime(ticket.time);

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <li key={ticket.id} className="ticket-card">
        <section className="flex1">
          <h3>{month}</h3>
        </section>
        <section className="flex2">
          <h2>{ticket.title}</h2>
          <p>
            {time} | {" "}
            {ticket.address1 + ", " + ticket.city + ", " + ticket.state} | {ticket.quantity} ticket(s)
          </p>
        </section>
        <section className="flex3">
          <Arrow />
        </section>
      </li>
    </Link>
  );
};

/** Main interface for user to interact with their tickets */
export default function Tickets({ con, re, mo }) {
  const { data: tickets, isLoading, isError } = useGetTicketsQuery();
  const { data: movies } = useGetMoviesQuery();
  const { data: concerts } = useGetConcertsQuery();
  const { data: res } = useGetResQuery();
  const { data } = useGetCityQuery();
  ///
  //check category when they hit link on Nav bar: Concert, Moveis, Restaurants
  const fil =
    con?.length > 0 ? con : re?.length > 0 ? re : mo?.length > 0 ? mo : null;
  const sort =
    con?.length > 0
      ? true
      : re?.length > 0
      ? true
      : mo?.length > 0
      ? true
      : false;
  const cate =
    con?.length > 0
      ? "concerts"
      : re?.length > 0
      ? "restaurants"
      : mo?.length > 0
      ? "movies"
      : "events";
  //////end

  //
  ///filter
  const [isSorted, setIsSorted] = useState(sort);
  const [filtered, setFiltered] = useState(fil);
  const [city, setCity] = useState("US");
  const [cityIn, setCityIn] = useState("US");
  const [category, setCategory] = useState(cate);
  const [time, setTime] = useState("all");
  ///

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
    setIsSorted(() => true);
    const formData = new FormData(e.target);
    const search = formData.get("search");
    const searchTicket = tickets.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    setFiltered(() => searchTicket);
  };
  ////handleFilter
  function filterTime(data, time) {
    //Separate event to :today , tommorow, this week
    const divTime = convertTimeTo(data);
    //today
    if (time === "today") {
      setFiltered(() => divTime[0]);
      return;
    }
    //
    //tomorrow
    if (time === "tomorrow") {
      setFiltered(() => divTime[1]);
      return;
    }
    //
    //this week
    if (time === "week") {
      setFiltered(() => divTime[2]);
      return;
    }
    //
  }
  function filterCity(data, cityIn, time) {
    ///check city
    //NewYork
    if (cityIn === "NewYork") {
      setFiltered(() => data.NewYork);
      filterTime(data.NewYork, time);
      return;
    }
    //los Ange
    if (cityIn === "LosAng") {
      setFiltered(() => data.LosAng);
      filterTime(data.LosAng, time);
      return;
    }
    //Chicago
    if (cityIn === "Chicago") {
      setFiltered(() => data.Chicago);
      filterTime(data.Chicago, time);
      return;
    }
    //Boston
    if (cityIn === "Boston") {
      setFiltered(() => data.Boston);
      filterTime(data.Boston, time);
      return;
    }
  }
  function handleFilter() {
    ///resevation
    setCity(() => cityIn);
    if (category === "restaurants") {
      setFiltered(() => res.data);
      setIsSorted(() => true);
      filterCity(res, cityIn, time);
      if (cityIn === "US") {
        filterTime(res.data, time);
      }
      return;
    }
    ///movies
    if (category === "movies") {
      setFiltered(() => movies.data);
      setIsSorted(() => true);
      filterCity(movies, cityIn, time);
      if (cityIn === "US") {
        filterTime(movies.data, time);
      }

      return;
    }
    ///concert
    if (category === "concerts") {
      setFiltered(() => concerts.data);
      setIsSorted(() => true);
      filterCity(concerts, cityIn, time);
      if (cityIn === "US") {
        filterTime(concerts.data, time);
      }
      return;
    }
    ///All event
    if (category === "events") {
      setIsSorted(() => true);
      setFiltered(() => tickets);
      filterCity(data, cityIn, time);
      if (cityIn === "US") {
        filterTime(tickets, time);
      }
      return;
    }
    setIsSorted(() => false);
  }
  ///
  return (
    <section className="tickets-container">
      <section className="heading">
        <h1>LAST CHANCE EVENTS</h1>
      </section>
      <form onSubmit={handleSearch} autocomplete="off" className="search-bar">
        <input autocomplete="false" type="text" name="search" placeholder="Search for an event..." />
        <SearchIcon fontSize="large" />
      </form>
      <section className="sort">
        <select
          className="category-filter dropdown"
          name="categoryfilter"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        >
          {con?.length > 0 ? (
            <option value="concerts">Concerts</option>
          ) : re?.length > 0 ? (
            <option value="restaurants">Restaurants</option>
          ) : mo?.length > 0 ? (
            <option value="movies">Movies</option>
          ) : (
            <>
              <option value="events">Events</option>
              <option value="movies">Movies</option>
              <option value="concerts">Concerts</option>
              <option value="restaurants">Restaurants</option>
            </>
          )}
        </select>
        <select
          className="city-filter dropdown"
          name="cityfilter"
          type="text"
          onChange={(e) => setCityIn(e.target.value)}
        >
          <option value="US">City</option>
          <option value="NewYork">New York City</option>
          <option value="Boston">Boston</option>
          <option value="Chicago">Chicago</option>
          <option value="LosAng">Los Angeles</option>
        </select>
        <select
          className="date-filter dropdown"
          name="datefilter"
          type="text"
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="all">This Month</option>
          <option value="week">This Week</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="today">Today</option>
        </select>
        <button onClick={handleFilter}>
          <ArrowForwardIcon />
        </button>
      </section>
      <section className="content">
        <ul className="tickets">
            {!isSorted
              ? tickets?.map((ticket) => (
                  <TicketCard ticket={ticket} key={ticket.id} />
                ))
              : filtered?.map((ticket) => (
                  <TicketCard ticket={ticket} key={ticket.id} />
                ))}
        </ul>
        <Button onClick={() => window.scrollTo(0, 0)}>Back to the top</Button>
      </section>
    </section>
  );
}
