import AccordianItem from "./AccordianItem";
import faqsData from "./faqsData";
import About from "./About";
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
            <About />
            <section className="faqs" id="faq">
                <h1 className="heading-small">Frequently Asked Questions</h1>
                {activeAccordians.map((item) => (
                  <AccordianItem key={item.id} item={item} onClick={() => handleToggle(item.id)} />
                ))}
            </section>
            <section className="contact" id="contact">
                <h1 className="heading-small">Contact Us</h1>
                <p>Email us at support@lastchancenyc.com</p>
            </section>
        </section>
    )
}