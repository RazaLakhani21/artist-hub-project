import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import ArtistCard from "../components/ArtistCard";
import styles from "./admin.module.css";
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch artists from API
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await API.get("/users");
        const onlyArtists = response.data.filter(
          (user) => user.role === "artist"
        );
        setArtists(onlyArtists);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Delete an artist
  const deleteArtist = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;
  
    try {
      await API.delete(`/users/${id}`); // Corrected here
      setArtists((prevArtists) => prevArtists.filter((artist) => artist.id !== id));
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  
  return (
    <div className={styles.adminContainer}>
      {/* <Navbar /> */}
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={() => navigate("/add-artist")}>Add Artist</button>
      </div>

      {loading && <p>Loading artists...</p>}
      {error && <p>Error fetching artists: {error.message}</p>}

      <div className={styles.artistGrid}>
        {artists.map((artist) => (
          <div key={artist.id} className={styles.cardWrapper}>
            <ArtistCard artist={artist} />
            <div className={styles.actions}>
              {/* Optional future: <Link to={`/edit-artist/${artist.id}`} className={styles.editBtn}>Edit</Link> */}
              <button
                onClick={() => deleteArtist(artist.id, artist.name)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
