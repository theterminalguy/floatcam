import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../Filter";

describe("Filter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSendSync = window.electronAPI.sendSync as jest.Mock;

  test("renders filter select dropdown", () => {
    render(<Filter />);
    const filterLabel = screen.getByText(/Filter/i);
    expect(filterLabel).toBeInTheDocument();
  });

  test("displays filter options", () => {
    render(<Filter />);
    const noneOption = screen.getByText(/None/i);
    expect(noneOption).toBeInTheDocument();
  });

  test("sends IPC message when filter is changed", () => {
    render(<Filter />);
    const selectElement = screen.getByDisplayValue("None") as HTMLSelectElement;

    fireEvent.change(selectElement, { target: { value: "blur(3px)" } });

    expect(mockSendSync).toHaveBeenCalledWith(
      "shared-window-channel",
      expect.objectContaining({
        type: "set-video-filter",
        payload: expect.objectContaining({
          filter: "blur(3px)",
        }),
      })
    );
  });
});
