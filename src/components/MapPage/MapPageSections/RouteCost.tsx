import { calculateCosts } from "../../../utils/MapUtils";
import { useRef, useState } from "react";
import { CurrentRoute } from "../../../models/contextModel";

//Presentation component of RouteCost section. Simple logic included
export const RouteCost: React.FC<CurrentRoute> = ({ currentRoute }) => {
  // useRef controls route calculator data input
  const kmCostText = useRef() as React.MutableRefObject<HTMLInputElement>;

  // totalCost state stores data about route costs. Calculations are performed using calculateCosts function.
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
            <b>
              {totalCost.cost ? `${totalCost.cost} PLN` : "not calculated"}{" "}
            </b>
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
