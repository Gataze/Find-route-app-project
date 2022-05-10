import { useMapDetails } from "../../context/RouteDetailsProvider";
import { Action } from "../../models/actionModel";
import Moment from 'react-moment';
import { useState } from "react";




export function FormComponent() {

  const [places, setPlaces] = useState({start: "", stop: ""})
  const { searches, dispatch, updateMapDetails } = useMapDetails();


  return (
    <div className="form-component">
      <h2>Route Planner</h2>
        <label htmlFor="start-input">Set a start point</label>
        <input id="start-input" type="text" value={places.start}  onChange={e => setPlaces((prevState: any) => {return {...prevState, start: e.target.value}}) }/>
        <label htmlFor="end-input">Set your destination</label>
        <input id="end-input" type="text" value={places.stop} onChange={e => setPlaces((prevState: any) => {return {...prevState, stop: e.target.value}}) } />
        <button disabled={!places}  onClick={() =>
          updateMapDetails(places)
        }>Plan your route</button>

      {searches && (
        <ul>
          <h2>Search history</h2>
          {searches.map((searchItem: any) => (
            <li key={searchItem.id}>
              <Moment date={searchItem.id} fromNow/>
              <p> Route from: {searchItem.startPlace.title} </p>
              <p> To: {searchItem.stopPlace.title} </p>
              <button onClick={() => dispatch({type: Action.Delete, payload: searchItem.id})}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
