import { useCreateTicketMutation } from "./ticketSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Form for uploading a new listing */
export default function Upload() {
  const [createTicket] = useCreateTicketMutation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newTicket = {
      title: formData.get("title"),
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Category
        <input name="title" type="text" placeholder="Enter a title" required />
      </label>
      <label>
        Description
      <input name="description" type="text" placeholder="Enter a description" required />
      </label>
      <label>
        Price
        <input name="price" type="number" placeholder="Enter ticket price" />
      </label>
      
      <input
        name="gpa"
        type="number"
        inputMode="decimal"
        min={0.0}
        max={4.0}
        step="0.01"
        placeholder="GPA"
      />
      <button type="submit">
        Create Listing
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
