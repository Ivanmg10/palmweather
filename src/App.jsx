import "./App.css";
import Forecast from "./components/forecast/forecast";
import Temperature from "./components/temperature/temperature";
import Today from "./components/today/Today";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-[#171717]">
      <div className="w-[50%] flex flex-col justify-center items-center">
        <Today />

        <Temperature />

        <Forecast />
      </div>
    </div>
  );
}

export default App;
