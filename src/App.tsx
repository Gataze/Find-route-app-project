import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteDetailsPriovider } from "./context/RouteDetailsProvider";
import { MapContainer } from "./components/MapPage/MapContainer";
import { SearchForm } from "./components/SearchFormPage/SearchForm";
import "./styles/basicStyles.css";
import { EnhancedMap } from "./components/MapPage/MapHoc";

function Map() {
  return (
    <Router>
      <RouteDetailsPriovider>
        <div className="App" style={{ width: "100%", height: "900px" }}>
          <Routes>
            <Route path="/map" element={<EnhancedMap />} />
            <Route path="/" element={<SearchForm />} />
          </Routes>
        </div>
      </RouteDetailsPriovider>
    </Router>
  );
}

export default Map;
