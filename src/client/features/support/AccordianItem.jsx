export default function AccordianItem({ item, onClick }) {
  return (
    <section className="accordian">
      <article key={item.id}>
        <h2>{item.title}</h2>
        {item.active && <p>{item.content}</p>}
      </article>
      <button className="show-hide" onClick={onClick}>
        {!item.active ? "+" : "-"}
      </button>
    </section>
  );
}
