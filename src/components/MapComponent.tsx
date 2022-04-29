import { Link } from "react-router-dom";
import { useConfigMap } from "../hooks/useConfigMap";
import * as H from "@here/maps-api-for-javascript";
// (async () => {
//   // Dynamically imported module (runtime)
//   const H = import("@here/maps-api-for-javascript");
// })();

import React, { useRef } from "react";
import { useMapDetails } from "../context/MapDetailsProvider";
import { CalculatorComponent } from "./CalculatorComponent";

export const MapComponent: React.FC = (props) => {
  const inputEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";
  // const H = import("@here/maps-api-for-javascript");
  const platform = new H.service.Platform({
    apikey: key,
  });

  const { data2, updateHistory } = useMapDetails();
  const routeDetails = useConfigMap(platform, inputEl, data2);

  const startPlace = data2 ? data2[0].items[0].address.label : null;
  const stopPlace = data2 ? data2[1].items[0].address.label : null;

  return (
    <div className="map-component">
      <h2>Maps</h2>
      <h4>From: {startPlace}</h4>
      <h4>To: {stopPlace}</h4>
      <Link onClick={() => updateHistory({ startPlace, stopPlace })} to="/">
        Go back {"\u2190"}
      </Link>

      <div
        className="map-container"
        ref={inputEl}
        style={{ width: "100%", height: "600px" }}
      />
      <CalculatorComponent routeDetails={routeDetails} />
    </div>
  );
};
