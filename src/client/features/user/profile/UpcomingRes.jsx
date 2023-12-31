import { formatDate } from "../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useFetchUserReservationHistoryQuery } from "../userSlice";
import TicketModal from "./TicketModal";
import "./profilelisting.less"

export default function UpcomingRes() {
  // use RTK to fetch data
  const { data, isLoading, isError } = useFetchUserReservationHistoryQuery();
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const scrl = useRef(null);

  const slide = (shift) => {
    const container = scrl.current;
    const targetScrollLeft = container.scrollLeft + shift;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    setScrollEnd(
      targetScrollLeft + container.clientWidth >= container.scrollWidth
    );
  };

  const scrollCheck = () => {
    setScrollX(scrl.current.scrollLeft);
    if (
      (Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft),
      +scrl.current.offsetWidth)
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  const handleViewMoreInfo = (itemId) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === itemId ? null : itemId
    );
  };
  //use hook
  ///waiting data
  if (isLoading) {
    return;
  }
  if (isError) {
    return (
      <p>Error fetching your upcoming reservations. Please try again later.</p>
    );
  }
  // end waiting
  /**
   * hanlde up coming reservation or ticket
   * compare time of ticket with current time
   * @returns []
   */
  const upcoming = data.itemOrder.filter((item) => {
    return Date.parse(new Date(item.time)) > Date.now() ? true : false;
  });

  // render
  return (
    <section className="listing-body">
      {upcoming && upcoming.length > 0 ? (
        <div className="scrollContainer">
          {upcoming.length > 3 && (
            <button className="scrollButton-left" onClick={() => slide(-1000)}>
              {"<"}
            </button>
          )}
          <ul
            className="horizontalScrollContainer"
            ref={scrl}
            onScroll={scrollCheck}
          >
            {upcoming.map((reservation) => (
              <li key={reservation.id} className="active-card">
                {reservation.title}
                <span>{formatDate(reservation.time)}</span>
                <button onClick={() => handleViewMoreInfo(reservation.id)}>
                  {selectedItem === reservation.id ? "Back" : "View Ticket"}
                </button>
                {selectedItem === reservation.id && (
                  <TicketModal
                  src={`http://localhost:10000/${reservation.upload}`}
                    onClose={() => setSelectedItem(null)}
                  />
                )}
              </li>
            ))}
          </ul>
          {upcoming.length > 3 && (
            <button
              className="scrollButton-right"
              onClick={() => slide(890)}
              disabled={scrollEnd}
            >
              {">"}
            </button>
          )}
        </div>
      ) : (
        <p>No upcoming reservations found.</p>
      )}
    </section>
  );
}
