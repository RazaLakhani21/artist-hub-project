import './artistCard.module.css'

function ArtistCard({ name, category, ratings }) {
  return (
    <div className="inline-block bg-emerald-50 text-center m-10 p-10">
      <h1>{name}</h1>
      <p>{category}</p>
      <h4>{ratings}</h4>
    </div>
  );
}

export default ArtistCard;
