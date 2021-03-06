import { Link } from "react-router-dom";
import { RouteDetails } from "./MapPageSections/RouteDetails";
import { RouteCost } from "./MapPageSections/RouteCost";
import { useRouteDetails } from "../../context/RouteDetailsProvider";
import { EnhancedMap } from "./MapPageHOC/withFetchMapHOC";
import "./MapPageStyles/mapPageStyles.css";

//Map page component wraps Map, and Route calculator sections.
export function MapPage() {
  const { currentRoute } = useRouteDetails();

  return (
    <section className="mapPage">
      <div className="mapPage__container">
        <h2 className="mapPage__header">Route Planner</h2>

        <EnhancedMap />
        {currentRoute.exactStartPlace && (
          <RouteDetails currentRoute={currentRoute} />
        )}
        <RouteCost currentRoute={currentRoute} />
        <Link className="mapPage__link" to="/">
          Go back
        </Link>
      </div>
    </section>
  );
}
