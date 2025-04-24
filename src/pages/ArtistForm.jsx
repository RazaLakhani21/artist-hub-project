import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./artistForm.module.css";
import API from "../api/axiosInstance";

function ArtistForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    image: "",
    role: "artist",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", formData);
      navigate("/artists");
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Add New Artist</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          Add Artist
        </button>
      </form>
    </div>
  );
}

export default ArtistForm;
