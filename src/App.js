import "./App.css";
import Landing from "./pages/Landing/Landing";
import CharacterInventory from "./pages/CharacterInventory/CharacterInventory";
import FightLogic from "./pages/FightLogic/FightLogic";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletContext from "./context/WalletContext";

function App() {
  return (
    <Router>
      <WalletContext>
        <div className="App">
          <Routes>
            <Route path="/character-inventory" element={<CharacterInventory />} />
            <Route path="/fight-logic" element={<FightLogic />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
      </WalletContext>
    </Router>
  );
}

export default App;
