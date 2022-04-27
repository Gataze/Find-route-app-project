import { useEffect, useState } from "react";

interface responseObj {
  data: any;
  error: boolean;
  isPending: boolean;
}

const useFetch = (
  url: string,
  url2: string,
  start: string,
  stop: string,
  fetchFlag: boolean
) => {
  const [state, setState] = useState<responseObj>({
    data: false,
    error: false,
    isPending: true,
  });

  useEffect(() => {
    if (start && stop && fetchFlag) {
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

        .then((data) => {
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
    }
  }, [url, url2, start, stop, fetchFlag]);

  return state;
};

export default useFetch;
