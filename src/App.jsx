import "./App.css";
import Forecast from "./components/forecast/forecast";
import Temperature from "./components/temperature/temperature";
import Today from "./components/today/Today";

function App() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-200">
      <div className="w-[50%]">
        <Today />

        <Temperature />

        <Forecast />
      </div>
    </div>
  );
}

export default App;
