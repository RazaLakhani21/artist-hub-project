import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import styles from "./bookingList.module.css";

function BookingList({ forAdmin = false, customerName = "" }) {
  const [bookings, setBookings] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, artistRes] = await Promise.all([
          API.get("/bookings"),
          API.get("/users"),
        ]);
        const onlyArtists = artistRes.data.filter((u) => u.role === "artist");
        setArtists(onlyArtists);

        // Filter bookings for customer
        if (forAdmin) {
          setBookings(bookingRes.data);
        } else {
          const filtered = bookingRes.data.filter(
            (b) => b.customerName.toLowerCase() === customerName.toLowerCase()
          );
          setBookings(filtered);
        }
      } catch (err) {
        console.error("Error loading bookings:", err);
      }
    };

    fetchData();
  }, [forAdmin, customerName]);

  const getArtistName = (id) => {
    const found = artists.find((a) => a.id === parseInt(id));
    return found ? found.name : "Unknown";
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm("Cancel this booking?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className={styles.bookingContainer}>
      <h2>{forAdmin ? "All Bookings" : "My Bookings"}</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className={styles.list}>
          {bookings.map((b) => (
            <li key={b.id} className={styles.item}>
              <strong>{b.customerName}</strong> booked <strong>{getArtistName(b.artistId)}</strong> <br />
              <em>{b.date}</em> at <em>{b.time}</em>
              <br />
              <button
                onClick={() => deleteBooking(b.id)}
                className={styles.cancelBtn}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingList;
