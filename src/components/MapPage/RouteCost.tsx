import { calculateCosts } from "../../utils/MapUtils";

export const RouteCost: React.FC<any> = ({
  kmCostText,
  currentRoute,
  totalCost,
  setTotalCost,
}) => {
  return (
    <>
      <form
        onSubmit={(e) =>
          setTotalCost(calculateCosts(e, currentRoute, kmCostText))
        }
      >
        <h3 className="calculatorHeader">Calculations</h3>
        <label htmlFor="cost-input">Enter price per one km. (PLN).</label>
        <input id="cost-input" type="number" step=".01" ref={kmCostText} />
        <div className="pContainer">
          <p>
            Price Multiplier: <b>110%</b>
          </p>
          <p>
            Travel distance allowance per day: <b>800km</b>.
          </p>
        </div>
        <div className="pContainer">
          <p>
            Days of work:{" "}
            <b>
              {totalCost.daysOfWork ? totalCost.daysOfWork : "not calculated"}
            </b>
          </p>
          <p>
            Estimated road transport cost (PLN):{" "}
            <b>{totalCost.cost ? totalCost.cost : "not calculated"} PLN</b>
          </p>
        </div>
        <input className="pdfButton" type="submit" value="Calculate" />
        <button
          className="pdfButton"
          type="button"
          onClick={() => window.print()}
        >
          Generate PDF
        </button>
      </form>
    </>
  );
};
