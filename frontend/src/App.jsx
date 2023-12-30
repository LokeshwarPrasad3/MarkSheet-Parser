import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PrivatePage from "./Pages/PrivatePage.jsx";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/private" element={<PrivatePage />} />
      </Routes>
    </>
  );
}

export default App;
