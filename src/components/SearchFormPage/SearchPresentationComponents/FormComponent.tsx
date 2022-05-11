export const FormComponent: React.FC<any> = ({
  places,
  setPlaces,
  getRoute,
}) => {
  return (
    <div className="form-component">
      <h2>Route Planner</h2>
      <label htmlFor="start-input">Set a start point</label>
      <input
        id="start-input"
        type="text"
        value={places.start}
        onChange={(e) =>
          setPlaces((prevState: any) => {
            return { ...prevState, start: e.target.value };
          })
        }
      />
      <label htmlFor="end-input">Set your destination</label>
      <input
        id="end-input"
        type="text"
        value={places.stop}
        onChange={(e) =>
          setPlaces((prevState: any) => {
            return { ...prevState, stop: e.target.value };
          })
        }
      />
      <button disabled={!places} onClick={() => getRoute(places)}>
        Plan your route
      </button>
    </div>
  );
};
