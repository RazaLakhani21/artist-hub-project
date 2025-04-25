import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axiosInstance";
import styles from "./artistDetail.module.css";

function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get(`/reviews?artistId=${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setArtist(res.data);
      } catch (error) {
        console.error("Error fetching artist detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading)
    return <p className={styles.loading}>Loading artist details...</p>;
  if (!artist) return <p className={styles.notFound}>Artist not found</p>;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.profile}>
        <img src={artist.image} alt={artist.name} className={styles.image} />
        <div className={styles.info}>
          <h2>{artist.name}</h2>
          <p>{artist.description}</p>
          <p>
            <strong>Email:</strong> {artist.email}
          </p>
          <p>
            <strong>Role:</strong> {artist.role}
          </p>
          <button className={styles.hireBtn}>Hire Artist</button>
          <Link to={`/book-artist/${artist.id}`} className={styles.hireBtn}>
            Book Now
          </Link>
          <Link to={`/review/${artist.id}`} className={styles.hireBtn}>
            Leave Review
          </Link>

          <Link to="/artists" className={styles.backButton}>
            ← Back to List
          </Link>
        </div>
      </div>

      {artist.projects && artist.projects.length > 0 && (
        <div className={styles.gallery}>
          <h3>Past Projects</h3>
          <div className={styles.grid}>
            {artist.projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <img src={project.img} alt={project.title} />
                <p>{project.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {reviews.length > 0 && (
        <div className={styles.reviews}>
          <h3>Reviews</h3>
          {reviews.map((r) => (
            <div key={r.id} className={styles.reviewCard}>
              <strong>{r.customerName}</strong> - {r.rating}★<p>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtistDetail;
