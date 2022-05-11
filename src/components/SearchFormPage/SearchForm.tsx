import { HistoryComponent } from "./SearchPresentationComponents/HistoryComponent";
import { FormComponent } from "./SearchPresentationComponents/FormComponent";
import { useRouteDetails } from "../../context/RouteDetailsProvider";
import { useState } from "react";

export function SearchForm() {
  const [places, setPlaces] = useState({ start: "", stop: "" });
  const { routesHistory, dispatch, getRoute } = useRouteDetails();

  return (
    <div>
      <FormComponent
        places={places}
        setPlaces={setPlaces}
        getRoute={getRoute}
      />
      <HistoryComponent routesHistory={routesHistory} dispatch={dispatch} />
    </div>
  );
}
