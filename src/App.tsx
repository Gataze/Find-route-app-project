import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserForm from "./UserForm";
import RouteDets from "./RouteDets";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/routeDetails" element={<RouteDets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
