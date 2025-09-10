import { IconSun } from "@tabler/icons-react";

export default function Today() {
  return (
    <div
      id="main-weather"
      className="flex flex-col justify-center items-center mb-16 w-64 p-5"
    >
      <p className="">Home</p>
      <p className="text-3xl">Langreo</p>
      <p className="text-9xl p-2">16°</p>
      <IconSun stroke={2} className="w-10 h-10 mb-3 mt-3" />
      <div id="high-lows" className="flex">
        <p className="mr-3">H:20</p>
        <p>L:13</p>
      </div>
    </div>
  );
}
