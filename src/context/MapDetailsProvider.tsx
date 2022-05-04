import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";


interface ContextType {
  places: {start: string, stop: string},
  setPlaces: (a: any) => void,
  updateMapDetails: (
    e: React.FormEvent<HTMLFormElement>,
    start: string,
    stop: string
  ) => void;
}

const MapDetails = createContext<ContextType>({
  places: {start: "", stop: ""},
  setPlaces: () => {},
  updateMapDetails: () => {}
});

export function useMapDetails() {
  const context = useContext(MapDetails);
  if (!context) {
    throw new Error("useOrderDetails must be used within context provider");
  }

  return context;
}

export function MapDetailsPriovider(props: any) {
  let navigate = useNavigate();
  const [places, setPlaces] = useState({
    start: "",
    stop: "",
  })
  
  const value = useMemo(() => {
 
    function updateMapDetails(
      e: React.FormEvent<HTMLFormElement>,
    ) {
      e.preventDefault();
      if (!places.start && !places.stop) {
        return;
      }
      navigate("/map");
    }

    

    return {
      places,
      setPlaces,
      updateMapDetails
    };
  }, [places, setPlaces, navigate]);

  console.log(value)

  return <MapDetails.Provider value={value} {...props} />;
}
