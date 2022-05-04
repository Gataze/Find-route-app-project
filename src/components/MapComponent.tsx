
// (async () => {
//   // Dynamically imported module (runtime)
//   const H = import("@here/maps-api-for-javascript");
// })();


import Map from "./Map";
import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom";
import {useMapDetails} from "../context/MapDetailsProvider"


export function MapComponent() {


  const {places} = useMapDetails();

  const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";

  const url = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${places.start}`;
  const url2 = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${places.stop}`;

  const { data, error, isPending } = useFetch(
    url,
    url2,
  );

  const startCords: any = data? data[0].items[0].position : {lat: 0, lng: 0};
  const stopCords: any = data? data[1].items[0].position : {lat: 0, lng: 0};

  return (
    <div className="map-component">
      <h2>Route Planner</h2>
      {isPending && <div>Loading..</div>}
      {error && <div>{error}</div>}
      {data && <Map startCords={startCords} stopCords={stopCords}/>} 
      <Link to="/">Go back</Link>
    </div>
  );
};

