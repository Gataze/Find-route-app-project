import { useCallback, useEffect, useState } from "react";
import { ResponseObj } from "../models/fetchModel";
import { FetchedData } from "../models/fetchModel";

const useFetch = (url: string, url2: string) => {
  const [state, setState] = useState<ResponseObj>({
    data: null,
    error: false,
    isPending: true,
  });

  const executeFetch = useCallback(() => {
    const abortCont = new AbortController();

    console.log("fetching");

    Promise.all([
      fetch(url, { signal: abortCont.signal }).then((res) => {
        if (!res.ok) {
          console.log("could not fetch the data for that resource");
        }
        return res.json();
      }),
      fetch(url2, { signal: abortCont.signal }).then((res) => {
        if (!res.ok) {
          console.log("could not fetch the data for that resource");
        }
        return res.json();
      }),
    ])

      .then((data: FetchedData[]) => {
        setState({ data, error: false, isPending: false });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        } else {
          setState({ data: null, error: err.message, isPending: false });
        }
      });

    return () => abortCont.abort();
  }, [url, url2]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return state;
};

export default useFetch;
