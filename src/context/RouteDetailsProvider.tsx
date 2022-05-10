import { createContext, useContext, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextType } from "../models/contextModel";
import { reducer } from "../reducer/reducer";

const MapDetails = createContext<ContextType>({
  currentRoute: {start: "", stop: "", exactStartPlace: "", exactStopPlace: "", distance: 0, duration: 0 },
  searches: [],
  setCurrentRoute: () => {}, 
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

export function RouteDetailsPriovider(props: any) {
  let navigate = useNavigate();
  const [searches, dispatch] = useReducer(reducer, [])
  const [currentRoute, setCurrentRoute] = useState({});
  
  const value = useMemo(() => {
    function updateMapDetails(places: any) {
      if (!places.start && !places.stop) {
        return;
      }
      setCurrentRoute({start: places.start, stop: places.stop})
      navigate("/map");
    }
    return {
      currentRoute,
      setCurrentRoute,
      searches,
      dispatch,
      updateMapDetails
    };
  }, [navigate, searches, dispatch, currentRoute]);

  return <MapDetails.Provider value={value} {...props} />;
}
