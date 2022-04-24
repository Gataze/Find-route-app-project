// import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { useConfigMap } from "./useConfigMap";
import H from "@here/maps-api-for-javascript";
import { useRef } from "react";

type NewProps = {
  lat: number;
  lng: number;
  onMapViewChange: (zoom: number, lat: number, lng: number) => void;
  zoom: Number;
};

export const MapComponent: React.FC<NewProps> = (props) => {
  const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";
  const url = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=5+Rue+Daunou%2C+75000+Paris%2C+France`;
  const url2 = 

  const { data, error, isPending } = useFetch(url);

  const startPosition = data === false ? null : data.items[0].position;
  const stopPosition = 
  console.log(startPosition);

  // const mapURL = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${key}&c=52.431,13.3845`;
  // const routeURL = `https://router.hereapi.com/v8/routes?apiKey=${key}&transportMode=car&origin=52.5308,13.3847&destination=52.5323,13.3789&return=polyline`;

  const inputEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  const platform = new H.service.Platform({
    apikey: key,
  });

  useConfigMap(platform, inputEl, startPosition);

  return (
    <div>
      <h2>Maps</h2>
      <form>
        <label>Miejsce początkowe:</label>
        <input type="text" />
        <label>Miejsce docelowe:</label>
        <input type="text" />
      </form>
      <div ref={inputEl} style={{ width: "100%", height: "600px" }} />

      {/* <Link to="/routeDetails">Show route</Link> */}
    </div>
  );
};
