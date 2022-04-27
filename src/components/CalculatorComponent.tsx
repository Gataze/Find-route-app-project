import { FormEvent, useState } from "react";

interface CalcProps {
  routeDetails: {
    current: {
      distance: number;
      duration: number;
    };
  };
}

export const CalculatorComponent: React.FC<CalcProps> = ({ routeDetails }) => {
  const [kmCost, setKmCost] = useState<number | typeof NaN>(0);
  const [totalCost, setTotalCost] = useState<{
    cost: number | undefined;
    daysOfWork: number | undefined;
  }>({ cost: undefined, daysOfWork: undefined });

  function calculateCosts(e: FormEvent) {
    e.preventDefault();

    const distanceInKm = Math.round(routeDetails.current.distance / 1000);
    const daysOfWork =
      distanceInKm % 800 === 0
        ? distanceInKm / 800
        : Math.trunc(distanceInKm / 800) + 1;
    const cost =
      Math.round((kmCost * distanceInKm * 1.1 + daysOfWork * 1000) * 100) / 100;

    console.log(cost, daysOfWork);

    setTotalCost({ cost, daysOfWork });
  }

  return (
    <>
      <form onSubmit={(e) => calculateCosts(e)}>
        <h3 className="calculatorHeader">Calculation of route costs</h3>
        <label htmlFor="cost-input">Enter price per Km.</label>
        <input
          id="cost-input"
          type="text"
          value={kmCost}
          onChange={(e) => setKmCost(+e.target.value)}
        />
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
