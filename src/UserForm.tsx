import { Link } from "react-router-dom";
import useFetch from "./useFetch";

export default function UserForm() {
  const key = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";
  // const url = `https://geocode.search.hereapi.com/v1/geocode?apikey=${key}&q=5+Rue+Daunou%2C+75000+Paris%2C+France`;
  // const mapURL = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${key}&c=52.431,13.3845`;

  const routeURL = `https://router.hereapi.com/v8/routes?apiKey=${key}&transportMode=car&origin=52.5308,13.3847&destination=52.5323,13.3789&return=polyline`;

  // const { data, error, isPending } = useFetch(url);

  // const { data } = useFetch(mapURL);

  // console.log(data.url);

  const { data } = useFetch(routeURL);

  console.log(data);

  return (
    <div>
      <h2>Maps</h2>
      <form>
        <label>Miejsce początkowe:</label>
        <input type="text" />
        <label>Miejsce docelowe:</label>
        <input type="text" />
        {/* <img src={data.url} alt="ss" /> */}
      </form>

      <Link to="/routeDetails">Show route</Link>
    </div>
  );
}
