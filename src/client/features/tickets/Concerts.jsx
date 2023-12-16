import Spinner from "../utils/Spinner";
import Tickets from "./Tickets";
import { useGetConcertsQuery } from "./ticketSlice";

/** View all concert  */
export default function Concerts() {
  const { data, isLoading, isError } = useGetConcertsQuery();
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
  return <Tickets con={data.data} />;
}
