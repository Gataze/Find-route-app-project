import { useRouteDetails } from "../../../context/RouteDetailsProvider";
import { key } from "../../../credentials/credentials";
import useDoubleFetch from "../../../hooks/useDoubleFetch";
import { Map } from "../MapPageSections/Map";

const withFetchMapHOC = (Map: any) =>
  function Comp() {
    const { currentRoute } = useRouteDetails();

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
