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
  ///filter
  const [cityIn, setCityIn] = useState("city");
  const [category, setCategory] = useState("Events");
  <option value="week">This Week</option>;
  const [time, setTime] = useState("all");
  ///
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
      setFiltered([...movies.data]);
      setIsSorted(true);
    } else if (e.target.value === "concerts") {
      setFiltered(concerts.data);
      setIsSorted(true);
    } else if (e.target.value === "restaurants") {
      setFiltered(res.data);
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
      return;
    }
    if (e.target.value === "LosAng") {
      setFiltered(() => data.LosAng);
      setIsSorted(true);
      return;
    }
    if (e.target.value === "Chicago") {
      setFiltered(() => data.Chicago);
      setIsSorted(true);
      return;
    }
    if (e.target.value === "Boston") {
      setFiltered(() => data.Boston);
      setIsSorted(true);
      return;
    }
    setIsSorted(false);
  };
  ////handleFilter
  function handleFilter() {
    console.log(category, cityIn, time);
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
    ////
    ///concert
    if (category === "concerts") {
      setFiltered(() => concerts.data);
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
    setIsSorted(() => false);
  }
  ///
  return (
    <section className="tickets-container">
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
              <option value="LosAng">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Boston">Boston</option>
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
      <section className="sort">
        <p>Filter</p>
        <select
          className="category-filter dropdown"
          name="categoryfilter"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="events">Events</option>
          <option value="movies">Movies</option>
          <option value="concerts">Concerts</option>
          <option value="restaurants">Restaurants</option>
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
          <option value="all">All Time</option>
          <option value="week">This Week</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="today">Today</option>
        </select>
        <button onClick={handleFilter}>SR</button>
      </section>
      <section className="content">
        <section className="left">
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
