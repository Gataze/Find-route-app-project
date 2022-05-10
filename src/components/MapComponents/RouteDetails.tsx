import { useMapDetails } from "../../context/RouteDetailsProvider"

export function RouteDetails() {

    const {currentRoute: {exactStartPlace, exactStopPlace, duration, distance}} = useMapDetails();

  return (
    <div>
        <h2>Details:</h2>
        <p>From: {exactStartPlace}</p>
        <p>To: {exactStopPlace}</p>
        <p>Distance: {distance}</p>
        <p>Duration: {duration}</p>
    </div>
  )
}
