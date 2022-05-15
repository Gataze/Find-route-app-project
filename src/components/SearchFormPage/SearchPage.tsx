import { RouteHistory } from "./SearchPresentationComponents/RouteHistory";
import { SearchForm } from "./SearchPresentationComponents/SearchForm";
import { useRouteDetails } from "../../context/RouteDetailsProvider";
import { useState } from "react";
import "./SearchPageStyles/searchPageStyles.css";

export function SearchPage() {
  const [places, setPlaces] = useState({ start: "", stop: "" });
  const { routesHistory, dispatch, getRoute } = useRouteDetails();

  return (
    <div className="searchPage">
      <SearchForm places={places} setPlaces={setPlaces} getRoute={getRoute} />
      <RouteHistory routesHistory={routesHistory} dispatch={dispatch} />
      <div>sss{process.env.REACT_APP_MY_API_KEY}</div>
    </div>
  );
}
