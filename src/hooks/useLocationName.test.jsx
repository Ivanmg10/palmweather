import { renderHook, act, waitFor } from "@testing-library/react";
import { useLocationName } from "./useLocationName";

describe("useLocationName", () => {
  let setError;

  beforeEach(() => {
    setError = jest.fn();
    delete global.navigator.geolocation;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("sets error when geolocation is not supported", async () => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });

    const { result } = renderHook(() => useLocationName({ setError }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(setError).toHaveBeenCalledWith(true);
    expect(result.current.locationError).toBe(
      "Geolocalización no soportada por este navegador"
    );
  });

  test("sets location on successful geolocation and reverse geocoding", async () => {
    const mockPosition = {
      coords: { latitude: 43.36, longitude: -5.84 },
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn((successCb) => successCb(mockPosition)),
      },
      configurable: true,
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        address: {
          city: "Oviedo",
          state: "Asturias",
          country: "Spain",
        },
      }),
    });

    const { result } = renderHook(() => useLocationName({ setError }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.location).toBe("Oviedo, Asturias, Spain");
    expect(setError).not.toHaveBeenCalled();
  });

  test("uses town when city is not available", async () => {
    const mockPosition = {
      coords: { latitude: 43.0, longitude: -6.0 },
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn((successCb) => successCb(mockPosition)),
      },
      configurable: true,
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        address: {
          town: "Mieres",
          state: "Asturias",
          country: "Spain",
        },
      }),
    });

    const { result } = renderHook(() => useLocationName({ setError }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.location).toBe("Mieres, Asturias, Spain");
  });

  test("uses village when city and town are not available", async () => {
    const mockPosition = {
      coords: { latitude: 43.0, longitude: -6.0 },
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn((successCb) => successCb(mockPosition)),
      },
      configurable: true,
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        address: {
          village: "Somiedo",
          state: "Asturias",
          country: "Spain",
        },
      }),
    });

    const { result } = renderHook(() => useLocationName({ setError }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.location).toBe("Somiedo, Asturias, Spain");
  });

  test("uses fallback location when no city/town/village", async () => {
    const mockPosition = {
      coords: { latitude: 43.0, longitude: -6.0 },
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn((successCb) => successCb(mockPosition)),
      },
      configurable: true,
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        address: { state: "Asturias", country: "Spain" },
      }),
    });

    const { result } = renderHook(() => useLocationName({ setError }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.location).toBe("Ubicación desconocida, Asturias, Spain");
  });

  test("sets error when geolocation getCurrentPosition fails", async () => {
    const mockError = { message: "Permission denied" };

    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn((_, errorCb) => errorCb(mockError)),
      },
      configurable: true,
    });

    const { result } = renderHook(() => useLocationName({ setError }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(setError).toHaveBeenCalledWith(true);
    expect(result.current.locationError).toBe("Error: Permission denied");
  });

  test("sets error when fetch throws in success callback", async () => {
    const mockPosition = {
      coords: { latitude: 43.0, longitude: -6.0 },
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn((successCb) => successCb(mockPosition)),
      },
      configurable: true,
    });

    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useLocationName({ setError }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(setError).toHaveBeenCalledWith(true);
    expect(result.current.locationError).toContain("Error obteniendo ubicación");
  });
});
