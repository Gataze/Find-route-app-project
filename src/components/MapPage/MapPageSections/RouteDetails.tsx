export const RouteDetails: React.FC<any> = ({
  currentRoute: { exactStartPlace, exactStopPlace, duration, distance },
}) => {
  return (
    <div>
      <h2>Details:</h2>
      <p>From: {exactStartPlace}</p>
      <p>To: {exactStopPlace}</p>
      <p>Distance: {distance}</p>
      <p>Duration: {duration}</p>
    </div>
  );
};
