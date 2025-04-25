import styles from "./artistCard.module.css";

function ArtistCard({ artist }) {
  console.log("Artist Image", artist.img);

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={
          artist.img && artist.img.trim() !== ""
            ? artist.img
            : "https://via.placeholder.com/150"
        }
        alt={`Image of ${artist.name}`}
      />
      <h3 className={styles.name}>{artist.name || "Unknown Artist"}</h3>
      <p className={styles.category}>{artist.category || "Category N/A"}</p>
    </div>
  );
}

export default ArtistCard;
