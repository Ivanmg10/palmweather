import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  test("renders loading message", () => {
    render(<Loading />);
    expect(screen.getByText("Estoy encontrando donde estas...")).toBeInTheDocument();
  });

  test("renders spinner status element", () => {
    render(<Loading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders sr-only loading text", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
