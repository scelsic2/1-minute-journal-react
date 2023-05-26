import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CurrentDate from "./components/CurrentDate";
import Landing from "./components/Landing";
import Prompt from "./components/Prompt";
import Login from "./components/Login";
import Register from "./components/Register";

function App(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/").then((res) => {
      setUser(res.data.user);
    });
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <CurrentDate />
      <Routes>
        <Route path="/" element={<Landing user={user} setUser={setUser} />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/prompt" />} />
        <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/prompt" />} />
        <Route path="/prompt" element={user ? <Prompt user={user} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}


export default App;