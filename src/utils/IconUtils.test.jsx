import { render } from "@testing-library/react";
import { returnIcon, getWeatherIcon, getWeatherColor } from "./IconUtils";

describe("returnIcon", () => {
  test("renders a known icon", () => {
    const { container } = render(returnIcon("IconSun", "small", "sun"));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("falls back to IconSun for unknown icon name", () => {
    const { container } = render(returnIcon("IconUnknown", "small", "default"));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("applies big size class when size is big", () => {
    const { container } = render(returnIcon("IconSun", "big", "sun"));
    expect(container.querySelector("svg").getAttribute("class")).toContain("w-10");
  });

  test("applies small size class when size is not big", () => {
    const { container } = render(returnIcon("IconSun", "small", "sun"));
    expect(container.querySelector("svg").getAttribute("class")).toContain("w-6");
  });

  test("uses default color when type is unknown", () => {
    const { container } = render(returnIcon("IconSun", "small", "unknownType"));
    expect(container.querySelector("svg").getAttribute("class")).toContain("text-amber-400");
  });

  test("uses default type when type argument is omitted", () => {
    const { container } = render(returnIcon("IconSun", "small"));
    expect(container.querySelector("svg").getAttribute("class")).toContain("text-amber-400");
  });
});

describe("getWeatherIcon", () => {
  test("returns fallback icon when text is null", () => {
    const { container } = render(getWeatherIcon(null, "small"));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("returns fallback icon when text is empty string", () => {
    const { container } = render(getWeatherIcon("", "small"));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("logs text when size is big", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    getWeatherIcon("Sunny", "big");
    expect(spy).toHaveBeenCalledWith("Sunny");
    spy.mockRestore();
  });

  test("does not log text when size is not big", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    getWeatherIcon("Sunny", "small");
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test("returns sun icon for sunny condition", () => {
    const { container } = render(getWeatherIcon("Sunny", "small"));
    expect(container.querySelector("[data-testid='IconSun']")).toBeInTheDocument();
  });

  test("returns moon icon for clear at night", () => {
    const { container } = render(getWeatherIcon("Clear", "small", false));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("returns cloud icon for cloudy", () => {
    const { container } = render(getWeatherIcon("Cloudy", "small"));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("returns rain icon for light rain", () => {
    const { container } = render(getWeatherIcon("Light rain", "small"));
    expect(container.querySelector("[data-testid='IconCloudRain']")).toBeInTheDocument();
  });

  test("returns snow icon for light snow", () => {
    const { container } = render(getWeatherIcon("Light snow", "small"));
    expect(container.querySelector("[data-testid='IconSnowflake']")).toBeInTheDocument();
  });

  test("returns thunder icon for thunder condition", () => {
    const { container } = render(getWeatherIcon("Patchy rain with thunder", "small"));
    expect(container.querySelector("[data-testid='IconCloudBolt']")).toBeInTheDocument();
  });

  test("returns mist icon for mist", () => {
    const { container } = render(getWeatherIcon("Mist", "small"));
    expect(container.querySelector("[data-testid='IconMist']")).toBeInTheDocument();
  });

  test("returns wind icon for windy", () => {
    const { container } = render(getWeatherIcon("Windy", "small"));
    expect(container.querySelector("[data-testid='IconWind']")).toBeInTheDocument();
  });

  test("returns temperature icon for hot", () => {
    const { container } = render(getWeatherIcon("Hot", "small"));
    expect(container.querySelector("[data-testid='IconTemperature']")).toBeInTheDocument();
  });

  test("returns fog icon for fog condition", () => {
    const { container } = render(getWeatherIcon("Fog", "small"));
    expect(container.querySelector("[data-testid='IconCloudFog']")).toBeInTheDocument();
  });

  test("returns sun fallback for unknown condition during day", () => {
    const { container } = render(getWeatherIcon("UnknownCondition", "small", true));
    expect(container.querySelector("[data-testid='IconSun']")).toBeInTheDocument();
  });

  test("returns moon fallback for unknown condition at night", () => {
    const { container } = render(getWeatherIcon("UnknownCondition", "small", false));
    expect(container.querySelector("[data-testid='IconMoon']")).toBeInTheDocument();
  });
});

describe("getWeatherColor", () => {
  test("returns sun gradient for sunny", () => {
    expect(getWeatherColor("Sunny")).toBe(
      "bg-gradient-to-r from-amber-200 to-amber-400"
    );
  });

  test("returns moon gradient for clear", () => {
    expect(getWeatherColor("Clear")).toBe(
      "bg-gradient-to-r from-blue-200 to-blue-400"
    );
  });

  test("returns rain gradient for light rain", () => {
    expect(getWeatherColor("Light rain")).toBe(
      "bg-gradient-to-r from-blue-400 to-blue-600"
    );
  });

  test("returns snow gradient for light snow", () => {
    expect(getWeatherColor("Light snow")).toBe(
      "bg-gradient-to-r from-blue-100 to-blue-300"
    );
  });

  test("returns thunder gradient for thunder", () => {
    expect(getWeatherColor("Patchy rain with thunder")).toBe(
      "bg-gradient-to-r from-yellow-300 to-yellow-500"
    );
  });

  test("returns mist gradient for mist", () => {
    expect(getWeatherColor("Mist")).toBe(
      "bg-gradient-to-r from-gray-500 to-gray-400"
    );
  });

  test("returns fog gradient for fog", () => {
    expect(getWeatherColor("Fog")).toBe(
      "bg-gradient-to-r from-gray-400 to-gray-500"
    );
  });

  test("returns wind gradient for windy", () => {
    expect(getWeatherColor("Windy")).toBe(
      "bg-gradient-to-r from-gray-400 to-gray-300"
    );
  });

  test("returns temperature gradient for hot", () => {
    expect(getWeatherColor("Hot")).toBe(
      "bg-gradient-to-r from-red-400 to-red-600"
    );
  });

  test("returns sun gradient for unknown condition (fallback type is sun)", () => {
    expect(getWeatherColor("UnknownCondition")).toBe(
      "bg-gradient-to-r from-amber-200 to-amber-400"
    );
  });
});
