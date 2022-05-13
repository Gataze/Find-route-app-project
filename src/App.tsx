import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteDetailsPriovider } from "./context/RouteDetailsProvider";
import { MapPage } from "./components/MapPage/MapPage";
import { SearchPage } from "./components/SearchFormPage/SearchPage";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <RouteDetailsPriovider>
        <div className="app">
          <div className="app__container">
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/map" element={<MapPage />} />
            </Routes>
          </div>
        </div>
      </RouteDetailsPriovider>
    </Router>
  );
}

export default App;
