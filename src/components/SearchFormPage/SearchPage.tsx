import { RouteHistory } from "./SearchPresentationComponents/RouteHistory";
import { SearchForm } from "./SearchPresentationComponents/SearchForm";
import { useRouteDetails } from "../../context/RouteDetailsProvider";
import { useState } from "react";
import "./SearchPageStyles/searchPageStyles.css";

//Search page component wraps Search Form and Search history components.
export function SearchPage() {
  const [places, setPlaces] = useState({ start: "", stop: "" });
  const { routesHistory, dispatch, getRoute } = useRouteDetails();

  return (
    <section className="searchPage">
      <SearchForm places={places} setPlaces={setPlaces} getRoute={getRoute} />
      <RouteHistory routesHistory={routesHistory} dispatch={dispatch} />
    </section>
  );
}
