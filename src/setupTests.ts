// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock window.electronAPI globally for all tests
Object.defineProperty(window, "electronAPI", {
  writable: true,
  value: {
    sendSync: jest.fn(),
    onMessageReceived: jest.fn(),
  },
});
