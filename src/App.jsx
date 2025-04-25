import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import ArtistCard from "./components/ArtistCard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ArtistList from "./pages/ArtistList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArtistDetail from "./pages/ArtistDetail";
import ArtistForm from "./pages/ArtistForm";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import BookArtist from "./pages/BookArtist";
import BookingList from "./pages/BookingList";
import ReviewForm from "./pages/ReviewForm";

function App() {
  // const aboutArtist = [{
  //   name: "Artist1",
  //   category: "Good",
  //   ratings: 4.5
  // },
  // {
  //   name: "Artist2",
  //   category: "Happy",
  //   ratings: 1.3
  // },
  // {
  //   name: "Artist3",
  //   category: "Sad",
  //   ratings: 2
  // }]
  return (
    <>
      {/* {aboutArtist.map((elem, idx) => {
      return <ArtistCard key={idx} name={elem.name} category={elem.category} ratings={elem.ratings}></ArtistCard>
    })} */}

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/artists/" element={<ArtistList />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/add-artist" element={<ArtistForm />} />
        <Route path="/add-artist/:id" element={<ArtistForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/book-artist/:id" element={<BookArtist />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/review/:id" element={<ReviewForm />} />
        <Route path="/admin/bookings" element={<BookingList forAdmin={true} />} />
        <Route path="/my-bookings" element={<BookingList forAdmin={false} customerName="xyz" />} />

      </Routes>
    </>
  );
}

export default App;
