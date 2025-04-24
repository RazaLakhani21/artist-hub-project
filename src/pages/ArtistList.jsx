import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./artistList.module.css";
import API from "../api/axiosInstance";
import Home from "./Home";

function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const artistsPerPage = 6;

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await API.get("/users");
        const onlyArtists = res.data.filter((user) => user.role === "artist");
        setArtists(onlyArtists);
      } catch (error) {
        console.error("Error fetching artists", error);
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArtists.length / artistsPerPage);
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = filteredArtists.slice(indexOfFirstArtist, indexOfLastArtist);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
    <div className={styles.container}>
      <h2 className={styles.heading}>Artist List</h2>

      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset to first page on search
        }}
        className={styles.searchInput}
      />

      <div className={styles.cardContainer}>
        {currentArtists.map((artist) => (
          <div key={artist.id} className={styles.card}>
            <img src={artist.image} alt={artist.name} className={styles.image} />
            <h3>{artist.name}</h3>
            <p>{artist.description}</p>
            <Link to={`/artists/${artist.id}`} className={styles.button}>
              View Profile
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? styles.activePage : ""}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default ArtistList;
