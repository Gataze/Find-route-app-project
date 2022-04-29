import { FormEvent, useState, useRef } from "react";

interface CalcProps {
  routeDetails: {
    current: {
      distance: number;
      duration: number;
    };
  };
}

export const CalculatorComponent: React.FC<CalcProps> = ({ routeDetails }) => {
  const kmCostText = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [totalCost, setTotalCost] = useState<{
    cost: number | undefined;
    daysOfWork: number | undefined;
  }>({ cost: undefined, daysOfWork: undefined });

  function calculateCosts(e: FormEvent) {
    e.preventDefault();

    const kmCost = parseFloat(kmCostText.current.value);

    const distanceInKm = Math.round(routeDetails.current.distance / 1000);
    const daysOfWork =
      distanceInKm % 800 === 0
        ? distanceInKm / 800
        : Math.trunc(distanceInKm / 800) + 1;
    const cost =
      Math.round((kmCost * distanceInKm * 1.1 + daysOfWork * 1000) * 100) / 100;

    setTotalCost({ cost, daysOfWork });
  }

  return (
    <>
      <form onSubmit={(e) => calculateCosts(e)}>
        <h3 className="calculatorHeader">Calculations</h3>
        <label htmlFor="cost-input">Enter price per Km.</label>
        <input id="cost-input" type="number" step=".01" ref={kmCostText} />
        <div className="pContainer">
          <p>
            Price Multiplier: <b>110%</b>
          </p>
          <p>
            Cost per day. Km. allowance per day: <b>800km</b>.
          </p>
        </div>
        <div className="pContainer">
          <p>
            Drive Time (days):{" "}
            <b>
              {totalCost.daysOfWork ? totalCost.daysOfWork : "not calculated"}
            </b>
          </p>
          <p>
            Estimated road transport cost:{" "}
            <b>{totalCost.cost ? totalCost.cost : "not calculated"}</b>
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
