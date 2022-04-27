import { useMapDetails } from "../context/MapDetailsProvider";
import { useRef } from "react";
import { Link } from "react-router-dom";

export function FormComponent() {
  const startPlaceName = useRef() as React.MutableRefObject<HTMLInputElement>;
  const stopPlaceName = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { start, stop, updateMapDetails, history } = useMapDetails();

  return (
    <div>
      <form
        onSubmit={(e) =>
          updateMapDetails(
            e,
            startPlaceName.current?.value,
            stopPlaceName.current?.value
          )
        }
      >
        <label htmlFor="start-input">Miejsce początkowe:</label>
        <input id="start-input" type="text" ref={startPlaceName} />
        <label>Miejsce docelowe:</label>
        <input type="text" ref={stopPlaceName} />
        <input type="submit" />
      </form>
      {start && stop && <Link to="/map">Wróć do wyników</Link>}
      <h2>Historia Tras</h2>
      <ul>
        {history &&
          history.map((route, i) => (
            <li key={route + i}>
              <p>Starting point: {route.startPlace}</p>
              <p>End point: {route.stopPlace}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
