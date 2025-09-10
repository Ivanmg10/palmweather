import { returnIcon } from "../../utils/IconUtils";

export default function Today() {
  return (
    <div
      id="main-weather"
      className="flex flex-col justify-center items-center mb-16 w-64 p-5"
    >
      <p className="">Home</p>
      <p className="text-3xl">Langreo</p>
      <div className="flex items-center">
        <p className="text-9xl p-2">16°</p>
        {returnIcon("IconSun", "big")}
      </div>

      <div id="high-lows" className="flex">
        <p className="mr-3">H:20</p>
        <p>L:13</p>
      </div>
    </div>
  );
}
