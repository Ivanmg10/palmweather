import { render, screen } from "@testing-library/react";
import Error from "./Error";

describe("Error", () => {
  test("renders the location error message", () => {
    render(<Error locationError="Geolocation not supported" />);
    expect(screen.getByText("Geolocation not supported")).toBeInTheDocument();
  });

  test("renders retry message", () => {
    render(<Error locationError="Some error" />);
    expect(
      screen.getByText("Tip: Check your internet connection or try a different location")
    ).toBeInTheDocument();
  });

  test("renders without locationError prop", () => {
    render(<Error />);
    expect(
      screen.getByText("Tip: Check your internet connection or try a different location")
    ).toBeInTheDocument();
  });
});
