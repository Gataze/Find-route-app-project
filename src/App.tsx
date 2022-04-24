import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MapPosition } from "./MapPosition";
import { MapComponent } from "./MapComponent";
import { useState } from "react";

function Map() {
  interface currPosition {
    lat: number;
    lng: number;
    zoom: number;
  }

  const [position, setPosition] = useState<currPosition>({
    lat: 53.428543,
    lng: 14.552812,
    zoom: 10,
  });

  const handleMapViewChange = (zoom: number, lat: number, lng: number) => {
    setPosition({
      lat,
      lng,
      zoom,
    });
  };

  const handleInputChange = (name: any, value: any) => {
    setPosition((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Router>
      <div
        className="App"
        style={{ position: "relative", width: "100%", height: "500px" }}
      >
        <MapComponent
          lat={position.lat}
          lng={position.lng}
          onMapViewChange={handleMapViewChange}
          zoom={position.zoom}
        />
        {/* <MapPosition
          lat={position.lat}
          lng={position.lng}
          onChange={handleInputChange}
          zoom={position.zoom}
        /> */}
      </div>
    </Router>
  );

  // return (
  //   <Router>
  //     <div className="App">
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={
  //             <UserForm
  //               lat={position.lat}
  //               lng={position.lng}
  //               onMapViewChange={handleMapViewChange}
  //               zoom={position.zoom}
  //             />
  //           }
  //         />
  //         {/* <Route path="/routeDetails" element={<RouteDets />} /> */}
  //       </Routes>
  //     </div>
  //   </Router>
  // );
}

export default Map;
