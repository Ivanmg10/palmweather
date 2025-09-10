import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/forecast/Forecast";
import Temperature from "./components/temperature/Temperature";
import Today from "./components/today/Today";
import { Spinner } from "./assets/Spinner";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //API DE FORECAST MIRAR https://www.weatherapi.com/docs/ PARA INTEGRAR :)

  const API_KEY = "67273468b6164e1bb4893548251009"; // reemplaza con tu API Key
  const CITY = "Langreo"; // ciudad que quieras consultar

  useEffect(() => {
    const fetchData = (api) => {
      fetch(
        `http://api.weatherapi.com/v1/${api}?key=${API_KEY}&q=${CITY}&aqi=no&days=7`
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
  }, []); // [] para que solo se ejecute al montar el componente

  if (loading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white bg-[#171717]">
        <div className="w-[50%] flex flex-row justify-center items-center gap-3">
          <div role="status">
            <Spinner />
            <span class="sr-only">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white bg-[#171717]">
        <div className="w-[50%] flex flex-col justify-center items-center">
          <p className="text-6xl">Error :(</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-[#171717]">
      <div className="w-[50%] flex flex-col justify-center items-center">
        <Today data={data} />

        <Temperature />

        <Forecast />
      </div>
    </div>
  );
}

export default App;
