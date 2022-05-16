import { SearchFormProps } from "../../../models/contextModel";

//Presentation component that displays search form. Form is used to collect the name of start point and final destination.
//In next step this data is used to get data necessary to render map and route between selected locations.
export const SearchForm: React.FC<SearchFormProps> = ({
  places,
  setPlaces,
  getRoute,
}) => {
  return (
    <div className="searchForm">
      <h2 className="searchForm__header">Route Planner</h2>
      <div className="searchForm__container">
        <div className="searchForm__inputContainer">
          <label className="searchForm__label" htmlFor="start-input">
            Start point:
          </label>
          <input
            id="start-input"
            type="text"
            className="searchForm__input"
            value={places.start}
            placeholder="Enter location..."
            onChange={(e) =>
              setPlaces((prevState: { start: string; stop: string }) => {
                return { ...prevState, start: e.target.value };
              })
            }
          />
        </div>
        <div className="searchForm__inputContainer">
          <label className="searchForm__label" htmlFor="end-input">
            End point:
          </label>
          <input
            className="searchForm__input"
            id="end-input"
            type="text"
            value={places.stop}
            placeholder="Enter location..."
            onChange={(e) =>
              setPlaces((prevState: { start: string; stop: string }) => {
                return { ...prevState, stop: e.target.value };
              })
            }
          />
        </div>
        <button
          className="searchForm__button"
          disabled={!places}
          onClick={() => getRoute(places)}
        >
          Plan your route
        </button>
      </div>
    </div>
  );
};
