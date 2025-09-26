import { useEffect, useState } from "react";

export function useLocationName() {
  const [location, setLocation] = useState("Cargando ubicación...");
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalización no soportada por este navegador");
      setIsLoading(false);
      return;
    }

    if (location === "Cargando ubicación...") setIsLoading(true);

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
          setLocationError("Error obteniendo ubicación" + err);
          setIsLoading(false);
        }
      },
      (err) => {
        setLocationError("Permiso denegado o error al obtener ubicación" + err);
        setIsLoading(false);
      }
    );
  }, []);

  return { location, locationError, isLoading };
}
