import { CurrentRouteProps } from "../../../models/contextModel";

export const RouteDetails: React.FC<CurrentRouteProps> = ({
  currentRoute: { exactStartPlace, exactStopPlace, duration, distance },
}) => {
  return (
    <div className="routeDetails">
      <h2 className="routeDetails__header">Route Details:</h2>
      <ul className="routeDetails__list">
        <li className="routeDetails__listItem">From: {exactStartPlace}</li>
        <li className="routeDetails__listItem">To: {exactStopPlace}</li>
        <li className="routeDetails__listItem">Distance: {distance} km.</li>
        <li className="routeDetails__listItem">Duration: {duration}</li>
      </ul>
    </div>
  );
};
