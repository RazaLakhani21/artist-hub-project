import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axiosInstance";

function BookArtist() {
  const { id } = useParams(); // artist ID
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerName, setCustomerName] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    const newBooking = {
      artistId: id,
      customerName,
      date,
      time,
    };

    try {
      await API.post("/bookings", newBooking);
      alert("Booking Confirmed!");
      navigate("/artists");
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Book Artist</h2>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookArtist;
