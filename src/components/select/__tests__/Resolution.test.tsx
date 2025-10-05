import { render, screen, fireEvent } from "@testing-library/react";
import Resolution from "../Resolution";
import { SelectOption } from "../../../types";

describe("Resolution Component", () => {
  const mockResolutions: SelectOption[] = [
    { value: "100px", label: "100 X 100" },
    { value: "200px", label: "200 X 200" },
    { value: "300px", label: "300 X 300" },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders resolution select dropdown", () => {
    render(<Resolution resolutions={mockResolutions} onChange={mockOnChange} />);
    const resolutionLabel = screen.getByText(/Resolution/i);
    expect(resolutionLabel).toBeInTheDocument();
  });

  test("displays all resolution options", () => {
    render(<Resolution resolutions={mockResolutions} onChange={mockOnChange} />);
    mockResolutions.forEach((resolution) => {
      const option = screen.getByText(resolution.label);
      expect(option).toBeInTheDocument();
    });
  });

  test("calls onChange when resolution is changed", () => {
    render(<Resolution resolutions={mockResolutions} onChange={mockOnChange} />);
    const selectElement = screen.getByDisplayValue("100 X 100") as HTMLSelectElement;

    fireEvent.change(selectElement, { target: { value: "200px" } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
