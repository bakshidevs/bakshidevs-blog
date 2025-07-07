import "./shimmer.css";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="shimmer rounded-lg w-32 h-32 mb-4" />
      <div className="shimmer rounded w-48 h-6 mb-2" />
      <div className="shimmer rounded w-40 h-6 mb-2" />
      <div className="shimmer rounded w-36 h-6" />
    </div>
  );
}
