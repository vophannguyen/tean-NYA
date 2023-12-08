import { useCreateTicketMutation } from "../ticketSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.less";
// import LocationInput from "./LocationInput";

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
    try {
      const response = await createTicket(formData).unwrap();
      if (response.message) {
        setMessage(() => response.message);
      }
      if (response.data) {
        e.target.reset();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="upload-form">
      <legend>List Event Tickets</legend>
      <section className="input-group">
        <select name="category" type="text" required>
          <option value="movie">Movie</option>
          <option value="concert">Concert</option>
          <option value="reservation">Reservation</option>
        </select>
        <input name="title" type="text" placeholder="Title" required />
        <input
          name="description"
          type="text"
          placeholder="Description"
          required
        />
        <input name="price" type="number" placeholder="Price per ticket" />
        <select name="quantity" type="number">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <input
          type="datetime-local"
          name="time"
          min="2023-11-28T00:00"
          max="2025-01-01T00:00"
          required
        />
        <input type="file" name="upload" required />
        <input
          type="text"
          name="address1"
          placeholder="Street Adress e.g., 123 Main St"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City e.g., Brooklyn"
          required
        />
        <input type="text" name="state" placeholder="State e.g., NY" required />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code e.g., 1211"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country e.g., USA"
          required
        />
      </section>
      {/* <label>
        Location
       <LocationInput />
      </label> */}
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
}
