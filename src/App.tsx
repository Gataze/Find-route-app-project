import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MapDetailsPriovider } from "./MapDetailsProvider";
import { MapComponent } from "./MapComponent";
import { FormComponent } from "./FormComponent";
import "./basicStyles.css";

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
