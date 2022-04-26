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
  const [kmCost, setKmCost] = useState<number>(0);
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
    <form onSubmit={(e) => calculateCosts(e)}>
      <h4>Wylicz koszt przejazdu dla uzyskanej trasy</h4>
      <label htmlFor="cost-input">Wprowadz koszt za kilometr</label>
      <input
        id="cost-input"
        type="text"
        value={kmCost}
        onChange={(e) => setKmCost(+e.target.value)}
      />
      <p>Stały mnożnik wynosi 110% otrzymanej sumy</p>
      <p>
        Stała cena za dzień wynosi 1000. Maxymalny dystans dzienny to 800km.
      </p>

      <p>Szacowany czas transortu w dniach: {totalCost.daysOfWork}</p>
      <p>Szacunkowa cena przejazdu: {totalCost.cost}</p>
      <input className="calculateButton" type="submit" value="Wylicz" />
      <input className="pdfButton" type="button" value="Pobierz PDF" />
    </form>
  );
};
