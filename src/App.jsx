import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/forecast/forecast.jsx";
import Temperature from "./components/temperature/temperature.jsx";
import Today from "./components/today/today.jsx";
import Loading from "./pages/Loading.jsx";
import Error from "./pages/Error.jsx";
import { useLocationName } from "./hooks/useLocationName.jsx";

function App() {
  const [data, setData] = useState(null);
  const [locationName, setLocationName] = useState("Oviedo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { location, isLoading } = useLocationName();

  //API DE FORECAST MIRAR https://www.weatherapi.com/docs/ PARA INTEGRAR :)

  const API_KEY = "67273468b6164e1bb4893548251009";

  useEffect(() => {
    console.log(location);
    console.log(isLoading);
    setLocationName(location);
  }, [location]);

  useEffect(() => {
    const fetchData = (api) => {
      fetch(
        `https://api.weatherapi.com/v1/${api}?key=${API_KEY}&q=${locationName}&aqi=no&days=7`
      )
        .then((res) => res.json())
        .then((data) => {
          if (
            data.location.name !== "Ubicación De La Ubicación" &&
            !isLoading
          ) {
            setData((prev) => ({ ...prev, ...data }));
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchData("/forecast.json");
  }, [locationName]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-10">
      <div className="w-[75%] sm:w-[80%] flex flex-col justify-center items-center">
        <div className="flex flex-row w-full justify-center items-center w-full">
          <Today data={data} />

          <Forecast data={data} setLocation={setLocationName} />
        </div>
        <Temperature data={data} />
      </div>
    </div>
  );
}

export default App;
