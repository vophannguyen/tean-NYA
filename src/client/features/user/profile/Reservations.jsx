import PastRes from "./PastRes";
import UpcomingRes from "./UpcomingRes";
export default function Reservations() {
    return (
        <section>
            <h1>Reservations</h1>
            <UpcomingRes />
            <PastRes />
        </section>
    );
}