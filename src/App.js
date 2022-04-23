import "./App.css";
import Landing from "./pages/Landing/Landing";
import CharacterInventory from "./pages/CharacterInventory/CharacterInventory";
import FightLogic from "./pages/FightLogic/FightLogic";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletContext from "./context/WalletContext";
import { WorldMap } from "./pages/WorldMap/WorldMap";
import { Aphenos } from "./pages/Aphenos/Aphenos";
import { MistLands } from "./pages/MistLands/MistLands";
import { Nurmock } from "./pages/Nurmock/Nurmock";
import { Faunalyn } from "./pages/Faunalyn/Faunalyn";
import { FaunalynFountain } from "./pages/Faunalyn/FaunalynFountain/FaunalynFountain";
import { Gamos } from "./pages/Gamos/Gamos";
import { GamosSouth } from "./pages/Gamos/GamosSouth/GamosSouth";
import { NurmockCenter } from "./pages/Nurmock/NurmockCenter/NurmockCenter";

function App() {
  return (
    <Router>
      <WalletContext>
        <div className="App">
          <Routes>
            <Route path="/character-inventory" element={<CharacterInventory />} />
            <Route path="/fight-logic" element={<FightLogic />} />
            <Route path="/" element={<Landing />} />
            <Route path="/world-map" element={<WorldMap />} />
            <Route path="/aphenos-map" element={<Aphenos />} />
            <Route path="/mistLands-map" element={<MistLands />} />
            <Route path="/nurmock-map" element={<Nurmock />} />
            <Route path="/faunalyn-map" element={<Faunalyn />} />
            <Route path="/faunalynFountain-map" element={<FaunalynFountain />} />
            <Route path="/gamos-map" element={<Gamos />} />
            <Route path="/gamosSouth-map" element={<GamosSouth />} />
            <Route path="/nurmockCenter-map" element={<NurmockCenter />} />
          </Routes>
        </div>
      </WalletContext>
    </Router>
  );
}

export default App;
