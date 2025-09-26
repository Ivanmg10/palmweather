import { Spinner } from "../assets/Spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-[50%] flex flex-row justify-center items-center gap-3">
        <div role="status">
          <Spinner />
          <span className="sr-only">Loading...</span>
        </div>
        <p>Estoy encontrando donde estas...</p>
      </div>
    </div>
  );
}
