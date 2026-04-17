import { getHour } from "./DateUtils";

describe("getHour", () => {
  test("pads single digit hours with zero", () => {
    expect(getHour("2025-09-10 01:00")).toBe("01");
  });

  test("returns double digit hours as-is", () => {
    expect(getHour("2025-09-10 13:00")).toBe("13");
  });

  test("returns 00 for midnight", () => {
    expect(getHour("2025-09-10 00:00")).toBe("00");
  });

  test("returns 23 for last hour of day", () => {
    expect(getHour("2025-09-10 23:00")).toBe("23");
  });
});
