import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteDetailsPriovider } from "./context/RouteDetailsProvider";
import { MapContainer } from "./components/MapComponents/MapContainer";
import { FormComponent } from "./components/SearchFormComponent/FormComponent";
import "./styles/basicStyles.css";

function Map() {

  return (
    <Router>
      <RouteDetailsPriovider>
        <div className="App" style={{ width: "100%", height: "900px" }}>
          <Routes>
            <Route path="/map" element={<MapContainer />} />
            <Route path="/" element={<FormComponent />} />
          </Routes>
        </div>
      </RouteDetailsPriovider>
    </Router>
  );
}

export default Map;
