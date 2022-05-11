import { Map } from "./Map";
import { RouteDetails } from "./RouteDetails";
import { RouteCost } from "./RouteCost";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useRouteDetails } from "../../context/RouteDetailsProvider";
import { key } from "../../credentials/credentials";
import { useRef, useState } from "react";

export function MapContainer() {
  const { currentRoute } = useRouteDetails();
  const kmCostText = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [totalCost, setTotalCost] = useState<{
    cost: number | undefined;
    daysOfWork: number | undefined;
  }>({ cost: undefined, daysOfWork: undefined });

  const startUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${currentRoute.start}`;
  const stopUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${currentRoute.stop}`;

  const { data, error, isPending } = useFetch(startUrl, stopUrl);

  console.log(data);

  return (
    <div className="map-component">
      <h2>Route Planner</h2>
      {isPending && <div>Loading..</div>}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <Map data={data} />
          <RouteDetails currentRoute={currentRoute} />
          <RouteCost
            kmCostText={kmCostText}
            currentRoute={currentRoute}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
          />
        </div>
      )}
      <Link to="/">Go back</Link>
    </div>
  );
}
