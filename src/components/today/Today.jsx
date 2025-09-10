export default function Today() {
  return (
    <div
      id="main-weather"
      className="flex flex-col justify-center items-center mb-16"
    >
      <p className="">Home</p>
      <p className="text-3xl">Langreo</p>
      <p className="text-9xl p-2">16</p>
      <p className="-mb-1.5">Sunny</p>
      <div id="high-lows" className="flex">
        <p className="mr-3">H:20</p>
        <p>L:13</p>
      </div>
    </div>
  );
}
