import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { FormComponent } from "../components/FormComponent";

test("renders learn react link", () => {
  render(<FormComponent />);
  const startInput = screen.getByRole("textbox", { name: /początkowe/i });
  expect(startInput).toHaveTextContent("");
});
