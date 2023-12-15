import { useState } from "react";

export default function AccordianItem ({ title, content, key}) {
    const [active, setActive] = useState(false);

    const onToggle = () => {
        setActive(!active);
    };

    return (
        <article key={key}>
            <h2 onClick={onToggle}>{title}<span>
            {active ? "-" : "+"}</span>
            </h2>
            {active && <p>{content}</p>}
        </article>
    )
}