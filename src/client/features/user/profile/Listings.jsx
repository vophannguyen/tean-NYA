import { useFetchAllUserItemsQuery } from "../userSlice";
import ActiveListings from "./ActiveListings";
import SoldListings from "./SoldListings";
export default function Listings() {
  const { data: allItems, isLoading, error } = useFetchAllUserItemsQuery();
  if (error) {
    return <p>Error Fetching Your Reservations</p>;
  }
  return (
    <section>
      <ActiveListings />
      <SoldListings />
    </section>
  );
}
