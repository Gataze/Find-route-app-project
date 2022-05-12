import { RouteDetails } from "./MapPageSections/RouteDetails";
import { RouteCost } from "./MapPageSections/RouteCost";
import { Link } from "react-router-dom";
import { useRouteDetails } from "../../context/RouteDetailsProvider";
import { EnhancedMap } from "./MapPageHOC/withFetchMapHOC";

export function MapPage() {
  const { currentRoute } = useRouteDetails();

  return (
    <div className="map-component">
      <h2>Route Planner</h2>

      <div>
        <EnhancedMap />
        <RouteDetails currentRoute={currentRoute} />
        <RouteCost currentRoute={currentRoute} />
      </div>

      <Link to="/">Go back</Link>
    </div>
  );
}
