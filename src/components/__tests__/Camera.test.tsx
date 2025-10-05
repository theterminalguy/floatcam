import { render, screen, fireEvent } from "@testing-library/react";
import Camera from "../Camera";

describe("Camera Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSendSync = window.electronAPI.sendSync as jest.Mock;
  const mockOnMessageReceived = window.electronAPI.onMessageReceived as jest.Mock;

  test("renders camera select dropdown", () => {
    render(<Camera />);
    const cameraLabel = screen.getByText(/Camera/i);
    expect(cameraLabel).toBeInTheDocument();
  });

  test("displays loading state initially", () => {
    render(<Camera />);
    const loadingOption = screen.getByText(/Loading.../i);
    expect(loadingOption).toBeInTheDocument();
  });

  test("sends IPC message when camera is changed", () => {
    render(<Camera />);
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;

    // Simulate selecting a specific device
    fireEvent.change(selectElement, { target: { value: "test-device-id" } });

    expect(mockSendSync).toHaveBeenCalledWith(
      "shared-window-channel",
      expect.objectContaining({
        type: "set-video-stream",
      })
    );
  });

  test("registers message listener on mount", () => {
    render(<Camera />);
    expect(mockOnMessageReceived).toHaveBeenCalledWith(
      "shared-window-channel",
      expect.any(Function)
    );
  });
});
