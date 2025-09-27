export default function Error({ locationError }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl">{locationError}</p>
        <p className="text-xl">
          Intente cambiar la ubicación o recargar la página
        </p>
      </div>
    </div>
  );
}
