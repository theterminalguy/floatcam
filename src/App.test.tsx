import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders floatcam title", () => {
  render(<App />);
  const titleElement = screen.getByText(/floatcam/i);
  expect(titleElement).toBeInTheDocument();
});
