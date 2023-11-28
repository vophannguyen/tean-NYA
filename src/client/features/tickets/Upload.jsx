import { useCreateTicketMutation } from "./ticketSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Form for uploading a new listing */
export default function Upload() {
  const [createTicket] = useCreateTicketMutation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newTicket = {
      title: formData.get("title"),
      category: formData.get("category"),
      description: formData.get("description"),
      time: formData.get("time"),
      price: +formData.get("price") || 0,
      address1: formData.get("address1"),
      address2: formData.get("address2"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      country: formData.get("country"),
    };

    console.log(newTicket);

  //   try {
  //     if (!isValid) {
  //       setMessage("Required: valid email address");
  //     } else {
  //       const response = await createTicket(newTicket).unwrap();
  //       // console.log(response);
  //       if (response.message) {
  //         setMessage(() => response.message);
  //       }
  //       if (response.ticket) {
  //         e.target.reset();
  //       }
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <legend>Upload A Ticket</legend>
      <label>
        Category
        <select name="category" type="text" required>
            <option value="movie">Movie</option>
            <option value="concert">Concert</option>
            <option value="reservation">Reservation</option>
        </select>
      </label>
      <label>
        Title
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
      <label>
        Date & Time 
        <input
          type="datetime-local"
          name="time"
          min="2023-11-28T00:00"
          max="2025-01-01T00:00"
          required
        />
      </label>
      <label>
        Upload a ticket
        <input type="file" name="upload" required />
      </label>
      <label>
        Location
        <input type="text" name="location" placeholder="e.g., City, Country"></input>
      </label>
      <button type="submit">
        Create Listing
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
