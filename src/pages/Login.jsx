import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import axios from "axios";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`/users`, {
        params: {
          email,
          password,
        },
      });
      if (res.data.length > 0) {
        alert("Login Successfully!");
        localStorage.setItem("user", JSON.stringify(res.data[0])); //Storing Fake Token
        navigate("/artists");
      } else {
        alert("Invalid Credentials!");
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("Something Went Wrong!");
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
        <Link to="/register" className={styles.link}>
          Register
        </Link>
      </div>
      <div className={styles.container}>
        <h2 className={styles.h2}>Login</h2>
        <form onSubmit={submitHandler} className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Type your Email id here"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={styles.input}
          />
          <br />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={styles.input}
          />
          <br />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
