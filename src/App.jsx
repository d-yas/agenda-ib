import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FineDiningAgenda from "./components/FineDiningAgenda";
import "./index.css";
import BlankView from './components/BlankView';


function App() {
  return (
      <Routes>
        <Route path="/:guestId?" element={<FineDiningAgenda />} />
        <Route path="/" element={<BlankView />} />
      </Routes>
  );
}

export default App;