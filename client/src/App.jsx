import { Routes, Route } from "react-router-dom";
// importing components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
