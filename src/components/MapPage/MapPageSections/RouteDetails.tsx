import { CurrentRoute } from "../../../models/contextModel";

export const RouteDetails: React.FC<CurrentRoute> = ({
  currentRoute: { exactStartPlace, exactStopPlace, duration, distance },
}) => {
  return (
    <div className="routeDetails">
      <h2 className="routeDetails__header">Route Details:</h2>
      <ul className="routeDetails__list">
        <li className="routeDetails__listItem">From: {exactStartPlace}</li>
        <li className="routeDetails__listItem">To: {exactStopPlace}</li>
        <li className="routeDetails__listItem" title="routeDistance">
          Distance: {distance} km.
        </li>
        <li className="routeDetails__listItem" title="routeDuration">
          Duration: {duration}
        </li>
      </ul>
    </div>
  );
};
