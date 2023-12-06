import PastRes from "./PastRes";
import UpcomingRes from "./UpcomingRes";
import "../profile.css"
export default function Reservations() {
    return (
        <section>
            <h1>Reservations</h1>
            <UpcomingRes />
            <PastRes />
        </section>
    );
}