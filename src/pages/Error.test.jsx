import { render, screen } from "@testing-library/react";
import Error from "./Error";

describe("Error", () => {
  test("renders the location error message", () => {
    render(<Error locationError="Geolocalización no soportada" />);
    expect(screen.getByText("Geolocalización no soportada")).toBeInTheDocument();
  });

  test("renders retry message", () => {
    render(<Error locationError="Some error" />);
    expect(
      screen.getByText("Intente cambiar la ubicación o recargar la página")
    ).toBeInTheDocument();
  });

  test("renders without locationError prop", () => {
    render(<Error />);
    expect(
      screen.getByText("Intente cambiar la ubicación o recargar la página")
    ).toBeInTheDocument();
  });
});
