import { render, screen } from "@testing-library/react";
import { SearchForm } from "../components/SearchFormPage/SearchPresentationComponents/SearchForm";
import App from "../App";

describe("Happy path", () => {
  test("Form component after first render tests", () => {
    const places = { start: "szczecin", stop: "wrocław" };

    render(
      <SearchForm places={places} setPlaces={() => {}} getRoute={() => {}} />
    );
    const startInput = screen.getByRole("textbox", {
      name: /Set a start point/i,
    });
    const endInput = screen.getByRole("textbox", {
      name: /Set your destination/i,
    });
    const headerTitle = screen.queryByRole("heading", { name: /history/i });

    expect(startInput).toHaveTextContent("");
    expect(endInput).toHaveTextContent("");
    expect(headerTitle).not.toBeInTheDocument();
  });
  test("render app", () => {
    render(<App />);
  });
});
