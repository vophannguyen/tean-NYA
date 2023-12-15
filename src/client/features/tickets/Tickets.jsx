import {
  useGetTicketsQuery,
  useGetMoviesQuery,
  useGetConcertsQuery,
  useGetResQuery,
  useGetCityQuery,
  useGetFilterQuery,
} from "./ticketSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { convertTimeTo, formatDate, mapLocation } from "../utils/helpers.js";
import "./tickets.less";
import Map from "./Map";
import { formatDay, formatTime } from "../utils/helpers";
import Spinner from "../utils/Spinner.jsx";
import Arrow from "react-horizontal-scroll/lib/components/arrow.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../utils/Button.jsx";
import SearchIcon from "@mui/icons-material/Search";

//Basic functionality setup
const TicketCard = ({ ticket }) => {
  const day = formatDay(ticket.time);
  const time = formatTime(ticket.time);
  const iconStyle = {
    width: "48px",
    height: "48px",
  };

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
          <ArrowOutwardIcon style={iconStyle} />
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
    setIsSorted(() => true);
    const formData = new FormData(e.target);
    const search = formData.get("search");
    const searchTicket = tickets.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    setFiltered(() => searchTicket);
  };

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
