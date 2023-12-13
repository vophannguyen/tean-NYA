import { useState, useRef, useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import { useFetchAllUserItemsQuery } from "../userSlice";
import "./profilelisting.less";
import TicketModal from "./TicketModal"; // Import the TicketModal component

export default function ActiveListings() {
  const { data: allItems, isLoading, isError } = useFetchAllUserItemsQuery();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalSrc, setModalSrc] = useState(null); // Track modal content
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
    console.log("Scroll check!");
    setScrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
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

    if (selectedItem !== itemId) {
      const selectedItemData = allItems.data.find((item) => item.id === itemId);

      setModalSrc(
        `http://localhost:10000/${selectedItemData.upload}`
      );
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalSrc(null);
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Error Fetching Your Reservations</p>;
  }

  return (
    <section className="listing-body">
      {allItems && allItems.data.length > 0 ? (
        <div className="scrollContainer">
          {allItems.data.length > 3 && (
            <button className="scrollButton-left" onClick={() => slide(-1000)}>
              {"<"}
            </button>
          )}
          <ul
            className="horizontalScrollContainer"
            ref={scrl}
            onScroll={scrollCheck}
          >
            {allItems.data.map((reservation) => (
              <li key={reservation.id} className="active-card">
                {reservation.title}{" "}
                <span> Time: {formatDate(reservation.time)}</span>
                <button onClick={() => handleViewMoreInfo(reservation.id)}>
                  View Ticket
                </button>
                {selectedItem === reservation.id && (
                  <TicketModal src={modalSrc} onClose={closeModal} />
                )}
              </li>
            ))}
          </ul>
          {allItems.data.length > 3 && (
            <button className="scrollButton-right" onClick={() => slide(890)}>
              {">"}
            </button>
          )}
        </div>
      ) : (
        <p>No Active Listings</p>
      )}
    </section>
  );
}