import { Map } from "./Map";
import {RouteDetails} from "./RouteDetails"
import useFetch from "../../hooks/useFetch"
import { Link } from "react-router-dom";
import { useMapDetails } from "../../context/RouteDetailsProvider";
import { key } from "../../credentials/credentials";



export function MapContainer() {

  const { currentRoute: {start, stop} } = useMapDetails();
  const startUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${start}`
  const stopUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${stop}`

  const { data, error, isPending } = useFetch(
    startUrl,
    stopUrl,
  );

  console.log(data)

  return (
    <div className="map-component">
      <h2>Route Planner</h2>
      {isPending && <div>Loading..</div>}
      {error && <div>{error}</div>}
      {data && 
        <div>
          <Map data={data}/>
          <RouteDetails />
        </div>
        
        } 
      <Link to="/">Go back</Link>
    </div>
  );
};

