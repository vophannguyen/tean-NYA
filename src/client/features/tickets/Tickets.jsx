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
  const day = formatDay(ticket.time);
  const time = formatTime(ticket.time);

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <li key={ticket.id} className="ticket-card">
        <section className="flex1">
          <h3>{day}</h3>
        </section>
        <section className="flex2">
          <h2>{ticket.title}</h2>
          <p>
            {time} |{" "}
            {ticket.address1 + ", " + ticket.city + ", " + ticket.state}|
            {ticket.quantity} ticket(s)
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
  //check category when they hit link on Nav bar
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
  const [cityIn, setCityIn] = useState("city");
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
  function handleFilter() {
    ///resevation
    setCity(() => cityIn);
    if (category === "restaurants") {
      setFiltered(() => res.data);
      setIsSorted(() => true);
      //city
      //New York
      if (cityIn === "NewYork") {
        setFiltered(() => res.NewYork);
        const divTime = convertTimeTo(res.NewYork);
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
        return;
      }
      //
      //los Ange
      if (cityIn === "LosAng") {
        setFiltered(() => res.LosAng);
        const divTime = convertTimeTo(res.LosAng);
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
        return;
      }
      //
      //Chicago
      if (cityIn === "Chicago") {
        setFiltered(() => res.Chicago);
        const divTime = convertTimeTo(res.Chicago);
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
        return;
      }
      //
      //Boston
      if (cityIn === "Boston") {
        setFiltered(() => res.Boston);
        const divTime = convertTimeTo(res.Boston);
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
        return;
      }
      //end city
      return;
    }
    ///
    ///movies
    if (category === "movies") {
      setFiltered(() => movies.data);
      setIsSorted(() => true);
      //city
      //New York
      if (cityIn === "NewYork") {
        setFiltered(() => movies.NewYork);
        const divTime = convertTimeTo(movies.NewYork);
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
        return;
      }
      //
      //los Ange
      if (cityIn === "LosAng") {
        setFiltered(() => movies.LosAng);
        const divTime = convertTimeTo(movies.LosAng);
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
        return;
      }
      //
      //Chicago
      if (cityIn === "Chicago") {
        setFiltered(() => movies.Chicago);
        const divTime = convertTimeTo(movies.Chicago);
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
        return;
      }
      //
      //Boston
      if (cityIn === "Boston") {
        setFiltered(() => movies.Boston);
        const divTime = convertTimeTo(movies.Boston);
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
        return;
      }
      //end city
      return;
    }
    ////
    ///concert
    if (category === "concerts") {
      setFiltered(() => concerts.data);
      setIsSorted(() => true);
      //city
      //New York
      if (cityIn === "NewYork") {
        setFiltered(() => concerts.NewYork);
        const divTime = convertTimeTo(concerts.NewYork);
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
        return;
      }
      //
      //los Ange
      if (cityIn === "LosAng") {
        setFiltered(() => concerts.LosAng);
        const divTime = convertTimeTo(concerts.LosAng);
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
        return;
      }
      //
      //Chicago
      if (cityIn === "Chicago") {
        setFiltered(() => concerts.Chicago);
        const divTime = convertTimeTo(concerts.Chicago);
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
        return;
      }
      //
      //Boston
      if (cityIn === "Boston") {
        setFiltered(() => concerts.Boston);
        const divTime = convertTimeTo(concerts.Boston);
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
        return;
      }
      //end city
      return;
    }
    ///
    if (cityIn === "NewYork") {
      console.log(data.NewYork);
      setFiltered(() => data.NewYork);
      setIsSorted(() => true);
      const divTime = convertTimeTo(data.NewYork);
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
      return;
    }
    if (cityIn === "LosAng") {
      setFiltered(() => data.LosAng);
      setIsSorted(() => true);
      const divTime = convertTimeTo(data.LosAng);
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
      return;
    }
    if (cityIn === "Chicago") {
      setFiltered(() => data.Chicago);
      setIsSorted(() => true);
      const divTime = convertTimeTo(data.Chicago);
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
      return;
    }
    if (cityIn === "Boston") {
      setFiltered(() => data.Boston);
      setIsSorted(() => true);
      const divTime = convertTimeTo(data.Boston);
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
      return;
    }
    const divTime = convertTimeTo(tickets);
    //today
    if (time === "today") {
      setFiltered(() => divTime[0]);
      setIsSorted(() => true);
      return;
    }
    //
    //tomorrow
    if (time === "tomorrow") {
      setFiltered(() => divTime[1]);
      setIsSorted(() => true);
      return;
    }
    //
    //this week
    if (time === "week") {
      setFiltered(() => divTime[2]);
      setIsSorted(() => true);
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
      <form onSubmit={handleSearch} className="search-bar">
        <input type="text" name="search" placeholder="Search for Event..." />
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
        <section className="left">
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
        <aside className="right">
          {!isSorted ? (
            <Map tickets={tickets} single={false} city={city} />
          ) : (
            <Map tickets={filtered} single={false} city={city} />
          )}
        </aside>
      </section>
    </section>
  );
}
