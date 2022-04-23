import { useEffect, useState } from "react";

interface responseObj {
  data: any;
  error: boolean;
  isPending: boolean;
}

const useFetch = (url: string) => {
  const [state, setState] = useState<responseObj>({
    data: [],
    error: false,
    isPending: true,
  });

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          console.log("could not fetch the data for that resource");
        }
        // return res.json();
        return res;
      })
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
  }, [url]);

  // console.log(state);

  return state;
};

export default useFetch;
