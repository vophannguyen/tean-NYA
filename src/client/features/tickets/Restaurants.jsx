import Spinner from "../utils/Spinner";
import Tickets from "./Tickets";
import { useGetResQuery } from "./ticketSlice";

/** View all concert  */
export default function Restaurants() {
  const { data, isLoading, isError } = useGetResQuery();
  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading ...
      </p>
    );
  }
  if (isError) {
    return;
  }
  return <Tickets re={data.data} />;
}
