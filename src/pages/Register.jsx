import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import axios from "axios";
import API from '../api/axiosInstance';

function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");

    const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      role,
    };

    try {
      const res = await API.post("/users", newUser);
      console.log("User Registered: ", res.data);
      alert("User Registered!");
      navigate("/login");
    } catch (error) {
      console.log("Registration Failed", error);
      alert("Something Went Wrong");
    }
  };

  return (
    <>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/artists" className={styles.link}>
          Artist List
        </Link>
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </div>
      <h1 className={styles.heading}>This is Register Page</h1>
      <form onSubmit={submitHandler} className={styles.form}>
        <label htmlFor="username" className={styles.label}>
          UserName
        </label>
        <input
          className={styles.input}
          placeholder="Enter Your name here"
          type="text"
          value={name}
          name="username"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="email" className={styles.label}>
          Email-Id
        </label>
        <input
          className={styles.input}
          placeholder="Enter Your email here"
          type="email"
          value={email}
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          className={styles.input}
          placeholder="Enter Your password here"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <label className={styles.label}>Select Your Role</label>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
          className={styles.select}
        >
          <option value="artist">Artist</option>
          <option value="customer">Customer</option>
        </select>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </>
  );
}
export default Register;
