import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./artistForm.module.css";
import API from "../api/axiosInstance";

function ArtistForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    image: "",
    role: "artist",
  });

  // Load existing data if editing
  useEffect(() => {
    const fetchArtist = async () => {
      if (id) {
        try {
          const res = await API.get(`/users/${id}`);
          setFormData(res.data);
        } catch (error) {
          console.error("Error loading artist data:", error);
        }
      }
    };

    fetchArtist();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/users/${id}`, formData); // update
      } else {
        await API.post("/users", formData); // add
      }
      navigate("/artists");
    } catch (error) {
      console.error("Error submitting artist:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await API.post("/users", formData);
  //       navigate("/artists");
  //     } catch (error) {
  //       console.error("Error adding artist:", error);
  //     }
  //   };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // base64 string
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
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
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}
        <button type="submit" className={styles.button}>
          Add Artist
        </button>
      </form>
    </div>
  );
}

export default ArtistForm;
