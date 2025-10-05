import { render, screen, fireEvent } from "@testing-library/react";
import BorderSection from "../BorderSection";

describe("BorderSection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSendSync = window.electronAPI.sendSync as jest.Mock;

  test("renders border section with title", () => {
    render(<BorderSection />);
    const titleElement = screen.getByText(/Border/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders color picker with default value", () => {
    render(<BorderSection />);
    const colorInput = screen.getByDisplayValue("#499979") as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
    expect(colorInput.value).toBe("#499979");
  });

  test("sends IPC message when color is changed", () => {
    render(<BorderSection />);
    const colorInput = screen.getByDisplayValue("#499979") as HTMLInputElement;

    fireEvent.change(colorInput, { target: { value: "#ff0000" } });

    expect(mockSendSync).toHaveBeenCalledWith(
      "shared-window-channel",
      {
        type: "set-border-color",
        payload: "#ff0000",
      }
    );
  });
});
