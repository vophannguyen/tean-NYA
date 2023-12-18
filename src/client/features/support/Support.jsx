import AccordianItem from "./AccordianItem";
import faqsData from "./faqsData";
import { useState } from "react";
import "./support.less";

export default function Support() {
    const [activeAccordians, setActiveAccordians] = useState(faqsData);

    const handleToggle = (id) => {
        const updatedAccordians = activeAccordians.map((accordian) => {
            if (accordian.id === id) {
                return {...accordian, active: !accordian.active}
            } else {
                return {...accordian, active: false}
            };
        });
        setActiveAccordians(updatedAccordians);
    };
    return(
        <section className="support-container">
            <section className="faqs">
                <h1 className="heading-support">Frequently Asked Questions</h1>
                {activeAccordians.map((item) => (
                  <AccordianItem key={item.id} item={item} onClick={() => handleToggle(item.id)} />
                ))}
            </section>
            <section className="contact" id="contact">
                <h1 className="heading-support">Contact Us</h1>
                <p>support@lastchancenyc.com</p>
            </section>
        </section>
    )
}