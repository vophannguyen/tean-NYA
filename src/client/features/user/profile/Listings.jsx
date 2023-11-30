import { useFetchAllUserItemsQuery } from "../userSlice";
import ActiveListings from "./ActiveListings";
import SoldListings from "./SoldListings";
export default function Listings() {
  const { data: allItems, isLoading, error } = useFetchAllUserItemsQuery();
console.log("allItems", allItems)
  if (error) {
    return <p>Error Fetching Your Reservations</p>;
  }
  //   console.log(allItems?.data);
  return (
    <section>
      <h1>Your Listings</h1>
      <ActiveListings />
      <SoldListings />
    </section>
    )
}
