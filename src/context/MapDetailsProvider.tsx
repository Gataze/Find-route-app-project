import { createContext, useContext, useState, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";


interface ContextType {
  places: {start: string, stop: string},
  setPlaces: (a: any) => void,
  dispatch: (a: any) => void,
  searches: [{id: number, start: string, stop: string}] | []
  updateMapDetails: (
    e: React.FormEvent<HTMLFormElement>,
    start: string,
    stop: string
  ) => void;
}

const MapDetails = createContext<ContextType>({
  places: {start: "", stop: ""},
  searches: [],
  setPlaces: () => {},
  dispatch: () => {},
  updateMapDetails: () => {}
});

export function useMapDetails() {
  const context = useContext(MapDetails);
  if (!context) {
    throw new Error("useOrderDetails must be used within context provider");
  }
  return context;
}


export enum Action {
  Add,
  Delete,
  Load,
}





export function reducer(searches: any, action: any){
  switch(action.type){
    case Action.Add:
      console.log(action.payload)
      return [...searches, newSearch(action.payload)]
    case Action.Delete:
      return searches.filter((searchItem: any) => searchItem.id !== action.payload)
    default:
      return searches
  }
}


function newSearch(places: any){
  return {id: Date.now(), ...places}
}


export function MapDetailsPriovider(props: any) {
  let navigate = useNavigate();
  const [searches, dispatch] = useReducer(reducer, [])
  const [places, setPlaces] = useState({
    start: "",
    stop: "",
  })


  console.log(searches)
  
  const value = useMemo(() => {
 
    function updateMapDetails(
      e: React.FormEvent<HTMLFormElement>,
    ) {
      e.preventDefault();
      if (!places.start && !places.stop) {
        return;
      }
      dispatch({type: Action.Add, payload: places})
      navigate("/map");
      // setPlaces({
      //   start: "",
      //   stop: "",
      // })
    }

    

    return {
      places,
      searches,
      dispatch,
      setPlaces,
      updateMapDetails
    };
  }, [places, setPlaces, navigate, searches]);

  console.log(value)

  return <MapDetails.Provider value={value} {...props} />;
}
