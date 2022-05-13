import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "../components/SearchFormPage/SearchPresentationComponents/SearchForm";
import App from "../App";
import H from "@here/maps-api-for-javascript";
import "@here/maps-api-for-javascript";

test("First render of SearchForm component", () => {
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

test("App Happy Path", async () => {
  jest.mock("@here/maps-api-for-javascript");
  render(<App />);

  const startInput = screen.getByRole("textbox", {
    name: /Set a start point/i,
  });
  const endInput = screen.getByRole("textbox", {
    name: /Set your destination/i,
  });
  const submitButton = screen.getByRole("button", { name: /Plan your route/i });

  userEvent.type(startInput, "szczecin");
  userEvent.type(endInput, "warszawa");
  userEvent.click(submitButton);

  await waitFor(async () => {
    const routeDetails = await screen.findByRole("heading", {
      name: /Route Details/i,
    });
    expect(routeDetails).toBeInTheDocument();
  });

  await waitFor(async () => {
    const routeDistance = await screen.findByTitle("routeDistance");
    expect(routeDistance).toHaveTextContent("Distance: 593.269 km.");
  });
});
