import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/forecast/Forecast.jsx";
import Temperature from "./components/temperature/Temperature.jsx";
import Today from "./components/today/Today.jsx";
import Loading from "./pages/Loading.jsx";
import Error from "./pages/Error.jsx";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Langreo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //API DE FORECAST MIRAR https://www.weatherapi.com/docs/ PARA INTEGRAR :)

  const API_KEY = "67273468b6164e1bb4893548251009";

  useEffect(() => {
    const fetchData = (api) => {
      fetch(
        `http://api.weatherapi.com/v1/${api}?key=${API_KEY}&q=${location}&aqi=no&days=7`
      )
        .then((res) => res.json())
        .then((data) => {
          setData((prev) => ({ ...prev, ...data }));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchData("/forecast.json");
  }, [location]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-[#171717]">
      <div className="w-[75%] sm:w-1/2 flex flex-col justify-center items-center">
        <Today data={data} setLocation={setLocation} />

        <Temperature data={data} />

        <Forecast data={data} />
      </div>
    </div>
  );
}

export default App;
