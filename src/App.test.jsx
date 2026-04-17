import { render, screen, waitFor } from "@testing-library/react";

jest.mock("./components/forecast/forecast.jsx", () => ({
  __esModule: true,
  default: () => <div data-testid="forecast">Forecast</div>,
}));
jest.mock("./components/temperature/temperature.jsx", () => ({
  __esModule: true,
  default: () => <div data-testid="temperature">Temperature</div>,
}));
jest.mock("./components/today/today.jsx", () => ({
  __esModule: true,
  default: () => <div data-testid="today">Today</div>,
}));
jest.mock("./pages/Loading.jsx", () => ({
  __esModule: true,
  default: () => <div data-testid="loading">Loading</div>,
}));
jest.mock("./pages/Error.jsx", () => ({
  __esModule: true,
  default: () => <div data-testid="error">Error</div>,
}));
jest.mock("./hooks/useLocationName.jsx", () => ({
  useLocationName: jest.fn(),
}));

import App from "./App";
import { useLocationName } from "./hooks/useLocationName.jsx";

const validWeatherData = {
  location: { name: "Oviedo" },
  current: { condition: { text: "Sunny" }, temp_c: 22 },
  forecast: {
    forecastday: [
      { day: { maxtemp_c: 25, mintemp_c: 15 } },
      { day: { maxtemp_c: 23, mintemp_c: 13 } },
    ],
  },
};

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows Loading while data is being fetched", () => {
    useLocationName.mockReturnValue({
      location: "Oviedo",
      isLoading: true,
      locationError: null,
    });

    global.fetch = jest.fn(() => new Promise(() => {}));

    render(<App />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("shows Error when fetch fails", async () => {
    useLocationName.mockReturnValue({
      location: "Oviedo",
      isLoading: false,
      locationError: null,
    });

    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });

  test("renders main content when fetch succeeds", async () => {
    useLocationName.mockReturnValue({
      location: "Oviedo",
      isLoading: false,
      locationError: null,
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(validWeatherData),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("today")).toBeInTheDocument();
      expect(screen.getByTestId("forecast")).toBeInTheDocument();
      expect(screen.getByTestId("temperature")).toBeInTheDocument();
    });
  });

  test("stays loading when fetch returns 'Ubicación De La Ubicación'", async () => {
    useLocationName.mockReturnValue({
      location: "Oviedo",
      isLoading: false,
      locationError: null,
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        ...validWeatherData,
        location: { name: "Ubicación De La Ubicación" },
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });
  });

  test("stays loading when isLoading from hook is true during fetch", async () => {
    useLocationName.mockReturnValue({
      location: "Oviedo",
      isLoading: true,
      locationError: null,
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(validWeatherData),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });
  });
});
