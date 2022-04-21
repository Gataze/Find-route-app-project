import { Link } from "react-router-dom";

export default function UserForm() {
  return (
    <div>
      <h2>Maps</h2>
      <form>
        <label>Miejsce początkowe:</label>
        <input type="text" />
        <label>Miejsce docelowe:</label>
        <input type="text" />
      </form>

      <Link to="/routeDetails">Show route</Link>
    </div>
  );
}
