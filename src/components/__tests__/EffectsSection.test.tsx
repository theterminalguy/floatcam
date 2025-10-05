import { render, screen } from "@testing-library/react";
import EffectsSection from "../EffectsSection";

describe("EffectsSection Component", () => {
  test("renders effects section with title", () => {
    render(<EffectsSection />);
    const titleElement = screen.getByText(/Effects/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders video filter component", () => {
    render(<EffectsSection />);
    const filterLabel = screen.getByText(/Filter/i);
    expect(filterLabel).toBeInTheDocument();
  });
});
