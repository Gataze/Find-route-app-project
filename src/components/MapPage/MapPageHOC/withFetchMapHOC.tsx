import { useRouteDetails } from "../../../context/RouteDetailsProvider";
import useDoubleFetch from "../../../hooks/useDoubleFetch";
import { Map } from "../MapPageSections/Map";
import { FetchedDataProps } from "../../../models/fetchModel";

const withFetchMapHOC = (Map: React.FC<FetchedDataProps>) =>
  function Comp() {
    const { currentRoute } = useRouteDetails();

    //API key limited to trusted domains.
    const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";

    const startUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${currentRoute.start}`;
    const stopUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=${currentRoute.stop}`;

    const { data, error, isPending } = useDoubleFetch(startUrl, stopUrl);

    return (
      <div>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {data && <Map data={data} />}
      </div>
    );
  };
export const EnhancedMap = withFetchMapHOC(Map);
