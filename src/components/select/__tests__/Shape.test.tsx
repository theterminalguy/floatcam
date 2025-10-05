import { render, screen, fireEvent } from "@testing-library/react";
import Shape from "../Shape";
import { SelectOption } from "../../../types";

describe("Shape Component", () => {
  const mockShapes: SelectOption[] = [
    { value: "circle", label: "Circle" },
    { value: "square", label: "Square" },
    { value: "rectangle", label: "Rectangle" },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders shape select dropdown", () => {
    render(<Shape shapes={mockShapes} onChange={mockOnChange} />);
    const shapeLabel = screen.getByText(/Shape/i);
    expect(shapeLabel).toBeInTheDocument();
  });

  test("displays all shape options", () => {
    render(<Shape shapes={mockShapes} onChange={mockOnChange} />);
    mockShapes.forEach((shape) => {
      const option = screen.getByText(shape.label);
      expect(option).toBeInTheDocument();
    });
  });

  test("calls onChange when shape is changed", () => {
    render(<Shape shapes={mockShapes} onChange={mockOnChange} />);
    const selectElement = screen.getByDisplayValue("Circle") as HTMLSelectElement;

    fireEvent.change(selectElement, { target: { value: "square" } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
