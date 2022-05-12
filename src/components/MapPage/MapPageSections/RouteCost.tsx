import { calculateCosts } from "../../../utils/MapUtils";
import { useRef, useState } from "react";
import { CurrentRouteProps } from "../../../models/contextModel";

export const RouteCost: React.FC<CurrentRouteProps> = ({ currentRoute }) => {
  const kmCostText = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [totalCost, setTotalCost] = useState<{
    cost: number | undefined;
    daysOfWork: number | undefined;
  }>({ cost: undefined, daysOfWork: undefined });

  return (
    <div className="routeCost">
      <h2 className="routeCost__header">Calculate Route Costs:</h2>
      <form
        className="routeCost__form"
        onSubmit={(e) =>
          setTotalCost(calculateCosts(e, currentRoute, kmCostText))
        }
      >
        <label className="routeCost__label" htmlFor="cost-input">
          Enter price per one km. (PLN).
        </label>
        <input
          className="routeCost__priceInput"
          id="cost-input"
          type="number"
          step=".01"
          ref={kmCostText}
          placeholder="0"
        />
        <ul className="routeCost__list">
          <li className="routeCost__listItem">
            Standard Price Multiplier: <b>110%</b>
          </li>
          <li className="routeCost__listItem">
            Travel distance allowance per day: <b>800km</b>.
          </li>
          <li className="routeCost__listItem">
            Days of work:{" "}
            <b>
              {totalCost.daysOfWork ? totalCost.daysOfWork : "not calculated"}
            </b>
          </li>
          <li className="routeCost__listItem">
            Estimated road transport cost (PLN):{" "}
            <b>{totalCost.cost ? totalCost.cost : "not calculated"} PLN</b>
          </li>
        </ul>
        <button
          className="routeCost__button routeCost__button--one"
          type="submit"
        >
          Calculate
        </button>
        <button
          className="routeCost__button routeCost__button--two"
          type="button"
          onClick={() => window.print()}
        >
          Print PDF
        </button>
      </form>
    </div>
  );
};
