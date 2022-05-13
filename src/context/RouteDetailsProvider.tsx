import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ContextType } from "../models/contextModel";
import { reducer } from "../reducer/reducer";

const MapDetails = createContext<ContextType>({
  currentRoute: {
    start: "",
    stop: "",
    exactStartPlace: "",
    exactStopPlace: "",
    distance: 0,
    duration: 0,
  },
  routesHistory: [],
  setCurrentRoute: () => {},
  dispatch: () => {},
  getRoute: () => {},
});

export function useRouteDetails() {
  const context = useContext(MapDetails);
  if (!context) {
    throw new Error("useOrderDetails must be used within context provider");
  }
  return context;
}

export const RouteDetailsPriovider: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (props: any) => {
  let navigate = useNavigate();
  const [routesHistory, dispatch] = useReducer(reducer, []);
  const [currentRoute, setCurrentRoute] = useState({});

  const value = useMemo(() => {
    function getRoute(places: { start: string; stop: string }) {
      if (!places.start && !places.stop) {
        return;
      }
      setCurrentRoute({ start: places.start, stop: places.stop });
      navigate("/map");
    }

    return {
      currentRoute,
      setCurrentRoute,
      routesHistory,
      dispatch,
      getRoute,
    };
  }, [navigate, routesHistory, dispatch, currentRoute]);

  return <MapDetails.Provider value={value} {...props} />;
};
