import { calculateCosts } from "../../../utils/MapUtils";
import { useRef, useState } from "react";

export const RouteCost: React.FC<any> = ({ currentRoute }) => {
  const kmCostText = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [totalCost, setTotalCost] = useState<{
    cost: number | undefined;
    daysOfWork: number | undefined;
  }>({ cost: undefined, daysOfWork: undefined });

  return (
    <div className="calculator">
      <h2 className="calculator__header">Calculate Route Costs:</h2>
      <form
        className="calculator__form"
        onSubmit={(e) =>
          setTotalCost(calculateCosts(e, currentRoute, kmCostText))
        }
      >
        <label className="calculator__label" htmlFor="cost-input">
          Enter price per one km. (PLN).
        </label>
        <input
          className="calculator__priceInput"
          id="cost-input"
          type="number"
          step=".01"
          ref={kmCostText}
        />
        <ul className="calculator__list">
          <li className="calculator__listItem">
            Standard Price Multiplier: <b>110%</b>
          </li>
          <li className="calculator__listItem">
            Travel distance allowance per day: <b>800km</b>.
          </li>
          <li className="calculator__listItem">
            Days of work:{" "}
            <b>
              {totalCost.daysOfWork ? totalCost.daysOfWork : "not calculated"}
            </b>
          </li>
          <li className="calculator__listItem">
            Estimated road transport cost (PLN):{" "}
            <b>{totalCost.cost ? totalCost.cost : "not calculated"} PLN</b>
          </li>
        </ul>
        <button className="calculator__button" type="submit">
          Calculate
        </button>
        <button
          className="calculator__button"
          type="button"
          onClick={() => window.print()}
        >
          Print PDF
        </button>
      </form>
    </div>
  );
};
