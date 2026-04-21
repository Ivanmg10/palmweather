import { render, screen } from "@testing-library/react";
import Temperature from "./temperature";

function buildHours(datePrefix) {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${datePrefix} ${String(i).padStart(2, "0")}:00`,
    condition: { text: "Sunny" },
    temp_c: 20 + i,
  }));
}

const mockData = {
  forecast: {
    forecastday: [
      { hour: buildHours("2025-09-10") },
      { hour: buildHours("2025-09-11") },
    ],
  },
};

describe("Temperature", () => {
  test("renders 'Now' label for the first entry", () => {
    render(<Temperature data={mockData} />);
    expect(screen.getByText("Now")).toBeInTheDocument();
  });

  test("renders temperature degrees for hours", () => {
    render(<Temperature data={mockData} />);
    const degrees = screen.getAllByText(/°/);
    expect(degrees.length).toBeGreaterThan(0);
  });

  test("renders the hourly temperature container", () => {
    const { container } = render(<Temperature data={mockData} />);
    expect(container.querySelector("#hour-temperature")).toBeInTheDocument();
  });

  test("renders exactly 24 hourly entries", () => {
    render(<Temperature data={mockData} />);
    const degrees = screen.getAllByText(/°/);
    expect(degrees).toHaveLength(24);
  });
});
