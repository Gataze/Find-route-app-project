import { useMapDetails } from "../context/MapDetailsProvider";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Testfile from "./testfile"

export function FormComponent() {
  const startPlaceName = useRef() as React.MutableRefObject<HTMLInputElement>;
  const stopPlaceName = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { start, stop, updateMapDetails, routeHistory } = useMapDetails();

  console.log(routeHistory);

  Testfile()

  return (
    <div className="form-component">
      <h2>Route Planner</h2>
      <form
        onSubmit={(e) =>
          updateMapDetails(
            e,
            startPlaceName.current.value,
            stopPlaceName.current.value
          )
        }
      >
        <label htmlFor="start-input">Set a start point</label>
        <input id="start-input" type="text" ref={startPlaceName} />
        <label htmlFor="end-input">Set your destination</label>
        <input id="end-input" type="text" ref={stopPlaceName} />

        <button>Plan your route</button>
      </form>
      {start && stop && <Link to="/map">Show current route {"\u2190"}</Link>}

      {routeHistory[0] && (
        <ul>
          <h2>Search history</h2>

          {routeHistory.map((route, i) => (
            <li key={route + i}>
              <p>Starting point: {route.startPlace}</p>
              <p>End point: {route.stopPlace}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
