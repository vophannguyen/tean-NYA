import { useCreateTicketMutation } from "./ticketSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationInput from "./LocationInput";

/** Form for uploading a new listing accessible only to those logged in*/
export default function Upload() {
  const [createTicket] = useCreateTicketMutation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  //if not logged in, redirect to login/register
  //once logged in, redirect the page back to the upload (this page)
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newTicket = {
      time: formData.get("time"),
      title: formData.get("title"),
      category: formData.get("category"),
      description: formData.get("description"),
      price: formData.get("price") || 0,
      quantity: formData.get("quantity") || 1,
      upload: formData.get("upload"),
      address1: formData.get("address1"),
      address2: formData.get("address2") || "Address2",
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      country: formData.get("country"),
    };
    console.log(newTicket);

    try {
      const response = await createTicket(newTicket).unwrap();
      console.log(response);
      if (response.message) {
        setMessage(() => response.message);
      }
      if (response.ticket) {
        e.target.reset();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
        <input
          name="description"
          type="text"
          placeholder="Enter a description"
          required
        />
      </label>
      <label>
        Price
        <input name="price" type="number" placeholder="Enter ticket price" />
      </label>
      <label>
        Quantity
        <select name="quantity" type="number">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
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
        Address
        <input
          type="text"
          name="address1"
          placeholder="e.g., 123 Main St"
          required
        />
      </label>
      <label>
        City
        <input type="text" name="city" placeholder="e.g., Brooklyn" required />
      </label>
      <label>
        State
        <input type="text" name="state" placeholder="e.g., NY" required />
      </label>
      <label>
        Zip
        <input type="text" name="zip" placeholder="e.g., 11222" required />
      </label>
      <label>
        Country
        <input type="text" name="country" placeholder="e.g., USA" required />
      </label>
      <button type="submit">Create Listing</button>
      {message && <p>{message}</p>}
    </form>
  );
}
