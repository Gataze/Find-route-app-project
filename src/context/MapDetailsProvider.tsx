import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

interface ContextType {
  start: string;
  stop: string;
  updateMapDetails: (
    e: React.FormEvent<HTMLFormElement>,
    start: string,
    stop: string
  ) => void;
  fetchFlag: boolean;
  setFetchFlag: (_: any) => void;
  data2: any;
  routeHistory: any[];
  updateHistory: (_: any) => void;
}

const MapDetails = createContext<ContextType>({
  start: "",
  stop: "",
  updateMapDetails: () => {},
  fetchFlag: true,
  setFetchFlag: () => {},
  data2: false,
  routeHistory: [],
  updateHistory: () => {},
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
  const [stop, setStop] = useState("");
  const [start, setStart] = useState("");
  const [fetchFlag, setFetchFlag] = useState(true);
  const [data2, setData] = useState(false);

  const [routeHistory, setRouteHistory] = useState<any[]>([]);

  const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";
  const url = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${start}`;
  const url2 = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${stop}`;

  const { data, error, isPending } = useFetch(
    url,
    url2,
    start,
    stop,
    fetchFlag
  );

  const value = useMemo(() => {
    if (data) setData(data);

    function updateMapDetails(
      e: React.FormEvent<HTMLFormElement>,
      newStart: string,
      newStop: string
    ) {
      if (!newStart && !newStop) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      setStart(newStart);
      setStop(newStop);
      setFetchFlag(true);
      navigate("/map");
    }

    const updateHistory = (historyList: any) => {
      if (
        routeHistory.length === 0 ||
        JSON.stringify(routeHistory[routeHistory.length - 1]) !==
          JSON.stringify(historyList)
      ) {
        setRouteHistory((prevState) => [...prevState, historyList]);
      }
      setFetchFlag(false);
    };

    return {
      stop,
      start,
      fetchFlag,
      data2,
      routeHistory,
      updateMapDetails,
      updateHistory,
    };
  }, [stop, start, data2, fetchFlag, data, routeHistory, navigate]);

  return <MapDetails.Provider value={value} {...props} />;
}
