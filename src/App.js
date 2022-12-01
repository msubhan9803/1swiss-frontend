import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from 'pages/Home';
import Policies from 'pages/Policies';
import Subscription from 'pages/Subscription';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </>
  );
}

export default App;
