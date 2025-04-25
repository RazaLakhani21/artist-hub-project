import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axiosInstance";
import styles from "./reviewForm.module.css";

function ReviewForm() {
  const { id } = useParams(); // artist ID
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      artistId: parseInt(id),
      customerName,
      rating,
      comment,
    };

    try {
      await API.post("/reviews", newReview);
      alert("Thanks for your feedback!");
      navigate(`/artists/${id}`);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
          ))}
        </select>
        <textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;