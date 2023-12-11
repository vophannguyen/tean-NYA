import { formatDate } from "../../utils/helpers";
import { useState, useRef, useEffect } from "react";
import { useGetSoldItemQuery } from "../userSlice";
import "./profilelisting.less"

export default function SoldListings() {
  const { data: sold, isLoading, isError } = useGetSoldItemQuery();
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const scrl = useRef(null);

  
  const slide = (shift) => {
    const container = scrl.current;
    const targetScrollLeft = container.scrollLeft + shift;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  
    setScrollEnd(targetScrollLeft + container.clientWidth >= container.scrollWidth);
  };

  const scrollCheck = () => {
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

  useEffect(() => {
    if (
      scrl.current &&
      scrl?.current?.scrollWidth === scrl?.current?.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);

  const handleViewMoreInfo = (itemId) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === itemId ? null : itemId
    );
  };

  if (isLoading) {
    return <p>Loading.....</p>;
  }
  if (isError) {
    return <p>Error fetching sold items. Please try again later.</p>;
  }

  return (
    <section className="listing-body">
      <h2>Sold</h2>
      {sold && sold.length > 0 ? (
        <div className="scrollContainer">
          <button
          className="scrollButton-left"
          onClick={() => slide(-1000)}>
            {'<'}
          </button>
        <ul className="horizonalScrollContainer" ref={scrl} onScroll={scrollCheck}>
          {sold.map((reservation) => (
            <li key={reservation.id} className="active-card">
              {reservation.title}{" "}
              <span> Sold:{formatDate(reservation.createAt)}</span>
              <button onClick={() => handleViewMoreInfo(reservation.id)}>
                {selectedItem === reservation.id ? "Back" : "View Ticket"}
              </button>
              {selectedItem === reservation.id && (
                <div>
                  {reservation.upload.endsWith(".pdf") ? (
                    <embed
                      src={`http://localhost:10000/${reservation.upload}`}
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    />
                  ) : (
                    <img
                      src={`http://localhost:10000/${reservation.upload}`}
                      alt="wrong"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        <button
        className="scrollButton-right"
        onClick={() => slide(1000)}
        disabled={scrollEnd}
        >
          {'>'}
        </button>
        </div>
      ) : (
        <p>No sold items found.</p>
      )}
    </section>
  );
}
