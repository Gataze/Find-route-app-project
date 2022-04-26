import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

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
  historyRoute: any[];
  updateHistory: (_: any) => void;
}

const MapDetails = createContext<ContextType>({
  start: "",
  stop: "",
  updateMapDetails: () => {},
  fetchFlag: true,
  setFetchFlag: () => {},
  data2: false,
  historyRoute: [],
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

  const [historyRoute, setHistoryRoute] = useState<any[]>([]);

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
      e.preventDefault();
      setStart(newStart);
      setStop(newStop);
      setFetchFlag(true);
      navigate("/map");
    }

    const updateHistory = (historyList: any) => {
      if (
        historyRoute.length === 0 ||
        JSON.stringify(historyRoute[historyRoute.length - 1]) !==
          JSON.stringify(historyList)
      ) {
        setHistoryRoute((prevState) => [...prevState, historyList]);
      }
      setFetchFlag(false);
    };

    return {
      stop,
      start,
      fetchFlag,
      data2,
      historyRoute,
      updateMapDetails,
      updateHistory,
    };
  }, [stop, start, data2, fetchFlag, data, historyRoute, navigate]);

  return <MapDetails.Provider value={value} {...props} />;
}
