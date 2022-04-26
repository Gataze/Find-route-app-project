import { Link } from "react-router-dom";
import { useConfigMap } from "./useConfigMap";
import H from "@here/maps-api-for-javascript";
import { useRef } from "react";
import { useMapDetails } from "./MapDetailsProvider";

export const MapComponent: React.FC = (props) => {
  const inputEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";
  const platform = new H.service.Platform({
    apikey: key,
  });

  const { data2, updateHistory } = useMapDetails();
  useConfigMap(platform, inputEl, data2);

  const startPlace = data2 ? data2[0].items[0].address.label : null;
  const stopPlace = data2 ? data2[1].items[0].address.label : null;

  return (
    <div>
      <h2>Maps</h2>
      <Link onClick={() => updateHistory({ startPlace, stopPlace })} to="/">
        Go back
      </Link>
      <div ref={inputEl} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};
