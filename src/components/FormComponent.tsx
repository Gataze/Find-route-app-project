import { useMapDetails } from "../context/MapDetailsProvider";
import { useState } from "react";
import { Link } from "react-router-dom";


export function FormComponent() {
  // const startPlaceName = useRef() as React.MutableRefObject<HTMLInputElement>;
  // const stopPlaceName = useRef() as React.MutableRefObject<HTMLInputElement>;

  // const [places, setPlaces] = useState({
  //   start: "",
  //   stop: "",
  // })

  const { places, setPlaces, updateMapDetails } = useMapDetails();



  return (
    <div className="form-component">
      <h2>Route Planner</h2>
    
     
      <form
        onSubmit={(e) =>
          updateMapDetails(
            e,
            places.start,
            places.stop
          )
        }
      >
        <label htmlFor="start-input">Set a start point</label>
        <input id="start-input" type="text" value={places.start}  onChange={e => setPlaces((prevState: any) => {return {...prevState, start: e.target.value}}) }/>
        <label htmlFor="end-input">Set your destination</label>
        <input id="end-input" type="text" value={places.stop} onChange={e => setPlaces((prevState: any) => {return {...prevState, stop: e.target.value}}) } />

        <button disabled={!places} >Plan your route</button>
      </form>
      
     <Link to="/map">Show current route {"\u2190"}</Link>

      {/* {routeHistory[0] && (
        <ul>
          <h2>Search history</h2>

          {routeHistory.map((route, i) => (
            <li key={route + i}>
              <p>Starting point: {route.startPlace}</p>
              <p>End point: {route.stopPlace}</p>
            </li>
          ))}
        </ul>
      )} */}


    </div>
  );
}
