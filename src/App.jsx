import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FineDiningAgenda from "./components/FineDiningAgenda";
import "./index.css";



function App() {
  return (
      <Routes>
        <Route path="/:guestId?" element={<FineDiningAgenda />} />
      </Routes>
  );
}

export default App;