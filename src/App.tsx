import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MapDetailsPriovider } from "./context/MapDetailsProvider";
import { MapComponent } from "./components/MapComponent";
import { FormComponent } from "./components/FormComponent";
import "./styles/basicStyles.css";

function Map() {
  return (
    <Router>
      <MapDetailsPriovider>
        <div className="App" style={{ width: "100%", height: "900px" }}>
          <Routes>
            <Route path="/map" element={<MapComponent />} />
            <Route path="/" element={<FormComponent />} />
          </Routes>
        </div>
      </MapDetailsPriovider>
    </Router>
  );
}

export default Map;
