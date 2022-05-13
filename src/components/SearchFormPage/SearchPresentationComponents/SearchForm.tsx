import { SearchFormProps } from "../../../models/contextModel";

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
            Set a start point:
          </label>
          <input
            id="start-input"
            type="text"
            className="searchForm__input"
            value={places.start}
            placeholder="Start location..."
            onChange={(e) =>
              setPlaces((prevState: { start: string; stop: string }) => {
                return { ...prevState, start: e.target.value };
              })
            }
          />
        </div>
        <div className="searchForm__inputContainer">
          <label className="searchForm__label" htmlFor="end-input">
            Set your destination:
          </label>
          <input
            className="searchForm__input"
            id="end-input"
            type="text"
            value={places.stop}
            placeholder="Stop location..."
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
