import Spinner from "../utils/Spinner";
import Tickets from "./Tickets";
import { useGetMoviesQuery } from "./ticketSlice";

/** View all concert  */
export default function Movies() {
  const { data, isLoading, isError } = useGetMoviesQuery();
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
  return <Tickets mo={data.data} />;
}
