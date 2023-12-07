import "./button.less";

export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="botton">
      {children}
    </button>
  );
}
