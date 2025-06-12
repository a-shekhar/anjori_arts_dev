// components/ui/LoadingOverlay.jsx
import { useLoading } from "../context/LoadingContext";

export default function LoadingOverlay() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center backdrop-blur-sm">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500"></div>
    </div>
  );
}
