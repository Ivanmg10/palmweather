import { render, screen } from "@testing-library/react";
import Today from "./today";

const mockData = {
  location: { name: "Oviedo" },
  current: {
    condition: { text: "Sunny" },
    temp_c: 22.4,
    wind_kph: 10,
    humidity: 60,
    pressure_mb: 1013,
    vis_miles: 6,
    uv: 5,
    feelslike_c: 21,
    cloud: 10,
    dewpoint_c: 14,
  },
  forecast: {
    forecastday: [
      {
        day: { maxtemp_c: 25.0, mintemp_c: 15.0 },
      },
    ],
  },
};

describe("Today", () => {
  test("renders location name", () => {
    render(<Today data={mockData} />);
    expect(screen.getByText("Oviedo")).toBeInTheDocument();
  });

  test("renders rounded temperature", () => {
    render(<Today data={mockData} />);
    expect(screen.getByText("22°")).toBeInTheDocument();
  });

  test("renders high temperature", () => {
    render(<Today data={mockData} />);
    expect(screen.getByText(/H: 25/)).toBeInTheDocument();
  });

  test("renders low temperature", () => {
    render(<Today data={mockData} />);
    expect(screen.getByText(/L: 15/)).toBeInTheDocument();
  });

  test("renders weather stats", () => {
    render(<Today data={mockData} />);
    expect(screen.getByText(/Wind:/)).toBeInTheDocument();
    expect(screen.getByText(/Humidity:/)).toBeInTheDocument();
    expect(screen.getByText(/Pressure:/)).toBeInTheDocument();
    expect(screen.getByText(/Visibility:/)).toBeInTheDocument();
    expect(screen.getByText(/UV Index:/)).toBeInTheDocument();
    expect(screen.getByText(/Feels Like:/)).toBeInTheDocument();
    expect(screen.getByText(/Cloud Cover:/)).toBeInTheDocument();
    expect(screen.getByText(/Dew Point:/)).toBeInTheDocument();
  });
});
