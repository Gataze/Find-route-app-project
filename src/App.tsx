import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteDetailsPriovider } from "./context/RouteDetailsProvider";
import { MapPage } from "./components/MapPage/MapPage";
import { SearchForm } from "./components/SearchFormPage/SearchForm";
import "./styles/basicStyles.css";

function Map() {
  return (
    <Router>
      <RouteDetailsPriovider>
        <div className="App" style={{ width: "100%", height: "900px" }}>
          <Routes>
            <Route path="/" element={<SearchForm />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </div>
      </RouteDetailsPriovider>
    </Router>
  );
}

export default Map;
