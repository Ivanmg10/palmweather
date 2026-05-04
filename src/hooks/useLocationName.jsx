import { useEffect, useState } from "react";

export function useLocationName({ setError }) {
  const [location, setLocation] = useState("Loading location...");
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by this browser");
      setError(true);
      setIsLoading(false);
      return;
    }

    /* istanbul ignore next */
    if (location === "Loading location...") setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const { city, town, village, state, country } = data.address;
          const place = city || town || village || "Ubicación desconocida";

          setLocation(`${place}, ${state}, ${country}`);
          setIsLoading(false);
        } catch (err) {
          setError(true);
          setLocationError("Error getting location: " + err.message);
          setIsLoading(false);
        }
      },
      (err) => {
        setError(true);
        setLocationError("Error: " + err.message);
        setIsLoading(false);
      }
    );
  }, []);

  return { location, locationError, isLoading };
}
